import React, { useState, useEffect } from "react";
import UploadJson from "./Components/UploadJson/UploadJson";
import RequestControls from "./Components/RequestControls/RequestControls";
import { ReactComponent as Logo } from "./Media/logo.svg";
import "./App.scss";

function App() {
  const [chat, setChat] = useState(null);
  const [status, setStatus] = useState(null);
  // const [users, setUsers] = useState([]);
  // const [posOptions, setOptions] = useState({});
  const [controlsOptions, setControlsOptions] = useState({
    users: [],
    dates: { min: new Date(), max: new Date() },
  });

  useEffect(() => {
    if (chat != null) {
      let users = [
        ...new Set(
          chat.map((msg) => {
            if (
              ("from" in msg) &
              (msg.from !== undefined) &
              (msg.from !== null)
            ) {
              return msg.from;
            }
          })
        ),
      ].filter((user) => user !== undefined);

      setControlsOptions({
        users: users.map((user) => {
          return user;
        }),
        dates: {
          min: new Date(chat[0].date),
          max: new Date(chat[chat.length - 1].date),
        },
      });
    }
  }, [chat]);

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
        {chat != null && <RequestControls controlsOptions={controlsOptions} />}
      </div>
    </div>
  );
}

export default App;
