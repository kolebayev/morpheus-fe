import React, { useState, useEffect } from "react";
import { Radio, Button, Select, DatePicker } from "antd";
import { compareAsc, parse, format } from "date-fns";
import getUserMessages from "../../utils/getUserMessages";
import posConfig from "../../utils/posConfig";
import {
  inputDateStyle,
  formatDateForInput,
} from "../../utils/formatDateForInput";
import "./RequestControls.scss";

function RequestControls({ controlsOptions }) {
  //   const { Option } = Select;
  const { RangePicker } = DatePicker;
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
  const [dateReset, setDateReset] = useState(false);
  // выбранные даты
  //   const [minSelectedDate, setMinSelectedDate] = useState(minDate);
  //   const [maxSelectedDate, setMaxSelectedDate] = useState(minDate);

  // //////////////////////// ———————————————————————————————————————————————

  // выбранные даты
  const [minSelectedDate, setMinSelectedDate] = useState(minDate);
  const [maxSelectedDate, setMaxSelectedDate] = useState(maxDate);

  useEffect(() => {
    setMinDate(controlsOptions.dates.min);
    setMaxDate(controlsOptions.dates.max);
    setMinSelectedDate(controlsOptions.dates.min);
    setMaxSelectedDate(controlsOptions.dates.max);
    setFinalUser(controlsOptions.users[0]);
    if (
      parse(minSelectedDate, inputDateStyle, new Date()) !==
        parse(minDate, inputDateStyle, new Date()) ||
      parse(maxSelectedDate, inputDateStyle, new Date()) !==
        parse(maxDate, inputDateStyle, new Date())
    ) {
      setDateReset(false);
    }
  }, [controlsOptions]);

  //   useEffect(() => {
  //     if (!dateReset) {
  //       setMinSelectedDate(minDate);
  //       setMaxSelectedDate(maxDate);
  //     }
  //   }, [dateReset]);

  //   useEffect(() => {
  //   console.log(
  //     format(minSelectedDate, inputDateStyle, new Date()),
  //     format(minDate, inputDateStyle, new Date()),
  //     format(maxSelectedDate, inputDateStyle, new Date()),
  //     format(maxDate, inputDateStyle, new Date())
  //   );
  //     if (
  //       parse(minSelectedDate, inputDateStyle, new Date()) !==
  //         parse(minDate, inputDateStyle, new Date()) ||
  //       parse(maxSelectedDate, inputDateStyle, new Date()) !==
  //         parse(maxDate, inputDateStyle, new Date())
  //     ) {
  //       setDateReset(false);
  //     }
  //   }, [minDate, maxDate, minSelectedDate, maxSelectedDate]);

  return (
    <div className="request-controls">
      <div>
        {/* <Select
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
        </Select> */}

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
                setDateReset(true);
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
                setDateReset(true);
              }
            }}
          ></input>
          <RangePicker />
          {rangeError && <span>range error</span>}
          {dateReset && (
            <Button
              type="link"
              size={"default"}
              onClick={() => {
                setMinSelectedDate(minDate);
                setMaxSelectedDate(maxDate);
                setDateReset(false);
              }}
            >
              даты по умолчанию
            </Button>
          )}
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
