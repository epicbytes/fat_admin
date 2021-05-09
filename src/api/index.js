import qs from "qs";

const qsp = params => qs.stringify(params, { arrayFormat: "indices" });

const createCrud = (moduleName, axios) => {
  return {
    list: query => axios.get(`/${moduleName}?${qsp(query)}`),
    get: id => axios.get(`/${moduleName}/${id}`),
    create: payload => axios.post(`/${moduleName}`, payload),
    update: payload => axios.put(`/${moduleName}/${payload._id}`, payload),
    detele: id => axios.detele(`/${moduleName}/${id}`)
  };
};

export default axios => {
  const User = {
    ...createCrud("users", axios),
    login: payload => axios.post("/users/login", payload),
    check: token => axios.post(`/users/current?token=${token}`),
    list: query =>
      axios.get(`/users?${qsp({ ...query, populate: "group:title,_id" })}`)
  };

  /* PLOP_ROUTING_OBJECT */
  const Opinion = {
    ...createCrud("opinions", axios)
  };
  const Client_group = {
    ...createCrud("client_groups", axios),
    list: query =>
      axios.get(
        `/client_groups?${qsp({ ...query, populate: "clients_count" })}`
      )
  };
  const Ingridient_category = {
    ...createCrud("ingridient_categories", axios),
    list: query =>
      axios.get(
        `ingridient_categories?${qsp({
          ...query,
          populate: "ingridients_count"
        })}`
      )
  };
  const Order = {
    ...createCrud("orders", axios)
  };
  const Zone = {
    ...createCrud("zones", axios)
  };

  const Restaurant = {
    ...createCrud("restaurants", axios)
  };

  const Category = {
    ...createCrud("categories", axios),
    list: query =>
      axios.get(`categories?${qsp({ ...query, populate: "products_count" })}`)
  };

  const Modificator_category = {
    ...createCrud("modificators_categories", axios)
  };

  const List = {
    list: (category = "", query) =>
      axios.get(`/list/${category}?${qsp(query)}`),
    get: (category = "", id) => axios.get(`/list/${category}/${id}`),
    create: (category = "", payload) =>
      axios.post(`/list/${category}`, payload),
    update: (category = "", payload) =>
      axios.put(`/list/${category}/${payload._id}`, payload),
    detele: (category = "", id) => axios.detele(`/list/${category}/${id}`)
  };

  const Product = {
    ...createCrud("products", axios),
    list: query =>
      axios.get(
        `/products?${qsp({ ...query, populate: "category:title,_id" })}`
      )
  };

  const Modificator = {
    ...createCrud("modificators", axios)
  };

  const Ingridient = {
    ...createCrud("ingridients", axios),
    list: query =>
      axios.get(
        `/ingridients?${qsp({ ...query, populate: "category:title,_id" })}`
      )
  };

  const Client = {
    ...createCrud("clients", axios)
  };

  const Group = {
    ...createCrud("groups", axios),
    list: query =>
      axios.get(`/groups?${qsp({ ...query, populate: "users_count" })}`)
  };

  const File = {
    upload: (data, params) => axios.post("/files", data, params)
  };

  return {
    User,
    Group,
    Restaurant,
    Category,
    Product,
    Modificator,
    Modificator_category,
    Ingridient,
    Client,
    List,
    /* PLOP_ROUTING_OBJECT_EXPORT */
    Opinion,
    Client_group,
    Ingridient_category,
    Order,
    Zone,
    File
  };
};
