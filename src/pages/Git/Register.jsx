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
import { toast } from "react-toastify";
import { callApi } from "../../utils/api.util";
import { HTTP_METHOD } from "../../constants/enums";
import PageWrapper from "../../components/PageWrapper";

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({}); // To track validation errors

  const validateFields = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirming the password is required";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate input fields before processing the registration
    if (!validateFields()) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    const requestBody = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    try {
      const response = await callApi(
        "/api/user/register-parent",
        HTTP_METHOD.POST,
        requestBody
      );
      if (response.ok) {
        toast.success("Parent registered successfully!");
        navigate("/login");
      } else {
        const errorMsg = await response.text();
        toast.error(`Oopsie, Failed to register account`);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Oopsie, Failed to register account");
    }
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
        <InputLabel htmlFor="firstName">First Name</InputLabel>
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstName"
          name="firstName"
          autoComplete="given-name"
          autoFocus
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="textField"
          placeholder="Enter your first name"
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <InputLabel htmlFor="lastName">Last Name</InputLabel>
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastName"
          name="lastName"
          autoComplete="family-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="textField"
          placeholder="Enter your last name"
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
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
          placeholder="Enter your email"
          error={!!errors.email}
          helperText={errors.email}
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
          placeholder="Enter your password"
          error={!!errors.password}
          helperText={errors.password}
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
          placeholder="Confirm your password"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
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
