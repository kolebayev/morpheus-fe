import React from "react";
import { Select } from "antd";
import wordConfig from "../../utils/wordConfig";
import "./PosTagControl.scss";

export default function PosTagControl({ setValue }) {
  const { Option } = Select;
  const options = wordConfig.post;

  return (
    <div className="PosTagControl">
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
