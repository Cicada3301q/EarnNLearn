import { Skeleton } from "@mui/material";
import * as S from "./ProfileSelect.css";
import React from "react";

const ProfileSelectSkeleton = () => {
  return (
    <S.List>
      {[...Array(5).keys()].map((key) => (
        <S.ListItem key={`key-${key}`}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rounded" width={210} height={40} />
        </S.ListItem>
      ))}
    </S.List>
  );
};

export default ProfileSelectSkeleton;
