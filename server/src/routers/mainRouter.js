const router = require("express").Router();
const OpenAI = require("openai");
const { KEY } = process.env;

const client = new OpenAI({ apiKey: KEY });

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Введите сообщение" });
  }

  try {
    const response = await client.responses.create({
      model: "gpt-3.5-turbo-0125",
      input: message,
    });
    res.json({ reply: response.output_text });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обращении к OpenAI API" });
  }
});

module.exports = router;
