const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'accounts',
	description: 'Get ALL accounts information!',
	async execute(message, args) {
		const string = args.slice(0, 1).toString();

		const file = await fetch(`https://testnet-algorand.api.purestake.io/idx2/v2/accounts/${string}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json',
				'x-api-key' : process.env.API_KEY,
			},
		}).then(response => response.json());
		console.log(file);
		console.log(args);
		console.log(string);
		const embed = new MessageEmbed()
			.addFields({ name: 'Account Address', value: file.account.address },
				{ name: 'Account Amount', value: file.account.amount },
				{ name: 'Account Rewards', value: file.account.rewards },
				{ name: 'Account Round', value: file.account.round },
				{ name: 'Account Status', value: file.account.status },
				// View more on the explorer
				// { name: 'View More', value: file.account.status }
			);
		message.channel.send(embed);
	},
};

//https://testnet-algorand.api.purestake.io/idx2/{{baseUrl}}/v2/accounts/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ/?x-api-key=OR8QUKBsRD2FRxIChdJt17T0opsYVFyWaYVRJbCF