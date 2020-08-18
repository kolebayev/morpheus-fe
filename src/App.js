import React, { useState, useEffect } from 'react'
import { ReactComponent as Logo } from './Media/logo.svg'
import { Button, Spin } from 'antd'
// import "./App.scss";
import './App.less'

import Welcome from './Components/Welcome/Welcome'

import wordConfig from './utils/wordConfig'
import getUserMessages from './utils/getUserMessages'

import UploadJson from './Components/UploadJson/UploadJson'
import PosTagControl from './Components/PosTagControl/PosTagControl'
import NMbrControl from './Components/NMbrControl/NMbrControl'
import GNdrControl from './Components/GNdrControl/GNdrControl'
import DateControl from './Components/DatesControl/DatesControl'
import UserControl from './Components/UserControl/UserControl'

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState([])
  const [chat, setChat] = useState(null)
  // controls options
  const [controlUsers, setControlUsers] = useState([])
  const [contolDates, setControlDates] = useState({})
  // final
  const [post, setPost] = useState(wordConfig.post[0].value)
  const [NMbr, setNMbr] = useState(wordConfig.NMbr[0].value)
  const [GNdr, setGNdr] = useState(wordConfig.GNdr[0].value)
  const [messages, setMessages] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [selectedUser, setSelectedUser] = useState(null)

  const controlsSize = 'default'

  // useEffect(() => {
  //   if ((chat !== null) & (chat !== undefined)) {
  //     let users = [
  //       ...new Set(
  //         chat.map((msg) => {
  //           if (
  //             ('from' in msg) &
  //             (msg.from !== undefined) &
  //             (msg.from !== null)
  //           ) {
  //             return msg.from
  //           }
  //         })
  //       ),
  //     ].filter((user) => user !== undefined)

  //     setSelectedUser(users[0])
  //     setControlUsers(users)
  //     setControlDates({
  //       min: new Date(chat[0].date),
  //       max: new Date(chat[chat.length - 1].date),
  //     })
  //   }
  // }, [chat])

  // useEffect(() => {
  //   if ((chat !== null) & (chat !== undefined)) {
  //     setMessages(getUserMessages(selectedUser, chat))
  //   }
  // }, [selectedUser])

  return (
    <div className="app">
      <Welcome />
      {/* {chat === null ? (
        <div className="app_welcome">
          <div className="app_welcome_wrapper">
            <Logo style={{ marginBottom: '10px' }} />
            <UploadJson
              type="area"
              getDataFromUpload={(chat) => {
                setChat([...chat])
              }}
              doSetIsLoading={(state) => setIsLoading(state)}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="app_fixed-top">
            <div className="app_layout">
              <div className="app_header">
                <Logo />
                {chat != null && (
                  <UploadJson
                    type="button"
                    getDataFromUpload={(chat) => {
                      setChat([...chat])
                    }}
                    doSetIsLoading={(state) => setIsLoading(state)}
                  />
                )}
              </div>
              <div className="app_controls">
                <div className="app_controls_section">
                  <PosTagControl
                    size={controlsSize}
                    setValue={(value) => setPost(value)}
                  />
                  <NMbrControl
                    size={controlsSize}
                    setValue={(value) => setNMbr(value)}
                  />
                  <GNdrControl
                    size={controlsSize}
                    setValue={(value) => setGNdr(value)}
                  />
                </div>
                <div className="app_controls_section">
                  <DateControl
                    defaultDates={contolDates}
                    setStartDate={(date) => setStartDate(date)}
                    setEndDate={(date) => setEndDate(date)}
                  />
                  <UserControl
                    users={controlUsers}
                    passFinalUser={(user) => setSelectedUser(user)}
                  />
                  <Button
                    type="primary"
                    size={controlsSize}
                    onClick={async () => {
                      setIsLoading(true)
                      setResult([])
                      let data = JSON.stringify({
                        post,
                        NMbr,
                        GNdr,
                        messages,
                        startDate,
                        endDate,
                      })

                      let response = await fetch('/analyze', {
                        method: 'POST',
                        headers: {
                          'Content-type': 'application/json',
                        },
                        body: data,
                      })
                      if (response.ok) {
                        let json = await response.json()
                        setIsLoading(false)
                        setResult([...json.words])
                      } else {
                        console.log('Ошибка HTTP: ' + response.status)
                      }
                    }}
                  >
                    Морфиусировать
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="app_layout app_result">
            {result &&
              result.map((res, i) => (
                <div className="app_result__text" key={i}>
                  <div className="app_result__text__date">{res.date}</div>
                  <div className="app_result__text__word">{res.text}</div>
                </div>
              ))}
            {isLoading === true && <Spin size="large" />}
          </div>
        </>
      )} */}
    </div>
  )
}
