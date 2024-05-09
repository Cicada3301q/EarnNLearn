import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Fab,
  Select,
  MenuItem,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ProfileSwitch from "../../components/ProfileSwitch";
import CircularProgressBar from "../../components/CircularProgressBar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ProfileChores() {
  const { childId } = useParams();
  const [chores, setChores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: "Alice",
    balance: 50,
    lifetimeEarnings: 100,
  });

  const navigate = useNavigate();

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
  }, [childId]);

  const removeChore = (choreId) => {
    fetch(`http://localhost:8080/api/chores/delete/${choreId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          const updatedChores = chores.filter(
            (chore) => chore.choreId !== choreId
          );
          setChores(updatedChores);
          toast.success("Chore successfully deleted");
        } else {
          console.error(
            "Failed to delete chore, server responded with:",
            response.status
          );
          response
            .text()
            .then((text) => toast.error(`Failed to delete chore: ${text}`));
        }
      })
      .catch((error) => {
        console.error("Failed to delete chore", error);
        toast.error("Failed to delete chore due to an error: " + error.message);
      });
  };

  const updateChore = async (choreId, status) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/chores/update/${choreId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status }),
        }
      );
      if (response.ok) {
        const updatedChore = await response.json();
        const updatedChores = chores.map((chore) =>
          chore.choreId === choreId
            ? { ...chore, status: updatedChore.status }
            : chore
        );
        setChores(updatedChores);
        toast.success("Chore status updated successfully");
      } else {
        console.error(
          "Failed to update chore, server responded with:",
          response.status
        );
        response
          .text()
          .then((text) => toast.error(`Failed to update chore: ${text}`));
      }
    } catch (error) {
      console.error("Failed to update chore", error);
      toast.error("Failed to update chore due to an error: " + error.message);
    }
  };

  const handleStatusChange = (event, choreId) => {
    const newStatus = event.target.value;
    updateChore(choreId, newStatus);
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
                </Box>
              </Box>
              <Box>
                <Select
                  value={chore.status}
                  onChange={(event) => handleStatusChange(event, chore.choreId)}
                  size="small"
                  sx={{ ml: 1 }}
                >
                  <MenuItem value="COMPLETED">Completed</MenuItem>
                  <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                  <MenuItem value="AWAITING_APPROVAL">
                    Awaiting Approval
                  </MenuItem>
                  <MenuItem value="NOT_ACCEPTED">Not Accepted</MenuItem>
                </Select>
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
