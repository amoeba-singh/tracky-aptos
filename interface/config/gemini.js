const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Markdown file for explaining Butter Chicken Recipe with lots of emoji",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "##  Butter Chicken 🍗🔥  A Love Story in Spices 🌶️❤️\n\n**A creamy, decadent, and flavorful journey to culinary bliss!** \n\nThis recipe is a true testament to the beauty of Indian cuisine, a symphony of spices and textures that will leave you wanting more. 🍗\n\n**Ingredients:**\n\n* **Chicken:** 1.5 lbs boneless, skinless chicken, cut into 1-inch pieces 🐓\n* **Yogurt:** 1 cup plain yogurt 🥛\n* **Spices:**\n    * 2 tbsp garam masala ✨\n    * 1 tbsp ground ginger 🌿\n    * 1 tbsp ground cumin 🌱\n    * 1 tsp turmeric 🌼\n    * 1 tsp chili powder 🔥\n    * 1 tsp salt 🧂\n    * ½ tsp black pepper 🖤\n* **Tomatoes:** 2 cups chopped tomatoes 🍅\n* **Butter:** 2 tbsp butter 🧈\n* **Cream:** 1 cup heavy cream 🥛\n* **Onion:** 1 medium onion, sliced 🧅\n* **Garlic:** 4 cloves garlic, minced 🧄\n* **Oil:** 2 tbsp vegetable oil 🛢️\n* **Fresh Cilantro:** 1/4 cup, chopped for garnish 🌿\n\n**Instructions:**\n\n1. **Marinate the chicken:** In a bowl, combine the yogurt, spices, and salt. Add the chicken pieces and coat well. Marinate for at least 30 minutes (or up to 2 hours) in the fridge. 🍗🥛\n2. **Cook the chicken:** Heat oil in a pan over medium heat. Add the marinated chicken and cook until golden brown and cooked through, about 10 minutes. 🐔🔥\n3. **Make the sauce:**  In the same pan, add the chopped onion and cook until softened, about 5 minutes. 🧅\n4. **Add the spices:** Add the garlic and cook for 1 minute more. 🧄\n5. **Add tomatoes and simmer:** Add the chopped tomatoes, garam masala, cumin, turmeric, chili powder, and salt. Simmer for 15-20 minutes, stirring occasionally until the sauce thickens. 🍅\n6. **Creamy perfection:** Stir in the cream and butter, and cook for another 5 minutes until the sauce is smooth and creamy. 🥛🧈\n7. **Add the chicken:**  Add the cooked chicken back to the sauce and simmer for 5 minutes until heated through. 🍗\n8. **Garnish and serve:**  Garnish with chopped cilantro and serve hot with basmati rice or naan bread. 🌿🍚\n\n**Tips:**\n\n* **Spice it up!** Add more chili powder for a spicier dish 🔥\n* **Make it ahead:** You can make the sauce ahead of time and store it in the fridge for up to 3 days. \n* **Leftovers are delicious!**  Store any leftover Butter Chicken in the fridge for up to 3 days and enjoy it for lunch or dinner the next day. \n\n**Enjoy this culinary masterpiece!** 😋❤️",
        },
      ],
    },
  ],
});

const chefAi = async (recipe_name) => {
  console.log("apiKey =>", apiKey);
  const result = await chatSession.sendMessage(recipe_name);
  //   console.log(result.response.text());
  return result.response.text();
};

export default chefAi;
