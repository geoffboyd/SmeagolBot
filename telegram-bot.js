const Telegraf = require('telegraf').Telegraf;
const bot = new Telegraf('<<bot token here>>');
const puppeteer = require('puppeteer-core');

// Markov generator
var MarkovChain = require('markovchain'), 
  fs = require('fs'), 
  wordSalad = new MarkovChain(fs.readFileSync('./telegramHistory.txt', 'utf8'))

//method for invoking start command

bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Smeagol is already running, master. Smeagol is a good bot. GOLLUM GOLLUM', {
    })
})

/*
bot.command('chart', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'https://www.dextools.io/app/pancakeswap/pair-explorer/0xf2e2e720fa9930b26cd38228eb352d748922aa53', {
    })
})
*/

bot.command('contract', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, '0x8d46739bb6ad55ae438d921cb130afb27e74b46e', {
    })
})

bot.command('buy', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'https://pancakeswap.finance/swap#/swap?inputCurrency=0x8d46739BB6ad55Ae438D921CB130aFb27E74B46E', {
    })
})

bot.command('website', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'https://www.thetokenofpower.com', {
    })
})

bot.command('chart', ctx => {
  (async () => {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: '/usr/bin/chromium-browser',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36']
    });
    const page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1080});
    await page.goto('https://poocoin.app/tokens/0x8d46739bb6ad55ae438d921cb130afb27e74b46e', {waitUntil: 'networkidle0',});
    await page.screenshot({ path: 'poocoinJRR.png' });
    await browser.close();
    await bot.telegram.sendPhoto(ctx.chat.id, {source: './poocoinJRR.png'});
  })();
    bot.telegram.sendMessage(ctx.chat.id, 'I will fetch the precious, please wait. GOLLUM GOLLUM', {
    })
})

bot.on('text', ctx => {
  if (ctx.message.text.toString().toLowerCase().includes('smeagolbot')) {
    var wordList = ctx.message.text.trim().split(/ +/);
    var startWord = wordList[Math.floor(Math.random()*wordList.length)];
    var phraseLength = (Math.ceil(Math.random()*((wordList.length + 10)*2)));
    var phrase = wordSalad.start(startWord).end(phraseLength).process();
    var firstLetter = phrase.slice(0,1);
    firstLetter = firstLetter.toUpperCase();
    var phrase = firstLetter + phrase.slice(1, phrase.length);
    while (phrase.endsWith('?') || phrase.endsWith('.') || phrase.endsWith('!') || phrase.endsWith('"') || phrase.endsWith(',')) {
      phrase = phrase.slice(0, -1);
    }
    const punct = ['.','?','!']
    bot.telegram.sendMessage(ctx.chat.id, phrase+punct[Math.floor(Math.random()*punct.length)]);
  }
});

bot.launch();
