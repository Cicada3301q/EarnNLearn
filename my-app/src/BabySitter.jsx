import React, { useState } from 'react';
import { Box, Typography, IconButton, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ProfileSwitch from './ProfileSwitch';
import CircularProgressBar from './CircularProgressBar';
import MessageIcon from '@mui/icons-material/Message';


function BabySitter() {
  // State for the feedback dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [selectedChoreId, setSelectedChoreId] = useState(null);

  // Dummy data for the chores
  const chores = [
    { id: 1, name: 'Make your bed', amount: 5, dueDate: '20-05', status: 'In Progress', statusColor: 'lightgreen' },
    { id: 2, name: 'Take out the trash', amount: 5, dueDate: '21-05', status: 'Awaiting Approval', statusColor: 'green' },
    { id: 2, name: 'Walk the dog', amount: 5, dueDate: '21-05', status: 'Awaiting Approval', statusColor: 'green' },
  ];

  // Dummy data for the selected profile
  const profile = { name: 'Alice', balance: 50, lifetimeEarnings: 100 };

  const handleApproval = (choreId) => {
    // Approval logic here
  };

  const handleOpenDialog = (choreId) => {
    setOpenDialog(true);
    setSelectedChoreId(choreId);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFeedback('');
  };

  const handleSubmitFeedback = () => {
    console.log(`Feedback for chore ${selectedChoreId}: ${feedback}`);
    // Submit feedback logic here
    handleCloseDialog();
  };

  const handleStatusChange = (event, choreId) => {
    // Update chore status logic here
    console.log(`Status for chore ${choreId}: ${event.target.value}`);
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
      {/* <ProfileSwitch /> */}
      <Box sx={{ margin: 2, paddingBottom: 10 }}>
        {chores.map((chore) => (
          <Paper key={chore.id} sx={{ display: 'flex', width: '50%', mx: 'auto', justifyContent: 'space-between', marginY: 1, padding: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
              <IconButton onClick={() => handleOpenDialog(chore.id)} color="primary">
                <MessageIcon />
              </IconButton>
              <Select
                value={chore.status}
                onChange={(event) => handleStatusChange(event, chore.id)}
                size="small"
                sx={{ ml: 1 }}
              >
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Awaiting Approval">Awaiting Approval</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Feedback Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Chore Feedback</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="feedback"
            label="Feedback"
            type="text"
            fullWidth
            variant="standard"
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmitFeedback}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default BabySitter;