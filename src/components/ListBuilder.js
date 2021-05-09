import React from "react";
import { observer } from "mobx-react";
import { useStore } from "stores";
import { useTranslation } from "react-i18next";
import { Link } from "components/Link";
import { FilterBuilder } from "components/FilterBuilder";
import Button from "react-bulma-components/lib/components/button";
import Columns from "react-bulma-components/lib/components/columns";
import Message from "react-bulma-components/lib/components/message";
import Loader from "react-bulma-components/lib/components/loader";
import Table from "react-bulma-components/lib/components/table";
import Pagination from "react-bulma-components/lib/components/pagination";
import { ImagePlaceholder } from "components/ImagePlaceholder";

const Actions = ({ item, options: { view } }) => {
  const { router } = useStore();
  const { t } = useTranslation();
  return (
    <Button
      onClick={() => {
        router.setView(view, { id: item._id });
      }}
    >
      {t("EDIT")}
    </Button>
  );
};

const CrossLink = ({ item, name, options }) => {
  const { t } = useTranslation();
  return (
    <Link view={options.view} query={{ [options.paramName]: item._id }}>
      {t(options.title, { count: item[name] })}
    </Link>
  );
};

const columnTypes = {
  image: ({ item, options = { size: 64 } }) => (
    <ImagePlaceholder width={options.size} url={item.imgUrl} />
  ),
  text: ({ item, name }) => <p>{item[name] || null}</p>,
  price: ({ item, name }) => (
    <p>
      <strong>{item[name].toLocaleString()}</strong> ₽
    </p>
  ),
  subitem_title: ({ item, name }) => <p>{item[name]?.title || null}</p>,
  crosslink: CrossLink,
  actions: Actions
};

const ItemBuilder = observer(({ columns, item }) => {
  return (
    <tr>
      {columns.map(column => (
        <td key={column.name}>
          {columnTypes[column.type]({ item, ...column })}
        </td>
      ))}
    </tr>
  );
});

export const ListBuilder = observer(
  ({ filter = [], columns = [], modelName = null }) => {
    const { t } = useTranslation();
    const store = useStore();
    if (!modelName) {
      return <>{t("MODEL_IS_NOT_SET")}</>;
    }
    if (!store[modelName]) {
      return <>{t("STORE_FOR_MODEL_IS_NOT_SET")}</>;
    }
    return (
      <>
        <FilterBuilder modelName={modelName} filter={filter} />
        <Columns>
          <Columns.Column>
            <Pagination
              className={"is-centered"}
              current={store[modelName].page}
              disabled={store[modelName].state === "pending"}
              total={store[modelName].totalPages}
              onChange={store[modelName].setPaging}
              delta={2}
              previous={t("PREVIOUS")}
              next={t("NEXT")}
            />
          </Columns.Column>
        </Columns>
        {store[modelName].state === "error" && (
          <Message color="error">
            <Message.Header>
              {t(`ERROR_WHILE_LOADING_${modelName.toUpperCase()}`)}
            </Message.Header>
            <Message.Body>
              <small>{store[modelName].error}</small>
              <p>{t("YOU_CAN_TRY_ONE_MORE_TIME")}</p>
              <Button onClick={() => store[modelName].pullRows()}>
                {t("TRY_AGAIN")}
              </Button>
            </Message.Body>
          </Message>
        )}
        {store[modelName].state === "pending" ? (
          <Loader />
        ) : (
          <Table striped className="center-table">
            <thead>
              <tr>
                {columns.map(field => (
                  <th key={field.name}>{t(field.title)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {store[modelName].rows.map(item => (
                <ItemBuilder columns={columns} item={item} key={item._id} />
              ))}
            </tbody>
          </Table>
        )}
      </>
    );
  }
);
