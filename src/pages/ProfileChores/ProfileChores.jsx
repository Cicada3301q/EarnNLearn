import React, { useEffect, useState } from "react";
import { Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ProfileSwitch from "../../components/ProfileSwitch";
import CircularProgressBar from "../../components/CircularProgressBar";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { CHORE_STATUS, METHOD } from "../../constants/enums";
import { useQuery } from "../../hooks/useQuery";
import PageWrapper from "../../components/PageWrapper";
import { useMutation } from "../../hooks/useMutation";
import * as S from "./ProfileChores.css";
import ChoreCreationModal from "../../components/ChoreCreationModal";

function ProfileChores() {
  const location = useLocation();

  const [chores, setChores] = useState([]);
  const [openCreationModal, setOpenCreationModal] = useState(false);

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
        value={choreData.completedChores}
        maxValue={choreData.totalChores}
        name={firstName}
        isChore={true}
      />
      <ProfileSwitch />
      <S.List>
        {chores.map((chore) => (
          <S.ListItem key={chore.choreId}>
            <div className="reward-container">
              <Typography>${10}</Typography>
            </div>
            <S.ItemContainer>
              <div className="chore-container">
                <Typography>{chore.title}</Typography>
                <div className="chore-status-container">
                  <S.Chip status={chore.status}>
                    <span>{convertStatus(chore)}</span>
                  </S.Chip>
                  <S.SecondaryText>
                    Due: {chore.dueDate.split("T")[0]}
                  </S.SecondaryText>
                </div>
              </div>
              <div className="options-container">
                <S.Select
                  value={chore.status}
                  onChange={(event) => handleStatusChange(event, chore.choreId)}
                >
                  {statusOptions.map((option) => (
                    <S.MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </S.MenuItem>
                  ))}
                </S.Select>
                <IconButton
                  onClick={() => removeChore(chore.choreId)}
                  color="error"
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </div>
            </S.ItemContainer>
          </S.ListItem>
        ))}
      </S.List>
      <S.Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpenCreationModal(true)}
      >
        Create Chore
      </S.Button>
      {openCreationModal && (
        <ChoreCreationModal
          open={openCreationModal}
          handleClose={() => setOpenCreationModal(false)}
          childId={id}
        />
      )}
    </PageWrapper>
  );
}

export default ProfileChores;
