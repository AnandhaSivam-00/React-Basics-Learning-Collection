import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they
could make with some or all of those ingredients. You don't need to use every ingredient they
mention in your recipe. The recipe can include additional ingredients they didn't mention, but try
not to include too many extra ingredients. Format your response in markdown to make it easier to
render to a web page
`

// export async function getRecipeFromMistral(ingredientsArray) {
//     try {
//         // Try using HfInference first
//         const hfMistral = new HfInference(import.meta.env.VITE_HUGGING_FACE_MISTRAL_MODEL_API);
//         const ingredientString = ingredientsArray.join(", ");
        
//         const response = await hfMistral.chatCompletion({
//             model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
//             messages: [
//                 { role: "system", content: SYSTEM_PROMPT },
//                 { role: "user", content: `I have ${ingredientString}. Please give me a recipe you'd recommend I make!` }
//             ],
//             max_tokens: 1024
//         });
        
//         return response.choices[0].message.content;
//     } catch (firstError) {
//         console.error("Error with HfInference library:", firstError);
//         console.log("Trying fallback method...");
        
//         // Fall back to the fetch implementation
//         return await callMistralWithFetch(ingredientsArray);
//     }
// }

/*
The mistral model is not available on the inference, so that I changed to the zai's GLM model.
 */
export async function getRecipeFromMistral(ingredientsArray) {
    const ingredientString = ingredientsArray.join(", ");
    const apiKey = import.meta.env.VITE_HUGGING_FACE_MISTRAL_MODEL_API;
    
    try {
        const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "zai-org/GLM-4.5-Air:zai-org",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: `I have ${ingredientString}. Please give me a recipe you'd recommend I make!` }
                ],
                max_tokens: 1024
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }
        
        const data = await response.json();
        const recipeText = data.choices?.[0]?.message?.content || "";
        
        return recipeText || "Sorry, couldn't generate a recipe";
    } catch (error) {
        console.error("Error calling Mistral API with fetch:", error);
        return "Sorry, I couldn't generate a recipe at this time. Please try again later.";
    }
}