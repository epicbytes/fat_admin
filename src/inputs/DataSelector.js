import React from "react";
import { observer } from "mobx-react";

export const DataSelector = observer(props => {
  const { field } = props;
  return <input type={"hidden"} {...field} />;
});
