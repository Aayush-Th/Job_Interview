const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}));

// require all the routes here
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

// using all routes here
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

app.use((error, req, res, next) => {
    if (error?.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "Resume must be 3MB or smaller." });
    }

    if (error?.message === "Only PDF resumes are supported.") {
        return res.status(400).json({ message: error.message });
    }

    next(error);
});

module.exports = app;