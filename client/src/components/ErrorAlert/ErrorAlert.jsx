import { Alert } from "@mui/material";

function ErrorAlert({ error }) {
  if (!error) return null;

  return (
    <Alert
      severity="error"
      sx={{
        position: "fixed",
        top: "var(--margin16)",
        right: "var(--margin16)",
        zIndex: 9999,
        width: "auto",
      }}>
      {error}
    </Alert>
  );
}

export default ErrorAlert;
