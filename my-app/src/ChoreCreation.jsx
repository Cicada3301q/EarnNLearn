import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack, Avatar, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from 'react-router-dom';

function ChoreCreation() {
  const navigate = useNavigate();
  const [choreName, setChoreName] = useState('');
  const [choreValue, setChoreValue] = useState('');
  const [dueDate, setDueDate] = useState(null);

  const handleCreate = () => {
    // Validation and creation logic goes here
    console.log({
      choreName,
      choreValue,
      dueDate: dueDate ? dueDate.toISOString().split('T')[0] : '', // Format date as YYYY-MM-DD
    });
    // Navigate back to ProfileChores page after creation
    navigate('/profile-chores/1');
  };

  const handleCancel = () => {
    // Navigate back to ProfileChores page
    navigate('/profile-chores/1');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
        <Avatar
          src="/EarnNLearn.jpg"
          alt="Logo"
          sx={{ width: 100, height: 100, marginBottom: 2 }} // Adjust size as needed
        />
        <Typography variant="h4" component="h1" sx={{ color: 'pink', mb: 4 }}>
          Chore Creation
        </Typography>
        <TextField
          label="Chore name"
          variant="outlined"
          value={choreName}
          onChange={(e) => setChoreName(e.target.value)}
          sx={{ mb: 2, width: '40%' }}
        />
        <TextField
          label="Chore Value"
          variant="outlined"
          type="number"
          value={choreValue}
          onChange={(e) => setChoreValue(e.target.value)}
          InputProps={{ inputProps: { min: 0 } }}
          sx={{ mb: 2, width: '40%' }}
        />
        <DatePicker
          label="Due Date"
          value={dueDate}
          onChange={(newValue) => setDueDate(newValue)}
          renderInput={(params) => <TextField {...params} sx={{ mb: 2, width: '100%' }} />}
        />
        <Stack direction="row" spacing={2} sx={{ mt: 4, width: '100%', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Create
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}

export default ChoreCreation;