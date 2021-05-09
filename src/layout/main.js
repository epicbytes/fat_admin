import React from "react";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react";
import { MainContent } from "components/MainContent";
import { SideContent } from "components/SideContent";
import { useStore } from "stores";
import { useTranslation } from "react-i18next";

export const MainLayout = observer(({ children }) => {
  const { app, router } = useStore();
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Helmet defaultTitle={app.appName} titleTemplate={`${app.appName} %s`}>
        <title>{t(router?.currentView?.title)}</title>
      </Helmet>
      <SideContent />
      <MainContent>{children}</MainContent>
    </React.Fragment>
  );
});
