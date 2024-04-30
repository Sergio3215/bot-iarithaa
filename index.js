const { Client, GatewayIntentBits, EmbedBuilder, Colors } = require('discord.js');
require('dotenv').config();

const token = process.env.token;

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
    let guild = client.guilds.cache.get('827342894713012224');
    if (guild && guild.channels.cache.get('1092199027350720582')) {

        let date = new Date();
        // console.log(date.getHours())
        if (date.getHours() == 9 && date.getMinutes() == 0) {
            guild.channels.cache.get('1092199027350720582').send(`
        ℍ𝕠𝕝𝕒 @everyone 𝕖𝕤𝕡𝕖𝕣𝕠 𝕢𝕦𝕖 𝕙𝕒𝕪𝕒𝕟
        𝕕𝕖𝕤𝕡𝕖𝕣𝕥𝕒𝕕𝕠 𝕔𝕠𝕟 𝕞𝕦𝕔𝕙𝕒 𝕖𝕟𝕖𝕣𝕘𝕚𝕒 𝕪 𝕢𝕦𝕖
        𝕥𝕖𝕟𝕘𝕒𝕟 𝕦𝕟 𝕝𝕚𝕟𝕕𝕠 𝕕𝕚𝕒!`);

        }
        else if (date.getHours() == 1 && date.getMinutes() == 0) {
            guild.channels.cache.get('1092199027350720582').send(`
ℍ𝕖𝕪 @everyone! 𝕐𝕒 𝕖𝕤 𝕙𝕠𝕣𝕒 𝕕𝕖 𝕞𝕚𝕞𝕚𝕣, 
𝕖𝕤𝕡𝕖𝕣𝕠 𝕝𝕒 𝕙𝕒𝕪𝕒𝕟 𝕡𝕒𝕤𝕒𝕕𝕠 𝕞𝕦𝕪 𝕓𝕚𝕖𝕟, 
𝕛𝕦𝕘𝕒𝕟𝕕𝕠. ℙ𝕖𝕣𝕠, 𝕪𝕒 𝕖𝕤 𝕥𝕒𝕣𝕕𝕖, 𝕒𝕤𝕚 𝕢𝕦𝕖 𝕧𝕒𝕪𝕒𝕟 𝕒𝕔𝕠𝕤𝕥𝕒𝕣𝕤𝕖, 
𝕡𝕒𝕣𝕒 𝕢𝕦𝕖 𝕞𝕒ñ𝕒𝕟𝕒 𝕕𝕖𝕤𝕡𝕚𝕖𝕣𝕥𝕖𝕟 𝕔𝕠𝕟 𝕥𝕠𝕕𝕠 𝕖𝕝 𝕜𝕚. 
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
    if (msg.content === '!comandos') {
        const embed = new EmbedBuilder()
            .setTitle("Lista de Comandos")
            .setDescription("list of all commands")
            .setColor(Colors.Red)
            .addFields([
                { name: '!role', value: "Puedes seleccionar los roles a usuarios etiquetados.\nPor ejemplo: !role <'Name Role'>  <'name user'> <'name user'>.\nSe puede usar varios users" },
                { name: '!unrole', value: "Puedes deseleccionar los roles a usuarios etiquetados.\nPor ejemplo: !unrole <'Name Role'> <'name user'> <'name user'>.\nSe puede usar varios users" },
                { name: '!asignarrol', value: "se asignara un rol especificado a todos los usuarios. \nPor ejemplo: !asignarrol <'Name Role'>" },
                { name: '!desasignarrol', value: "Puedes deseleccionar los roles a todos los usuarios.\nPor ejemplo: !desasignarrol <'Name Role'>" }
            ])
            .setFooter({
                iconURL: 'https://www.principianteenprogramar.com/static/Principiante-en-Programar.png',
                text: "By Principiante en Programar",
            })
        await msg.reply({
            embeds: [embed]
        });
    }
    if (msg.content.includes("!role ")) {
        let message = msg.content;
        let users;
        let rol = "";
        if (msg.content.includes('<@')) {
            rol = message.split('!role')[1].split('<@')[0];
            users = message.split(`!role ${rol}`)[0].split("<@");
            let usersContent = [];
            for (var ii = 1; ii < users.length; ii++) {
                usersContent.push(users[ii].split('>')[0])
            }
            let role = await client.guilds.cache.get(msg.guild.id).roles.cache.filter(r => r.name == rol.trim()).map(g => g.id);
            if (role.length > 0) {
                for (var ii = 0; ii < usersContent.length; ii++) {
                    await client.guilds.cache.get(msg.guild.id).members.cache.filter(m => m.id == usersContent[ii]).map(m => m.roles.add(role[0]))
                }
                msg.reply("Rol Asignado");
            }
            else {
                msg.reply("No se ha encontrado el rol " + rol)
            }
        }
        else {
            msg.reply("No se ha asignado un usuario")
        }
    }
    if (msg.content.includes("!unrole ")) {
        let message = msg.content;
        let users;
        let rol = "";
        if (msg.content.includes('<@')) {
            rol = message.split('!unrole')[1].split('<@')[0];
            users = message.split(`!unrole ${rol}`)[0].split("<@");
            let usersContent = [];

            for (var ii = 1; ii < users.length; ii++) {
                usersContent.push(users[ii].split('>')[0])
            }

            let role = await client.guilds.cache.get(msg.guild.id).roles.cache.filter(r => r.name == rol.trim()).map(g => g.id);
            if (role.length > 0) {
                for (var ii = 0; ii < usersContent.length; ii++) {
                    await client.guilds.cache.get(msg.guild.id).members.cache.filter(m => m.id == usersContent[ii]).map(m => m.roles.remove(role[0]))
                }
                msg.reply("Rol Desasignado");
            }
            else {
                msg.reply("No se ha encontrado el rol " + rol)
            }
        }
        else {
            msg.reply("No se ha asignado un usuario")
        }
    }
    if (msg.content.includes("!asignarrol ")) {
        //870303406886109184
        //!asignarrol troll
        try {
            let rolName = msg.content.split("!asignarrol ")[1].trim();
            let rolID = client.guilds.cache.get(msg.guild.id).roles.cache.filter(r => r.name == rolName).map(r => r.id);
            let members = await client.guilds.cache.get(msg.guild.id).members.fetch();
            let users = 0;
            // console.log(rolName)
            members.forEach(member => {
                // console.log(member)
                member.roles.add(rolID);
                users++;
            })
            if (users.length > 0) {
                msg.reply("Se ha Asignado rol a los que no tenian!")
            }
            else {
                msg.reply("Todos tienen rol asignados")
            }
        } catch (error) {
            msg.reply("Hubo un error. Consulte con ela lista de comandos !comandos")
            // console.log(error)
        }
    }
    if (msg.content.includes("!desasignarrol ")) {
        try {
            let rolName = msg.content.split("!desasignarrol ")[1].trim();
            let rolID = client.guilds.cache.get(msg.guild.id).roles.cache.filter(r => r.name == rolName).map(r => r.id);
            let members = await client.guilds.cache.get(msg.guild.id).members.fetch();
            let users = 0;
            // console.log(rolName)
            members.forEach(member => {
                // console.log(member)
                member.roles.remove(rolID);
                users++;
            })
            if (users.length > 0) {
                msg.reply("Se ha desasignado rol a los que no tenian!")
            }
            else {
                msg.reply("Todos tienen rol desasignados")
            }
        } catch (error) {
            msg.reply("Hubo un error. Consulte con ela lista de comandos !comandos")
            console.log(error)
        }
    }

});
client.on('guildMemberAdd', async (member) => {
    //    member.roles.add("1092199143902040144");
    // console.log(member)
    if (member.guild.id == "827342894713012224") {
        member.roles.add("1092199143902040144")
        // console.log("se asigno un rol");
    }
    if (member.guild.id == "870465822504665168") {
        member.roles.add("1152420240429416448")
        member.roles.add("1152542252846030979")
        // console.log("se asigno un rol");
    }
    if (member.guild.id == "870303406886109184") {
        member.roles.add("871296543230160946")
        // console.log("se asigno un rol");
    }
});
client.login(token);