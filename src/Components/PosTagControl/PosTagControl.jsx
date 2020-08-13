import React from "react";
import { Select } from "antd";
import wordConfig from "../../utils/wordConfig";
import "./PosTagControl.scss";

export default function PosTagControl({ setValue, size }) {
  const { Option } = Select;
  const options = wordConfig.post;

  return (
    <div className="PosTagControl control">
      <div className="control_top-label">Часть речи</div>
      <Select
        defaultValue={options[0].value}
        size={size}
        style={{ width: 180 }}
        onChange={(value) => setValue(value)}
      >
        {options.map((tag, i) => (
          <Option key={i} value={tag.value}>
            {tag.label}
          </Option>
        ))}
      </Select>
    </div>
  );
}
