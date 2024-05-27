const { LowInteraction } = require("./lib");

const _lowInteraction = new LowInteraction();


async function ManageInteraction(interaction){
    
    if(interaction.customId.includes("test")){
        _lowInteraction.Test(interaction);
    }

    if(interaction.customId.includes("duo")){
        _lowInteraction.Duo(interaction);
    }
}

module.exports = {
    ManageInteraction
};