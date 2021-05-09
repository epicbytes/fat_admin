import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

export const Permissions = observer(() => {
  const { t } = useTranslation();
  return (
    <div className="card text-left">
      <div className="card-body">
        <h4 className="card-title mb-3">{t("LIST_OF_PERMISSIONS")}</h4>
        <p>{t("PERMISSIONS_DESCRIPTION_TEXT")}</p>
        <>form here</>
      </div>
    </div>
  );
});
