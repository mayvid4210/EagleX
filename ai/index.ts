import OpenAI from "openai";
import { commentaryPrompt } from "./prompts/commentaryPrompt";

const client = new OpenAI();

export async function generateCommentary(data: any) {
  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: commentaryPrompt },
      { role: "user", content: JSON.stringify(data) }
    ]
  });

  return res.choices[0].message.content;
}
