const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
 let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.send('Kullanıcıyı etiketlemeyi unuttun kanka.')
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  let knd = args.slice(1).join(' ');
      let embed2 = new Discord.RichEmbed()
    .setColor('RED')
  .setDescription(`__**Whitelist almaya hak kazandın!**__\n**Rolü alan kişi:** ${kullanıcı}\n**Whitelist rolü veren yetkili** : ${message.author.username}\n**İyi Roller Dileriz.**`)
 .setFooter(`LeuxBotRP`)
  let embed = new Discord.RichEmbed()
  .setColor(0x000000)
  .setDescription(`Whitelist  verildi!\n**Rolü alan kişi:** ${kullanıcı}\n **Sonuç:** ${knd}\n**Whitelist rolü veren yetkili :** ${message.author.username}`)
  .setFooter(`LeuxBotRP`) 
    member.removeRoles(member.roles);
   setTimeout(async function() {
     member.addRole(member.guild.roles.find(knd => knd.id === '715325504487686208')).then(() => {
              client.channels.get("724371400986591362").send(embed)
              member.send(embed2)
              })
            }, 5000);
  return 
 
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['whitelist','whitelistver'],
  kategori: "",
  permLevel: 2
}

exports.help = {
  name: 'wlver',
  description: "Whitelist vermeye yarar",
  usage: '!wlver @kisi sonuç'
}