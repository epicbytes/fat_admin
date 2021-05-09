import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStore } from "stores";
import Button from "react-bulma-components/lib/components/button";

const MainHeaderWrapper = styled.div`
  position: absolute !important;
  width: 100%;
  left: 0;
  box-shadow: none;
  display: flex;
  height: 80px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  background: transparent;
  z-index: 100;
  transition: all 0.24s ease-in-out;
`;

const MenuToggle = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin-right: 12px;
  div {
    width: 24px;
    height: 1px;
    background: #47404f;
    margin: 3px 0;
  }
`;

const MarginAuto = styled.div`
  margin: auto;
  display: block;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.div`
  font-size: 18px;
  line-height: 16px;
`;

const ButtonUser = styled(Button)`
  color: #332e38;
  small {
    line-height: 0.7rem;
    font-size: 0.8rem;
  }
`;

const MegaMenu = () => {
  return "";
};

export const MainHeader = observer(() => {
  const { app } = useStore();
  //const { t } = useTranslation();
  /* const menu = (
    <Menu
      onClick={item => {
        if (item.key === "logout") {
          app.logout();
        }
      }}
    >
      <Menu.Item key="logout">
        <Icon type="logout" /> {t("LOGOUT")}
      </Menu.Item>
    </Menu>
  ); */
  return (
    <MainHeaderWrapper>
      <MenuToggle onClick={() => app.toggleSidebar()}>
        <div />
        <div />
        <div />
      </MenuToggle>
      <MegaMenu />
      <MarginAuto />
      <RightSide className="pr-5">
        {/* <Dropdown overlay={menu}> */}
        <ButtonUser type="link">
          {/* <Avatar
            src={app.user.imageUrlThumb}
            alt=""
            style={{ float: "left" }}
            className="mr-2"
          /> */}
          <UserName>{app.user.fullName}</UserName>
          <small>{app.user.email}</small>
        </ButtonUser>
        {/*  </Dropdown> */}
      </RightSide>
    </MainHeaderWrapper>
  );
});
