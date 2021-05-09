import React from "react";
import { observer } from "mobx-react";
import { NavigatorBaseField } from "./NavigatorBaseField";
import Input from "react-bulma-components/lib/components/form/components/input";
import { useTranslation } from "react-i18next";

export const TextInput = observer(props => {
  const { t } = useTranslation();
  return (
    <NavigatorBaseField
      {...props}
      render={({ field }) => (
        <Input
          {...field}
          placeholder={field.placeholder ? t(field.placeholder) : null}
        />
      )}
    />
  );
});
