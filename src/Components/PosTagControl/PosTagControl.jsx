import React from 'react'
import { Select } from 'antd'
import wordConfig from '../../utils/wordConfig'
import './PosTagControl.scss'

import { useStoreActions } from 'easy-peasy'

export default function PosTagControl({ controlsSize }) {
  const { Option } = Select
  const options = wordConfig.post

  const setPost = useStoreActions((action) => action.request.setPost)

  return (
    <div className="PosTagControl control">
      <div className="control_top-label">Часть речи</div>
      <Select
        defaultValue={options[0].value}
        size={controlsSize}
        style={{ width: 180 }}
        onChange={(value) => setPost(value)}
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
