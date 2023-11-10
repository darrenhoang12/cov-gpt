const fs = require('fs');
const axios = require("axios");
var express = require("express");
var router = express.Router();

let jsonData;

fs.readFile('key.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  jsonData = JSON.parse(data);
  console.log(jsonData);
})

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
      "X-RapidAPI-Key": jsonData['rapidAPIKey'],
      "X-RapidAPI-Host": "linkedin-profiles1.p.rapidapi.com",
    },
  };
  const response = await axios.request(options);
  return response;
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ message: "Hello from the server!" });
});

router.get("/:linkedin/:company", async (req, res, next) => {
  const { linkedin, company } = req.params;
  console.log(baseUrl);
  console.log(linkedin);
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
    console.log(jsonData);
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
    let educationStr = '';
    let jobStr = '';
    for (const edu of dataToGPT.education) {
      educationStr += `${edu.degree} ${edu.field} ${edu.name},`
    }
    for (let i = 0; i < dataToGPT.jobTitle.length; i++) {
      const job = dataToGPT.jobTitle[i];
      const company = dataToGPT.worksFor[i];
      jobStr += `${job} at ${company.name},`
    }
    const gptPrompt = `name: ${dataToGPT.name} education: ${educationStr} job experience: ${jobStr} write a cover letter for ${company}. Include just the letter, no header.`;
    console.log(gptPrompt);
    res.json(dataToGPT);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
