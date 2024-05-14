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
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { callApi } from "../../utils/api.util";
import { METHOD } from "../../constants/enums";
import { useQuery } from "../../hooks/useQuery";
import PageWrapper from "../../components/PageWrapper";
import { useMutation } from "../../hooks/useMutation";

function ProfileChores() {
  const navigate = useNavigate();
  const location = useLocation();
  const [chores, setChores] = useState([]);
  const [totalChoreCount, setTotalChoreCount] = useState(0);
  const [completedChoreCount, setCompletedChoreCount] = useState(0);
  const { mutate: deleteChore } = useMutation();
  const { mutate: changeChoreStatus } = useMutation();
  const { child } = location.state;
  const { id, firstName } = child;

  const {
    data: choreData,
    isLoading: choresLoading,
    isError: choresError,
  } = useQuery(`chores/child/${id}`);

  useEffect(() => {
    if (choreData) {
      setChores(choreData.chores);
      setTotalChoreCount(choreData.totalChores);
      setCompletedChoreCount(choreData.completedChores);
    }
  }, [choreData]);

  if (choresError) {
    toast.error("Failed to load chores");
  }

  const removeChore = (choreId) => {
    deleteChore({
      route: `chores/delete/${choreId}`,
      method: METHOD.DELETE,
      options: {
        onSuccess: () => {
          const updatedChores = chores.filter((chore) => chore.id === choreId);
          setChores(updatedChores);
          toast.success("Chore successfully deleted");
        },
        onError: () => {
          toast.error("Failed to delete chore.");
        },
      },
    });
  };

  const handleStatusChange = (event, choreId) => {
    const newStatus = event.target.value;
    changeChoreStatus({
      route: `chores/update/${choreId}`,
      method: METHOD.PUT,
      body: {
        status: newStatus,
      },
      options: {
        onSuccess: () => {
          const updatedChores = chores.map((chore) => ({
            ...chore,
            status: newStatus,
          }));
          console.log(updatedChores);
          setChores(updatedChores);

          toast.success("Chore status updated successfully");
        },
        onError: () => {
          toast.error("Failed to update chore.");
        },
      },
    });
  };

  if (choresLoading) {
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
        value={completedChoreCount}
        maxValue={totalChoreCount}
        name={firstName}
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
