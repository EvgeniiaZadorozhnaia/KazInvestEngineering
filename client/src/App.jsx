import { useState, useEffect } from "react";
import axios from "axios";
const { VITE_API, VITE_BASE_URL } = import.meta.env;

import {
  Box,
  Typography,
  Input,
  IconButton,
  InputAdornment,
  Alert,
  Paper,
  CircularProgress,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";

function App() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSend = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${VITE_BASE_URL}/${VITE_API}`, {
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
      setError("Speech recognition не поддерживается");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ru-RU";

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };

    recognition.onerror = () => {
      setError("Ошибка распознавания речи");
      setListening(false);
    };

    recognition.start();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#083B8B",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        padding: 2,
      }}>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "transparent",
          textAlign: "center",
          maxWidth: 600,
        }}>
        <Typography variant="h5" fontWeight={500} gutterBottom>
          Привет!
        </Typography>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Что ты хочешь узнать?
        </Typography>
        <Typography variant="body1" color="rgba(255,255,255,0.8)" gutterBottom>
          Используй одну из популярных подсказок или задай свой вопрос
        </Typography>
      </Paper>

      <Box
        sx={{
          marginTop: 4,
          backgroundColor: "#0E4BB5",
          padding: "8px 16px",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          boxShadow: 3,
          maxWidth: 600,
          width: "90%",
        }}>
        <Input
          fullWidth
          disableUnderline
          placeholder={listening ? "Слушаю..." : "Спроси что угодно"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <IconButton onClick={handleVoiceInput}>
                <MicIcon sx={{ color: listening ? "#FF5252" : "white" }} />
              </IconButton>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleSend} disabled={loading}>
                {loading ? (
                  <CircularProgress size={20} sx={{ color: "white" }} />
                ) : (
                  <SendIcon sx={{ color: "white" }} />
                )}
              </IconButton>
            </InputAdornment>
          }
          sx={{
            color: "white",
            input: { color: "white" },
            width: "100%",
          }}
        />
      </Box>

      {reply && (
        <Box
          sx={{
            marginTop: 4,
            maxWidth: 600,
            width: "90%",
            backgroundColor: "#0e4bb58f",
            borderRadius: "12px",
            padding: 2,
            color: "white",
            boxShadow: 1,
          }}>
          <Typography variant="body1">{reply}</Typography>
        </Box>
      )}

      {error && (
        <Alert
          severity="error"
          sx={{
            position: "fixed",
            top: 16,
            right: 16,
            zIndex: 9999,
            width: "auto",
          }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}

export default App;
