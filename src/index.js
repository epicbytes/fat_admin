import React from "react";
import ReactDOM from "react-dom";
import ApplicationStore, { Provider } from "stores";
import { App } from "App";
import "rc-select/assets/index.less";
import * as serviceWorker from "./serviceWorker";
import { createGlobalStyle } from "styled-components";
import Swat from "sweetalert2";

const GlobalStyles = createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
  font-family: "Nunito";
}
.invalid-feedback {
  display: block !important;
}
a:hover {
  text-decoration: none;
}
picture{
  display:flex;
}
html,
body {
  margin: 0;
  padding: 0;
  font-family: "Nunito", sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  color: #47404f;
}

h1,
h2,
h3,
h4,
h5,
h6,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
  margin-bottom: 0.5rem;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.2;
  color: inherit;
}

ul {
  display: block;
  list-style-type: none;
  margin:0;
  padding:0;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.auth-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("/images/photo-wide-4.jpg");
  background-size: cover;
}
.error-page {
  height: 100vh;
  padding: 120px 0;
  text-align: center;
}

.center-table th {
    text-align: center;
    vertical-align: middle;
}

.center-table td {
    text-align: center;
    vertical-align: middle;
}

.mt-0 {margin-top: 0rem;}
.mt-05 {margin-top: 0.5rem;}
.pt-0 {padding-top: 0rem;}
.pt-05 {padding-top: 0.5rem;}
.ml-0 {margin-left: 0rem;}
.ml-05 {margin-left: 0.5rem;}
.pl-0 {padding-left: 0rem;}
.pl-05 {padding-left: 0.5rem;}
.mb-0 {margin-bottom: 0rem;}
.mb-05 {margin-bottom: 0.5rem;}
.pb-0 {padding-bottom: 0rem;}
.pb-05 {padding-bottom: 0.5rem;}
.mr-0 {margin-right: 0rem;}
.mr-05 {margin-right: 0.5rem;}
.pr-0 {padding-right: 0rem;}
.pr-05 {padding-right: 0.5rem;}
.mt-1 {margin-top: 1rem;}
.mt-15 {margin-top: 1.5rem;}
.pt-1 {padding-top: 1rem;}
.pt-15 {padding-top: 1.5rem;}
.ml-1 {margin-left: 1rem;}
.ml-15 {margin-left: 1.5rem;}
.pl-1 {padding-left: 1rem;}
.pl-15 {padding-left: 1.5rem;}
.mb-1 {margin-bottom: 1rem;}
.mb-15 {margin-bottom: 1.5rem;}
.pb-1 {padding-bottom: 1rem;}
.pb-15 {padding-bottom: 1.5rem;}
.mr-1 {margin-right: 1rem;}
.mr-15 {margin-right: 1.5rem;}
.pr-1 {padding-right: 1rem;}
.pr-15 {padding-right: 1.5rem;}
.mt-2 {margin-top: 2rem;}
.mt-25 {margin-top: 2.5rem;}
.pt-2 {padding-top: 2rem;}
.pt-25 {padding-top: 2.5rem;}
.ml-2 {margin-left: 2rem;}
.ml-25 {margin-left: 2.5rem;}
.pl-2 {padding-left: 2rem;}
.pl-25 {padding-left: 2.5rem;}
.mb-2 {margin-bottom: 2rem;}
.mb-25 {margin-bottom: 2.5rem;}
.pb-2 {padding-bottom: 2rem;}
.pb-25 {padding-bottom: 2.5rem;}
.mr-2 {margin-right: 2rem;}
.mr-25 {margin-right: 2.5rem;}
.pr-2 {padding-right: 2rem;}
.pr-25 {padding-right: 2.5rem;}
.mt-3 {margin-top: 3rem;}
.mt-35 {margin-top: 3.5rem;}
.pt-3 {padding-top: 3rem;}
.pt-35 {padding-top: 3.5rem;}
.ml-3 {margin-left: 3rem;}
.ml-35 {margin-left: 3.5rem;}
.pl-3 {padding-left: 3rem;}
.pl-35 {padding-left: 3.5rem;}
.mb-3 {margin-bottom: 3rem;}
.mb-35 {margin-bottom: 3.5rem;}
.pb-3 {padding-bottom: 3rem;}
.pb-35 {padding-bottom: 3.5rem;}
.mr-3 {margin-right: 3rem;}
.mr-35 {margin-right: 3.5rem;}
.pr-3 {padding-right: 3rem;}
.pr-35 {padding-right: 3.5rem;}
.mt-4 {margin-top: 4rem;}
.mt-45 {margin-top: 4.5rem;}
.pt-4 {padding-top: 4rem;}
.pt-45 {padding-top: 4.5rem;}
.ml-4 {margin-left: 4rem;}
.ml-45 {margin-left: 4.5rem;}
.pl-4 {padding-left: 4rem;}
.pl-45 {padding-left: 4.5rem;}
.mb-4 {margin-bottom: 4rem;}
.mb-45 {margin-bottom: 4.5rem;}
.pb-4 {padding-bottom: 4rem;}
.pb-45 {padding-bottom: 4.5rem;}
.mr-4 {margin-right: 4rem;}
.mr-45 {margin-right: 4.5rem;}
.pr-4 {padding-right: 4rem;}
.pr-45 {padding-right: 4.5rem;}
.mt-5 {margin-top: 5rem;}
.mt-55 {margin-top: 5.5rem;}
.pt-5 {padding-top: 5rem;}
.pt-55 {padding-top: 5.5rem;}
.ml-5 {margin-left: 5rem;}
.ml-55 {margin-left: 5.5rem;}
.pl-5 {padding-left: 5rem;}
.pl-55 {padding-left: 5.5rem;}
.mb-5 {margin-bottom: 5rem;}
.mb-55 {margin-bottom: 5.5rem;}
.pb-5 {padding-bottom: 5rem;}
.pb-55 {padding-bottom: 5.5rem;}
.mr-5 {margin-right: 5rem;}
.mr-55 {margin-right: 5.5rem;}
.pr-5 {padding-right: 5rem;}
.pr-55 {padding-right: 5.5rem;}
.mt-6 {margin-top: 6rem;}
.mt-65 {margin-top: 6.5rem;}
.pt-6 {padding-top: 6rem;}
.pt-65 {padding-top: 6.5rem;}
.ml-6 {margin-left: 6rem;}
.ml-65 {margin-left: 6.5rem;}
.pl-6 {padding-left: 6rem;}
.pl-65 {padding-left: 6.5rem;}
.mb-6 {margin-bottom: 6rem;}
.mb-65 {margin-bottom: 6.5rem;}
.pb-6 {padding-bottom: 6rem;}
.pb-65 {padding-bottom: 6.5rem;}
.mr-6 {margin-right: 6rem;}
.mr-65 {margin-right: 6.5rem;}
.pr-6 {padding-right: 6rem;}
.pr-65 {padding-right: 6.5rem;}
.mt-7 {margin-top: 7rem;}
.mt-75 {margin-top: 7.5rem;}
.pt-7 {padding-top: 7rem;}
.pt-75 {padding-top: 7.5rem;}
.ml-7 {margin-left: 7rem;}
.ml-75 {margin-left: 7.5rem;}
.pl-7 {padding-left: 7rem;}
.pl-75 {padding-left: 7.5rem;}
.mb-7 {margin-bottom: 7rem;}
.mb-75 {margin-bottom: 7.5rem;}
.pb-7 {padding-bottom: 7rem;}
.pb-75 {padding-bottom: 7.5rem;}
.mr-7 {margin-right: 7rem;}
.mr-75 {margin-right: 7.5rem;}
.pr-7 {padding-right: 7rem;}
.pr-75 {padding-right: 7.5rem;}
.mt-8 {margin-top: 8rem;}
.mt-85 {margin-top: 8.5rem;}
.pt-8 {padding-top: 8rem;}
.pt-85 {padding-top: 8.5rem;}
.ml-8 {margin-left: 8rem;}
.ml-85 {margin-left: 8.5rem;}
.pl-8 {padding-left: 8rem;}
.pl-85 {padding-left: 8.5rem;}
.mb-8 {margin-bottom: 8rem;}
.mb-85 {margin-bottom: 8.5rem;}
.pb-8 {padding-bottom: 8rem;}
.pb-85 {padding-bottom: 8.5rem;}
.mr-8 {margin-right: 8rem;}
.mr-85 {margin-right: 8.5rem;}
.pr-8 {padding-right: 8rem;}
.pr-85 {padding-right: 8.5rem;}

`;

ReactDOM.render(
  <Provider value={ApplicationStore}>
    <GlobalStyles />
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();

serviceWorker.register({
  onUpdate: registration => Swat.fire("update"),
  onSuccess: registration => Swat.fire("success")
});
