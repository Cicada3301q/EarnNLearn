import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Fab,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ProfileSwitch from "../../components/ProfileSwitch";
import CircularProgressBar from "../../components/CircularProgressBar";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { CHORE_STATUS, METHOD } from "../../constants/enums";
import { useQuery } from "../../hooks/useQuery";
import PageWrapper from "../../components/PageWrapper";
import { useMutation } from "../../hooks/useMutation";
import * as S from "./ProfileChores.css";

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
          const updatedChores = chores.map((chore) => {
            if (chore.choreId === choreId) {
              return {
                ...chore,
                status: newStatus,
              };
            }

            return chore;
          });

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

  const statusOptions = [
    { value: CHORE_STATUS.COMPLETED, label: "Completed" },
    { value: CHORE_STATUS.APPROVAL, label: "Awaiting Approval" },
    { value: CHORE_STATUS.NOT_ACCEPTED, label: "Not Accepted" },
    { value: CHORE_STATUS.IN_PROGRESS, label: "In Progress" },
  ];

  const convertStatus = (chore) => {
    return statusOptions.find((status) => status.value === chore.status).label;
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
      <S.List>
        {chores.map((chore) => (
          <S.ListItem key={chore.choreId}>
            <div className="reward-container">
              <Typography>${chore.amount}</Typography>
            </div>
            <div className="info-container">
              <Typography>{chore.title}</Typography>
              <S.SecondaryText>
                Due: {chore.dueDate.split("T")[0]}
              </S.SecondaryText>
            </div>
            <div className="status-container">
              <S.Chip status={chore.status}>
                <span>{convertStatus(chore)}</span>
              </S.Chip>
            </div>
            <div className="options-container">
              <S.Select
                value={chore.status}
                onChange={(event) => handleStatusChange(event, chore.choreId)}
              >
                {statusOptions.map((option) => (
                  <S.MenuItem value={option.value}>{option.label}</S.MenuItem>
                ))}
              </S.Select>
              <IconButton
                onClick={() => removeChore(chore.choreId)}
                color="error"
              >
                <DeleteOutlineIcon />
              </IconButton>
            </div>
          </S.ListItem>
        ))}
      </S.List>
      <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
        <Fab color="primary" aria-label="add" onClick={navigateToChoreCreation}>
          <AddIcon />
        </Fab>
      </Box>
    </PageWrapper>
  );
}

export default ProfileChores;
