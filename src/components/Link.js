import React from "react";
import { observer } from "mobx-react";
import { useStore } from "stores";

export const Link = observer(({ view, params, query, children, className }) => {
  const { router } = useStore();

  const clickLink = e => {
    e.preventDefault();
    router.setView(view, params, query);
  };

  return (
    <a
      href={router.getByName(view)?.formatUrl(params, query)}
      onClick={clickLink}
      className={className}
    >
      <div>{children}</div>
    </a>
  );
});
