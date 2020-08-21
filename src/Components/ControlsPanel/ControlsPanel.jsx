import React, { useState, useEffect } from 'react'
import './ControlsPanel.scss'
import { Button } from 'antd'
import { useStoreState, useStoreActions } from 'easy-peasy'
import getUserMessages from '../../utils/getUserMessages'

import DateControl from '../DatesControl/DatesControl'
// import PosTagControl from '../PosTagControl/PosTagControl'
// import NMbrControl from '../NMbrControl/NMbrControl'
// import GNdrControl from '../GNdrControl/GNdrControl'
import UserControl from '../UserControl/UserControl'

export default function ControlsPanel() {
  const controlsSize = 'default'

  const getChat = useStoreState((state) => state.entry.chat)
  const getUser = useStoreState((state) => state.request.userFilteredBy)

  const [ch, setCh] = useState([])

  useEffect(() => {
    setCh([...getChat])
  }, [getChat])

  const doRequest = () => {
    console.log(ch)
    console.log(getUserMessages(getUser, ch))
  }

  return (
    <div className="controls-panel">
      <DateControl controlsSize={controlsSize} />
      <UserControl controlsSize={controlsSize} />
      <Button type="primary" size="middle" onClick={() => doRequest()}>
        do morpheus
      </Button>
    </div>
  )
}
