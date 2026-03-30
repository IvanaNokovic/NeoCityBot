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

const sheets = {
  theodor: "https://cdn-ugc.kanka.io/campaigns/182695/a1667468-08d0-45ce-81f3-9e3ef9969d4d.pdf", 
  aamon: "",
  varis: "https://cdn-ugc.kanka.io/campaigns/182695/a166571d-e566-47b5-a100-60591dcbcbbe.pdf",
  mundi: "",
  xia: "https://cdn-ugc.kanka.io/campaigns/182695/a16cb90b-c7a1-49ed-9deb-4694b80e6c9a.pdf",
};

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('!npc')) return;

  const rawQuery = message.content.replace('!npc', '').trim();
  const query = rawQuery.toLowerCase();

  if (!query) {
    return message.reply('Type a name, e.g. !npc monica');
  }

  try {
    const link = `https://app.kanka.io/w/${CAMPAIGN_ID}/characters?search=${encodeURIComponent(query)}`;
const displayName = rawQuery.charAt(0).toUpperCase() + rawQuery.slice(1);

message.channel.send({
  embeds: [
    {
      title: `Search on Kanka: ${displayName}`,
      url: `https://app.kanka.io/w/${CAMPAIGN_ID}/characters?search=${encodeURIComponent(query)}`,
      description: `Click to view results for "${displayName}"`,
      color: 0x5865F2
    }
  ]
});
  } catch (err) {
    console.error(err);
    message.reply('Error.');
  }
});

client.login(DISCORD_TOKEN);

if (message.content.startsWith('!sheet')) {
  const rawQuery = message.content.replace('!sheet', '').trim();
  const query = rawQuery.toLowerCase();

  if (!query) {
    return message.reply('Type a name, e.g. !sheet theodor');
  }

  const link = sheets[query];

  if (!link) {
    return message.reply('Character sheet not found.');
  }

  const displayName = rawQuery
    .toLowerCase()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  message.channel.send({
    embeds: [
      {
        title: `Character Sheet: ${displayName}`,
        url: link,
        description: `Click to open sheet`,
        color: 0x57F287
      }
    ]
  });
}
