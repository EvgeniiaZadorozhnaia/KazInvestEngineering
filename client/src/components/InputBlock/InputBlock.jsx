import {
  Input,
  InputAdornment,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";

function InputBlock({
  listening,
  input,
  setInput,
  handleVoiceInput,
  handleSend,
  loading,
  handleKeyDown,
}) {
  return (
    <Box
      sx={{
        marginTop: "var(--margin4)",
        backgroundColor: "var(--secondary)",
        padding: "var(--padding8) var(--padding16)",
        borderRadius: "var(--border)",
        display: "flex",
        alignItems: "center",
        boxShadow: 3,
        maxWidth: 850,
        width: "100%",
      }}>
      <Input
        fullWidth
        disableUnderline
        placeholder={listening ? "I'm listening..." : "Ask whatever you want"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        startAdornment={
          <InputAdornment position="start">
            <IconButton onClick={handleVoiceInput}>
              <MicIcon
                sx={{ color: listening ? "var(--red)" : "var(--white)" }}
              />
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleSend} disabled={loading}>
              {loading ? (
                <CircularProgress size={20} sx={{ color: "var(--white)" }} />
              ) : (
                <SendIcon sx={{ color: "var(--white)" }} />
              )}
            </IconButton>
          </InputAdornment>
        }
        sx={{
          color: "var(--white)",
          input: { color: "var(--white)" },
          width: "100%",
          fontSize: "var(--font)",
        }}
      />
    </Box>
  );
}

export default InputBlock;
