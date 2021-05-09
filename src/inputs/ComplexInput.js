import React from "react";
import { observer } from "mobx-react";
import { compiledSchema } from "components/FormBuilder";

export const ComplexInput = observer(
  ({ fieldOptions, form, name, label, col_size = 12 }) => {
    const { fields, blueprint } = fieldOptions;

    return compiledSchema(form, blueprint, name);
  }
);
