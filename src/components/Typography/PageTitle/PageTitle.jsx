import React from "react";
import * as S from "./PageTitle.css";

const PageTitle = ({ children }) => {
  return <S.PageTitle variant="h4">{children}</S.PageTitle>;
};

export default PageTitle;
