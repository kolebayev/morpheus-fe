// финальная выборка для запроса
// post, NMbr, GNdr, messages, startDate, endDate ...

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
  rangeStart: new Date(),
  // конец периода в запросе
  rangeEnd: new Date(),
}

export default requestModel
