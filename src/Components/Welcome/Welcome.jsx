import React from 'react'
import { ReactComponent as Logo } from '../../Media/logo.svg'
import UploadJson from '../UploadJson/UploadJson'
import './Welcome.scss'

export default function Welcome() {
  return (
    <div className="welcome">
      <div className="welcome_wrapper">
        <Logo style={{ marginBottom: '10px' }} />
        <UploadJson type="area" />
      </div>
    </div>
  )
}
