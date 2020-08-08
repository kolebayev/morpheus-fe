import React, { useState, useEffect, useCallback } from "react";
import UploadJson from "./Components/UploadJson/UploadJson";
import RequestControls from "./Components/RequestControls/RequestControls";
import { ReactComponent as Logo } from "./Media/logo.svg";
import "./App.scss";

function App() {
  const [chat, setChat] = useState(null);
  const [status, setStatus] = useState(null);

  return (
    <div className="app">
      <Logo style={{ marginTop: "20px" }} />
      <div className="app_controls">
        <UploadJson
          getDataFromUpload={(messages) => {
            setChat(messages);
          }}
          doSetStatus={(statusName) => setStatus(statusName)}
        />
        {chat && <RequestControls chat={chat} />}
      </div>
    </div>
  );
}

export default App;
