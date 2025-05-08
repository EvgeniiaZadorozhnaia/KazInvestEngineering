import { useState, useEffect } from "react";
import axios from "axios";
const { VITE_BASE_URL } = import.meta.env;
import { Box } from "@mui/material";
import Header from "./components/Header/Header";
import InputBlock from "./components/InputBlock/InputBlock";
import ReplyBlock from "./components/ReplyBlock/ReplyBlock";
import ErrorAlert from "./components/ErrorAlert/ErrorAlert";

function App() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSend = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${VITE_BASE_URL}`, {
        message: input,
      });
      setReply(res.data.reply);
    } catch (err) {
      setError(err.response.data.error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech recognition is not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-En";

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };

    recognition.onerror = () => {
      setError("Speech recognition error");
      setListening(false);
    };

    recognition.start();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Box className="container">
      <Header />
      <InputBlock
        listening={listening}
        input={input}
        setInput={setInput}
        handleVoiceInput={handleVoiceInput}
        handleSend={handleSend}
        loading={loading}
        handleKeyDown={handleKeyDown}
      />
      {reply && <ReplyBlock reply={reply} />}
      {error && <ErrorAlert error={error} />}
    </Box>
  );
}

export default App;
