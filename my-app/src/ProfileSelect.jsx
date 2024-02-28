import React from 'react';
import { Box, Typography, Container, Button, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

function ProfileSelect() {
  // Dummy data for kids' profiles with unique colors
  const profiles = [
    { id: 1, name: 'Alice', color: 'pink' },
    { id: 2, name: 'Bob', color: 'lightblue' },
    { id: 3, name: 'Charlie', color: 'lightgreen' },
  ];

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar
          src="/EarnNLearn.jpg"
          alt="Logo"
          sx={{ width: 100, height: 100, marginBottom: 2 }} // Adjust size as needed
        />
        <Typography component="h1" variant="h4" sx={{ marginBottom: 3 }}>
          Profiles
        </Typography>
        {profiles.map((profile) => (
          <Link key={profile.id} to={`/profile-balance/${profile.id}`} style={{ textDecoration: 'none', width: '100%' }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              padding: 2,
              marginBottom: 1,
              border: '1px solid #ccc',
              borderRadius: '5px',
              height: 60, // Fixed height
              '&:hover': {
                backgroundColor: '#f0f0f0',
                cursor: 'pointer',
              },
            }}>
              <Avatar sx={{ bgcolor: profile.color, marginRight: 2 }} />
              <Typography variant="h6">{profile.name}</Typography>
            </Box>
          </Link>
        ))}
        <Button variant="contained" sx={{ marginTop: 2 }} startIcon={<AddIcon />} component={Link} to="/add-profile">
          Add Profile
        </Button>
      </Box>
    </Container>
  );
}

export default ProfileSelect;