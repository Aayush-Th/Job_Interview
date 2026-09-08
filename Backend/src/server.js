require('dotenv').config();
const app = require("./app");
const connectToDB = require("./config/database");
// const invokeGeminiAi = require("./services/ai.service");

connectToDB();

// invokeGeminiAi().catch((error) => {
//     console.error("Gemini AI startup check failed:", error.message);
// });

app.listen(3000, () => {
    console.log("Server is running at port 3000");
})