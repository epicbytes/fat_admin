import React from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import "react-bulma-components/lib/components/form";
import Label from "react-bulma-components/lib/components/form/components/label";
import Help from "react-bulma-components/lib/components/form/components/help";
import Columns from "react-bulma-components/lib/components/columns";

export const NavigatorBaseField = observer(
  ({
    label,
    col_size = 6,
    name = "",
    field,
    form,
    hint,
    labelProps = {},
    fieldOptions = {},
    is_filter = false,
    render = () => {}
  }) => {
    const { t } = useTranslation();
    if (!field) {
      field = form.$(name).bind();
    }
    return (
      <Columns.Column size={col_size}>
        {/*         {hint && (
            <Icon
              type="question-circle-o"
              style={{ verticalAlign: "middle", marginLeft: 5 }}
            />
        )} */}
        {label && (
          <Label htmlFor={field.id} {...labelProps}>
            {t(label)}
          </Label>
        )}
        {render({ field, fieldOptions })}
        {is_filter
          ? null
          : form.$(name).error && (
              <Help color="danger">{form.$(name).error}</Help>
            )}
      </Columns.Column>
    );
  }
);
