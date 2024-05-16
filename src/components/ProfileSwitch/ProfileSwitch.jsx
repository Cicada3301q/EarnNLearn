import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./ProfileSwitch.css";

function ProfileSwitch() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [alignment, setAlignment] = useState(
    location.pathname.includes("chores") ? "left" : "right"
  );

  useEffect(() => {
    setAlignment(location.pathname.includes("chores") ? "left" : "right");
  }, [location]);

  const handleAlignment = (_, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      if (newAlignment === "right") {
        navigate(`/profile-balance/${id}`);
      } else {
        navigate(`/profile-chores/${id}`);
      }
    }
  };

  return (
    <S.ToggleButtonGroup
      value={alignment}
      size="small"
      exclusive
      onChange={handleAlignment}
    >
      <S.ToggleButton value="left">Chores</S.ToggleButton>
      <S.ToggleButton value="right">Balance</S.ToggleButton>
    </S.ToggleButtonGroup>
  );
}

export default ProfileSwitch;
