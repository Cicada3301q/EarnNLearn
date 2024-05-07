import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Paper, Fab } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ProfileSwitch from "../../components/profile-switch/ProfileSwitch";
import CircularProgressBar from "../../components/component-progress-bar/CircularProgressBar";
import { useNavigate, useParams } from "react-router-dom";

function ProfileChores() {
  const { childId } = useParams();
  const [chores, setChores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: "Alice",
    balance: 50,
    lifetimeEarnings: 100,
  });

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetch(`http://localhost:8080/api/chores/child/${childId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setChores(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch chores", error);
        setLoading(false);
      });
  }, []);

  const removeChore = (choreId) => {
    fetch(`http://localhost:8080/api/chores/delete/${choreId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          // Update the local state to reflect the deletion
          const updatedChores = chores.filter(
            (chore) => chore.choreId !== choreId
          );
          setChores(updatedChores);
          alert("Chore successfully deleted"); // use toast here? alert is kinda basic
        } else {
          // Handle different server responses if the operation failed
          console.error(
            "Failed to delete chore, server responded with:",
            response.status
          );
          response
            .text()
            .then((text) => alert(`Failed to delete chore: ${text}`));
        }
      })
      .catch((error) => {
        console.error("Failed to delete chore", error);
        alert("Failed to delete chore due to an error: " + error.message);
      });
  };
  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  const navigateToChoreCreation = () => {
    navigate(`/create-chore/${childId}`);
  };

  return (
    <div>
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
            <Paper
              key={chore.choreId}
              sx={{
                display: "flex",
                width: "60%",
                mx: "auto",
                justifyContent: "space-between",
                marginY: 1,
                padding: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ bgcolor: "grey.300", padding: 1, marginRight: 2 }}>
                  <Typography sx={{ color: "pink" }}>
                    ${chore.amount}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1">{chore.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Due: {chore.dueDate.split("T")[0]}
                  </Typography>
                  <Typography variant="body2" sx={{ color: chore.statusColor }}>
                    {chore.status}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <IconButton
                  onClick={() => console.log("Approval clicked")} // Replace with actual function
                  color="success"
                >
                  <CheckCircleOutlineIcon />
                </IconButton>
                <IconButton
                  onClick={() => removeChore(chore.choreId)}
                  color="error"
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
            </Paper>
          ))}
          <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
            <Fab
              color="primary"
              aria-label="add"
              onClick={navigateToChoreCreation}
            >
              <AddIcon />
            </Fab>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default ProfileChores;
