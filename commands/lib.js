class HightLevelCommand {
    constructor() {

    }

    async asignarrol(client, msg) {
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

    async role(client, msg) {
        let message = msg.content;
        let users;
        let rol = "";
        if (msg.content.includes('<@')) {
            rol = message.split('!role')[1].split('<@')[0];
            users = message.split(`!role ${rol}`)[0].split("<@");
            // console.log(rol)
            let usersContent = [];

            // console.log(users)
            for (var ii = 1; ii < users.length; ii++) {
                usersContent.push(users[ii].split('>')[0])
            }

            // console.log(rol)
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

    async unrole(client, msg) {
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

            // console.log(rol)
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

    async desasignarrol(client, msg){
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
}

class LowLevelCommand{
    constructor(){
        
    }

    async memide(msg){
        let cm =  Math.floor(Math.random()*30);
        msg.reply(`Te mide ${cm} cm`);
    }
}

module.exports = {
    LowLevelCommand,
    HightLevelCommand
}