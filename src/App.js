import React, { useState, useEffect } from "react";
import UploadJson from "./Components/UploadJson/UploadJson";
import RequestControls from "./Components/RequestControls/RequestControls";
import { ReactComponent as Logo } from "./Media/logo.svg";
// import wordConfig from "./utils/wordConfig";
import getUserMessages from "./utils/getUserMessages";
import "./App.scss";

import PosTagControl from "./Components/PosTagControl/PosTagControl";

function App() {
  const [chat, setChat] = useState(null);
  const [controlsOptions, setControlsOptions] = useState({
    users: [],
    dates: { min: new Date(), max: new Date() },
  });
  const [finalOptions, setFinalOptions] = useState({
    post: "",
    NMbr: "",
    GNdr: "",
    messages: [],
    startDate: new Date(),
    endDate: new Date(),
  });
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (chat != null) {
      console.log("123", chat);
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

  useEffect(() => {
    selectedUser &&
      setFinalOptions((prevState) => ({
        ...prevState,
        messages: getUserMessages(selectedUser, chat),
      }));
  }, [selectedUser, chat]);

  return (
    <div className="app">
      <Logo style={{ marginTop: "20px" }} />
      <div className="app_controls">
        <UploadJson
          getDataFromUpload={(chat) => {
            setChat([...chat]);
          }}
        />
        {chat != null && (
          <PosTagControl postValue={(value) => setFinalOptions(value)} />
          // <PosTagControl />
        )}
      </div>
    </div>
  );
}

export default App;
