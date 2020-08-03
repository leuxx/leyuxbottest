const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
 
var prefix = ayarlar.prefix;
 
exports.run = async(client, message, args) => {
    const guard = new Discord.RichEmbed()
 
                .setColor('#fff000')
                .setAuthor(`Guard  Komutları`, client.user.avatarURL)
                .setThumbnail(client.user.avatarURL)
                .addField(`Komutlar`, `<a:yldz:735248836062085120>${prefix}**guard ddos aç/kapat**: DDOS Korumasını Açar. \n <a:yldz:735248836062085120>${prefix}**guard emoji aç/kapat**: Emoji Korumasını açar.\n <a:yldz:735248836062085120>${prefix}**guard kanal aç/kapat**: Kanal Korumasını açar.\n <a:yldz:735248836062085120>${prefix}**guard rol aç/kapat**: Rol Korumasını açar.\n <a:yldz:735248836062085120>${prefix}**guard bot aç/kapat**: Bot Korumasını açar.\n <a:yldz:735248836062085120>${prefix}**guard sağ-tık-ban aç/kapat**: Ban Korumasını açar.\n <a:yldz:735248836062085120>${prefix}**guard sağ-tık-kick aç/kapat**: Kick Korumasını açar.`)
                .addField(`Linkler`, `[Sunucumuz](https://discord.gg/mhQ3Z4) [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=733681099280089138&scope=bot&permissions=8)`)
                .setImage("https://im7.ezgif.com/tmp/ezgif-7-926b5dad1090.gif")
                .setFooter(`Created by ! Baran#0001`, message.author.avatarURL)
              
            message.channel.send(guard);
}
  
 
exports.conf = {
        enabled : true,
        guildOnly : false,
        aliases : ['yardım-guard'],
        permLevel : 0
}

exports.help = {
        name : 'yardim-guard',
        description : 'Komut kategorilerini atar',
        usage : '!yardım'
}
 