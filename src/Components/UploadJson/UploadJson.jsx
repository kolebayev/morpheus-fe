import React, { useState } from "react";
import { Upload, Button } from "antd";
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
          getDataFromUpload(data.messages);
        };
        reader.onerror = () => {
          console.log(reader.error);
        };
      });
    },
  };

  return (
    <>
      {type === "button" && (
        <Upload {...props}>
          <Button>
            {/* <UploadOutlined /> */}
            Загрузить другой файл
          </Button>
        </Upload>
      )}
      {type === "area" && (
        <Dragger {...props} name={fileName}>
          <div className="ant-upload-drag-icon">
            <JsonIcon />
          </div>
          <div className="ant-upload-text">
            Кликни по зоне <br />
            или перетащи в неё json файл
          </div>
        </Dragger>
      )}
    </>
  );
}
