import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

// OpenAI clientni to'g'ri ulash
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// GET route
router.route('/').get((req, res) => {
  res.send('Hello from DALL-E');
});

// POST route
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.images.generate({
      model: 'gpt-image-1',
      prompt,
      size: '1024x1024',
    });

    const image = aiResponse.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).json(
      error?.response?.data?.error?.message || 'Something went wrong'
    );
  }
});

export default router;
