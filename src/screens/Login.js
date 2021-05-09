import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import Logo from "../logo.svg";
import { useTranslation } from "react-i18next";
import { LoginForm } from "forms/LoginForm";
import Button from "react-bulma-components/lib/components/button";
import Columns from "react-bulma-components/lib/components/columns";
import Card from "react-bulma-components/lib/components/card";

const AuthContent = styled.div`
  max-width: 660px;
  margin: auto;
  h1 {
    font-size: 18px;
  }
`;

const RightSide = styled(Columns.Column)`
  display: flex;
  place-content: center;
  flex-direction: column;
  background-size: cover;
  background-image: url(/images/photo-long-3.jpg);
`;

export const Login = observer(() => {
  const { t } = useTranslation();

  return (
    <AuthContent>
      <Card>
        <Columns>
          <Columns.Column size={6}>
            <div className="p-4">
              <div className="auth-logo mb-3">
                <img src={Logo} alt="" />
              </div>
              <h1>{t("SIGN_IN_SYSTEM")}</h1>
              <LoginForm />
            </div>
          </Columns.Column>
          <RightSide md={6}>
            <Button
              className={"m-3"}
              type="default"
              icon="mail"
              onClick={() => {
                //TODO: Восставновление добавить
              }}
            >
              {t("REQUEST_TO_RECOVERY")}
            </Button>
          </RightSide>
        </Columns>
      </Card>
    </AuthContent>
  );
});
