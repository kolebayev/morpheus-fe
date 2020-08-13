import React from "react";
import { Select } from "antd";
import wordConfig from "../../utils/wordConfig";
import "./NMbrControl.scss";

export default function NMbrControl({ setValue, size }) {
  const { Option } = Select;
  const options = wordConfig.NMbr;

  return (
    <div className="NMbrControl control">
      <div className="control_top-label">Число</div>
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
