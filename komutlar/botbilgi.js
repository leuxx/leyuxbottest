const Discord = require("discord.js");
const moment = require("moment");
const os = require('os');
require("moment-duration-format");
exports.run = async (bot, message, args) => {
   const seksizaman = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
   const istatistikler = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setFooter('<a:botdikkat:720614787763142675> LeuxBot Bot', bot.user.avatarURL)
  .addField("» <a:botdikkat:720614787763142675> **Geliştirici** ","<@377506315246895104>")
  .addField("» <:komutsayisi:720614789876940872>**Bellek kullanımı**", (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB', true)  
  .addField("» <:uptime:720614790736904217> **Çalışma süresi**", seksizaman)
  .addField("» <:kullanci:720614790615138415> **Kullanıcılar**" , bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
  .addField("» <:tiked:708062545398857728>**Sunucular**", bot.guilds.size.toLocaleString(), true)
  .addField("» <:kanal:720614789801312338> **Kanallar**", bot.channels.size.toLocaleString(), true)
  .addField("» <:yuklenyor2:720614994789793832>**Ping**", bot.ping+" ms", true)
  .addField("» <:isletimsistemi:720615986717392936> **CPU**", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
  .addField("» <:bit:720614789272961095>**Bit**", `\`${os.arch()}\``, true)
  .addField("» <:isletimsistemi:720615986717392936>**İşletim Sistemi**", `\`\`${os.platform()}\`\``) 
  .addField("» <:Guncellemeler:720614787804823583>**Güncellemeler**", "Destek sunucumuzda <#712985443385344051> kanalında görebilirsiniz.")
  .addField("**» Bot Davet**", " [Davet Et](https://discord.com/oauth2/authorize?client_id=711183067984691241&scope=bot&permissions=8)", )
  .addField("**» Destek Sunucusu**", " [Sunucumuza Katıl](https://discord.gg/vKjKyCj)", )
   return message.channel.send(istatistikler);
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [ 'bi', 'YEDEK KOMUT2'],
  permLevel: 4,
  kategori:"yapımcı"
};

exports.help = {
  name: "bilgiistatistik",
  description: "Bot i",
  usage: "istatistik"
};