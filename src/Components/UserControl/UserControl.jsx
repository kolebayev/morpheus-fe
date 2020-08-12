import React, { useState, useEffect } from "react";
import { Radio } from "antd";
import "./UserControl.scss";

export default function UserControl({ users, passFinalUser }) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(users[0]);
  }, [users]);

  //   useEffect(() => {
  //     passFinalUser(value);
  //   }, [value]);

  return (
    <div className="UserControl">
      <Radio.Group
        options={users.map((user) => {
          return { label: user, value: user };
        })}
        onChange={(e) => {
          passFinalUser(e.target.value);
          setValue(e.target.value);
        }}
        value={value}
        optionType="button"
      />
    </div>
  );
}
