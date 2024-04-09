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
  console.log("in requireLogin");
  console.log(req.session.userId);
  if (!req.session.userId) {
    return res.json({ error: "Not logged in" });
  }
  console.log(req.session.userId);
  const user = await User.findById(req.session.userId);
  if (user) {
    next();
  }
};

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

let jsonData;

fs.readFile("key.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  jsonData = JSON.parse(data);
});

const baseUrl = "https://www.linkedin.com/in";

const getLinkedInData = async (linkedinUrl) => {
  const options = {
    method: "GET",
    url: "https://linkedin-profiles1.p.rapidapi.com/extract",
    params: {
      url: linkedinUrl,
      html: "1",
    },
    headers: {
      "X-RapidAPI-Key": jsonData["rapidAPIKey"],
      "X-RapidAPI-Host": "linkedin-profiles1.p.rapidapi.com",
    },
  };
  const response = await axios.request(options);
  return response;
};

const generateCoverLetter = async (prompt) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-3.5-turbo-16k-0613",
  });
  console.log(completion.choices[0]);
  return completion.choices[0].message.content;
};

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "your_page_title" });
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

  req.session.userId = user._id;
  res.status(200).json({ message: "Successful login" });
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
    console.log(userLetters);
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
    res.json({ linkedin: "invalid_url" });
    return;
  }

  try {
    /*
    const linkedinData = await getLinkedInData(linkedin);
    const extractedData = linkedinData['data']['extractor'];
    const dataToGPT = {
      name: extractedData.name,
      education: extractedData.education,
      jobTitle: extractedData.jobTitle,
      worksFor: extractedData.worksFor,
      description: extractedData.description,
    }
    */
    const dataToGPT = {
      name: "Darren Hoang",
      education: [
        {
          name: "UC Irvine",
          url: "https://www.linkedin.com/school/university-of-california-irvine/?trk=public_profile_school_profile-section-card_image-click",
          degree: "Bachelor of Science - BS",
          field: "Computer Science",
          activities: null,
          startDate: "2020",
          endDate: "2024",
        },
      ],
      jobTitle: ["Software Development Intern"],
      worksFor: [
        {
          "@type": "Organization",
          name: "Charge Collective",
          url: "https://www.linkedin.com/company/chargecollective?trk=ppro_cprof",
          member: {
            "@type": "OrganizationRole",
            startDate: "2023-10",
          },
        },
      ],
      description:
        "Hi there! 👋🏽<br><br>I'm Darren and I’m At UCI majoring in computer science! I’m a hardworking student with strong leadership skills who has a passion for software and creating valuable insights through data. I’m looking for opportunities in data analysis, data science, and software engineering to sharpen my technical skills and learn industry practices.<br><br>Some of my interests!<br>- golf, volleyball, basketball<br>- anime<br>- escape rooms<br>- mechanical keyboards<br><br>For any inquiries or just to talk! <br>darrenhoang12@gmail.com",
    };
    let educationStr = "";
    let jobStr = "";
    for (const edu of dataToGPT.education) {
      educationStr += `${edu.degree} ${edu.field} ${edu.name},`;
    }
    for (let i = 0; i < dataToGPT.jobTitle.length; i++) {
      const job = dataToGPT.jobTitle[i];
      const company = dataToGPT.worksFor[i];
      jobStr += `${job} at ${company.name},`;
    }
    const gptPrompt = `name: ${dataToGPT.name} education: ${educationStr} job experience: ${jobStr} write a cover letter for ${company}. No heading.`;
    console.log(gptPrompt);
    const coverLetter = await generateCoverLetter(gptPrompt);
    res.json({ result: coverLetter });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
