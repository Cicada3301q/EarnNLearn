import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: 'pink',
  },
  backgroundColor: 'white',
  color: 'black',
  "&:hover": {
    backgroundColor: "lightblue",
  }
}));

function ProfileSwitch() {
  const [alignment, setAlignment] = useState('balance');

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <StyledToggleButtonGroup
        size="small"
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <StyledToggleButton value="chores" aria-label="left aligned">
          Chores
        </StyledToggleButton>
        <StyledToggleButton value="balance" aria-label="centered">
          Balance
        </StyledToggleButton>
      </StyledToggleButtonGroup>
    </Box>
  );
}

export default ProfileSwitch;