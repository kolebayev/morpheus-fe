import React from "react";
import "./UploadJson.scss";

export default function UploadJson({ getDataFromUpload }) {
  const readFile = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onprogress = () => {
      console.log("reading");
    };
    reader.onload = () => {
      // data = array of objects
      let data = JSON.parse(reader.result);
      // console.log(Array.isArray(data.messages));
      // console.log(data.messages);
      console.log("read", data.messages);
      getDataFromUpload(data.messages);
    };
    reader.onerror = () => {
      console.log(reader.error);
    };
  };

  return (
    <div className="UploadJson">
      <input type="file" accept=".json" onChange={readFile} />
    </div>
  );
}
