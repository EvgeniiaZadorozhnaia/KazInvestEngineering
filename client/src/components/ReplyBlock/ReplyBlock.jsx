import { Box, Typography } from "@mui/material";

function ReplyBlock({ reply }) {
  if (!reply) return null;

  return (
    <Box
      sx={{
        marginTop: "var(--margin4)",
        maxWidth: 850,
        width: "90%",
        backgroundColor: "var(--third)",
        borderRadius: "var(--border12)",
        padding: "var(--padding8) var(--padding16)",
        color: "var(--white)",
        boxShadow: 1,
      }}>
      <Typography sx={{ fontSize: "var(--font)" }} variant="body1">
        {reply}
      </Typography>
    </Box>
  );
}

export default ReplyBlock;
