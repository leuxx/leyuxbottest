const Discord = require('discord.js');

exports.run = (client, message, args) => {
    message.channel.send("💭Destek talebiniz oluşturuldu. Yetkililler en kısa sürede sorununuz ile ilgilenecektir.");
   message.channel.send("``Bilgilendirme``:**Solda en üstte size özel bir oda açıldı ordan yardım alıcaksınız.**");
  message.guild.createChannel(`ticket-${message.author.username}`, 'text').then(ch => {
        ch.overwritePermissions(message.member.roles.first(), {
            VIEW_CHANNEL: false,
        }).catch()
        message.guild.roles.forEach((role) => {
            if (role.hasPermission("BAN_MEMBERS","MANAGE_WEBHOOKS")) {
                ch.overwritePermissions(role, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true,
                    ATTACH_FILES: true,
                    READ_MESSAGES: true,
                    READ_MESSAGE_HISTORY: true,
                }).catch()
                ch.overwritePermissions(message.author.id, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true,
                    ATTACH_FILES: true,
                    READ_MESSAGES: true,
                   READ_MESSAGE_HISTORY: true,
                  
                }).catch()
            }
        })

        const embed = new Discord.RichEmbed()
            .setTitle(`» Hey ${message.author.username} !`)
            .setAuthor("» Destek Sistemi")
            .setDescription("Destek ekibimiz sizinle ilgilenecektir .**\n En fazla 30 dakika içinde ilgilenecektir Yetkili ekibimiz.**\nDestek talebini iptal etmek için [!iptal]() yazabilirsin!")
            .setFooter('LeuxBot | Destek Sistemi', client.user.avatarURL)
            .setTimestamp()
        ch.send(embed).catch()
        ch.send("@everyone")
        ch.awaitMessages((msg) => {
            if (msg.content === "!iptal") {
                ch.send("`Destek iptal ediliyor!`").then(() => {
                    setTimeout(() => {
                        ch.delete().catch()
                    }, 1000)
                });
            }
        }, {
            time: 86400000
        })
    })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bilet'],
  permLevel: 0,
  kategori: "ticket"
}

exports.help = {
  name: 'ticket',
  description: "ticket açar",
  usage: "ticket"
};// knd