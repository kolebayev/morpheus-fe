import React from 'react'
import './ControlsPanel.scss'
import { Button, message } from 'antd'
import { useStoreState, useStoreActions } from 'easy-peasy'

import DateControl from '../DatesControl/DatesControl'
import PosTagControl from '../PosTagControl/PosTagControl'
import NMbrControl from '../NMbrControl/NMbrControl'
import GNdrControl from '../GNdrControl/GNdrControl'
import UserControl from '../UserControl/UserControl'

export default function ControlsPanel() {
  const controlsSize = 'default'
  const messagesOfAllUers = useStoreState((state) => state.entry.chat)
  const getUser = useStoreState((state) => state.request.userFilteredBy)
  const rangeStart = useStoreState((state) => state.request.rangeStart)
  const rangeEnd = useStoreState((state) => state.request.rangeEnd)
  const word = useStoreState((state) => state.request.word)
  const setResponse = useStoreActions((action) => action.response.setResponse)
  const clearResponse = useStoreActions(
    (action) => action.response.clearResponse
  )

  const doRequest = async () => {
    let data = JSON.stringify({
      rangeStart: rangeStart,
      rangeEnd: rangeEnd,
      post: word.post,
      NMbr: word.NMbr,
      GNdr: word.GNdr,
      filteredMessages: [...messagesOfAllUers].filter(
        (message) =>
          (message.from === getUser) & (typeof message.text === 'string')
      ),
    })
    let response = await fetch('/analyze', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: data,
    })
    if (response.ok) {
      clearResponse()
      let json = await response.json()
      console.log('json.words', json)
      if ('words' in json) {
        setResponse(json.words)
      } else if ('message' in json) {
        message.info(json.message)
      }
    } else {
      console.log('Ошибка HTTP: ' + response.status)
      message.error('Ошибка HTTP: ' + response.status)
    }
  }

  return (
    <div className="controls-panel">
      <div className="controls-panel__row">
        <DateControl controlsSize={controlsSize} />
        <UserControl controlsSize={controlsSize} />
      </div>
      <div className="controls-panel__row">
        <PosTagControl controlsSize={controlsSize} />
        <NMbrControl />
        <GNdrControl />
        <Button type="primary" size="middle" onClick={() => doRequest()}>
          Do morpheus
        </Button>
      </div>
    </div>
  )
}
