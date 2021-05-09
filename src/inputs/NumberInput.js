import React from "react";
import { observer } from "mobx-react";
import { NavigatorBaseField } from "./NavigatorBaseField";
import Input from "react-bulma-components/lib/components/form/components/input";

export const NumberInput = observer(props => {
  return (
    <NavigatorBaseField
      {...props}
      render={({ field }) => <Input {...field} type="number" />}
    />
  );
});
