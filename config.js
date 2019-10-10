/* eslint-disable */
const vault = process.env;
var config = {
    ownerID: vault.OWNERID,
    adms: ['628224324880302100'],
    token: vault.TOKEN,
    status: 'dnd',
    shards: '0',
    debug: 'false',
    color: '#7289DA', //#36393F
    playingGame: 'felicidade e amor para todos os meus usuários 🖤',
    eightBallResponses: ['Sim', 'Não', 'Certamente', 'Minhas fontes dizem sim', 'Tente mais tarde...', 'Sem dúvida', 'É melhor não contar agora'],
    googleAPIToken: vault.GOOGLEAPITOKEN,
    logTimeFormat: 'LLLL',
    version: '3.1.8',
    musicEnabled: 'true',
    prefix: '.',
    premiumIDs: ['473491713684668416'],
    colorPremium: '#e8ff00',
    defaultSettings: {
        prefix: '.',
        welcomeEnabled: 'true',
        inviteFilterEnabled: 'true',
        inviteWhitelist: ['Dono'],
        facepalms: 'true',
        swearFilter: 'true',
        swearWords: ['arrombado', 'dark lixo'],
        logDeletes: 'true',
        logNewMember: 'true',
        logMemberLeave: 'true',
        logCommandUsage: 'true',
        logPurge: 'true',
        commandTimeout: '2000',
        sendHelp: 'dm'
    },
    dashboard: {
        enabled: 'true',
        oauthSecret: vault.OAUTHSECRET,
        secure: 'true',
        sessionSecret: vault.SESSIONSECRET,
        domain: `darkdashboard.glitch.me`,
        port:  vault.PORT,
        invitePerm: vault.INVITEPERM,
        protectStats: 'false',
        borderedStats: 'false',
        legalTemplates: {
            contactEmail: 'fakenews20193@gmail.com',
            lastEdited: '09 de Outubro de 2019'
        }
    }
};


module.exports = config;