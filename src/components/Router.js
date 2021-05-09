import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import Layout from "layout";

export const Router = observer(({ router, loading }) => {
  const { t } = useTranslation();
  //if (router.isLoading) return loading ? loading : <span>{t("LOADING")}</span>;
  if (router.currentView && router.currentView.component) {
    const CurrentLayout = Layout[router.currentView.layout];
    return (
      <CurrentLayout>
        {React.cloneElement(router.currentView.component, router.props)}
      </CurrentLayout>
    );
  }

  return t("NO_ROUTER_CONFIG_FOR_ROUTE");
});
