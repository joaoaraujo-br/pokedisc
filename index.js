const Discord = require('discord.js')
const fetch = require('node-fetch')

const { prefix, token } = require('./config.json')

const client = new Discord.Client()

client.once('ready', () => {
    console.log("Pronto!")
})

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot)
        return

    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()

    if (command == 'typeof') {
        const pokemon = args[0].toLowerCase()
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(response => response.json())
            .then(data => {
                var types = []

                data.types.map((type) => {
                    types.push(type.type.name)
                })

                message.channel.send(types)
            })
            .catch((error) => {
                console.log(error)
                message.channel.send('Não foi possível encontrar esse pokemon')
            })
    }
})

client.login(token)