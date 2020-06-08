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

		console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", 'hello');

		channel.consume('hello', function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        })
	})
})