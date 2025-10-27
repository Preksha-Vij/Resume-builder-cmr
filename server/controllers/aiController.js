import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";
import axios from "axios";

// 1. Enhance Professional Summary
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) return res.status(400).json({ message: 'Missing required fields' });

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else." },
        { role: "user", content: userContent },
      ],
    });

    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// 2. Enhance Job Description
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) return res.status(400).json({ message: 'Missing required fields' });

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be only in 1-2 sentence also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no options or anything else." },
        { role: "user", content: userContent },
      ],
    });

    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// 3. Upload Resume & Extract Data
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;
    if (!resumeText) return res.status(400).json({ message: 'Missing required fields' });

    const systemPrompt = "You are an expert AI Agent to extract data from resume.";
    const userPrompt = `extract data from this resume: ${resumeText}
        
Provide data in the following JSON format with no additional text before or after:

{
  professional_summary: { type: String, default: '' },
  skills: [{ type: String }],
  personal_info: {
    image: {type: String, default: '' },
    full_name: {type: String, default: '' },
    profession: {type: String, default: '' },
    email: {type: String, default: '' },
    phone: {type: String, default: '' },
    location: {type: String, default: '' },
    linkedin: {type: String, default: '' },
    website: {type: String, default: '' },
  },
  experience: [
    {
      company: { type: String },
      position: { type: String },
      start_date: { type: String },
      end_date: { type: String },
      description: { type: String },
      is_current: { type: Boolean },
    }
  ],
  project: [
    {
      name: { type: String },
      type: { type: String },
      description: { type: String },
    }
  ],
  education: [
    {
      institution: { type: String },
      degree: { type: String },
      field: { type: String },
      graduation_date: { type: String },
      gpa: { type: String },
    }
  ]
}`;

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: 'json_object' }
    });

    const extractedData = response.choices[0].message.content;
    const parsedData = JSON.parse(extractedData);
    const newResume = await Resume.create({ userId, title, ...parsedData });

    res.json({ resumeId: newResume._id });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// 4. Get Smart Suggestions for Resume vs JD (for /api/ai/suggestions)
export const getSuggestions = async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;
    const prompt = `
Resume Data:
${JSON.stringify(resume, null, 2)}

Job Description:
${jobDescription}

Instructions:
- List 3-5 missing/improvable skills, or bullet improvement suggestions, based on the job description.
- Recommendations can include ATS tips, missing sections, and relevant projects/keywords. 
- Don't repeat info already present in the resume.
`;

    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama2', // Or your LLM model
      prompt,
      stream: false
    });
    const aiText = response.data.response || response.data.choices?.[0]?.text || '';
    const suggestions = aiText
      .split('\n')
      .map(line => line.replace(/^[\s*-•]+/, '').trim())
      .filter(line => line.length > 0);
    res.json({ suggestions });
  } catch (err) {
    console.error('AI suggestion error:', err.message, err);
    res.status(500).json({ error: 'Unable to generate AI suggestions.' });
  }
};
