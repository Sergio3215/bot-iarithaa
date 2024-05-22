const { HightLevelCommand, LowLevelCommand } = require("./lib.js");
const { Profile } = require("../db/query.js");

const _hightRole = new HightLevelCommand();
const _lowLevelCommand = new LowLevelCommand();
const _profile = new Profile();


async function ManagerRoles(client, msg, EmbedBuilder, Colors, administrator, moderation) {

    try {

        const guild = await client.guilds.cache.get(msg.guild.id);
        let member = await guild.members.fetch(msg.author.id);
        //member.nickname
        const user = await _profile.GetById(msg.author.id);

        if (user.length == 0 && msg.author.id != "1234739925266600019") {
            _profile.Create(msg, member);
        }
 
    }
    catch (error) {
        console.log(error);
    }

    let admin = administrator,
        mod = moderation;

    let comandos_helper = [
        { name: '!memide', value: "Dice la cantidad que te mide." },
        { name: '!golpear', value: "Tu golpeas a alguien cuando lo etiquetas. Ejemplo !golpear <name>" },
        { name: '!sonrojar', value: "Accion de sonrojarse" },
        { name: '!perseguir', value: "Tu persigues a alguien cuando lo etiquetas. Ejemplo !perseguir <name>" },
        { name: '!besar', value: "Tu besas a alguien cuando lo etiquetas. Ejemplo !besar <name>" },
        { name: '!abrazar', value: "Tu abrazas a alguien cuando lo etiquetas. Ejemplo !abrazar <name>" },
        { name: '!pareja', value: "Te dice que pareja vas a tener :D" }
    ];

    let arrTemp = comandos_helper;

    if (admin) {
        comandos_helper = commandsAdmin(arrTemp);
    }

    if (mod) {
        comandos_helper = commandsAdmin(arrTemp);
    }


    if (msg.content === '!comandos') {
        const embed = new EmbedBuilder()
            .setTitle("Lista de Comandos")
            .setDescription("list of all commands")
            .setColor(Colors.Red)
            .addFields(
                comandos_helper
            )
        await msg.reply({
            embeds: [embed]
        });
    }

    if (msg.content.toLowerCase() == "!memide") {
        _lowLevelCommand.MeMide(msg);
    }

    if (msg.content.toLowerCase().includes("!golpear")) {
        _lowLevelCommand.Golpear(client, msg);
    }

    if (msg.content.toLowerCase().includes("!sonrojar")) {
        _lowLevelCommand.Sonrojar(client, msg);
    }

    if (msg.content.toLowerCase().includes("!perseguir")) {
        _lowLevelCommand.Perseguir(client, msg);
    }

    if (msg.content.toLowerCase().includes("!besar")) {
        _lowLevelCommand.Besar(client, msg);
    }

    if (msg.content.toLowerCase().includes("!abrazar")) {
        _lowLevelCommand.Abrazar(client, msg);
    }

    if (msg.content.toLowerCase().includes("!pareja")) {
        _lowLevelCommand.Pareja(client, msg);
    }

    if (msg.content.toLowerCase().includes("!riot")) {
        _lowLevelCommand.RiotID(msg);
    }

    if (msg.content.toLowerCase().includes("!perfil")) {
        _lowLevelCommand.Perfil(client, msg);
    }

    if (admin) {
        ActionCustom(client, msg)
    }
    else if (mod) {
        ActionCustom(client, msg)
    }
}

module.exports = {
    ManagerRoles
}


function commandsAdmin(comandos_helper) {
    let commands = [
        { name: '!role', value: "Puedes seleccionar los roles a usuarios etiquetados.\nPor ejemplo: !role <'Name Role'>  <'name user'> <'name user'>.\nSe puede usar varios users" },
        { name: '!unrole', value: "Puedes deseleccionar los roles a usuarios etiquetados.\nPor ejemplo: !unrole <'Name Role'> <'name user'> <'name user'>.\nSe puede usar varios users" },
        { name: '!asignarrol', value: "se asignara un rol especificado a todos los usuarios. \nPor ejemplo: !asignarrol <'Name Role'>" },
        { name: '!desasignarrol', value: "Puedes deseleccionar los roles a todos los usuarios.\nPor ejemplo: !desasignarrol <'Name Role'>" }
    ];

    comandos_helper.forEach(e => {
        commands.push(e);
    });

    return commands;
}

async function ActionCustom(client, msg) {
    let message = msg.content.trim().split(" ")[0];
    if (message.toLowerCase() == "!asignarrol") {
        _hightRole.AsignarRol(client, msg);
    }

    if (message.toLowerCase() == "!desasignarrol") {
        _hightRole.DesasignarRol(client, msg);
    }

    if (message.toLowerCase() == "!role") {
        await _hightRole.Role(client, msg);
    }

    if (message.toLowerCase() == "!unrole") {
        _hightRole.Unrole(client, msg);
    }
}

