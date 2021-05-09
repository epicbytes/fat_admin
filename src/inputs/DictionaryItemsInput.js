import React, { useEffect } from "react";
import { observer, useLocalStore } from "mobx-react";
import { NavigatorBaseField } from "./NavigatorBaseField";
import { useStore } from "stores";
import { DictionaryItemsStore } from "./DictionaryItemsStore";
import debounce from "lodash/debounce";
import { useTranslation } from "react-i18next";
import Message from "react-bulma-components/lib/components/message";
import Select, { Option } from "rc-select";

const ThisComponent = observer(({ prp: { field, fieldOptions } }) => {
  const { t } = useTranslation();
  if (!fieldOptions.modelName) {
    return (
      <Message>
        <Message.Body>{t("MODEL_NAME_NOT_DEFINED")}</Message.Body>
      </Message>
    );
  }
  const { app } = useStore();
  const store = useLocalStore(() =>
    DictionaryItemsStore.create({
      value: field.value === "" ? [] : field.value,
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
      <Message>
        <Message.Body>{t(store.error)}</Message.Body>
      </Message>
    );
  }

  return (
    <Select
      value={store.value}
      showSearch
      mode="multiple"
      onSearch={debounce(search => store.setFilter(search), 500)}
      placeholder={field.placeholder}
      filterOption={false}
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

export const DictionaryItemsInput = observer(({ ...props }) => {
  return (
    <NavigatorBaseField
      {...props}
      render={prp => <ThisComponent prp={prp} />}
    />
  );
});
