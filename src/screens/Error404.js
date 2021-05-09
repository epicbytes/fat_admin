import React from "react";
import styled from "styled-components";
import { Link } from "components/Link";

const ErrorWrapper = styled.div`
  h1 {
    font-weight: 800;
    margin-bottom: 16px;
    line-height: 1;
    font-size: 60px;
  }
`;

const ErrorHeader = styled.p`
  font-weight: 800;
  font-size: 36px;
  margin-bottom: 1rem !important;
`;

const ErrorDescription = styled.p`
  font-size: 18px;
  color: #70657b;
  margin-bottom: 3rem;
`;

const ErrorActionBtn = styled(Link)`
  border-radius: 40px;
  padding: 0.5rem 1rem;
  font-size: 1.01625rem;
  line-height: 1.5;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  color: #fff;
  background-color: #663399;
`;

export const Error404 = () => {
  return (
    <ErrorWrapper>
      <h1>404</h1>
      <ErrorHeader>Ошибка!</ErrorHeader>
      <ErrorDescription>Такой страницы в приложении нет</ErrorDescription>
      <ErrorActionBtn to="/">Вернуться на главную</ErrorActionBtn>
    </ErrorWrapper>
  );
};
