import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStore } from "stores";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "components/Link";

import FTLogo from "logo.svg";
import { useTranslation } from "react-i18next";

const SideContentWrapper = styled.div``;

const SideContentLeft = styled.div`
  ${props => (props.opened ? "left: 0;" : "left: calc(-76px - 20px);")}
  transition: all 0.24s ease-in-out;
  position: fixed;
  top: 0;
  height: 100vh;
  box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.08);
  z-index: 101;
  overflow: hidden !important;
  overflow-anchor: none;
  touch-action: auto;
  background-image: -webkit-linear-gradient(-154deg, #004e92 0%, #000428 100%);
`;

const SideContentRight = styled.div`
  ${props => (props.opened ? "left: 76px;" : "left: calc(-220px - 20px);")}
  width: 220px;
  padding: 0.75rem 0;
  transition: all 0.24s ease-in-out;
  background: #fff;
  overflow: hidden !important;
  overflow-anchor: none;
  touch-action: auto;
  position: fixed;
  top: 0;
  height: 100vh;
  box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.08);
  z-index: 101;
  header {
    padding: 0px 24px;
  }
`;

const NavigationLeft = styled.ul`
  list-style: none;
  text-align: center;
  width: 76px;
  height: 100%;
  margin: 0;
  padding: 0;
`;

const ItemName = styled.span`
  display: none;
`;

const NavItem = styled.li`
  position: relative;
  display: block;
  width: 100%;
  color: #fff;
  cursor: pointer;
  border-bottom: 1px solid rgba(248, 249, 250, 0.05);
  ${props =>
    props.className === "active" &&
    `
    color: #fff;
    border-left: 2px solid #fff;
    a,
    i {
      color: #fff;
    }
  `}
  :hover {
    color: #fff;
    border-left: 2px solid #fff;
    a,
    i {
      color: #fff;
    }
  }
  a {
    width: 100%;
    padding: 22px 0;
    display: block;
    color: #ffffff;
    i {
      font-size: 24px;
      height: 24px;
      width: 24px;
      display: inline-block;
      margin: 0 auto;
    }
  }
`;

const Logo = styled.div`
  padding: 10px 0;
  margin-bottom: 14px;
  //TODO: УБРАТЬ В ПРОДЕ
  filter: blur(8px);
  -webkit-filter: blur(8px);
`;

const SubmenuArea = styled.div`
  header {
    padding: 0px 24px;
    h6 {
      font-size: 18px;
      margin-bottom: 4px;
      font-weight: 600;
    }
    p {
      color: #70657b;
      margin-bottom: 12px;
    }
  }
`;

const ChildNavigation = styled.ul`
  list-style: none;
  padding: 0;
  li {
    display: block;
  }
  ${NavItem} {
    &.active {
      a {
        color: #663399;
        background: #eee;
        i {
          color: #663399;
        }
      }
    }
    a {
      color: #332e38;
      text-transform: capitalize;
      font-size: 13px;
      cursor: pointer;
      padding: 12px 24px;
      transition: 0.15s all ease-in;
      :hover {
        color: #663399;
        background: #eee;
        i {
          color: #663399;
        }
      }
      ${ItemName} {
        display: inline;
      }
      i {
        color: #332e38;
        font-size: 18px;
        margin-right: 8px;
        vertical-align: middle;
      }
    }
  }
`;

const MenuItem = ({ item, isSubmenu = false }) => {
  const { t } = useTranslation();
  const { router } = useStore();
  if (router.views.has(item.view)) {
    return (
      <NavItem className={item.isSelected ? "active" : ""}>
        <Link
          router={router}
          view={router.views.get(item.view)}
          params={item.params}
        >
          <FontAwesomeIcon
            icon={item.icon}
            size={isSubmenu ? "1x" : "2x"}
            style={isSubmenu ? { marginRight: 4 } : {}}
          />
          <ItemName>{t(item.title)}</ItemName>
        </Link>
      </NavItem>
    );
  } else {
    return (
      <NavItem>
        <a>
          <FontAwesomeIcon
            icon="exclamation-triangle"
            size={isSubmenu ? "1x" : "2x"}
          />
          <ItemName>{t("NO_ROUTE_FOR_{{view}}", { view: item.view })}</ItemName>
        </a>
      </NavItem>
    );
  }
};

export const SideContent = observer(() => {
  const { app, router } = useStore();
  const { t } = useTranslation();
  return (
    <SideContentWrapper>
      <SideContentLeft opened={app.sidebarOpened}>
        <NavigationLeft>
          {app.menu.map(item => {
            return <MenuItem key={item.view} item={item} />;
          })}
        </NavigationLeft>
      </SideContentLeft>
      <SideContentRight opened={app.sidebarOpened}>
        <header>
          <Logo>
            <img src={FTLogo} alt={""} />
          </Logo>
        </header>
        <SubmenuArea>
          <header>
            <h6>{t(router.currentView?.title)}</h6>
          </header>
          <ChildNavigation>
            {app.selectedMenu?.childs.map(item => (
              <MenuItem key={item.path} isSubmenu item={item} />
            ))}
          </ChildNavigation>
        </SubmenuArea>
      </SideContentRight>
    </SideContentWrapper>
  );
});
