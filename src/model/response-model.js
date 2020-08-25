// ответ от сервера

import { action } from 'easy-peasy'

const responseModel = {
  words: [],

  // actions
  setResponse: action((state, data) => {
    state.words.push(...data)
  }),

  clearResponse: action((state, data) => {
    state.words.length = 0
  }),
}

export default responseModel
