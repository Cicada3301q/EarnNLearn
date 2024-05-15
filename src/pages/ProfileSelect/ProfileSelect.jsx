import React from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import PageWrapper from "../../components/PageWrapper";
import { PageTitle } from "../../components/Typography";
import ProfileSelectSkeleton from "./ProfileSelect.skeleton";
import * as S from "./ProfileSelect.css";
import { useQuery } from "../../hooks/useQuery";

function ProfileSelect() {
  const navigate = useNavigate();
  const {
    data: children,
    isLoading,
    isError,
  } = useQuery("children", "user/children/");

  const colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b",
  ];

  const handleAddProfile = () => {
    navigate("/add-profile");
  };

  const handleChildClick = (child) => {
    navigate("/profile-chores/", {
      state: {
        child: child,
      },
    });
  };

  return (
    <PageWrapper>
      <S.Avatar src="/EarnNLearn.jpg" alt="Logo" />
      <PageTitle>Children</PageTitle>
      {isLoading && <ProfileSelectSkeleton />}
      {isError && (
        <S.MessageContainer error={error}>
          We failed to get the children :(
        </S.MessageContainer>
      )}
      {children?.length === 0 ? (
        <S.MessageContainer error={false}>
          No children registered.
        </S.MessageContainer>
      ) : (
        <S.List>
          {children?.map((child, index) => (
            <S.ListItem onClick={() => handleChildClick(child)}>
              <S.ItemAvatar backgroundColor={colors[index % colors.length]} />
              <S.ListItemText>
                {child.firstName} {child.lastName}
              </S.ListItemText>
            </S.ListItem>
          ))}
        </S.List>
      )}
      <S.Button
        disabled={isLoading}
        variant="contained"
        startIcon={<AddIcon />}
        size="large"
        onClick={handleAddProfile}
      >
        Add Profile
      </S.Button>
    </PageWrapper>
  );
}

export default ProfileSelect;
