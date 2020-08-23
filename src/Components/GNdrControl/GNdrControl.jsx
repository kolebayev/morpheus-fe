import React from 'react'
import { Select } from 'antd'
import wordConfig from '../../utils/wordConfig'
import './GNdrControl.scss'

import { useStoreActions } from 'easy-peasy'

export default function GNdrControl({ controlsSize }) {
  const { Option } = Select
  const options = wordConfig.GNdr
  const setGNdr = useStoreActions((action) => action.request.setGNdr)

  return (
    <div className="GNdrControl control">
      <div className="control_top-label">Род</div>
      <Select
        defaultValue={options[0].value}
        size={controlsSize}
        style={{ width: 180 }}
        onChange={(value) => setGNdr(value)}
      >
        {options.map((tag, i) => (
          <Option key={i} value={tag.value}>
            {tag.label}
          </Option>
        ))}
      </Select>
    </div>
  )
}
