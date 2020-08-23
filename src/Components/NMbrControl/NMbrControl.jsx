import React from 'react'
import { Select } from 'antd'
import wordConfig from '../../utils/wordConfig'
import './NMbrControl.scss'

import { useStoreActions } from 'easy-peasy'

export default function NMbrControl({ controlsSize }) {
  const { Option } = Select
  const options = wordConfig.NMbr
  const setNMbr = useStoreActions((action) => action.request.setNMbr)
  return (
    <div className="NMbrControl control">
      <div className="control_top-label">Число</div>
      <Select
        defaultValue={options[0].value}
        size={controlsSize}
        style={{ width: 180 }}
        onChange={(value) => setNMbr(value)}
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
