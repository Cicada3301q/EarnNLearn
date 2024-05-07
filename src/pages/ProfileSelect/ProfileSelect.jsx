import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { callApi } from "../../utils/api.util";
import { METHOD } from "../../constants/enums";
import PageWrapper from "../../components/PageWrapper";
import { PageTitle } from "../../components/Typography";
import ProfileSelectSkeleton from "./ProfileSelect.skeleton";
import * as S from "./ProfileSelect.css";

function ProfileSelect() {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

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
      const response = await callApi("/api/user/children", METHOD.GET);

      if (response.ok) {
        const data = await response.json();
        setChildren(data);
      } else {
        console.error("Failed to fetch children");
      }

      setLoading(false);
    };

    fetchChildren();
  }, []);

  return (
    <PageWrapper>
      <S.Logo src="/EarnNLearn.jpg" alt="Logo" />
      <PageTitle>Profiles</PageTitle>
      {loading ? (
        <ProfileSelectSkeleton />
      ) : (
        <S.List>
          {children.length === 0 ? (
            <Typography>No Children Found, please add one!</Typography>
          ) : (
            children.map((child, index) => (
              <Link
                key={child.id}
                to={`/profile-balance/${child.id}`}
                style={{ textDecoration: "none", width: "100%" }}
              >
                <S.ProfileItem>
                  <S.ItemAvatar
                    backgroundColor={colors[index % colors.length]}
                  />
                  <Typography variant="h6">
                    {child.firstName} {child.lastName}
                  </Typography>
                </S.ProfileItem>
              </Link>
            ))
          )}
        </S.List>
      )}
      <S.CreateChildButton
        disabled={loading}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Add Profile
      </S.CreateChildButton>
    </PageWrapper>
  );
}

export default ProfileSelect;
