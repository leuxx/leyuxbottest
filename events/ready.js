const moment = require('moment')
const Discord = require('discord.js')
let prefix = '!'
module.exports = client => 
{
  var kullanıcı = client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()
  
  let user;
  
   console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: Aktif, Komutlar yüklendi!`
  );
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: ${
      client.user.username
    } ismi ile giriş yapıldı!`
  );

  const aktiviteListesi = [
    '!yardım',
    'LeuxBot'
    
    
  ]

  client.user.setStatus('dnd')
  
  setInterval(() => {
    const Aktivite = Math.floor(Math.random() * (aktiviteListesi.length - 1))
    client.user.setActivity(aktiviteListesi[Aktivite])
      client.user.setGame(`${prefix}yardım  ${client.guilds.size} Sunucu  ${kullanıcı} Farklı Kullanıcıya Hitap ediyor!`);
  }, 7000)
}