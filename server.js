const TelegramBot = require('node-telegram-bot-api');

const token = '6851010845:AAH23jdrIg8AORNgqAQzIlw6FKjPnumUSG8';

const bot = new TelegramBot(token, {polling: true});

bot.on('text', async msg => {

  try {

      if(msg.text.startsWith('/help')) {
          
        const message = "Список команд:\n" +
        "/help - показать список команд\n" +
        "/site - получить ссылку на сайт октагона\n" +
        "/creator - узнать создателя бота";
        await bot.sendMessage(msg.chat.id, message);

      }
      else if(msg.text == '/site') {

          await bot.sendMessage(msg.chat.id, `https://students.forus.ru/`);

      }
      else if(msg.text == '/creator') {

          await bot.sendMessage(msg.chat.id, `Рогожников Данил Александрович`);

      }
      else {

          await bot.sendMessage(msg.chat.id, msg.text);

      }

  }
  catch(error) {

      console.log(error);

  }

});