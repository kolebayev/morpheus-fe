import React, { useState } from "react";
import { Select } from "antd";
import wordConfig from "../../utils/wordConfig";
import "./PosTagControl.scss";

function PosTagControl({ postValue }) {
  const { Option } = Select;
  //   const [posRequestOptions, setPosRequestOptions] = useState({
  //     post: posConfig.post[0].value,
  //     NMbr: posConfig.NMbr[0].value,
  //     GNdr: posConfig.GNdr[0].value,
  //   });
  const [pos, setPos] = useState(null);

  return (
    <div className="PosTagControl">
      <Select
        defaultValue={wordConfig.post[0].value}
        style={{ width: 180 }}
        onChange={(value) => postValue(value)}
      >
        {wordConfig.post.map((tag, i) => (
          <Option key={i} value={tag.value}>
            {tag.label}
          </Option>
        ))}
      </Select>

      {/* <Select
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
    </div>
  );
}

export default PosTagControl;
