import React from "react";
import { observer } from "mobx-react";

export const HiddenInput = observer(props => {
  const { field } = props;
  return <input {...field} type={"hidden"} />;
});
