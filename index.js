const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const KANKA_TOKEN = process.env.KANKA_TOKEN;
const CAMPAIGN_ID = process.env.CAMPAIGN_ID;

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('!npc')) return;

  const query = message.content.replace('!npc', '').trim().toLowerCase();

  if (!query) {
    return message.reply('Type a name, e.g. !npc monica');
  }

  try {
    const res = await axios.get(
      `https://kanka.io/api/1.0/campaigns/${CAMPAIGN_ID}/characters`,
      {
        headers: { Authorization: `Bearer ${KANKA_TOKEN}` }
      }
    );

    const characters = res.data.data;

    const match = characters.find(c =>
      c.name.toLowerCase() === query
    );

    if (!match) {
      return message.reply('Character not found.');
    }

    const link = `https://kanka.io/en-US/campaign/${CAMPAIGN_ID}/characters/${match.id}`;

    message.channel.send(link);

  } catch (err) {
    console.error(err);
    message.reply('Error contacting Kanka.');
  }
});

client.login(DISCORD_TOKEN);
