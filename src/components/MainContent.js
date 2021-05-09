import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStore } from "stores";
import { FlexGrow } from "./FlexGrow";
import { MainHeader } from "./MainHeader";
import { useTranslation } from "react-i18next";

const MainContentWrapper = styled.div`
  float: right;
  margin-top: 0;
  transition: all 0.24s ease-in-out;
  padding: 0 2rem;
  position: relative;
  min-height: calc(100vh - 80px);
  background: #fff;
  ${props =>
    props.sidebarOpened === true
      ? "width: calc(100% - 76px - 220px);"
      : "width: 100%"}
`;

const MainContentBody = styled.div`
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 90px);
  margin-bottom: 30px;
`;

const BreadCrumbWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  background: transparent;
  align-items: center;
  margin: 0 0 1rem;
  padding: 0;
`;

const BreadCrumbSeparator = styled.div`
  margin-bottom: 2rem;
  border-top: 1px solid #dee2e6 !important;
`;

const AppTitle = styled.h1`
  font-size: 1.5rem;
  line-height: 1;
  margin: 0;
  color: #332e38;
`;

export const MainContent = observer(({ children }) => {
  const { app, router } = useStore();
  const { t } = useTranslation();
  return (
    <MainContentWrapper sidebarOpened={app.sidebarOpened}>
      <MainHeader></MainHeader>
      <MainContentBody>
        <BreadCrumbWrapper>
          <AppTitle>{t(router?.currentView?.title)}</AppTitle>
        </BreadCrumbWrapper>
        <BreadCrumbSeparator />
        {children}
        <FlexGrow />
      </MainContentBody>
    </MainContentWrapper>
  );
});
