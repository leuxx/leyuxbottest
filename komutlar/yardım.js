const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
 
var prefix = ayarlar.prefix;
 
exports.run = async(client, message, args) => {
        const LeuxBot = new Discord.RichEmbed()
 
             .setColor('#fff000')
             .setAuthor(`Kategoriler`, client.user.avatarURL)
             .setThumbnail(client.user.avatarURL)
             .addField(`Kategoriler`, `<a:yldz:735248836062085120>${prefix}yardım Kullanıcı \n <a:yldz:735248836062085120>${prefix}yardım eğlence \n <a:yldz:735248836062085120>${prefix}yardım yapımcı  \n <a:yldz:735248836062085120>${prefix}yardım davet  \n <a:yldz:735248836062085120>${prefix}yardım emoji  \n <a:yldz:735248836062085120>${prefix}yardım moderasyon  \n <a:yldz:735248836062085120>${prefix}yardım guard   \n <a:yldz:735248836062085120>${prefix}yardım ayarlar  \n <a:yldz:735248836062085120>${prefix}yardım seviye  \n <a:yldz:735248836062085120>${prefix}yardım ticket \n <a:yldz:735248836062085120>${prefix}yardım bot \n <a:yldz:735248836062085120>${prefix}yardım çekiliş `)
             .addField(`Linkler`, `[Sunucumuz](https://discord.gg/mhQ3Z4) [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=733681099280089138&scope=bot&permissions=8)`)
             .setImage("https://im7.ezgif.com/tmp/ezgif-7-926b5dad1090.gif")
             .setFooter(`Created by ! Baran#0001`, message.author.avatarURL)
           
         message.channel.send(LeuxBot);
}
  
 
exports.conf = {
        enabled : true,
        guildOnly : false,
        aliases : ['help'],
        permLevel : 0
}

exports.help = {
        name : 'yardım',
        description : 'Komut kategorilerini atar',
        usage : '!yardım'
}
 