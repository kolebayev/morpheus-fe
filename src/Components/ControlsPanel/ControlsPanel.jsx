import React, { useCallback } from 'react'
import './ControlsPanel.scss'
import { Button } from 'antd'
import { useStoreState, useStoreActions } from 'easy-peasy'
import getUserMessages from '../../utils/getUserMessages'

import DateControl from '../DatesControl/DatesControl'
import PosTagControl from '../PosTagControl/PosTagControl'
import NMbrControl from '../NMbrControl/NMbrControl'
import GNdrControl from '../GNdrControl/GNdrControl'
import UserControl from '../UserControl/UserControl'

export default function ControlsPanel() {
  const controlsSize = 'default'

  const chat = useStoreState((state) => state.entry.chat)
  const userFilteredBy = useStoreState((state) => state.request.userFilteredBy)
  const setFilteredMessages = useStoreActions(
    (actions) => actions.request.setFilteredMessages
  )
  const performRequest = useStoreActions(
    (actions) => actions.request.performRequest
  )
  const word = useStoreState((state) => state.request.word)
  const filteredMessages = useStoreState(
    (state) => state.request.filteredMessages
  )
  const rangeStart = useStoreState((state) => state.request.rangeStart)
  const rangeEnd = useStoreState((state) => state.request.rangeEnd)

  const doRequest = useCallback(async () => {
    await setFilteredMessages(getUserMessages(userFilteredBy, chat))
    // performRequest({
    //   post: word.post,
    //   NMbr: word.NMbr,
    //   GNdr: word.GNdr,
    //   filteredMessages: filteredMessages,
    //   rangeStart: rangeStart,
    //   rangeEnd: rangeEnd,
    // })
  }, [
    chat,
    setFilteredMessages,
    userFilteredBy,
    // performRequest,
    // word.post,
    // word.NMbr,
    // word.GNdr,
    // filteredMessages,
    // rangeStart,
    // rangeEnd,
  ])

  return (
    <div className="controls-panel">
      <DateControl controlsSize={controlsSize} />
      <UserControl controlsSize={controlsSize} />
      <Button type="primary" size="middle" onClick={doRequest}>
        do morpheus
      </Button>
    </div>
  )
}
