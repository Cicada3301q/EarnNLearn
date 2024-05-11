import React, { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  InputLabel,
  Stack,
} from "@mui/material";

function ProfileCreation() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // State to track validation errors

  // Function to validate all input fields
  const validateFields = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleCreate = () => {
    // Validate input fields before processing the creation
    if (!validateFields()) {
      return;
    }

    // Proceed with user creation if validation passes
    console.log({
      firstName,
      lastName,
      email,
      password,
    });
    // Navigate back to ProfileChores page after creation
    navigate("/profiles");
  };

  const handleCancel = () => {
    // Navigate back to ProfileChores page
    navigate("/profiles");
  };

  return (
    <PageWrapper>
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
          sx={{ width: 100, height: 100, marginBottom: 2 }}
        />
        <Typography
          component="h1"
          variant="h5"
          sx={{ marginBottom: 2, color: "hotpink" }}
        >
          Add Child
        </Typography>
        <Box component="form" noValidate className="form">
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
            placeholder="Enter child's first name"
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
            placeholder="Enter child's last name"
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="textField"
            placeholder="Enter child's email"
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="textField"
            placeholder="New password for child"
            error={!!errors.password}
            helperText={errors.password}
          />
          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 4, width: "100%", justifyContent: "center" }}
          >
            <Button variant="contained" color="primary" onClick={handleCreate}>
              Create
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Box>
    </PageWrapper>
  );
}

export default ProfileCreation;
