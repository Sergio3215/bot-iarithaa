const { valueToNode } = require('../../../propio/yourSecret/react_modules/babel.js');
const { Profile, Riot } = require('../db/query.js');
const { Client, GatewayIntentBits, EmbedBuilder, Colors } = require('discord.js');

const _profile = new Profile();
const _riot = new Riot();

class HightLevelCommand {
    constructor() {

    }

    async AsignarRol(client, msg) {
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

    async Role(client, msg) {
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

    async Unrole(client, msg) {
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

    async DesasignarRol(client, msg) {
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

class LowLevelCommand {
    constructor() {

    }

    #ColorRandom(Colors) {
        let num = Math.floor(Math.random() * 4);

        if (num == 0) {
            num = 1;
        }

        switch (num) {
            case 1:
                return Colors.Red;
                break;
            case 2:
                return Colors.Green;
                break;
            case 3:
                return Colors.Blue;
                break;
            case 4:
                return Colors.Black;
                break;
        }
    }

    async MeMide(msg) {
        let cm = Math.floor(Math.random() * 30);
        msg.reply(`Te mide ${cm} cm`);
    }

    async Golpear(client, msg) {
        try {
            let golpe = Math.floor(Math.random() * 7);
            if (golpe == 0) {
                golpe = 1;
            }
            let dir = `https://raw.githubusercontent.com/Sergio3215/bot-iarithaa/main/static/golpe/${golpe}.gif`;

            const guild = await client.guilds.cache.get(msg.guild.id);
            let member = await guild.members.fetch(msg.author.id);

            let reciverID = msg.content.split('<@')[1].split('>')[0];
            let reciver = await guild.members.fetch(reciverID);

            let color = this.#ColorRandom(Colors);

            let memberName = (member.nickname == null) ? msg.author.globalName : member.nickname;
            let reciverName = (reciver.nickname == null) ? reciver.user.globalName : reciver.nickname;

            const embed = new EmbedBuilder()
                .setTitle(`${memberName} le ha dado un golpe a ${reciverName}`)
                // .setDescription("list of all commands")
                .setColor(color)
                .setImage(dir)
            // .addFields(
            //     comandos_helper
            // )
            await msg.reply({
                embeds: [embed]
            });
        } catch (error) {
            await msg.reply("Necesitas etiquetar a un amigo o usuario del servidor");
        }
    }

    async Perseguir(client, msg) {
        try {
            let perseguir = Math.floor(Math.random() * 4);
            if (perseguir == 0) {
                perseguir = 1;
            }
            let dir = `https://raw.githubusercontent.com/Sergio3215/bot-iarithaa/main/static/perseguir/${perseguir}.gif`;

            const guild = await client.guilds.cache.get(msg.guild.id);
            let member = await guild.members.fetch(msg.author.id);

            let reciverID = msg.content.split('<@')[1].split('>')[0];
            let reciver = await guild.members.fetch(reciverID);

            let color = this.#ColorRandom(Colors);

            let memberName = (member.nickname == null) ? msg.author.globalName : member.nickname;
            let reciverName = (reciver.nickname == null) ? reciver.user.globalName : reciver.nickname;

            const embed = new EmbedBuilder()
                .setTitle(`${memberName} le esta persiguiendo a ${reciverName}`)
                // .setDescription("list of all commands")
                .setColor(color)
                .setImage(dir)
            // .addFields(
            //     comandos_helper
            // )
            await msg.reply({
                embeds: [embed]
            });
        } catch (error) {
            await msg.reply("Necesitas etiquetar a un amigo o usuario del servidor");
        }
    }

    async Sonrojar(client, msg) {
        let sonrojar = Math.floor(Math.random() * 9);
        if (sonrojar == 0) {
            sonrojar = 1;
        }
        let dir = `https://raw.githubusercontent.com/Sergio3215/bot-iarithaa/main/static/sonrojar/${sonrojar}.gif`;

        const guild = await client.guilds.cache.get(msg.guild.id);
        let member = await guild.members.fetch(msg.author.id);

        let color = this.#ColorRandom(Colors);

        let memberName = (member.nickname == null) ? msg.author.globalName : member.nickname;

        const embed = new EmbedBuilder()
            .setTitle(`${memberName} se ha sonrojado`)
            // .setDescription("list of all commands")
            .setColor(color)
            .setImage(dir)
        // .addFields(
        //     comandos_helper
        // )
        await msg.reply({
            embeds: [embed]
        });
    }

    async Besar(client, msg) {
        try {
            let perseguir = Math.floor(Math.random() * 9);
            if (perseguir == 0) {
                perseguir = 1;
            }
            let dir = `https://raw.githubusercontent.com/Sergio3215/bot-iarithaa/main/static/besar/${perseguir}.gif`;

            const guild = await client.guilds.cache.get(msg.guild.id);
            let member = await guild.members.fetch(msg.author.id);

            let reciverID = msg.content.split('<@')[1].split('>')[0];
            let reciver = await guild.members.fetch(reciverID);

            let color = this.#ColorRandom(Colors);

            let memberName = (member.nickname == null) ? msg.author.globalName : member.nickname;
            let reciverName = (reciver.nickname == null) ? reciver.user.globalName : reciver.nickname;

            const embed = new EmbedBuilder()
                .setTitle(`${memberName} le dio un beso a ${reciverName}`)
                // .setDescription("list of all commands")
                .setColor(color)
                .setImage(dir)
            // .addFields(
            //     comandos_helper
            // )
            await msg.reply({
                embeds: [embed]
            });
        } catch (error) {
            await msg.reply("Necesitas etiquetar a un amigo o usuario del servidor");
        }
    }

    async Abrazar(client, msg) {
        try {
            let perseguir = Math.floor(Math.random() * 7);
            if (perseguir == 0) {
                perseguir = 1;
            }
            let dir = `https://raw.githubusercontent.com/Sergio3215/bot-iarithaa/main/static/abrazo/${perseguir}.gif`;

            const guild = await client.guilds.cache.get(msg.guild.id);
            let member = await guild.members.fetch(msg.author.id);

            let reciverID = msg.content.split('<@')[1].split('>')[0];
            let reciver = await guild.members.fetch(reciverID);

            let color = this.#ColorRandom(Colors);

            let memberName = (member.nickname == null) ? msg.author.globalName : member.nickname;
            let reciverName = (reciver.nickname == null) ? reciver.user.globalName : reciver.nickname;

            const embed = new EmbedBuilder()
                .setTitle(`${memberName} le abrazó a ${reciverName}`)
                // .setDescription("list of all commands")
                .setColor(color)
                .setImage(dir)
            // .addFields(
            //     comandos_helper
            // )
            await msg.reply({
                embeds: [embed]
            });
        } catch (error) {
            await msg.reply("Necesitas etiquetar a un amigo o usuario del servidor");
        }
    }

    async Pareja(client, msg) {
        try {
            let memberOne = await this.#PersonaRandom(client, msg);
            // console.log(memberOne)

            let beso = Math.floor(Math.random() * 7);
            if (beso == 0) {
                beso = 1;
            }
            let dir = `https://raw.githubusercontent.com/Sergio3215/bot-iarithaa/main/static/besar/${beso}.gif`;

            const guild = await client.guilds.cache.get(msg.guild.id);
            let member = await guild.members.fetch(msg.author.id);

            let reciverID = memberOne.user.id;
            let reciver = await guild.members.fetch(reciverID);

            let color = this.#ColorRandom(Colors);

            let memberName = (member.nickname == null) ? msg.author.globalName : member.nickname;
            let reciverName = (reciver.nickname == null) ? reciver.user.globalName : reciver.nickname;

            if (reciverName == "null") {
                return this.Pareja(client, msg, EmbedBuilder, Colors);
            }

            const embed = new EmbedBuilder()
                .setTitle(`La pareja de ${memberName} es ${reciverName}`)
                // .setDescription("list of all commands")
                .setColor(color)
                .setImage(dir)
            // .addFields(
            //     comandos_helper
            // )
            await msg.reply({
                embeds: [embed]
            });

            // msg.reply(`<@${memberOne.user.id}>`);
        } catch (error) {
            await msg.reply("Necesitas etiquetar a un amigo o usuario del servidor");
        }
    }

    async RiotID(msg) {
        try {
            let memberID = msg.author.id;

            if (msg.content.toLowerCase().includes("add")) {
                memberID = msg.content.split("add")[1].trim();
                _riot.Create(msg, memberID);

                await msg.reply({
                    content: `Se ha agregado la cuenta de Riot exitosamente`
                });
            }
            else if (msg.content.toLowerCase().includes("remove")) {
                memberID = msg.content.split("remove")[1].trim();
                let user = await _riot.GetById(msg.author.id);
                let user_id = user.filter(us => us.riotID == memberID);
                _riot.Remove(user_id);
                await msg.reply({
                    content: `Se ha removido la cuenta de Riot exitosamente`
                });
            }
            else {
                await msg.reply({
                    content: `No se ha utilizado bien el comando`
                });
            }

        } catch (error) {
            await msg.reply("Necesitas poner un id de Riot");
        }
    }

    async Perfil(client, msg) {
        try {

            let color = this.#ColorRandom(Colors);
            let id = msg.author.id;
            const guild = await client.guilds.cache.get(msg.guild.id);

            if (msg.content.includes("<@") && msg.content.includes(">")) {
                id = msg.content.split('<@')[1].split('>')[0];
            }

            let member = await _profile.GetById(id);
            let memberGuild = await guild.members.fetch(id);
            let riot = await _riot.GetById(id);

            if (member.length == 0) {
                member = memberGuild;
            }

            let list = [];

            if(member.steamId != null){
                list.push({
                    name:"steam ID:",
                    value: member.steamId
                })
            }

            if(member.epicId != null){
                list.push({
                    name:"Epic ID:",
                    value: member.epicId
                })
            }

            if(member.minecraftName != null){
                list.push({
                    name:"Minecraft ID:",
                    value: member.minecraftName
                })
            }
            
            if(riot.length > 0){
                let riotAccounts = "";
                await riot.map((r, index)=>{
                    if(index == riot.length -1){
                        riotAccounts += r.riotID
                    }
                    else{
                        riotAccounts += r.riotID+", "
                    }
                })
                list.push({
                    name:"Riot ID:",
                    value: riotAccounts,
                    inline:true
                })
            }

            // let member = await guild.members.fetch(id);
            let memberName = (memberGuild.nickname == null) ? memberGuild.user.globalName : memberGuild.nickname;


            const embed = new EmbedBuilder()
                .setTitle(`El perfil de ${memberName}`)
                // .setDescription("list of all commands")
                .setColor(color)
                .addFields(
                    list
                )
            await msg.reply({
                embeds: [embed]
            });

            msg.delete();

        } catch (error) {
            await msg.reply("Hubo un error algo has hecho mal");
        }
    }

    async #PersonaRandom(client, msg) {
        const guild = await client.guilds.cache.get(msg.guild.id);
        let member = await guild.members.fetch();
        // console.log(member);
        let tempArr = [];
        member.map(m => {
            tempArr.push(m);
        })

        let oneMember = Math.floor(Math.random() * tempArr.length);

        // console.log(tempArr[oneMember].nickname);
        // console.log(tempArr[oneMember].user.globalName);

        return tempArr[oneMember]
    }

}

module.exports = {
    LowLevelCommand,
    HightLevelCommand
}