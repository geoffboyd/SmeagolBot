const Telegraf = require('telegraf').Telegraf;
const bot = new Telegraf('<<bot token here>>');

//method for invoking start command
 
bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Smeagol is already running, master. Smeagol is a good bot. GOLLUM GOLLUM', {
    })
})

bot.command('chart', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'https://www.dextools.io/app/pancakeswap/pair-explorer/0xf2e2e720fa9930b26cd38228eb352d748922aa53', {
    })
})

bot.command('contract', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, '0x8d46739bb6ad55ae438d921cb130afb27e74b46e', {
    })
})

bot.command('buy', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'https://pancakeswap.finance/swap#/swap?inputCurrency=0x8d46739BB6ad55Ae438D921CB130aFb27E74B46E', {
    })
})

bot.command('website', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'https://jrrtoken.com', {
    })
})

bot.launch();
