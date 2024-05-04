import React, { useState } from "react";
import { Typography, TextField, Button, Stack, Avatar } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { useParams } from "react-router-dom";

function ChoreCreation() {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [choreName, setChoreName] = useState("");
  const [choreValue, setChoreValue] = useState(3);
  const [dueDate, setDueDate] = useState(null);

  const handleCreate = () => {
    if (choreName && choreValue && dueDate && childId) {
      // Ensure all fields are filled
      const choreData = {
        title: choreName,
        amount: choreValue,
        dueDate: "2024-05-10T00:00:00.000Z", //dueDate.toISOString().split("T")[0] date is not working
        status: "COMPLETED", //get status
        childUserId: childId, // Include the childId in the chore data
      };

      fetch("http://localhost:8080/api/chores/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(choreData),
      }).then((response) => {
        if (response.ok) {
          // Handle success, maybe navigate back or show a success message
          console.log(choreData);
          navigate(`/profile-chores/${childId}`);
        } else {
          // Handle errors, such as displaying a message to the user
          console.error("Failed to create chore");
          console.log(choreData);
        }
      });
    } else {
      console.log("All fields are required.");
    }
  };

  const handleCancel = () => {
    // Navigate back to ProfileChores page
    navigate("/profile-chores/1");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <PageWrapper>
        <Avatar
          src="/EarnNLearn.jpg"
          alt="Logo"
          sx={{ width: 100, height: 100, marginBottom: 2 }} // Adjust size as needed
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
          onChange={(e) => setChoreValue(parseInt(e.target.value, 10) || 0)} // Convert to integer, default to 0 if conversion fails
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
      </PageWrapper>
    </LocalizationProvider>
  );
}

export default ChoreCreation;
