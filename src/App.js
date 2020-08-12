import React, { useState, useEffect } from "react";
import { ReactComponent as Logo } from "./Media/logo.svg";
import { Button } from "antd";
import "./App.scss";

import wordConfig from "./utils/wordConfig";
import getUserMessages from "./utils/getUserMessages";

import UploadJson from "./Components/UploadJson/UploadJson";
import PosTagControl from "./Components/PosTagControl/PosTagControl";
import NMbrControl from "./Components/NMbrControl/NMbrControl";
import GNdrControl from "./Components/GNdrControl/GNdrControl";
import DateControl from "./Components/DatesControl/DatesControl";
import UserControl from "./Components/UserControl/UserControl";

export default function App() {
  const [chat, setChat] = useState(null);
  // controls options
  const [controlUsers, setControlUsers] = useState([]);
  const [contolDates, setControlDates] = useState({});
  // final
  const [post, setPost] = useState(wordConfig.post[0].value);
  const [NMbr, setNMbr] = useState(wordConfig.NMbr[0].value);
  const [GNdr, setGNdr] = useState(wordConfig.GNdr[0].value);
  const [messages, setMessages] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if ((chat !== null) & (chat !== undefined)) {
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

      setSelectedUser(users[0]);
      setControlUsers(users);
      setControlDates({
        min: new Date(chat[0].date),
        max: new Date(chat[chat.length - 1].date),
      });
    }
  }, [chat]);

  useEffect(() => {
    if ((chat !== null) & (chat !== undefined)) {
      setMessages(getUserMessages(selectedUser, chat));
    }
  }, [selectedUser]);

  return (
    <div className="app">
      {chat === null ? (
        <div className="app_welcome">
          <div className="app_welcome_wrapper">
            <Logo style={{ marginBottom: "10px" }} />
            <UploadJson
              type="area"
              getDataFromUpload={(chat) => {
                setChat([...chat]);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="app_layout">
          <div className="app_header">
            <Logo />
            {chat != null && (
              <UploadJson
                type="button"
                getDataFromUpload={(chat) => {
                  setChat([...chat]);
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* <div class="app_header">
        <Logo style={{ marginTop: "20px" }} />
        {chat != null && (
          <UploadJson
            type="button"
            getDataFromUpload={(chat) => {
              setChat([...chat]);
            }}
          />
        )}
      </div>
      <div className="app_controls">
        {chat === null && (
          <UploadJson
            type="area"
            getDataFromUpload={(chat) => {
              setChat([...chat]);
            }}
          />
        )}
        {chat != null && (
          <div className="app_select">
            <PosTagControl setValue={(value) => setPost(value)} />
            <NMbrControl setValue={(value) => setNMbr(value)} />
            <GNdrControl setValue={(value) => setGNdr(value)} />
            <DateControl
              defaultDates={contolDates}
              setStartDate={(date) => setStartDate(date)}
              setEndDate={(date) => setEndDate(date)}
            />
            <UserControl
              users={controlUsers}
              passFinalUser={(user) => setSelectedUser(user)}
            />
            <Button
              type="primary"
              size={"default"}
              onClick={() => {
                console.log(
                  "end",
                  post,
                  NMbr,
                  GNdr,
                  messages,
                  startDate,
                  endDate
                );
              }}
            >
              Анализировать
            </Button>
          </div>
        )}
      </div> */}
    </div>
  );
}
