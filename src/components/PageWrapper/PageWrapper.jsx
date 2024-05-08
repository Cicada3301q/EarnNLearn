import React from "react";
import * as S from "./PageWrapper.css";

const PageWrapper = ({ children }) => {
  return (
    <S.Wrapper>
      <S.Content>{children}</S.Content>
    </S.Wrapper>
  );
};

export default PageWrapper;
