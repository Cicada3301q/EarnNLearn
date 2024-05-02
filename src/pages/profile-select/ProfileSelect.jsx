import React, { useEffect, useState } from "react";
import { Box, Typography, Container, Button, Avatar, Card, CardContent} from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

function ProfileSelect() {
  // Dummy data for kids' profiles with unique colors
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  // Array of colors for avatars
  const colors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', 
    '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', 
    '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', 
    '#ff5722', '#795548', '#607d8b'
  ];

  useEffect(() => {
    const fetchChildren = async () => {
      const response = await fetch('http://localhost:8080/api/user/children', {
        method: 'GET',
        credentials: 'include' // Necessary to send cookies with the request
      });

      if (response.ok) {
        const data = await response.json();
        setChildren(data);
      } else {
        console.error("Failed to fetch children");
      }

      setLoading(false);
    };

    fetchChildren();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (children.length === 0) {
    return <Typography>No children found.</Typography>;
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar
          src="/EarnNLearn.jpg"
          alt="Logo"
          sx={{ width: 100, height: 100, marginBottom: 2 }}
        />
        <Typography component="h1" variant="h4" sx={{ marginBottom: 3 }}>
          Profiles
        </Typography>
        {children.map((child, index) => (
        <Link key={child.id} to={`/profile-balance/${child.id}`} style={{ textDecoration: 'none', width: '100%' }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            padding: 2,
            marginBottom: 1,
            border: '1px solid #ccc',
            borderRadius: '5px',
            height: 60, 
            '&:hover': {
              backgroundColor: '#f0f0f0',
              cursor: 'pointer',
            },
          }}>
            <Avatar sx={{ marginRight: 2, backgroundColor: colors[index % colors.length] }} />
            <Typography variant="h6">{child.firstName} {child.lastName}</Typography>
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