import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { TextField, Avatar, InputLabel } from "@mui/material";
import { METHOD, ROLE } from "../../constants/enums";
import PageWrapper from "../../components/PageWrapper";
import { toast } from "react-toastify";
import { useMutation } from "../../hooks/useMutation";
import { useAuth } from "../../hooks/useAuth";
import * as S from "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { addUser, isAuth } = useAuth();
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

  if (isAuth) {
    return <Navigate to="/profiles" />;
  }

  return (
    <PageWrapper>
      <Avatar
        src="/EarnNLearn.jpg"
        alt="Logo"
        sx={{ width: 100, height: 100, marginBottom: 2 }} // Adjust size as needed
      />
      <S.Title>EarnNLearn</S.Title>
      <S.Form>
        <InputLabel>Email</InputLabel>
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={isError}
          helperText={isError && "Email or password is incorrect."}
        />
        <S.RegisterText>
          Don't have an account?
          <Link to="/register" className="linkText">
            Register.
          </Link>
        </S.RegisterText>
        <S.LoginButton
          type="submit"
          fullWidth
          variant="contained"
          onClick={(e) => handleLogin(e)}
        >
          Sign In
        </S.LoginButton>
      </S.Form>
    </PageWrapper>
  );
}

export default Login;
