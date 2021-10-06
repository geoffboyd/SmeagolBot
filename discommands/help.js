const config = require("../config/discord.json");

module.exports = {
  name: 'help',
  description: 'Display Commands',
  execute(msg, args) {
    msg.channel.send(
        {
        "embed": {
        "title": "Smeagol command list",
        "color": 12343625,
        "fields":[
		{
			name: '__JRR Information__',
			value: ' - *Quick Access to the most vital information*',
		},
		{
			name: `${config.prefix}activities`,
			value: 'Reminder of the daily activities you can complete to boost $JRR',
			inline: true,
		},
		{
			name: `${config.prefix}buy`,
			value: 'Link to PancakeSwap where you can buy $JRR',
			inline: true,
		},
		{
			name: `${config.prefix}chart`,
			value: 'Displays current $JRR chart on PooCoin',
			inline: true,
		},
		{
			name: `${config.prefix}contract`,
			value: 'Displays $JRR contract address',
			inline: true,
		},
		{
			name: `${config.prefix}guide`,
			value: 'A step-by-step tutorial with screenshots to purchase JRR',
			inline: true,
		},
		{
			name: `${config.prefix}website`,
			value: 'Link to JRR Token’s official website',
			inline: true,
		},
		{
			name: '__Just For Fun__',
			value: ' - *Keep Smeagol entertained*',
		},
		{
			name: `${config.prefix}8ball`,
			value: 'Ask the mystical Magic 8 Ball for guidance',
			inline: true,
		},
		{
            name: `${config.prefix}fortune`,
            value: 'Open a fortune cookie',
            inline: true,
        },
        ]
        }
      }
    );
  },
};
