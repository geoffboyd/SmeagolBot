# SmeagolBot: the official bot of the JRR Token
Chatbot for Telegram and Discord

## Requirements

- [Node.js](http://nodejs.org/)
- [Discord](https://discordapp.com/) developer account
- [Telegram](https://telegram.org) bot token from @BotFather

## Installation Steps (if applicable)

1. Clone repo
2. `npm install`
3. Edit json files in ./config to include your own credentials
4. Edit discommands/secret.json to include your own secret info
5. Inside ./bots choose which bot to launch using `node`. Example: `node discord-botster.js` to launch the Discord bot.
6. Interact with your bot via Discord and/or Telegram depending on how you are using it.

Note in case you choose to get rid of the existing database. You'll want to add a fortune, insult, or 8 ball prediction to generate the table to start collecting those things. The easiest way is just to run the insultadd command, but you can also manually create a sqlite db and import some data into it.

## License

MIT License

Copyright (c) 2019 StuartIanNaylor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Also, all glory to Hypnotoad.
