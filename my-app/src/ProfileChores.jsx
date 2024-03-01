import React from 'react';
import { Box, Typography, IconButton, Paper, Fab } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ProfileSwitch from './ProfileSwitch';
import CircularProgressBar from './CircularProgressBar';
import { useNavigate } from 'react-router-dom'; 

function ProfileChores() {
  // Dummy data for the chores
  const chores = [
    { id: 1, name: 'Make your bed', amount: 5, dueDate: '20-05', status: 'In Progress', statusColor: 'lightgreen' },
    { id: 2, name: 'Take out the trash', amount: 5, dueDate: '21-05', status: 'Awaiting Approval', statusColor: 'green' },
    { id: 2, name: 'Walk the dog', amount: 5, dueDate: '21-05', status: 'Awaiting Approval', statusColor: 'green' },

  ];

    // Dummy data for the selected profile and transactions
    const profile = { name: 'Alice', balance: 50, lifetimeEarnings: 100 }; // Added lifetimeEarnings for demonstration
    const transactions = [
        { id: 1, name: 'Mow the Lawn', amount: 5, type: 'deposit' },
        { id: 2, name: 'Weekly Allowance', amount: 10, type: 'deposit' },
        { id: 3, name: 'Candy Store', amount: -3, type: 'withdrawal' },
        // ... more transactions
    ];

  const handleApproval = (choreId) => {
    // Approval logic here
  };

  const handleRemoval = (choreId) => {
    // Removal logic here
  };

  const navigate = useNavigate(); // Hook for navigation

  const navigateToChoreCreation = () => {
    navigate('/chore-creation'); // Adjust the path as needed
  };

  return (
    <Box sx={{ margin: 2 }}>
        <CircularProgressBar
          size={150}
          thickness={4}
          value={profile.balance}
          maxValue={profile.lifetimeEarnings}
          name={profile.name}
        />
    <ProfileSwitch />
    <Box sx={{ margin: 2, paddingBottom: 10 }}>
      {chores.map((chore) => (
        <Paper key={chore.id} sx={{ display: 'flex',width:'50%', mx: 'auto' , justifyContent: 'space-between', marginY: 1, padding: 2,  }}>
          <Box sx={{ display: 'flex', alignItems: 'center'}}>
            <Box sx={{ bgcolor: 'grey.300', padding: 1, marginRight: 2 }}>
              <Typography sx={{ color: 'pink' }}>${chore.amount}</Typography>
            </Box>
            <Box>
              <Typography variant="body1">{chore.name}</Typography>
              <Typography variant="body2" color="text.secondary">Due: {chore.dueDate}</Typography>
              <Typography variant="body2" sx={{ color: chore.statusColor }}>{chore.status}</Typography>
            </Box>
          </Box>
          <Box>
            <IconButton onClick={() => handleApproval(chore.id)} color="success">
              <CheckCircleOutlineIcon />
            </IconButton>
            <IconButton onClick={() => handleRemoval(chore.id)} color="error">
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        </Paper>
      ))}
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
            <Fab color="primary" aria-label="add" onClick={navigateToChoreCreation}>
            <AddIcon />
            </Fab>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileChores;