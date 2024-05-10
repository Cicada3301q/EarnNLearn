import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { callApi } from "../../utils/api.util";
import { METHOD } from "../../constants/enums";

function ChoreCreation() {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [choreName, setChoreName] = useState("");
  const [choreValue, setChoreValue] = useState(0);
  const [dueDate, setDueDate] = useState(null);

  const handleCreate = async () => {
    if (choreName && choreValue && dueDate && childId) {
      const choreData = {
        title: choreName,
        amount: choreValue,
        dueDate: dueDate.toISOString(),
        status: "NOT_ACCEPTED",
        childUserId: childId,
      };

      const response = await callApi(
        "/api/chores/create",
        METHOD.POST,
        choreData
      );

      if (response && response.ok) {
        toast.success("Chore created successfully!");
        navigate(`/profile-chores/${childId}`);
      } else {
        const text = await response.text();
        toast.error(`Failed to create chore: ${text}`);
      }
    } else {
      toast.error("All fields are required.");
    }
  };

  const handleCancel = () => {
    navigate(`/profile-chores/${childId}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        <Typography variant="h4" component="h1" sx={{ color: "pink", mb: 4 }}>
          Chore Creation
        </Typography>
        <TextField
          label="Chore name"
          variant="outlined"
          value={choreName}
          onChange={(e) => setChoreName(e.target.value)}
          sx={{ mb: 2, width: "40%" }}
        />
        <TextField
          label="Chore Value"
          variant="outlined"
          type="number"
          value={choreValue}
          onChange={(e) => setChoreValue(parseInt(e.target.value))}
          InputProps={{ inputProps: { min: 0 } }}
          sx={{ mb: 2, width: "40%" }}
        />
        <DatePicker
          label="Due Date"
          value={dueDate}
          onChange={(newValue) => setDueDate(newValue)}
          renderInput={(params) => (
            <TextField {...params} sx={{ mb: 2, width: "100%" }} />
          )}
          minDate={dayjs()}
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
    </LocalizationProvider>
  );
}

export default ChoreCreation;
