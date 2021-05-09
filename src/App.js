import React from "react";
import { observer } from "mobx-react";
import { useStore } from "stores";
import { Router } from "components/Router";

export const App = observer(() => {
  const { router } = useStore();
  return <Router router={router} />;
});
