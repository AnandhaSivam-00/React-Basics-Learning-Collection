import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_MODEL_API);

export async function getRandomWordFromAI() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });

        const response = await model.generateContent({ 
            contents: [{
                role: "user",
                parts: [{
                        text: "Generate a single random new English word that is between 4-8 letters long and a unique one, which makes the user to guess. (Bad examples: Planet, Solar, Water, Student, Classroom) Return only the word, nothing else."
                    }]
            }]
        });

        return response.response.text().trim().toLowerCase();
    }
    catch(error) {
        console.error(error.message);
    }
}