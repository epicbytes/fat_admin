import React from "react";
import { observer } from "mobx-react";
import { NavigatorBaseField } from "./NavigatorBaseField";
import { DataTableField } from "./DataTableField";

export const DataTableInput = observer(({ fieldOptions = {}, ...props }) => {
  return (
    <NavigatorBaseField
      {...props}
      render={({ field }) => (
        <DataTableField
          data={field.value !== "" ? field.value : null}
          onSave={v => field.onSave(v)}
          {...fieldOptions}
        />
      )}
    />
  );
});
