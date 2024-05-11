import React, { useEffect, useState } from "react";
import * as S from "./CircularProgressBar.css";

function CircularProgressBar({
  size,
  thickness,
  name,
  value,
  maxValue,
  isChore = false,
}) {
  const [animatedValue, setAnimatedValue] = useState(0);

  const normalise = (value) => (value * 100) / maxValue;

  const convertToDollar = (value) => {
    return `$${value.toFixed(2)}`;
  };

  useEffect(() => {
    const animate = () => {
      if (animatedValue < normalise(value)) {
        setAnimatedValue(animatedValue + 1);
      }
    };

    let timer = setInterval(() => {
      animate();
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, [animatedValue]);

  return (
    <S.ProgressBarContainer>
      <S.BaseCircularProgressBar
        variant="determinate"
        value={100} // Full circle
        size={size}
        thickness={thickness}
      />
      <S.ValueCircularProgressBar
        variant="determinate"
        value={animatedValue}
        size={size}
        thickness={thickness}
      />
      <S.TextContainer>
        <S.NameText>{name}</S.NameText>
        <S.ValueText>{isChore ? value : convertToDollar(value)}</S.ValueText>
        <S.PercentText>
          {Math.round(normalise(value))}% {isChore ? "complete" : "saved"}
        </S.PercentText>
      </S.TextContainer>
    </S.ProgressBarContainer>
  );
}

export default CircularProgressBar;
