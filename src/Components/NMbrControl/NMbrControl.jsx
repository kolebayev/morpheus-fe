import React from "react";
import { Select } from "antd";
import wordConfig from "../../utils/wordConfig";
import "./NMbrControl.scss";

export default function NMbrControl({ setValue }) {
  const { Option } = Select;
  const options = wordConfig.NMbr;

  return (
    <div className="NMbrControl">
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
