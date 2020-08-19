// финальная выборка для запроса
// post, NMbr, GNdr, messages, startDate, endDate ...

import { action } from 'easy-peasy'

const requestModel = {
  // настройки для az.js из контролов
  word: {
    post: '',
    NMbr: '',
    GNdr: '',
  },
  // массив слов из сообщений юзера
  filteredMessages: [],
  // начало периода в запросе
  rangeStart: '',
  // конец периода в запросе
  rangeEnd: '',

  // actions
  setRangeStart: action((state, data) => {
    state.rangeStart = data
  }),

  setRangeEnd: action((state, data) => {
    state.rangeEnd = data
  }),
}

export default requestModel
