require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post("/generate", async (req, res) => {

    try {

        const prompt = req.body.prompt;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        res.json(data);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Server Error"
        });

    }

});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});