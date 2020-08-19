import React from 'react'
import './ControlsPanel.scss'

import DateControl from '../DatesControl/DatesControl'

export default function ControlsPanel() {
  const controlsSize = 'default'
  return (
    <div className="controls-panel">
      <DateControl controlsSize={controlsSize} />
    </div>
  )
}
