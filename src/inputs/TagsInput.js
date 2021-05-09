import React from "react";
import { observer } from "mobx-react";
import { NavigatorBaseField } from "./NavigatorBaseField";
import Select from "rc-select";
export const TagsInput = observer(props => {
  const { field } = props;
  return (
    <NavigatorBaseField {...props}>
      <Select mode="tags" {...field} />
    </NavigatorBaseField>
  );
});
