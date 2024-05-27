const { Profile } = require('../db/query.js');

const _profile = new Profile();

class LowInteraction {
    constructor() {

    }

    async Test(interaction) {
        console.log(interaction);

        let idUser = interaction.customId.split(" ")[1] == interaction.user.id;
        console.log(interaction.customId, interaction.user.id)

        if (idUser) {
            interaction.reply("it is correct");
        }
        else {
            interaction.reply("it is not correct");
        }
    }

    #GetMentions(content) {
        let mentions = content.split("<@");
        let ids = [];
        mentions.map(mnt => {
            ids.push(mnt.split('>')[0]);
        });

        // console.log(ids);
        ids.shift();
        return ids;
    }

    async Duo(interaction) {
        let idsUsers = this.#GetMentions(interaction.message.content);
        // console.log(idsUsers);

        if (interaction.customId.includes("si")) {
            let idUser = interaction.customId.split("si ")[1].trim() == interaction.user.id.trim();
            if (idUser) {
                interaction.reply(`<@${idsUsers[1]}> ha aceptado la solicitud de duo de <@${idsUsers[0]}>`);
                idsUsers.map(async (id, index) => {
                    let member = await _profile.GetById(id);
                    // console.log(member[0])
                    if (index == 0) {
                        member[0].duo = idsUsers[0];
                    }
                    else {
                        member[0].duo = idsUsers[1];
                    }
                    let msg = {
                        author: {
                            id: member[0].userId,
                            globalName: member[0].userGlobalName
                        }
                    }

                    let memberGuild = {
                        nickname: member[0].userNickName
                    };
                    await _profile.Update(msg, memberGuild, member[0]);
                })
                interaction.message.delete();
            }
            else {
                interaction.reply("Usted no es la persona que debe presionar este boton");
            }
        }

        if (interaction.customId.includes("no")) {
            let idUser = interaction.customId.split("no ")[1].trim() == interaction.user.id.trim();
            if (idUser) {
                interaction.reply(`<@${idsUsers[1]}> ha rechazado la solicitud de emparejamiento de duo de <@${ids[0]}>`);
                interaction.message.delete();
            }
            else {
                interaction.reply("Usted no es la persona que debe presionar este boton");
            }
        }

    }

}

module.exports = {
    LowInteraction
}