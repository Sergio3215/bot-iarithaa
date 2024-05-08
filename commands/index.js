const { HightLevelCommand, LowLevelCommand } = require("./lib.js");

const _hightRole = new HightLevelCommand();
const _lowLevelCommand = new LowLevelCommand();


async function ManagerRoles(client, msg, EmbedBuilder, Colors, administrator, moderation) {

    let admin = administrator,
    mod = moderation;

    let comandos_helper = [
        { name: '!memide', value: "Dice la cantidad que te mide." }
    ];

    if(admin){
        comandos_helper = commandsAdmin(comandos_helper);
    }

    if(mod){
        comandos_helper = commandsAdmin(comandos_helper);
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

    if(msg.content == "!memide"){
        _lowLevelCommand.memide(msg);
    }

    if (admin) {
        ActionCustom(client, msg)
    }
    if (mod) {
        ActionCustom(client, msg)
    }
}

module.exports ={
    ManagerRoles
}


function commandsAdmin(comandos_helper){
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

function ActionCustom(client, msg){
    if (msg.content == "!asignarrol") {
        _hightRole.asignarrol(client, msg);
    }

    if (msg.content == "!desasignarrol") {
        _hightRole.desasignarrol(client, msg);
    }

    if (msg.content == "!role") {
        _hightRole.role(client, msg);
    }

    if (msg.content == "!unrole") {
        _hightRole.unrole(client, msg);
    }
}

