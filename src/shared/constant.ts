import 'dotenv/config';
import Groq from 'groq-sdk';

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// import OpenAI from "openai";

// export const openai = new OpenAI({
//     organization: process.env.OPENAI_ORG_ID,
//     project: process.env.OPENAI_PROJ_ID,
//     apiKey: process.env.OPENAI_API_KEY
// });

export enum Lanauge {
  English = 'English',
  Chinese = 'Chinese',
  Spanish = 'Spanish',
  Russian = 'Russian',
  German = 'German',
  Japan = 'Japan',
  Dutch = 'Dutch',
  French = 'French',
  Italian = 'Italian',
}

export enum InterviewType {
  Mixed = 'mixed',
  Intro = 'intro',
  Tech = 'tech',
  Behavioral = 'behavioral',
}
