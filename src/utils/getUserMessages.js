const getUserMessages = (user, chat) => {
  // выбирает сообщения конкретного юзера
  let messages = chat.filter(
    (message) => (message.from === user) & (typeof message.text === "string")
  );
  // удаляет ненужные ключи из каждого объекта сообщений
  const validKeys = ["date", "text"];
  messages.forEach((el) => {
    Object.keys(el).forEach((key) => validKeys.includes(key) || delete el[key]);
  });
  // разбивает сообщения на слова и создает новый пословный массив объектов
  // очищает сообщения от знаков препинания и цифр, оставляет только русские буквы
  let messagesOneByOne = [];
  messages.forEach((message) => {
    let words = message.text.split(" ");
    const leaveOnlyLetters = new RegExp(/[^а-яА-Я-]+/g);
    messagesOneByOne.push(
      ...words.map((word) => {
        return {
          date: message.date,
          text: word.replace(leaveOnlyLetters, ""),
        };
      })
    );
  });
  // убирает пустые сообщения
  messagesOneByOne = messagesOneByOne.filter((item) => {
    return item.text !== "";
  });

  console.log(messagesOneByOne);

  return messagesOneByOne;
};

export default getUserMessages;
