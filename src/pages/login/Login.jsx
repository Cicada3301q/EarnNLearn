import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  InputLabel,
} from "@mui/material";
import "./LoginStyles.css";
import { callApi } from "../../utils/api.util";
import { METHOD } from "../../constants/enums";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestBody = {
      email,
      password,
    };

    try {
      const response = await callApi(
        "/api/user/login",
        METHOD.POST,
        requestBody
      );

      const data = await response.json();

      if (response.ok) {
        navigate("/profiles");
      }
    } catch (error) {
      alert("failed to login, sorry", error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
        <Box component="form" noValidate className="form">
          <InputLabel htmlFor="email">Email</InputLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            className="textField"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputLabel htmlFor="password">Password</InputLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            className="textField"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography className="accountPrompt">
            Don't have an account?{" "}
            <Link to="/register" className="linkText">
              Register.
            </Link>
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="signInButton"
            sx={{ mt: 3, mb: 2, backgroundColor: "#0D99FF" }}
            onClick={(e) => handleSubmit(e)}
          >
            Sign In
          </Button>
          {/*route to the Profiles page for testing */}
          <Button
            component={Link}
            to="/profiles"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Go to Profiles
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
