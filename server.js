const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = 4000;
const TelegramBot = require('node-telegram-bot-api');
const { text } = require('express');
const token = '5999070219:AAEAt-H-zogibhr2EjAvDEt2HAhS8cgAhuQ';
const app = express();

app.use(cors()); // Додано використання пакету CORS

app.use(bodyParser.urlencoded({ 
    extended:true
}));
app.use(bodyParser.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(express.static(path.resolve(__dirname, './')));
const bot = new TelegramBot(token, {polling: true});

app.post('/send', (req,res)=>{
    const el = req.body;
    let text = 'Cart: \n\n'
    for (let i = 0; i< el.length-1; i++){
        text += `<b>${el[i].type} "${el[i].name}"</b>` + '\n'
        text += 'Count..............' + el[i].quantity + '\n'
        text += 'Price..............' + el[i].totalPrice + '$\n'
        text += 'ID.................' + el[i].id + '\n'
        text += 'Size...............' + el[i].size + '\n'
        text += 'Image: ' + el[i].img + '\n'
        text += '\n'
    }
    text += '\n'
    text += `Name of restorant: ${el[el.length-1][0].name}\nTable: table №${el[el.length-1][1]}`
    console.log(el);
    console.log(text)
    bot.sendMessage(1015683844, `${text}`, { parse_mode: 'HTML' });
});

// bot.on('message', (msg) => {});

app.listen(PORT, ()=> console.log(`Server work on PORT: ${PORT}`));
