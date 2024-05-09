const { HightLevelCommand, LowLevelCommand } = require("./lib.js");

const _hightRole = new HightLevelCommand();
const _lowLevelCommand = new LowLevelCommand();


async function ManagerRoles(client, msg, EmbedBuilder, Colors, administrator, moderation) {

    let admin = administrator,
    mod = moderation;

    let comandos_helper = [
        { name: '!memide', value: "Dice la cantidad que te mide." },
        { name: '!golpear', value: "Tu golpeas a alguien cuando lo etiquetas. Ejemplo !golpear <name>" },
        { name: '!sonrojar', value: "Accion de sonrojarse" },
        { name: '!perseguir', value: "Tu persigues a alguien cuando lo etiquetas. Ejemplo !golpear <name>" }
    ];

    let arrTemp = comandos_helper;

    if(admin){
        comandos_helper = commandsAdmin(arrTemp);
    }

    if(mod){
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

    if(msg.content == "!memide"){
        _lowLevelCommand.MeMide(msg);
    }
    
    if(msg.content.includes("!golpear")){
        _lowLevelCommand.Golpear(client, msg, EmbedBuilder, Colors);
    }
    
    if(msg.content.includes("!sonrojar")){
        _lowLevelCommand.Sonrojar(client, msg, EmbedBuilder, Colors);
    }
    
    if(msg.content.includes("!perseguir")){
        _lowLevelCommand.Perseguir(client, msg, EmbedBuilder, Colors);
    }

    if (admin) {
        ActionCustom(client, msg)
    }
    else if (mod) {
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

async function ActionCustom(client, msg) {
    let message = msg.content.trim().split(" ")[0];
    if (message == "!asignarrol") {
        _hightRole.AsignarRol(client, msg);
    }

    if (message == "!desasignarrol") {
        _hightRole.DesasignarRol(client, msg);
    }

    if (message == "!role") {
       await _hightRole.Role(client, msg);
    }

    if (message == "!unrole") {
        _hightRole.Unrole(client, msg);
    }
}

