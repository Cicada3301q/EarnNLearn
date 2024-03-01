import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack, Avatar} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function RedeemRequest() {
  const navigate = useNavigate();
  const [requestName, setRequestName] = useState('');
  const [requestValue, setRequestValue] = useState('');

  const handleCreate = () => {
    // Validation and creation logic goes here
    console.log({
      requestName,
      requestValue,
    });
    // Navigate back to ProfileBalance page after creation
    navigate('/profile-balace/1');
  };

  const handleCancel = () => {
    // Navigate back to ProfileBalance page
    navigate('/profile-balance/1');
  };

  return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
        <Avatar
          src="/EarnNLearn.jpg"
          alt="Logo"
          sx={{ width: 100, height: 100, marginBottom: 2 }} // Adjust size as needed
        />
        <Typography variant="h4" component="h1" sx={{ color: 'pink', mb: 4 }}>
          Redeem Request
        </Typography>
        <TextField
          label="Request name"
          variant="outlined"
          value={requestName}
          onChange={(e) => setRequestName(e.target.value)}
          sx={{ mb: 2, width: '30%' }}
        />
        <TextField
          label="Request Value"
          variant="outlined"
          type="number"
          value={requestValue}
          onChange={(e) => setRequestValue(e.target.value)}
          InputProps={{ inputProps: { min: 0 } }}
          sx={{ mb: 2, width: '30%' }}
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
  );
}

export default RedeemRequest;