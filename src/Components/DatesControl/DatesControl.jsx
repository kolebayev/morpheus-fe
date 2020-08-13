import React, { useState, useEffect } from "react";
import {
  inputDateStyle,
  formatDateForInput,
} from "../../utils/formatDateForInput";
import { compareAsc, parse } from "date-fns";

export default function DateControl({
  defaultDates,
  setStartDate,
  setEndDate,
}) {
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [minSelectedDate, setMinSelectedDate] = useState(minDate);
  const [maxSelectedDate, setMaxSelectedDate] = useState(maxDate);
  const [rangeError, setRangeError] = useState(false);

  useEffect(() => {
    setMinDate(defaultDates.min);
    setMaxDate(defaultDates.max);
    setMinSelectedDate(defaultDates.min);
    setMaxSelectedDate(defaultDates.max);
  }, [defaultDates]);

  useEffect(() => {
    setStartDate(minSelectedDate);
  }, [minSelectedDate, setStartDate]);

  useEffect(() => {
    setEndDate(maxSelectedDate);
  }, [maxSelectedDate, setEndDate]);

  return (
    <>
      <div className="control">
        <div className="control_top-label">Начало периода</div>
        <input
          type="date"
          defaultValue={formatDateForInput(minDate)}
          min={formatDateForInput(minDate)}
          max={formatDateForInput(maxDate)}
          onChange={(e) => {
            const thisDate = parse(e.target.value, inputDateStyle, new Date());
            if (compareAsc(thisDate, maxSelectedDate) === 1) {
              setRangeError(true);
            } else {
              setMinSelectedDate(thisDate);
              setRangeError(false);
            }
          }}
        ></input>
      </div>
      <div className="control">
        <div className="control_top-label">Конец периода</div>
        <input
          type="date"
          defaultValue={formatDateForInput(maxDate)}
          max={formatDateForInput(maxDate)}
          min={formatDateForInput(minDate)}
          onChange={(e) => {
            const thisDate = parse(e.target.value, inputDateStyle, new Date());
            if (compareAsc(minSelectedDate, thisDate) === 1) {
              setRangeError(true);
            } else {
              setMaxSelectedDate(thisDate);
              setRangeError(false);
            }
          }}
        ></input>
      </div>
    </>
  );
}
