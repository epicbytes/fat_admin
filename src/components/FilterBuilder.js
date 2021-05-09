import React from "react";
import { observer } from "mobx-react";
import { useStore } from "stores";
import { useTranslation } from "react-i18next";
import { INPUTS } from "inputs";

import Button from "react-bulma-components/lib/components/button";
import Columns from "react-bulma-components/lib/components/columns";
import Message from "react-bulma-components/lib/components/message";

const { ByType } = INPUTS;

export const FilterBuilder = observer(({ filter, modelName }) => {
  const store = useStore();
  const { t } = useTranslation();
  if (!store[modelName]) {
    return (
      <Message color="danger">
        <Message.Header>{t("ERROR_IN_FILTER_BUILDER")}</Message.Header>
        <Message.Body>{t("MODEL_NAME_FOR_FILTER_IS_NOT_SET")}</Message.Body>
      </Message>
    );
  }

  return (
    <React.Fragment>
      {filter.map((row, index) => {
        return (
          <Columns key={index}>
            {row.map(col => {
              const Input = ByType[col.type];
              if (!Input) {
                return (
                  <Message key="err" color="danger">
                    <Message.Header>
                      {t("ERROR_IN_FILTER_BUILDER")}
                    </Message.Header>
                    <Message.Body>
                      {t("FIELD_{{field}}_IS_NOT_IN_LIBRARY", {
                        field: col.type || "???"
                      })}
                    </Message.Body>
                  </Message>
                );
              }
              return (
                <Input
                  {...col}
                  is_filter
                  field={{
                    value: store.router?.query[col.name],
                    onChange: e => {
                      store.router.setQueryParam(col.name, e.target.value);
                      store[modelName].needReload(true);
                    },
                    ...col.field
                  }}
                />
              );
            })}
          </Columns>
        );
      })}
      <Columns>
        <Columns.Column>
          <Button
            onClick={() => {
              store.router.resetQuery();
              store[modelName].needReload(true);
            }}
          >
            {t("RESET_FILTER")}
          </Button>
        </Columns.Column>
      </Columns>
    </React.Fragment>
  );
});
