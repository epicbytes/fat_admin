import React from "react";
import { observer } from "mobx-react";
import { INPUTS } from "inputs";
import { useTranslation } from "react-i18next";
import Button from "react-bulma-components/lib/components/button";
import Columns from "react-bulma-components/lib/components/columns";
import Message from "react-bulma-components/lib/components/message";
import { useStore } from "stores";

export const LoginForm = observer(() => {
  const { t } = useTranslation();
  const { app } = useStore();
  const form = app.getForm("loginForm");
  if (!form) {
    return (
      <Message type="error">
        <Message.body>{t("TROUBLES_WITH_FORM_INITIALIZATION")}</Message.body>
      </Message>
    );
  }
  form.reset();
  return (
    <form>
      <Columns>
        <INPUTS.TextInput
          type="text"
          form={form}
          name={"email"}
          col_size={10}
          label={t("EMAIL")}
        />
        <INPUTS.TextInput
          type="password"
          form={form}
          name={"password"}
          col_size={10}
          label={t("PASSWORD")}
        />
        <Columns.Column size={12}>
          <Button type="primary" onClick={form.onSubmit}>
            {t("LOGIN")}
          </Button>
        </Columns.Column>
      </Columns>
    </form>
  );
});
