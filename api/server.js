import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", async (req, res) => {
    res.status(200).send({
        message:
            "This is Chatgpt",
    });
});

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/", async (req, res) => {
    try {
        console.log("hi");
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: req.body.input,
            temperature: 0,
            max_tokens: 4000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            stop: ["\"\"\""],
        });
        console.log("PASSED: ", req.body.input);

        res.status(200).send({
            bot: response.data.choices[0].text,
        });

        console.log("PASSED: ", req.body.input);

        res.status(200).send({
            bot: response.data.choices[0].text,
        });

    } catch (error) {
        console.log("FAILED:", req.body.input);
        // console.error(error);
        res.status(500).send(error);
    }
});

app.listen(4000, () => console.log("Server is running on port 4000"));