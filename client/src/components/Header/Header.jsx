import React from "react";
import { Typography, Paper } from "@mui/material";

const Header = () => (
  <>
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        textAlign: "left",
      }}>
      <Typography
        variant="h3"
        fontWeight={500}
        color="var(--white)"
        gutterBottom>
        Hi there!
      </Typography>
      <Typography
        variant="h2"
        fontWeight="bold"
        color="var(--white)"
        gutterBottom>
        What would you like to know?
      </Typography>
      <Typography
        color="var(--gray)"
        gutterBottom
        sx={{ fontSize: "var(--font)" }}>
        Use one of the most common prompts below <br />
        or ask your own question
      </Typography>
    </Paper>
  </>
);

export default Header;
