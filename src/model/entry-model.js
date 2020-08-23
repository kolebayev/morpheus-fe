// работа с данными на входе:
// чат, настройки слов, даты, пользователи
import { action } from 'easy-peasy'
import wordConfig from '../utils/wordConfig'

const entryModel = {
  // чат, импортированный из json
  chat: [],
  // для контролов
  controls: {
    // участники чата
    users: [],
    // первая и посоледняя даты чата
    dates: {
      startDate: '',
      endDate: '',
    },
    // часть речи
    post: wordConfig.post,
    NMbr: wordConfig.NMbr,
    GNdr: wordConfig.GNdr,
  },
  isLoading: false,
  // fileName: '',

  // actions
  setDataFromJson: action((state, data) => {
    let messages = data.messages

    // удаляет сообщения без текста
    const clearFromEmptyStrings = (message) => message.text !== ''
    // преобразует сообщения со ссылками в строку
    // то есть к обычному виду
    const clearFromLinks = (message) => {
      if (Array.isArray(message.text)) {
        let getStringFromLinkMessage = message.text.filter(
          (item) => typeof item === 'string'
        )
        Object.assign(message, { text: getStringFromLinkMessage.join(' ') })
      }
    }
    messages.forEach(clearFromLinks)
    state.chat.length = 0
    state.chat.push(...messages.filter(clearFromEmptyStrings))

    let users = [
      ...new Set(
        messages.map((msg) => {
          if (
            ('from' in msg) &
            (msg.from !== undefined) &
            (msg.from !== null)
          ) {
            return msg.from
          }
        })
      ),
    ].filter((user) => user !== undefined)
    state.controls.users.length = 0
    state.controls.users.push(...users)

    state.controls.dates.startDate = messages[0].date
    state.controls.dates.endDate = messages[messages.length - 1].date
  }),
}

export default entryModel
