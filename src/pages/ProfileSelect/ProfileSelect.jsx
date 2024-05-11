import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { callApi } from "../../utils/api.util";
import { METHOD } from "../../constants/enums";
import PageWrapper from "../../components/PageWrapper";
import { PageTitle } from "../../components/Typography";
import ProfileSelectSkeleton from "./ProfileSelect.skeleton";
import * as S from "./ProfileSelect.css";
import { toast } from "react-toastify";

function ProfileSelect() {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate(); // Use the useNavigate hook

  // Array of colors for avatars
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

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await callApi("/api/user/children", METHOD.GET);
        if (response.ok) {
          const data = await response.json();
          setChildren(data);
        } else {
          throw new Error("Failed to fetch children");
        }
      } catch (error) {
        toast.error("Whoops, failed to load children");
        setError(true);
      }
      setLoading(false);
    };

    fetchChildren();
  }, []);

  // Function to handle navigation to profile creation
  const handleAddProfile = () => {
    navigate("/add-profile"); // Navigate to profile-creation when called
  };

  return (
    <PageWrapper>
      <S.Avatar src="/EarnNLearn.jpg" alt="Logo" />
      <PageTitle>Children</PageTitle>
      {loading ? (
        <ProfileSelectSkeleton />
      ) : children.length === 0 ? (
        <S.MessageContainer error={error}>
          {error
            ? "We failed to get the children :("
            : "No children registered."}
        </S.MessageContainer>
      ) : (
        <S.List>
          {children.map((child, index) => (
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
        onClick={handleAddProfile} // Attach the handleAddProfile function here
      >
        Add Profile
      </S.Button>
    </PageWrapper>
  );
}

export default ProfileSelect;
