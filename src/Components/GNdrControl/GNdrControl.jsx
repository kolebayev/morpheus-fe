import React from "react";
import { Select } from "antd";
import wordConfig from "../../utils/wordConfig";
import "./GNdrControl.scss";

export default function GNdrControl({ setValue }) {
  const { Option } = Select;
  const options = wordConfig.GNdr;

  return (
    <div className="GNdrControl">
      <Select
        defaultValue={options[0].value}
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
