const fs = require("fs");
const axios = require("axios");
var express = require("express");
var router = express.Router();
require("dotenv").config();
const Configuration = require("openai");
const OpenAIApi = require("openai");
const User = require("../models/user");
const Letter = require("../models/letter");

const requireLogin = async (req, res, next) => {
  if (!req.session.userId) {
    return res.json({ error: "Not logged in" });
  }
  const user = await User.findById(req.session.userId);
  if (user) {
    next();
  }
};

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

const baseUrl = "https://www.linkedin.com/in";

const getLinkedInData = async (linkedinUrl) => {
  const options = {
    method: "POST",
    url: "https://linkedin-data-scraper.p.rapidapi.com/person",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.RAPID_API_HOST,
    },
    data: {
      link: linkedinUrl,
    },
  };

  const response = await axios.request(options);
  return response;
};

const generateCoverLetter = async (prompt) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message.content;
};

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Cover Letter GPT" });
});

router.post("/register", async (req, res) => {
  try {
    const userCreds = {
      username: req.body.username,
      password: req.body.password,
    };
    const newUser = new User(userCreds);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username: username });

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const isPasswordValid = user.password === password;

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  try {
    req.session.userId = user._id;
    res.status(200).json({ message: "Successful login" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/saveLetter", requireLogin, async (req, res) => {
  const userId = req.session.userId;
  const letterData = req.body.letter;
  const letter = new Letter({
    userId: userId,
    letterContent: letterData,
  });

  try {
    const newLetter = await letter.save();
    res.status(201).json(newLetter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/savedLetters", requireLogin, async (req, res) => {
  const userId = req.session.userId;
  try {
    const userLetters = await Letter.find({ userId: userId });
    if (userLetters == null) {
      return res
        .status(404)
        .json({ message: "No letters exist with this user." });
    }
    res.status(200).send(userLetters);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/:linkedin/:company", async (req, res, next) => {
  const { linkedin, company } = req.params;
  if (!linkedin.includes(baseUrl)) {
    return res.status(400).send({ error: "Please enter a valid Linkedin URL" });
  }

  // Scrape Linkedin profile data
  let dataToGPT;
  let educationStr = "";
  let experienceStr = "";
  try {
    const linkedinData = await getLinkedInData(linkedin);
    if (!linkedinData || !linkedinData.data || !linkedinData.data.data) {
      throw new Error("LinkedIn data is missing or empty.");
    }
    const extractedData = linkedinData.data.data;
    dataToGPT = {
      name: extractedData.fullName || "",
      education: extractedData.educations || [],
      experience: extractedData.experiences || [],
    };

    for (const edu of dataToGPT.education) {
      educationStr += `${edu.subtitle} ${edu.title},`;
    }
    for (const exp of dataToGPT.experience) {
      const jobTitle = exp.title;
      const company = exp.subtitle.split("·")[0];
      experienceStr += `${jobTitle} at ${company},`;
    }
  } catch (err) {
    return res
      .status(err.response.status)
      .send({ error: "Error collecting LinkedIn data" });
  }

  // Generate the letter
  try {
    const gptPrompt = `name: ${dataToGPT.name} education: ${educationStr} job experience: ${experienceStr} write a cover letter for ${company}. No heading.`;
    const coverLetter = await generateCoverLetter(gptPrompt);
    return res.status(200).json({ result: coverLetter });
  } catch (err) {
    return res.status(err.status).send({
      error: "Error generating cover letter",
    });
  }
});

module.exports = router;
