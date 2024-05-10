import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

function CircularProgressBar(props) {
  const { size, thickness, value, maxValue } = props;
  const [animatedValue, setAnimatedValue] = useState(0);

  const normalise = (value) => (value * 100) / maxValue;

  useEffect(() => {
    const animate = () => {
      if (animatedValue < normalise(value)) {
        setAnimatedValue(animatedValue + 1);
      }
    };

    let timer = setInterval(() => {
      animate();
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, [animatedValue]);

  return (
    <Box
      position="relative"
      display="inline-flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress
        variant="determinate"
        value={100} // Full circle
        size={size}
        thickness={thickness}
        sx={{
          color: "grey.300",
        }}
      />
      <CircularProgress
        variant="determinate"
        value={animatedValue}
        size={size}
        thickness={thickness}
        sx={{
          color: "green",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h5" component="div" color="text.primary">
          {props.name}
        </Typography>
        <Typography variant="h6" component="div" color="text.primary">
          ${props.value.toFixed(2)}
        </Typography>
        <Typography variant="body2" component="div" color="text.secondary">
          {Math.round(normalise(value))}% spent
        </Typography>
      </Box>
    </Box>
  );
}

// Usage example:
function ProfileBalance() {
  // Assuming the child has $32 out of a total lifetime earnings of $45.71
  const currentBalance = 32;
  const lifetimeEarnings = 45.71;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <CircularProgressBar
        size={150}
        thickness={4}
        value={currentBalance}
        maxValue={lifetimeEarnings}
        name="Alice"
      />
    </Box>
  );
}

export default ProfileBalance;
