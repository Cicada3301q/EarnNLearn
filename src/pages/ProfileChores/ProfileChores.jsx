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
import { callApi } from "../../utils/api.util";
import { METHOD } from "../../constants/enums";
import PageWrapper from "../../components/PageWrapper";

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
    const fetchChores = async () => {
      setLoading(true);
      try {
        const response = await callApi(
          `/api/chores/child/${childId}`,
          METHOD.GET
        );
        if (response.ok) {
          const data = await response.json();
          setChores(data);
        } else {
          toast.error("Failed to fetch chores.");
        }
      } catch (error) {
        console.error("Failed to fetch chores", error);
        toast.error("Failed to fetch chores due to an error: " + error.message);
      }
      setLoading(false);
    };
    fetchChores();
  }, [childId]);

  const removeChore = async (choreId) => {
    try {
      const response = await callApi(
        `/api/chores/delete/${choreId}`,
        METHOD.DELETE
      );
      if (response.ok) {
        const updatedChores = chores.filter(
          (chore) => chore.choreId !== choreId
        );
        setChores(updatedChores);
        toast.success("Chore successfully deleted");
      } else {
        toast.error("Failed to delete chore.");
      }
    } catch (error) {
      console.error("Failed to delete chore", error);
      toast.error("Failed to delete chore due to an error: " + error.message);
    }
  };

  const updateChore = async (choreId, status) => {
    try {
      const response = await callApi(
        `/api/chores/update/${choreId}`,
        METHOD.PUT,
        {
          status,
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
        toast.error("Failed to update chore.");
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
    <PageWrapper>
      <CircularProgressBar
        size={150}
        thickness={4}
        value={profile.balance}
        maxValue={profile.lifetimeEarnings}
        name={profile.name}
        isChore={true}
      />
      <ProfileSwitch />
      <Box sx={{ paddingBottom: 10 }}>
        {chores.map((chore) => (
          <Paper
            key={chore.choreId}
            sx={{
              display: "flex",
              width: "100%",
              mx: "auto",
              justifyContent: "space-between",
              marginY: 1,
              padding: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ bgcolor: "grey.300", padding: 1, marginRight: 2 }}>
                <Typography sx={{ color: "pink" }}>${chore.amount}</Typography>
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
                <MenuItem value="AWAITING_APPROVAL">Awaiting Approval</MenuItem>
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
    </PageWrapper>
  );
}

export default ProfileChores;
