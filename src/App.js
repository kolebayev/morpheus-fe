import React from 'react'
// import "./App.scss";
import { useStoreState } from 'easy-peasy'
import './App.less'

import Welcome from './Components/Welcome/Welcome'
import Header from './Components/Header/Header'
import ControlsPanel from './Components/ControlsPanel/ControlsPanel'

export default function App() {
  const chatLength = useStoreState((state) => state.entry.chat.length)
  const response = useStoreState((state) => state.response.words)
  return (
    <div className="app">
      {chatLength === 0 ? (
        <Welcome />
      ) : (
        <>
          <div className="app__fixed-top">
            <div className="app__layout">
              <Header />
              <ControlsPanel />
            </div>
          </div>
          <div className="app__layout app__result">
            {response.length !== 0 &&
              response.map((el, i) => {
                return (
                  <div className="app__result_text" key={i}>
                    <div className="app__result_text_date">{el.date}</div>
                    <div className="app__result_text_word">{el.text}</div>
                  </div>
                )
              })}
          </div>
        </>
      )}
    </div>
  )
}
