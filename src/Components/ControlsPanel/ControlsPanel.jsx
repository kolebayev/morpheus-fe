import React from 'react'
import './ControlsPanel.scss'
import { Button } from 'antd'
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
  const performRequest = useStoreActions(
    (action) => action.request.performRequest
  )
  const rangeStart = useStoreState((state) => state.request.rangeStart)
  const rangeEnd = useStoreState((state) => state.request.rangeEnd)
  const word = useStoreState((state) => state.request.word)

  const doRequest = () => {
    performRequest({
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
  }

  return (
    <div className="controls-panel">
      <DateControl controlsSize={controlsSize} />
      <UserControl controlsSize={controlsSize} />
      <div>
        <PosTagControl controlsSize={controlsSize} />
        <NMbrControl />
        <GNdrControl />
      </div>
      <Button type="primary" size="middle" onClick={() => doRequest()}>
        do morpheus
      </Button>
    </div>
  )
}
