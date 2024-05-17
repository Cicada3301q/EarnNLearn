import React, { useState } from "react";
import { Box, TextField, Button, Stack, Avatar, Paper } from "@mui/material";
import { Modal, Title } from "./WithdrawModal.css";
import { toast } from "react-toastify";

function WithdrawCreationModal({ open, handleClose }) {
  const [requestName, setRequestName] = useState("");
  const [requestValue, setRequestValue] = useState(0);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!requestName.trim()) newErrors.requestName = "Request name is required";
    if (requestValue <= 0)
      newErrors.requestValue = "Request value must be greater than zero";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (!validateFields()) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    handleClose();
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3,
          }}
        >
          <Avatar
            src="/EarnNLearn.jpg"
            alt="Logo"
            sx={{ width: 100, height: 100, marginBottom: 2 }}
          />
          <Title>Redeem Request</Title>
          <TextField
            label="Request name"
            variant="outlined"
            value={requestName}
            onChange={(e) => setRequestName(e.target.value)}
            sx={{ mb: 2, width: "40%" }}
            error={!!errors.requestName}
            helperText={errors.requestName}
          />
          <TextField
            label="Request Value"
            variant="outlined"
            type="number"
            value={requestValue}
            onChange={(e) => setRequestValue(parseInt(e.target.value))}
            InputProps={{ inputProps: { min: 0 } }}
            sx={{ mb: 2, width: "40%" }}
            error={!!errors.requestValue}
            helperText={errors.requestValue}
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
      </Paper>
    </Modal>
  );
}

export default WithdrawCreationModal;
