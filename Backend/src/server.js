require('dotenv').config();
const app = require("./app");
const connectToDB = require("./config/database");
// const invokeGeminiAi = require("./services/ai.service");

connectToDB();

// invokeGeminiAi().catch((error) => {
//     console.error("Gemini AI startup check failed:", error.message);
// });

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})