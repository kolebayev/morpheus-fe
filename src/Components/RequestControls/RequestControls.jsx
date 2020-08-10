import React, { useState, useEffect, useCallback } from "react";
import { Radio, Button, Select } from "antd";
import { compareAsc, parse } from "date-fns";
import getUserMessages from "../../utils/getUserMessages";
import posConfig from "../../utils/posConfig";
import {
  inputDateStyle,
  formatDateForInput,
} from "../../utils/formatDateForInput";
import "./RequestControls.scss";

function RequestControls({ controlsOptions }) {
  const [finalUser, setFinalUser] = useState(null);
  const [posRequestOptions, setPosRequestOptions] = useState({
    post: posConfig.post[0].value,
    NMbr: posConfig.NMbr[0].value,
    GNdr: posConfig.GNdr[0].value,
  });
  // валидатор периода дат
  const [rangeError, setRangeError] = useState(false);
  // даты из чата — валидные границы
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  // выбранные даты
  //   const [minSelectedDate, setMinSelectedDate] = useState(minDate);
  //   const [maxSelectedDate, setMaxSelectedDate] = useState(minDate);
  useEffect(() => {
    setMinDate(controlsOptions.dates.min);
    setMaxDate(controlsOptions.dates.max);
    setFinalUser(controlsOptions.users[0]);
  }, [controlsOptions]);
  // //////////////////////// ———————————————————————————————————————————————

  const [user, setUser] = useState("");
  // выбранные даты
  const [minSelectedDate, setMinSelectedDate] = useState(minDate);
  const [maxSelectedDate, setMaxSelectedDate] = useState(maxDate);

  const { Option } = Select;

  return (
    <div className="request-controls">
      <div>
        <Select
          defaultValue={posConfig.post[0].value}
          style={{ width: 180 }}
          onChange={(value) =>
            setPosRequestOptions((prevState) => ({
              ...prevState,
              post: value,
            }))
          }
        >
          {posConfig.post.map((tag, i) => (
            <Option key={i} value={tag.value}>
              {tag.label}
            </Option>
          ))}
        </Select>

        <Select
          defaultValue={posConfig.NMbr[0].value}
          style={{ width: 180 }}
          onChange={(value) => {
            setPosRequestOptions((prevState) => ({
              ...prevState,
              NMbr: value,
            }));
          }}
        >
          {posConfig.NMbr.map((tag, i) => (
            <Option key={i} value={tag.value}>
              {tag.label}
            </Option>
          ))}
        </Select>

        <Select
          defaultValue={posConfig.GNdr[0].value}
          style={{ width: 180 }}
          onChange={(value) => {
            setPosRequestOptions((prevState) => ({
              ...prevState,
              GNdr: value,
            }));
          }}
        >
          {posConfig.GNdr.map((tag, i) => (
            <Option key={i} value={tag.value}>
              {tag.label}
            </Option>
          ))}
        </Select>

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

        <Radio.Group
          options={controlsOptions.users.map((user) => {
            return { label: user, value: user };
          })}
          onChange={(e) => setFinalUser(e.target.value)}
          value={finalUser}
          optionType="button"
        />
      </div>
    </div>
  );
}

export default RequestControls;
