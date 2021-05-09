import React from "react";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react";

export const ErrorLayout = observer(({ children }) => (
  <React.Fragment>
    <Helmet>
      <body className="error-page" />
    </Helmet>
    {children}
  </React.Fragment>
));
