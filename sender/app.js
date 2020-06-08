#!/usr/bin/env node

const amqp = require('amqplib/callback_api')

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

amqp.connect(`amqp://${process.env.RABBITMQ_HOST || 'rabbit'}`, (err, conn) => {
	if (err) {
		console.error('Error => ', err)
		process.exit(1)
	}

	conn.createChannel(async (err, channel) => {
		channel.assertQueue('hello', {
			durable: false
		})

		while (true) {
			channel.sendToQueue('hello', Buffer.from('Hello world'));
			console.log(" [x] Sent %s", 'Hello world')
			await timeout(500)
		}
	})
})