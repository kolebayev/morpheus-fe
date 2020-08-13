import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import JsonIcon from "../../Icons/JsonIcon";
import "./UploadJson.scss";

export default function UploadJson({ getDataFromUpload, type }) {
  const { Dragger } = Upload;
  const [fileName, setFileName] = useState("");

  const props = {
    accept: ".json",
    showUploadList: false,
    multiple: false,
    transformFile(file) {
      setFileName(file.name);
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onprogress = () => {
          console.log("reading");
        };
        reader.onloadend = () => {
          let data = JSON.parse(reader.result);
          Array.isArray(data.messages)
            ? getDataFromUpload(data.messages)
            : message.error("Ошибка в json файле");
        };
        reader.onerror = () => {
          console.log(reader.error);
          message.error("Ошибка чтения json файла");
        };
      });
    },
  };

  const button = (
    <div className="upload_button">
      <div className="upload_file-name">{fileName}</div>
      <Upload {...props}>
        <Button>
          {/* <UploadOutlined /> */}
          Загрузить другой файл
        </Button>
      </Upload>
    </div>
  );

  const area = (
    <Dragger {...props} name={fileName}>
      <div className="ant-upload-drag-icon">
        <JsonIcon />
      </div>
      <div className="ant-upload-text">
        Кликни по зоне <br />
        или перетащи в неё json файл
      </div>
    </Dragger>
  );

  return {
    button,
    area,
  }[type];
}
