import { GoogleGenerativeAI, type Part } from "@google/generative-ai";

export const generateMealPlan = async (image: File, settings: any) => {
  const VITE_GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(VITE_GEMINI_API_KEY);
  //const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const imageParts = await Promise.all([fileToGenerativePart(image)]);

  try {
    const prompt = `Based on the provided image of my groceries and my settings, create a 7-day meal plan. Settings: ${JSON.stringify(
      settings
    )}. Please provide the response in JSON format, following this structure: { "days": [ { "day": "Monday", "meals": [ { "name": "Meal 1" }, { "name": "Meal 2" }, { "name": "Meal 3" } ] } ] }`;

    const result = await model.generateContent([prompt, ...imageParts]);
    // const result = await model.generateContent({
    //   contents: [{ role: "user", parts: [{ text: prompt }, ...imageParts] }],
    //   generationConfig: {
    //     responseMimeType: "application/json",
    //   },
    // });
    const response = result.response;
    const text = response.text();

    // Clean the response to get valid JSON
    const jsonResponse = text.replace(/```json/g, "").replace(/```/g, "");
    return JSON.parse(jsonResponse);
  } catch (error) {
    console.error("Error generating meal plan:", error);
    throw error;
  }
};

async function fileToGenerativePart(file: File): Promise<Part> {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}
