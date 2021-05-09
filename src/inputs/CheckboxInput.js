import React from "react";
import { observer } from "mobx-react";
import { NavigatorBaseField } from "./NavigatorBaseField";
import "bulma-checkradio/dist/css/bulma-checkradio.min.css";

export const CheckboxInput = observer(props => (
  <NavigatorBaseField
    {...props}
    render={({ field }) => (
      <div className="field">
        <input
          {...field}
          className="is-checkradio is-info"
          type="checkbox"
          checked={field.value}
        />
        <label htmlFor={field.id}></label>
      </div>
    )}
  />
));
