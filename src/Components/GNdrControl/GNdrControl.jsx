import React from "react";
import { Select } from "antd";
import wordConfig from "../../utils/wordConfig";
import "./GNdrControl.scss";

export default function GNdrControl({ setValue, size }) {
  const { Option } = Select;
  const options = wordConfig.GNdr;

  return (
    <div className="GNdrControl control">
      <div className="control_top-label">Род</div>
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
