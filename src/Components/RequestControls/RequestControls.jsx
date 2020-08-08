import React, { useState, useEffect, useCallback } from "react";
import { Radio, Button } from "antd";
import { compareAsc, parse } from "date-fns";
import getUserMessages from "../../utils/getUserMessages";
import requestConfig from "../../utils/requestConfig";
import {
  inputDateStyle,
  formatDateForInput,
} from "../../utils/formatDateForInput";
import "./RequestControls.scss";

function RequestControls({ chat }) {
  const [users, setUsers] = useState([]);
  const [userMessages, setUserMessages] = useState([]);

  const [pos, setPos] = useState("noun");
  // валидатор периода дат
  const [rangeError, setRangeError] = useState(false);
  // даты из чата — валидные границы
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  // выбранные даты
  const [minSelectedDate, setMinSelectedDate] = useState(minDate);
  const [maxSelectedDate, setMaxSelectedDate] = useState(minDate);

  useEffect(() => {
    if (chat !== null) {
      // define users
      let tempUsers = [];
      chat.forEach((el) => {
        "from" in el && tempUsers.push(el.from);
      });
      setUsers([...new Set(tempUsers)]);
      setMinDate(new Date(chat[0].date));
      setMaxDate(new Date(chat[chat.length - 1].date));
    }
  }, [chat]);

  return (
    <div className="request-controls">
      <div className="">
        <Radio.Group
          options={requestConfig.pos}
          onChange={(e) => setPos(e.target.value)}
          value={requestConfig.pos[0].value}
          buttonStyle="solid"
          optionType="button"
        />
        <div>
          <input
            type="date"
            defaultValue={formatDateForInput(minDate)}
            min={formatDateForInput(minDate)}
            max={formatDateForInput(maxDate)}
            onChange={(e) => {
              const thisDate = parse(
                e.target.value,
                inputDateStyle,
                new Date()
              );
              if (compareAsc(thisDate, maxSelectedDate) === 1) {
                setRangeError(true);
              } else {
                setMinSelectedDate(thisDate);
                setRangeError(false);
              }
            }}
          ></input>
          <input
            type="date"
            defaultValue={formatDateForInput(maxDate)}
            max={formatDateForInput(maxDate)}
            min={formatDateForInput(minDate)}
            onChange={(e) => {
              const thisDate = parse(
                e.target.value,
                inputDateStyle,
                new Date()
              );
              if (compareAsc(minSelectedDate, thisDate) === 1) {
                setRangeError(true);
              } else {
                setMaxSelectedDate(thisDate);
                setRangeError(false);
              }
            }}
          ></input>
          {rangeError && <span>range error</span>}
          <Button type="link" size={"default"}>
            даты по умолчанию
          </Button>
        </div>
        {users.map((el, i) => (
          <button
            className="app_button"
            onClick={() => {
              // setStatus("isProcessing");
              // findMessages(el);
              setUserMessages(getUserMessages(el, chat));
            }}
            key={i}
          >
            {el}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RequestControls;
