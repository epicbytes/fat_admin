import React, { useEffect } from "react";
import { observer, useLocalStore } from "mobx-react";
import { NavigatorBaseField } from "./NavigatorBaseField";
import { useStore } from "stores";
import { DictionaryItemStore } from "./DictionaryItemStore";
import debounce from "lodash/debounce";
import { useTranslation } from "react-i18next";
import Message from "react-bulma-components/lib/components/message";
import Select, { Option } from "rc-select";
import "./select.css";

const ThisComponent = observer(({ prp: { field, fieldOptions } }) => {
  const { t } = useTranslation();
  if (!fieldOptions.modelName) {
    return (
      <Message type="error">
        <Message.Body>{t("MODEL_NAME_NOT_DEFINED")}</Message.Body>
      </Message>
    );
  }
  const { app } = useStore();
  const store = useLocalStore(() =>
    DictionaryItemStore.create({
      value: field.value,
      options: [],
      searched: [],
      api: app.api,
      modelName: fieldOptions.modelName
    })
  );

  useEffect(() => {
    return store.reset();
  }, []);

  useEffect(() => {
    if (field.value !== "" && field.value !== null) {
      store.setValue(field.value);
    }
  }, [field.value]);

  if (store.state === "error") {
    return (
      <Message type="error">
        <Message.MessageBody>{t(store.error)}</Message.MessageBody>
      </Message>
    );
  }

  return (
    <Select
      defaultValue={store.value}
      value={store.value}
      showSearch
      onSearch={debounce(search => store.setFilter(search), 500)}
      placeholder={
        field.placeholder || `SELECT_A_${fieldOptions.modelName.toUpperCase()}`
      }
      onChange={value => {
        store.setValue(value);
        field.onChange({ target: { value } });
      }}
    >
      {store.filteredOptions.map(option => (
        <Option key={option.value} value={option.value}>
          {option.title}
        </Option>
      ))}
    </Select>
  );
});

export const DictionaryItemInput = observer(({ ...props }) => {
  return (
    <NavigatorBaseField
      {...props}
      render={prp => <ThisComponent prp={prp} />}
    />
  );
});
