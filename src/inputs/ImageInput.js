import React, { useState } from "react";
import { observer } from "mobx-react";
import { NavigatorBaseField } from "./NavigatorBaseField";
import { useStore } from "stores";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import Button from "react-bulma-components/lib/components/button";
import Card from "react-bulma-components/lib/components/card";
import Progress from "react-bulma-components/lib/components/progress";

const ThisInput = ({ field }) => {
  const { app } = useStore();
  const { t } = useTranslation();
  const [percent, setPercent] = useState(0);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop: async acceptedFiles => {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      const uploadedFile = await app.uploadFile(formData, {
        onUploadProgress: function(progressEvent) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setPercent(percentCompleted);
        },
        headers: {
          "content-type": "multipart/form-data"
        }
      });
      let result = uploadedFile?.id;
      field.onChange(result);
    }
  });
  return (
    <Card>
      {field.value && (
        <Card.Image size="4by3" src={`${app.baseUrl}/files/${field.value}`} />
      )}
      <Card.Content>
        <center {...getRootProps()}>
          <input {...getInputProps()} />
          {!field.value && <p>{t("DROP_HERE_OR_CLICK_UPLOAD_FILE_BUTTON")}</p>}
          <Button>
            {t(field.value ? "UPLOAD_ANOTHER_FILE" : "UPLOAD_FILE")}
          </Button>
          {percent > 0 && (
            <Progress className="mt-2" max={100} value={percent} color="info" />
          )}
        </center>
      </Card.Content>
    </Card>
  );
};

export const ImageInput = observer(props => {
  return (
    <NavigatorBaseField
      {...props}
      render={({ field }) => <ThisInput field={field} />}
    />
  );
});
