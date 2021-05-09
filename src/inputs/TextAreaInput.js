import React from "react";
import { observer } from "mobx-react";
import { NavigatorBaseField } from "./NavigatorBaseField";
import Textarea from "react-bulma-components/lib/components/form/components/textarea";
import { useTranslation } from "react-i18next";

export const TextAreaInput = observer(props => {
  const { t } = useTranslation();
  return (
    <NavigatorBaseField
      {...props}
      render={({ field }) => (
        <Textarea
          {...field}
          placeholder={field.placeholder ? t(field.placeholder) : null}
        />
      )}
    />
  );
});
