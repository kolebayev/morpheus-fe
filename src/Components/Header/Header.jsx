import React from 'react'
import { ReactComponent as Logo } from '../../Media/logo.svg'
import UploadJson from '../UploadJson/UploadJson'
import './Header.scss'

export default function Header() {
  return (
    <div className="header">
      <Logo style={{ marginBottom: '10px' }} />
      <UploadJson type="button" />
    </div>
  )
}
