const { Kafka } = require('kafkajs');
const msg = process.argv[2];
//create function
const Chance = require('chance')
const chance = new Chance
run();

async function run() {
  try{
    const kafka = new Kafka({
      'clientId': 'myapp',
      'brokers': [process.env.KAFKA_BOOTSTRAP_SERVER],
    })

    const producer = kafka.producer();
    await producer.connect() 
    // const partition = msg[0].toUpperCase() < 'N' ? 0 : 1;
    // // console.log(msg[0])
    // const result = await producer.send({
    //   'topic': 'Users',
    //   'messages': [
    //     {
    //       'value': msg,
    //       'partition': partition    
    //     }
    //   ]
    // })

    // console.log(`message sent ${JSON.stringify(result)}`)
    // await producer.send({
    //   topic: 'test-topic',
    //   messages: [
    //     {value: 'hello KafkaJS user!'}
    //   ]
    // })
    
    const animals = async() => {
      try {
        const randomAnimal = chance.animal();
        await producer.send({
          topic: 'animals',
          messages: [
            {value: randomAnimal}
          ]
        })
      } catch(e) {
        console.log('Error making countries: ' + e)
      }
      
    }
    const countries = async() => {
      try {
        const randomCountry = chance.hashtag();
        await producer.send({
          topic: 'countries',
          messages: [
            {value: randomCountry}
          ]
        })
      } catch(e) {
        console.log('Error making animals: ' + e)
      }
      
    }
    // await producer.connect()
    setInterval(countries, 1000) 
    setInterval(animals, 1000)
    // await producer.disconnect()
  } catch (ex) {
    console.error(ex)
  }
  finally {
    // process.exit(0);  
  }
}