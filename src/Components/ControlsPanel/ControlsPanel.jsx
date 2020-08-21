import React, { useCallback } from 'react'
import './ControlsPanel.scss'
import { Button } from 'antd'
import { useStoreState, useStoreActions } from 'easy-peasy'
// import getUserMessages from '../../utils/getUserMessages'

import DateControl from '../DatesControl/DatesControl'
import PosTagControl from '../PosTagControl/PosTagControl'
import NMbrControl from '../NMbrControl/NMbrControl'
import GNdrControl from '../GNdrControl/GNdrControl'
import UserControl from '../UserControl/UserControl'

export default function ControlsPanel() {
  const controlsSize = 'default'

  const chat = useStoreState((state) => state.entry.chat)
  const userFilteredBy = useStoreState((state) => state.request.userFilteredBy)

  const word = useStoreState((state) => state.request.word)
  const rangeStart = useStoreState((state) => state.request.rangeStart)
  const rangeEnd = useStoreState((state) => state.request.rangeEnd)

  const getUserMessages = (user, chat) => {
    // выбирает сообщения конкретного юзера
    let messages = chat.filter(
      (message) => (message.from === user) & (typeof message.text === 'string')
    )
    // удаляет ненужные ключи из каждого объекта сообщений
    const validKeys = ['date', 'text']
    messages.forEach((el) => {
      Object.keys(el).forEach(
        (key) => validKeys.includes(key) || delete el[key]
      )
    })
    // разбивает сообщения на слова и создает новый пословный массив объектов
    // очищает сообщения от знаков препинания и цифр, оставляет только русские буквы
    let messagesOneByOne = []
    messages.forEach((message) => {
      let words = message.text.split(' ')
      const leaveOnlyLetters = new RegExp(/[^а-яА-Я-]+/g)
      messagesOneByOne.push(
        ...words.map((word) => {
          return {
            date: message.date,
            text: word.replace(leaveOnlyLetters, ''),
          }
        })
      )
    })
    // убирает пустые сообщения
    let clear = messagesOneByOne.filter((item) => {
      return item.text !== ''
    })

    return clear
  }

  const doRequest = () => {
    console.log('——————————')
    console.log('userFilteredBy', userFilteredBy)
    console.log('chat', chat)
    console.log('getUserMessages', getUserMessages(userFilteredBy, chat))
    console.log('doRequest')
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
