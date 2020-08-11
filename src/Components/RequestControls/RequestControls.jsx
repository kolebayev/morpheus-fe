import React, { useState, useEffect } from "react";
import { Radio, Button, Select, DatePicker } from "antd";
import { compareAsc, parse, format } from "date-fns";
import getUserMessages from "../../utils/getUserMessages";
import wordConfig from "../../utils/wordConfig";
import {
  inputDateStyle,
  formatDateForInput,
} from "../../utils/formatDateForInput";
import "./RequestControls.scss";

import PosTagControl from "../PosTagControl/PosTagControl";
// import NumberControl from "../NumberControl/NumberControl";
// import GenderControl from "../GenderControl/GenderControl";
// import UserControl from "../UserControl/UserControl";

function RequestControls({ controlsOptions }) {
  const [postValue, setPostValue] = useState("");
  return (
    <PosTagControl
      options={wordConfig.post}
      postValue={(value) => setPostValue(value)}
    />
  );
}

export default RequestControls;
