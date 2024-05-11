import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  InputLabel,
} from "@mui/material";
import { callApi } from "../../utils/api.util";
import { METHOD } from "../../constants/enums";
import PageWrapper from "../../components/PageWrapper";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const requestBody = {
      firstName: "joe",
      lastName: "dirt",
      email: email,
      password: password,
    };

    await callApi("/api/user/register-parent", METHOD.POST, requestBody);

    console.log(email, password);
  };

  return (
    <PageWrapper>
      <div className="coinsContainer"></div>
      <Avatar
        src="/EarnNLearn.jpg"
        alt="Logo"
        sx={{ width: 100, height: 100, marginBottom: 2 }} // Adjust size as needed
      />
      <Typography
        component="h1"
        variant="h5"
        sx={{ marginBottom: 2, color: "hotpink" }}
      >
        EarnNLearn
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} className="form">
        <InputLabel htmlFor="email">Email</InputLabel>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="textField"
        />
        <InputLabel htmlFor="password">Password</InputLabel>
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label=""
          type="password"
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="textField"
        />
        <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label=""
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="textField"
        />
        <Typography className="accountPrompt">
          Already have an account?{" "}
          <Link to="/login" className="linkText">
            Login.
          </Link>
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="signInButton"
          sx={{ mt: 3, mb: 2, backgroundColor: "#0D99FF" }}
        >
          Register
        </Button>
      </Box>
    </PageWrapper>
  );
}

export default Register;
