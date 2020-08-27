import React from 'react'
// import "./App.scss";
import { useStoreState } from 'easy-peasy'
import './App.less'

import Welcome from './Components/Welcome/Welcome'
import Header from './Components/Header/Header'
import ControlsPanel from './Components/ControlsPanel/ControlsPanel'
import Result from './Components/Result/Result'

export default function App() {
  const chatLength = useStoreState((state) => state.entry.chat.length)
  const innerWidth = window.innerWidth

  const mainContent =
    chatLength === 0 ? (
      <Welcome />
    ) : (
      <>
        <div className="app__fixed-top">
          <div className="app__layout">
            <Header />
            <ControlsPanel />
          </div>
        </div>
        <div className="app__layout">
          <Result />
        </div>
      </>
    )

  return (
    <div className="app">
      {innerWidth < 1000 ? (
        <div className="app__mobile-warning">
          Сервис не поддерживает мобильные устройства.
          <br />
          Зайдите с ПК
        </div>
      ) : (
        mainContent
      )}
    </div>
  )
}
