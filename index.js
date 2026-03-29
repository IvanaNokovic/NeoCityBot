const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CAMPAIGN_ID = process.env.CAMPAIGN_ID;

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('!npc')) return;

  const query = message.content.replace('!npc', '').trim().toLowerCase();

  if (!query) {
    return message.reply('Type a name, e.g. !npc monica');
  }

  try {
    const link = `https://app.kanka.io/w/${CAMPAIGN_ID}/characters?search=${encodeURIComponent(query)}`;
    message.channel.send({
  embeds: [
    {
      title: `Search on Kanka: ${query}`,
      url: `https://kanka.io/en-US/campaign/${CAMPAIGN_ID}/characters?search=${encodeURIComponent(query)}`,
      description: `Click to view results for "${query}"`
    }
  ]
});
  } catch (err) {
    console.error(err);
    message.reply('Error.');
  }
});

client.login(DISCORD_TOKEN);
