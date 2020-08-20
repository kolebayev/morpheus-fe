import React from 'react'
// import "./App.scss";
import './App.less'

import Welcome from './Components/Welcome/Welcome'
import Header from './Components/Header/Header'
import ControlsPanel from './Components/ControlsPanel/ControlsPanel'
import { useStoreState } from 'easy-peasy'

export default function App() {
  const chatLength = useStoreState((state) => state.entry.chat.length)
  return (
    <div className="app">
      {chatLength === 0 ? (
        <Welcome />
      ) : (
        <>
          <Header />
          <ControlsPanel />
        </>
      )}
    </div>
  )
}
