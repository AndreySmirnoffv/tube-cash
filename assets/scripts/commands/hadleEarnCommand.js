const {readKeyBoardData, sendKeyboards} = require('../../../assets/keyboard/keyboard')
const {bot} = require('../../../index.js')
async function handleEarnCommand(msg) {
    const chatStates = {}
    const chatId = msg.chat.id;
    const keyboardData = await readKeyBoardData('./assets/db/keyboard/keyboard.json', 'utf-8');
    const currentPage = 1;
  
    if (!chatStates[chatId]) {
      chatStates[chatId] = {};
    }
    chatStates[chatId].currentPage = currentPage;
  
    if (chatStates[chatId].currentPage !== undefined) {
      sendKeyboards(chatId, chatStates[chatId].currentPage, keyboardData)
        .then(() => { 
            bot.sendMessage(chatId, 'выберите задание');
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      console.error('Некорректные данные для sendKeyboards');
    }
  }
  

module.exports.handleEarnCommand = handleEarnCommand