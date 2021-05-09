import React, { useEffect } from "react";
import Button from "react-bulma-components/lib/components/button";
import Columns from "react-bulma-components/lib/components/columns";
import Input from "react-bulma-components/lib/components/form/components/input";
import { observer, useLocalStore, useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import Store from "./store";
import ClickOutside from "components/ClickOutside";

const _store = Store.create({});

const RowItem = observer(({ row }) => (
  <tr>
    <th onClick={() => row.setEditedRow()}>
      {row.isEdited ? (
        <textarea
          value={row.source}
          onChange={e => row.setSource(e.target.value)}
          className={"form-control"}
        />
      ) : (
        row.source
      )}
    </th>
    {row.items.map(item => {
      return (
        <td key={item.id} onClick={() => row.setEditedRow()}>
          {row.parent.parent.mode === "booleans" ? (
            <div className="field">
              <input
                onChange={value => item.setValue(value)}
                className="is-checkradio is-info"
                type="checkbox"
                checked={item.value}
              />
              <label htmlFor={item.id}></label>
            </div>
          ) : row.isEdited ? (
            <>
              {row.parent.parent.mode === "strings" && (
                <input
                  value={item.value}
                  onChange={e => item.setValue(e.target.value)}
                  className={"form-control"}
                />
              )}
            </>
          ) : (
            item.value
          )}
        </td>
      );
    })}
    <th>
      <Button type="danger" onClick={() => row.remove()} icon="close-circle" />
    </th>
  </tr>
));

const Header = observer(({ header }) => (
  <th key={header.id}>
    {!header.isFirst && (
      <Button
        type="danger"
        className="float-right"
        onClick={() => header.remove()}
        icon="close-circle"
      />
    )}
    <span className="float-left">{header.value}</span>
    {header.isFirst && (
      <Input onChange={event => _store.data.setSearch(event.target.value)} />
    )}
  </th>
));

const Rows = observer(({ data }) =>
  (data?.filteredRows || []).map(row => <RowItem key={row.id} row={row} />)
);

export const DataTableField = observer(
  ({
    options = [],
    mode = "strings",
    onSave = () => {},
    data,
    patch = null
  }) => {
    const { t } = useTranslation();
    const localStore = useLocalStore(() => _store);

    useEffect(() => {
      localStore.setData(data, mode);
      localStore.setOptions(options);
    }, [data]);

    useEffect(() => {
      patch && localStore.setPatch(patch);
    }, [patch]);
    /* 
    const menu = (
      <Menu onClick={item => localStore.data.addHeader(item.key)}>
        {localStore.availableOptions.map(option => (
          <Menu.Item key={option.key}>{option.value}</Menu.Item>
        ))}
      </Menu>
    ); */

    return useObserver(() => (
      <ClickOutside
        onClickOutside={() => {
          if (localStore?.data?.editedRow) {
            localStore.data.setEditedRow(null);
          }
        }}
      >
        <Columns>
          {/*           <Columns.Column size={12}>
            <Dropdown overlay={menu}>
              <Button className="mb-2">
                {t("OPTIONS")} <Icon type="down" />
              </Button>
            </Dropdown>
          </Columns.Column> */}
          <Columns.Column size={12}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  {(localStore.data?.headers || []).map((header, index) => (
                    <Header header={header} key={index} />
                  ))}
                  <th />
                </tr>
              </thead>
              <tbody>
                <Rows data={localStore.data} />
                <tr>
                  <td colSpan={(localStore.data?.headers || []).length + 1}>
                    <Button
                      icon="plus"
                      onClick={() => localStore.data.addRow()}
                    >
                      {t("ADD_ROW")}
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Columns.Column>
        </Columns>
      </ClickOutside>
    ));
  }
);
