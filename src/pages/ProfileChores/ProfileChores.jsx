import React, { useState, useContext } from "react";
import { Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ProfileSwitch from "../../components/ProfileSwitch";
import CircularProgressBar from "../../components/CircularProgressBar";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CHORE_STATUS, HTTP_METHOD, ROLE } from "../../constants/enums";
import { useQuery } from "../../hooks/useQuery";
import PageWrapper from "../../components/PageWrapper";
import { useMutation } from "../../hooks/useMutation";
import * as S from "./ProfileChores.css";
import ChoreCreationModal from "../../components/ChoreCreationModal";
import { QueryContext } from "../../context/QueryContextProvider";
import dayjs from "dayjs";
import { useAuth } from "../../hooks/useAuth";

function ProfileChores() {
  const { invalidateQueryKey } = useContext(QueryContext);
  const { id } = useParams();
  const { user } = useAuth();
  const isParent = user?.role === ROLE.PARENT;

  const [openCreationModal, setOpenCreationModal] = useState(false);

  const { mutate: deleteChore } = useMutation();
  const { mutate: changeChoreStatus } = useMutation();
  const { mutate: createChore } = useMutation();

  const childUserResponse = useQuery(`child-${id}`, `user/child/${id}`);

  const { data: childUser, isLoading: isChildUserLoading } = childUserResponse;

  const queryKey = `chores-${id}`;

  const choreDataResponse = useQuery(queryKey, `chores/child/${id}`);

  const {
    data: choreData,
    isLoading: choresLoading,
    isError: choresError,
  } = choreDataResponse;

  const choreList = !choresLoading && !choresError && choreData.chores;

  if (choresError) {
    toast.error("Failed to load chores");
  }

  const removeChore = (choreId) => {
    deleteChore({
      route: `chores/delete/${choreId}`,
      method: HTTP_METHOD.DELETE,
      options: {
        onSuccess: () => {
          invalidateQueryKey(queryKey);
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
      method: HTTP_METHOD.PUT,
      body: {
        status: newStatus,
      },
      options: {
        onSuccess: () => {
          invalidateQueryKey(queryKey);
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

  const handleCreateChore = (chore) => {
    createChore({
      route: "chores/create",
      method: HTTP_METHOD.POST,
      body: chore,
      options: {
        onSuccess: () => {
          invalidateQueryKey(queryKey);
          toast.success("Chore created successfully!");
          handleCloseModal();
        },
        onError: () => {
          toast.error("Failed to create chore");
        },
      },
    });
  };

  const handleCloseModal = () => {
    setOpenCreationModal(false);
  };

  const statusOptions = [
    { value: CHORE_STATUS.COMPLETED, label: "Completed", role: ROLE.PARENT },
    {
      value: CHORE_STATUS.APPROVAL,
      label: "Awaiting Approval",
      role: ROLE.CHILD,
    },
    {
      value: CHORE_STATUS.NOT_ACCEPTED,
      label: "Not Accepted",
      role: ROLE.CHILD,
    },
    { value: CHORE_STATUS.IN_PROGRESS, label: "In Progress", role: ROLE.CHILD },
  ];

  const convertStatus = (chore) => {
    return statusOptions.find((status) => status.value === chore.status).label;
  };

  return (
    <PageWrapper>
      <CircularProgressBar
        size={150}
        thickness={4}
        value={choreData?.completedChores || 0}
        maxValue={choreData?.totalChores || 1}
        name={isChildUserLoading ? "loading..." : childUser.firstName}
        isChore={true}
      />
      <ProfileSwitch />
      <S.List>
        {choreList.map((chore) => (
          <S.ListItem key={chore.choreId}>
            <div className="reward-container">
              <Typography>${chore.amount}</Typography>
            </div>
            <S.ItemContainer>
              <div>
                <Typography>{chore.title}</Typography>
                <div className="chore-status-container">
                  <S.Chip status={chore.status}>
                    <span>{convertStatus(chore)}</span>
                  </S.Chip>
                  <S.SecondaryText>
                    Due: {dayjs(chore.dueDate).format("MMMM D, YYYY")}
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
                {isParent && (
                  <IconButton
                    onClick={() => removeChore(chore.choreId)}
                    color="error"
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                )}
              </div>
            </S.ItemContainer>
          </S.ListItem>
        ))}
      </S.List>
      {isParent && (
        <S.Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenCreationModal(true)}
        >
          Create Chore
        </S.Button>
      )}
      {openCreationModal && (
        <ChoreCreationModal
          open={openCreationModal}
          handleClose={handleCloseModal}
          handleCreate={handleCreateChore}
          childId={id}
        />
      )}
    </PageWrapper>
  );
}

export default ProfileChores;
