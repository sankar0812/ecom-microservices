require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Kafka } = require('kafkajs');

const app = express();
app.use(bodyParser.json());

// Kafka Setup
const kafka = new Kafka({
  clientId: 'user-service',
  brokers: ['localhost:9094']
});
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'user-group' });

async function initKafka() {
  await producer.connect();
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-topic', fromBeginning: true });

  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
    },
  });
}
initKafka();

// Routes
app.get('/users', (req, res) => {
  res.json({ message: 'User list' });
});

app.post('/users', async (req, res) => {
  const user = req.body;
  await producer.send({
    topic: 'user-topic',
    messages: [{ value: JSON.stringify(user) }],
  });
  res.json({ message: 'User created', user });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));
