import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import Button from "react-bulma-components/lib/components/button";
import Columns from "react-bulma-components/lib/components/columns";

export const Submit = observer(({ form }) => {
  const { t } = useTranslation();
  return (
    <Columns>
      <Columns.Column size={12}>
        <Button
          color={"link"}
          disabled={form.hasError || !form.changed}
          onClick={form.onSubmit}
        >
          {t(form.hasError ? "FORM_HAS_ERRORS" : "SAVE")}
        </Button>
      </Columns.Column>
    </Columns>
  );
});
