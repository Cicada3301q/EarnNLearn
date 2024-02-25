import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Avatar, InputLabel} from '@mui/material';
import { lightBlue, red } from '@mui/material/colors';
import './LoginStyles.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle login logic here
      console.log(email, password);
    };
  
    return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Avatar
          src="/EarnNLearn.jpg"
          alt="Logo"
          sx={{ width: 100, height: 100, marginBottom: 2 }} // Adjust size as needed
        />
          <Typography component="h1" variant="h5" sx={{ color: 'hotpink' }}>
            EarnNLearn
          </Typography>
          <Box component="form" noValidate className="form">
          <InputLabel htmlFor="username">Username</InputLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            name="username"
            autoComplete="username"
            autoFocus
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
            autoComplete="current-password"
            className="textField"
          />
          <Typography className="accountPrompt">
            Don't have an account?{' '}
            <span className="linkText">Register.</span>
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="signInButton"
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
    );
  }
  

  export default Login;