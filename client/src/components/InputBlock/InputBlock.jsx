import {
  Box,
  IconButton,
  InputAdornment,
  CircularProgress,
  InputBase,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import styles from "./InputBlock.module.css";

const InputBlock = ({
  input,
  setInput,
  onSend,
  onVoice,
  loading,
  listening,
}) => (
  <Box className={styles.inputContainer}>
    <InputBase
      fullWidth
      placeholder={listening ? "Слушаю..." : "Спроси что угодно"}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      startAdornment={
        <InputAdornment position="start">
          <IconButton onClick={onVoice}>
            <MicIcon style={{ color: listening ? "#FF5252" : "white" }} />
          </IconButton>
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <IconButton onClick={onSend} disabled={loading}>
            {loading ? (
              <CircularProgress size={20} sx={{ color: "white" }} />
            ) : (
              <SendIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </InputAdornment>
      }
      className={styles.input}
    />
  </Box>
);

export default InputBlock;
