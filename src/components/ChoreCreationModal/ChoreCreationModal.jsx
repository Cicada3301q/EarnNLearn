import React, { useState } from "react";
import { Box, TextField, Button, Stack, Avatar, Paper } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { CHORE_STATUS } from "../../constants/enums";
import * as S from "./ChoreCreationModal.css";

function ChoreCreationModal({ open, handleClose, handleCreate, childId }) {
  const [choreName, setChoreName] = useState("");
  const [choreValue, setChoreValue] = useState(0);
  const [dueDate, setDueDate] = useState(null);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!choreName.trim()) newErrors.choreName = "Chore name is required";
    if (choreValue <= 0)
      newErrors.choreValue = "Chore value must be greater than zero";
    if (!dueDate) newErrors.dueDate = "Due date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateClick = () => {
    if (!validateFields()) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    const choreData = {
      title: choreName,
      amount: choreValue,
      dueDate: dueDate.toISOString(),
      status: CHORE_STATUS.NOT_ACCEPTED,
      childUserId: childId,
    };

    handleCreate(choreData);
  };

  return (
    <S.Modal open={open} onClose={handleClose}>
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
          <S.Title>Chore Creation</S.Title>
          <TextField
            label="Chore name"
            variant="outlined"
            value={choreName}
            onChange={(e) => setChoreName(e.target.value)}
            sx={{ mb: 2, width: "40%" }}
            error={!!errors.choreName}
            helperText={errors.choreName}
          />
          <TextField
            label="Chore Value"
            variant="outlined"
            type="number"
            value={choreValue}
            onChange={(e) => setChoreValue(parseInt(e.target.value))}
            InputProps={{ inputProps: { min: 0 } }}
            sx={{ mb: 2, width: "40%" }}
            error={!!errors.choreValue}
            helperText={errors.choreValue}
          />
          <DatePicker
            label="Due Date"
            value={dueDate}
            onChange={(newValue) => setDueDate(newValue)}
            renderInput={(params) => (
              <TextField {...params} sx={{ mb: 2, width: "100%" }} />
            )}
            minDate={dayjs()}
            error={!!errors.dueDate}
            helperText={errors.dueDate}
          />
          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 4, width: "100%", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateClick}
            >
              Create
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Paper>
    </S.Modal>
  );
}

export default ChoreCreationModal;
