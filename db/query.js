const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class Profile {
    constructor() {

    }

    async Create(msg, member) {
        return await prisma.profile.create({
            data: {
                userId: msg.author.id,
                userGlobalName: msg.author.globalName,
                userNickName: member.nickname
            }
        });
    }

    async Get() {
        return await prisma.profile.findMany();
    }

    async GetById(id) {
        return await prisma.profile.findMany({
            where: {
                userId: id
            }
        });
    }

    async Update() {
        await prisma.profile.update({
            where: {
                userId: msg.author.id
            },
            data: {
                userId: msg.author.id,
                userGlobalName: msg.author.globalName,
                userNickName: member.nickname
            }
        });
    }
}

class Riot {
    constructor() {

    }

    async Create(msg, riotID) {
        return await prisma.riot.create({
            data: {
                userID: msg.author.id,
                riotID: riotID
            }
        });
    }

    async Get() {
        return await prisma.riot.findMany();
    }

    async GetById(id) {
        return await prisma.riot.findMany({
            where: {
                userID: id
            }
        });
    }

    async Update(msg, riotID) {
        await prisma.riot.update({
            where: {
                userID: msg.author.id
            },
            data: {
                riotID: riotID
            }
        });
    }

    async Remove(data) {
        await prisma.riot.delete({
            where: {
                id: data[0].id
            }
        });
    }
}

module.exports = {
    Profile,
    Riot
}