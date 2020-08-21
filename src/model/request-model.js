// финальная выборка для запроса
// post, NMbr, GNdr, messages, startDate, endDate ...

import { action, thunk } from 'easy-peasy'
import getUserMessages from '../utils/getUserMessages'

const requestModel = {
  // настройки для az.js из контролов
  word: {
    post: 'noun',
    NMbr: 'sing',
    GNdr: 'masc',
  },
  // массив слов из сообщений юзера
  filteredMessages: [],
  // начало периода в запросе
  rangeStart: '',
  // конец периода в запросе
  rangeEnd: '',

  // юзер, по которому собраны сообщения
  // на бэк не отправляется
  userFilteredBy: '',

  // actions
  setRangeStart: action((state, data) => {
    state.rangeStart = data
  }),

  setRangeEnd: action((state, data) => {
    state.rangeEnd = data
  }),

  setUserFilteredBy: action((state, data) => {
    state.userFilteredBy = data
  }),

  setFilteredMessages: action((state, data) => {
    state.filteredMessages.length = 0
    let filteredArray = getUserMessages(data[0], [...data[1]])
    state.filteredMessages.push(...filteredArray)
  }),

  performRequest: thunk(async (actions, payload) => {
    console.log('payload', payload)

    let data = JSON.stringify(payload)

    let response = await fetch('/analyze', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: data,
    })
    if (response.ok) {
      let json = await response.json()
      console.log(json.words)
    } else {
      console.log('Ошибка HTTP: ' + response.status)
    }
  }),
}

export default requestModel
