const Discord = require('discord.js');
const data = require('quick.db')

exports.run = async (client, message, args) => {

if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin.`)
let role = message.mentions.roles.first() || message.guild.roles.find(role => role.name === args[0])
if(!args[0]) return message.channel.send(`Bir rolü etiketlemelisin veya ismini girmelisin.`)
if(!role) return message.channel.send(`${args[0]}, rolünü sunucuda bulamıyorum. (ismini doğru girmemiş olabilirsin)`)
  
let arg = args[1]

if(!arg) return message.channel.send(`Bir hex-color girmelisin (mavi, yeşil, mor, pembe, sarı, kırmızı, gri, beyaz yazabilirsin.): 
www.color-hex.com`)
let renk = arg.replace('mavi', '#6999ff')
.replace('yeşil', '#69ff80')
.replace('mor', '#b852d1')
.replace('pembe', '#ebaac8')
.replace('sarı', '#f5d569')
.replace('kırmızı', '#ff3030')
.replace('gri', '#bdbdbd')
.replace('beyaz', '#fffff0')

.replace('blue', '#6999ff')
.replace('green', '#69ff80')
.replace('purple', '#b852d1')
.replace('pink', '#ebaac8')
.replace('yellow', '#f5d569')
.replace('red', '#ff3030')
.replace('gray', '#bdbdbd')
.replace('white', '#fffff0')

if(!renk.startsWith('#')) return message.channel.send(`Düzgün bir hex-color girmelisin (mavi, yeşil, mor, pembe, sarı, kırmızı, gri, beyaz yazabilirsin.): 
www.color-hex.com`)
if(renk.split('#')[1].length > 7) return message.channel.send(`Düzgün bir hex-color girmelisin (mavi, yeşil, mor, pembe, sarı, kırmızı, gri, beyaz yazabilirsin.): 
www.color-hex.com`)
if(renk.split('#')[1].length > 6) return message.channel.send(`Düzgün bir hex-color girmelisin (mavi, yeşil, mor, pembe, sarı, kırmızı, gri, beyaz yazabilirsin.): 
www.color-hex.com`)

const embed = new Discord.RichEmbed()
.setColor(renk)
.setAuthor(client.user.username, client.user.avatarURL)
.setFooter(`Codare`)
.setTimestamp()
  
setTimeout(() => {
message.channel.send(`Hallediyorum, bekleyin.`).then(c => {
setTimeout(() => {
c.edit(`Hallediyorum, bekleyin..`)
setTimeout(() => {
c.edit(`Hallediyorum, bekleyin...`)
setTimeout(() => {
role.setColor(renk)
c.edit(embed.setDescription(`**${role.name}** isimli rolün rengi başarıyla değişti.`))
}, 1500)
}, 1500)
}, 2000)
})
}, 1500)
};
exports.conf = {
  enabled: true, 
  guildOnly: true,
  aliases: ['renkdeğiş', 'renkdeğiştir', 'renk-değiş'],
  permLevel: 0,
  kategori: "moderasyon"
};
exports.help = {
  name: 'renk-değiştir',
  Description: "Renk değiştirir",
  usage: "!renk-değiştir"
};