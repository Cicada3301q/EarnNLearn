import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  InputLabel,
} from "@mui/material";
import { callApi } from "../../utils/api.util";
import { METHOD, ROLE } from "../../constants/enums";
import { getCookie } from "../../utils/auth.util";
import PageWrapper from "../../components/PageWrapper";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = getCookie("jwt");

    const getUser = async () => {
      const response = await callApi("/api/user", METHOD.GET);
      const data = await response.json();
      const user = data;
      if (user.role === ROLE.PARENT) {
        navigate("/profiles");
      } else {
        navigate(`/profile-chores/${user.id}`);
      }
    };

    if (isAuth) {
      getUser();
    }
  }, []);

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
      const user = data.returnedUser;

      if (user.role === ROLE.PARENT) {
        navigate("/profiles");
      } else {
        navigate(`/profile-chores/${user.id}`);
      }
    } catch (error) {
      toast.error("Email or Password is incorrect");
    }
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
      </Box>
    </PageWrapper>
  );
}

export default Login;
