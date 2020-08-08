import React, { useState, useEffect, useCallback } from "react";
import "./UploadJson.scss";

function UploadJson({ getDataFromUpload, doSetStatus }) {
  const readFile = (e) => {
    // getDataFromUpload(null);
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onprogress = () => {
      // console.log("reading");
      doSetStatus("isProcessing");
    };
    reader.onload = () => {
      // data = array of objects
      let data = JSON.parse(reader.result);
      getDataFromUpload(data.messages);
      doSetStatus("chooseUser");
      // console.log("ready");
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

export default UploadJson;
