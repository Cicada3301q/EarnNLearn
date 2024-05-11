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
    const targetValue = normalise(value);
    const animate = () => {
      // Determine the difference and adjust the speed accordingly
      const difference = Math.abs(targetValue - animatedValue);
      const increment = Math.max(1, difference / 7);

      if (animatedValue < targetValue) {
        setAnimatedValue((prevValue) =>
          Math.min(prevValue + increment, targetValue)
        );
      }
    };

    let timer = setInterval(() => {
      animate();
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [animatedValue, value, maxValue]); // Added 'value' and 'maxValue' to dependencies

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
          {Math.round(animatedValue)}% {isChore ? "complete" : "saved"}
        </S.PercentText>
      </S.TextContainer>
    </S.ProgressBarContainer>
  );
}

export default CircularProgressBar;
