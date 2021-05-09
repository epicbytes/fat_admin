import React from "react";
import { observer } from "mobx-react";
import { NavigatorBaseField } from "./NavigatorBaseField";
import Select, { Option } from "rc-select";

export const SelectInput = observer(({ ...props }) => {
  const { field, options = [] } = props;
  return (
    <NavigatorBaseField {...props}>
      <Select
        defaultValue={field.value}
        onChange={value => {
          field.onChange({ target: { value } });
        }}
      >
        {options.map((option, index) => (
          <Option key={index} value={option.value}>
            {option.title}
          </Option>
        ))}
      </Select>
    </NavigatorBaseField>
  );
});
