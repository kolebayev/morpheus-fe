// финальная выборка для запроса
// post, NMbr, GNdr, messages, startDate, endDate ...

import { action, thunk } from 'easy-peasy'

const requestModel = {
  // настройки для az.js из контролов
  word: {
    post: 'NOUN',
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

  performRequest: thunk(async (actions, payload) => {
    let data = JSON.stringify({ ...payload })

    let response = await fetch('/analyze', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: data,
    })
    if (response.ok) {
      let json = await response.json()
      console.log('json.words', json.words)
    } else {
      console.log('Ошибка HTTP: ' + response.status)
    }
  }),
}

export default requestModel
