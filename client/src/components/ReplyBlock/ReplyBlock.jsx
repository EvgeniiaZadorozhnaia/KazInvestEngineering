import { Box, Typography } from "@mui/material";
import styles from "./ReplyBlock.module.css";

const ReplyBlock = ({ reply }) => {
  if (!reply) return null;

  return (
    <Box className={styles.replyContainer}>
      <Typography variant="body1">{reply}</Typography>
    </Box>
  );
};

export default ReplyBlock;
