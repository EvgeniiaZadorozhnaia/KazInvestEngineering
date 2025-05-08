import React from "react";
import styles from "./Header.module.css";
import { Typography } from "@mui/material";

const Header = () => (
  <div className={styles.header}>
    <Typography variant="h5" fontWeight={500} gutterBottom>
      Привет!
    </Typography>
    <Typography variant="h4" fontWeight="bold" gutterBottom>
      Что ты хочешь узнать?
    </Typography>
    <Typography variant="body1" sx={{ opacity: 0.8 }} gutterBottom>
      Используй одну из популярных подсказок или задай свой вопрос
    </Typography>
  </div>
);

export default Header;
