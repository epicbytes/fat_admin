import React from "react";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react";

export const AuthLayout = observer(({ children }) => (
  <React.Fragment>
    <Helmet>
      <body className="auth-page" />
    </Helmet>
    {children}
  </React.Fragment>
));
