import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  InputLabel,
} from "@mui/material";
import { METHOD, ROLE } from "../../constants/enums";
import PageWrapper from "../../components/PageWrapper";
import { toast } from "react-toastify";
import { useMutation } from "../../hooks/useMutation";
import { useAuth } from "../../hooks/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { addUser } = useAuth();
  const { mutate: login, isError } = useMutation();

  const handleLogin = (event) => {
    event.preventDefault();
    const requestBody = {
      email,
      password,
    };

    login({
      route: "user/login/",
      method: METHOD.POST,
      body: requestBody,
      options: {
        onSuccess: (response) => {
          const user = response.returnedUser;
          addUser(user);

          if (user.role === ROLE.PARENT) {
            navigate("/profiles");
          } else {
            navigate(`/profile-chores/${user.id}`);
          }
        },
        onError: (_) => {
          toast.error("Invalid credentials");
        },
      },
    });
  };

  return (
    <PageWrapper>
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
          error={isError}
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
          error={isError}
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
          onClick={(e) => handleLogin(e)}
        >
          Sign In
        </Button>
      </Box>
    </PageWrapper>
  );
}

export default Login;
