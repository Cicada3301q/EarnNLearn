import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  InputLabel,
} from "@mui/material";
// import './LoginStyles.css';
// TODO Extract coin animation, and fix 30, 70% over population

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const container = document.querySelector(".coinsContainer");
    const createCoin = () => {
      const coin = document.createElement("div");
      coin.classList.add("coin");

      // Calculate a random position, avoiding the middle 40% of the page
      //need to change this so it randomly distributes the coins that fall within the middle 40% of the page/
      const position = Math.random() * 100;
      if (position > 30 && position < 70) {
        //math.random between 0-30 and 70-100
        coin.style.left =
          position < 50
            ? `${math.random() * 30}vw`
            : `${math.floor(70 + math.random() * 30)}vw`;
      } else {
        coin.style.left = position + "vw";
      }

      coin.style.animationDuration = Math.random() * 3 + 2 + "s"; // Randomize duration
      container.appendChild(coin);

      // Remove coin after animation ends
      coin.addEventListener("animationend", () => {
        coin.remove();
      });
    };

    // Create a new coin every 300 milliseconds
    const interval = setInterval(createCoin, 200);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

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

    await fetch("http://localhost:8080/api/user/register-parent", {
      method: "POST", // Corrected to 'POST' instead of 'post'
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify(requestBody), // Convert object to JSON string
    });

    console.log(email, password);
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
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          className="form"
        >
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
      </Box>
    </Container>
  );
}

export default Register;
