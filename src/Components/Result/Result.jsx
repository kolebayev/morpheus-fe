import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import './Result.scss'

import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

export default function Result() {
  const words = useStoreState((state) => state.response.words)
  const rowClassName = (i) => {
    return `result_text result_wrapper ${i % 2 === 0 && 'result_stripe'}`
  }
  const removeFromList = useStoreActions(
    (action) => action.response.removeFromList
  )
  return (
    <div className="result">
      {words.length !== 0 &&
        words.map((word, i) => {
          return (
            <div className={rowClassName(i)} key={i}>
              <Button
                type="dashed"
                icon={<CloseOutlined />}
                size="small"
                onClick={() => removeFromList(i)}
              />
              <div className="result_text_date">{word.date}</div>
              <div className="result_text_word">{word.text}</div>
            </div>
          )
        })}
    </div>
  )
}
