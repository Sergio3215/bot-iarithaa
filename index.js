const { Client, GatewayIntentBits, EmbedBuilder, Colors } = require('discord.js');
require('dotenv').config();

const { ManagerRoles } = require('./commands/index.js');

const token = process.env.token;

const guildId = process.env.guildId,
    memberRol = process.env.memberRol,
    channelDailyMsg = process.env.channelDailyMsg;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    setTimeout(function () {
        let dayMillseconds = 60000
        setInterval(function () {
            sendMessage();
        }, dayMillseconds)
    }, 2000)
})

//Send the message
function sendMessage() {
    let guild = client.guilds.cache.get(guildId);
    if (guild && guild.channels.cache.get(channelDailyMsg)) {

        let date = new Date();
        // console.log(date.getHours())
        if (date.getHours() == 11 && date.getMinutes() == 0) {
            guild.channels.cache.get(channelDailyMsg).send(`
            𝓗𝓸𝓵𝓪 @𝓮𝓿𝓮𝓻𝔂𝓸𝓷𝓮 𝓮𝓼𝓹𝓮𝓻𝓸 𝓺𝓾𝓮 𝓱𝓪𝔂𝓪𝓷 𝓭𝓮𝓼𝓹𝓮𝓻𝓽𝓪𝓭𝓸 𝓬𝓸𝓷 𝓶𝓾𝓬𝓱𝓪 𝓮𝓷𝓮𝓻𝓰𝓲𝓪 𝔂 𝓺𝓾𝓮 𝓽𝓮𝓷𝓰𝓪𝓷 𝓾𝓷 𝓫𝓸𝓷𝓲𝓽𝓸 𝔂 𝓱𝓮𝓻𝓶𝓸𝓼𝓸 𝓭𝓲𝓪!`);

        }
        else if (date.getHours() == 3 && date.getMinutes() == 0) {
            guild.channels.cache.get(channelDailyMsg).send(`
            𝓗𝓮𝔂 @𝓮𝓿𝓮𝓻𝔂𝓸𝓷𝓮! 𝓨𝓪 𝓮𝓼 𝓱𝓸𝓻𝓪 𝓭𝓮 𝓶𝓲𝓶𝓲𝓻, 𝓮𝓼𝓹𝓮𝓻𝓸 𝓺𝓾𝓮 𝓵𝓪 𝓱𝓪𝔂𝓪𝓷 𝓹𝓪𝓼𝓪𝓭𝓸 𝓶𝓾𝔂 𝓫𝓲𝓮𝓷,𝓳𝓾𝓰𝓪𝓭𝓸. 𝓟𝓮𝓻𝓸, 𝔂𝓪 𝓮𝓼 𝓽𝓪𝓻𝓭𝓮, 𝓪𝓼𝓲 𝓺𝓾𝓮 𝓿𝓪𝔂𝓪𝓷 𝓪𝓬𝓸𝓼𝓽𝓪𝓻𝓼𝓮, 𝓹𝓪𝓻𝓪 𝓺𝓾𝓮 𝓶𝓪ñ𝓪𝓷𝓪 𝓭𝓮𝓼𝓹𝓲𝓮𝓻𝓽𝓮𝓷 𝓬𝓸𝓷 𝓽𝓸𝓭𝓸 𝓮𝓵 𝓴𝓲. 
            　﹢　˖    　✦      ¸ .　﹢　 ° 　¸.    ° ˖ ･ ·̩

            ┊┊┊┊                        °

            ┊┊┊☆                  •

            ┊┊🌙　　　 *

            ┊┊

            ┊☆　　°

            🌙`);
        }
    }
}


client.on('messageCreate', async (msg) => {
    // console.log(msg.content)
    // console.log((await client.guilds.cache.get(msg.guild.id).members.fetch()).filter(member => member.id == msg.author.id));
    // console.log("----------------------------------------------------------------");
    // // console.log(client);

    const guild = client.guilds.cache.get(msg.guild.id);
    if (!guild)
        return console.log(`Can't find the guild with ID ${msg.guild.id}`);

    let admin, mod;

    await guild.members.fetch(msg.author.id)
        .then(async (member) => {
            // member.roles.cache is a collection of roles the member has
            // console.log(member.roles.cache)

            admin = await member.roles.cache.has(process.env.rolAdmin);
            mod = await member.roles.cache.has(process.env.rolMod);

            // if (member.roles.cache.has('1234567496774844458'))
            //     console.log('member has the role')
            console.log(admin, mod);
            ManagerRoles(client, msg, EmbedBuilder, Colors, admin, mod);
        })
        .catch(console.error);

});
client.on('guildMemberAdd', async (member) => {
    //    member.roles.add("1092199143902040144");
    // console.log(member)
    if (member.guild.id == guildId) {
        member.roles.add(memberRol);
        // console.log("se asigno un rol");
    }
});
client.login(token);