const bot = require("../../index");
const fs = require("fs");

const chatStates = {};

function readKeyBoardData(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }catch (error) {
    console.error("Ошибка при чтении JSON файла:", error);
    return null;
  }
}

async function sendKeyboards(chatId, currentPage, keyboardData) {
  let buttons = keyboardData;

  // Проверяем, что chatStates[chatId] существует и имеет currentPage
  if (chatStates[chatId] && chatStates[chatId].currentPage !== undefined) {
    currentPage = chatStates[chatId].currentPage;
  }

  if (currentPage === 1) {
    buttons = keyboardData.firstPageKeyboard;
  } else if (currentPage === 2) {
    buttons = keyboardData.secondPageKeyboard;
  }

  const keyboard = {
    reply_markup: JSON.stringify({
      inline_keyboard: buttons, // Мы уже имеем массив кнопок, не нужно оборачивать его в объект
    }),
  };

  try {
    await bot.sendMessage(chatId, "hello")
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
  }
}


module.exports = {
  startKeyboard: {
    reply_markup: JSON.stringify({
      resize_keyboard: true,
      keyboard: [
        [{ text: "ЗАРАБОТАТЬ" }, { text: "МОЙ КАБИНЕТ" }],
        [{ text: "О БОТЕ" }, { text: "ВЫВОД" }],
      ],
    }),
  },
  withDrawKeyboard: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "связатся с менеджером", url: "www.pornhub.com" }],
      ],
    }),
  },
  firstPageKeyboard: {
    reply_markup: JSON.stringify({
      one_time_keyboard: true,
      inline_keyboard: [
        [{ text: "hello world", callback: "1" }],
        [{ text: "hello world", callback: "2" }],
        [{ text: "hello world", callback: "3" }],
      ],
    }),
  },
  show: {
    reply_markup: JSON.stringify({
      keyboard: [
        [{text: "Выбрать страну"}]
      ]
    })
  },
  countries: {
    reply_markup: JSON.stringify({
      resize_keyboard: true,
      inline_keyboard: [
        {text: "Англия", callback: "england"}
      ]
    })
  },
  readKeyBoardData: readKeyBoardData,
  sendKeyboards: sendKeyboards,
  chatStates,
};
