import React from "react";
import { INPUTS } from "inputs";
import { observer } from "mobx-react";
import { useStore } from "stores";
import { entries } from "mobx";
import Columns from "react-bulma-components/lib/components/columns";
import Message from "react-bulma-components/lib/components/message";
import MobxReactFormDevTools from "mobx-react-form-devtools";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const { ByType } = INPUTS;

export const searchAndParseField = (selfForm, name) => {
  let Component;
  let blueprint_field;
  if (name !== "submit") {
    blueprint_field = selfForm.fields.find(field => field.name === name);
    if (!blueprint_field || !blueprint_field.component)
      return (
        <Message key="err">
          <Message.Header>{i18next.t("PROBLEMS_WITH_FIELD")}</Message.Header>
          <Message.Body>
            {i18next.t("PLEASE_CHECK_CONFIG_{{name}}", { name })}
          </Message.Body>
        </Message>
      );
    Component = ByType[blueprint_field.component];
  } else {
    Component = ByType[name];
  }
  return (
    <Component
      key={name}
      form={selfForm.form}
      label={blueprint_field?.label}
      col_size={blueprint_field?.col_size}
      name={name}
      fieldOptions={blueprint_field?.fieldOptions}
    />
  );
};

export const compiledSchema = (selfForm, blueprint, prefix = "") =>
  blueprint.map((bp, index) => {
    if (typeof bp === "string") {
      return (
        <React.Fragment key={bp}>
          {searchAndParseField(selfForm, bp)}
        </React.Fragment>
      );
    } else if (Array.isArray(bp)) {
      return (
        <Columns key={index}>
          {bp.map(raw_row =>
            entries(raw_row).map(row => (
              <Columns.Column size={Number.parseInt(row[0])} key={row[0]}>
                {Array.isArray(row[1]) ? (
                  <Columns>
                    {row[1].map(field => searchAndParseField(selfForm, field))}
                  </Columns>
                ) : (
                  <Columns>{searchAndParseField(selfForm, row[1])}</Columns>
                )}
              </Columns.Column>
            ))
          )}
        </Columns>
      );
    } else {
      return "NOT_IDENTIFY_FIELD";
    }
  });

export const FormBuilder = observer(({ form, initials = {} }) => {
  const { app } = useStore();
  const { t } = useTranslation();

  const getFormBlueprint = (form, initials) => {
    const selfForm = app.forms.get(form);

    if (!selfForm) {
      return (
        <Message>
          <Message.Header>{i18next.t("PROBLEMS_WITH_FORM")}</Message.Header>
          <Message.Body>{t("FORM_IS_NOT_PROVIDED")}</Message.Body>
        </Message>
      );
    }
    if (initials) {
      selfForm.form.update(initials);
    }
    const blueprint = selfForm.blueprint;
    if (!blueprint) {
      return (
        <Message>
          <Message.Header>{i18next.t("PROBLEMS_WITH_FORM")}</Message.Header>
          <Message.Body>{t("BLUEPRINT_IS_NOT_SET")}</Message.Body>
        </Message>
      );
    }
    const fields = selfForm.fields;
    if (!fields) {
      return (
        <Message>
          <Message.Header>{i18next.t("PROBLEMS_WITH_FORM")}</Message.Header>
          <Message.Body>{t("FORM_HAVE_NOT_FIELDS")}</Message.Body>
        </Message>
      );
    }

    return (
      <React.Fragment>
        {compiledSchema(selfForm, blueprint)}
        <MobxReactFormDevTools.UI />
      </React.Fragment>
    );
  };
  return getFormBlueprint(form, initials);
});
