import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import PageWrapper from "../../components/PageWrapper";
import { PageTitle } from "../../components/Typography";
import ProfileSelectSkeleton from "./ProfileSelect.skeleton";
import * as S from "./ProfileSelect.css";
import { AuthContext } from "../../context/AuthContextProvider";
import { useQuery } from "../../hooks/useQuery";

function ProfileSelect() {
  const navigate = useNavigate();
  const { user, isParent } = useContext(AuthContext);
  const { data: children, loading, error } = useQuery("user/children/");

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

  return (
    <PageWrapper>
      <S.Avatar src="/EarnNLearn.jpg" alt="Logo" />
      <PageTitle>Children</PageTitle>
      {loading && <ProfileSelectSkeleton />}
      {error && (
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
            <Link
              key={child.id}
              to={`/profile-chores/${child.id}`}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <S.ListItem>
                <S.ItemAvatar backgroundColor={colors[index % colors.length]} />
                <S.ListItemText>
                  {child.firstName} {child.lastName}
                </S.ListItemText>
              </S.ListItem>
            </Link>
          ))}
        </S.List>
      )}
      <S.Button
        disabled={loading}
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
