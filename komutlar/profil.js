const Discord = require('discord.js');
const request = require('node-superfetch');

const db = require('quick.db');

const { stripIndents } = require('common-tags');

exports.run = async (client, msg, args) => {
  const dil = db.fetch(`${msg.guild.id}.dil`)
  if (dil === 'en') {
    const user = msg.mentions.users.first() || msg.author;
    const cacoin = db.fetch(`${user.id}.cacoin`)
    const bakiye = db.fetch(`${user.id}.cacoin`) || '0'
     const isim = db.fetch(`${user.id}.isim`) || 'Ayarlanmamış'
      const soy = db.fetch(`${user.id}.soy`) || 'Ayarlanmamış'
    const snekfetch = require('snekfetch')
  const Canvas = require('canvas')
  var canvas = Canvas.createCanvas(1023, 682);
  const ctx = canvas.getContext('2d');
      var {body: downloadedImageBuffer} = await snekfetch.get("https://cdn.discordapp.com/attachments/556744134334087219/565213927462404127/uzay.jpg");
    const background = await Canvas.loadImage( downloadedImageBuffer );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  /* ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip(); */

  const { body: buffer } = await snekfetch.get(user.avatarURL);
  const avatar = await Canvas.loadImage(buffer);
    const { body: deneme } = await snekfetch.get("https://cdn.discordapp.com/attachments/549197273381208064/549216983493640193/al.png");
  const avat = await Canvas.loadImage(deneme);
        const { body: ca } = await snekfetch.get("https://cdn.discordapp.com/attachments/549197273381208064/549241321592717332/border-shield-classic-knight-512_-_Kopya.png");
  const avata = await Canvas.loadImage(ca);
    const path = require('path')
ctx.font = "bold 36px Arial";
  ctx.font = "bold 36px Arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${user.username.toUpperCase()}`, 220, 130);
  ctx.fillStyle = "#000000";
    ctx.font = "bold 36px Arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`Ca Coin : ` + bakiye, 20, 280);
  ctx.fillStyle = "#000000";
      ctx.font = "bold 36px Arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`Name : ` + isim, 20, 350);
  ctx.fillText(`Last Name : ` + soy, 20, 420);
  ctx.fillStyle = "#000000";
  const Durum = user.presence.status;
        var Durmm = ''
        if (cacoin >= 500) {
          if (cacoin < 1000) {
ctx.drawImage(avat, 240, 150, 100, 100);
          }
        }
            if (cacoin >= 1000) {
              if (cacoin < 2000) {
ctx.drawImage(avata, 240, 150, 100, 100);
            }
        }
				if (Durum === 'online') { var Durmm = 'green' }
				if (Durum === 'offline') { var Durmm = 'grey' }
				if (Durum === 'dnd') { var Durmm = 'red' }
				if (Durum === 'idle') { var Durmm = 'yellow' }

	
				ctx.lineWidth = 8;
				ctx.arc(406 + -296, 180 + -50, 100, 0, 2 * Math.PI, false);
				ctx.strokeStyle = Durmm;
				ctx.stroke();
				ctx.clip();
				ctx.drawImage(avatar, 10, 25, 200, 200);

  const d = new Discord.Attachment(canvas.toBuffer(), "mardius-profil.png");
  msg.channel.send(d)
    return
  }
  const user = msg.mentions.users.first() || msg.author;
  if (user.bot) return msg.channel.send('Bir Botun Profili Olamaz!')
    const bakiye = db.fetch(`${user.id}.cacoin`) || '0'
     const isim = db.fetch(`${user.id}.isim`) || 'Ayarlanmamış'
      const soy = db.fetch(`${user.id}.soy`) || 'Ayarlanmamış'
          const cacoin = db.fetch(`${user.id}.cacoin`)
    const snekfetch = require('snekfetch')
  const Canvas = require('canvas')
  var canvas = Canvas.createCanvas(1023, 682);
  const ctx = canvas.getContext('2d');
      var {body: downloadedImageBuffer} = await snekfetch.get("https://cdn.discordapp.com/attachments/556744134334087219/565213927462404127/uzay.jpg");
    const background = await Canvas.loadImage( downloadedImageBuffer );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  /* ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip(); */
    const { body: deneme } = await snekfetch.get("https://cdn.discordapp.com/attachments/549197273381208064/549216983493640193/al.png");
  const avat = await Canvas.loadImage(deneme);
        const { body: svo } = await snekfetch.get("https://cdn.discordapp.com/attachments/549197273381208064/549241321592717332/border-shield-classic-knight-512_-_Kopya.png");
  const avata = await Canvas.loadImage(svo);
  const { body: buffer } = await snekfetch.get(user.avatarURL);
  const avatar = await Canvas.loadImage(buffer);
    const path = require('path')
ctx.font = "bold 36px Arial";
  ctx.font = "bold 36px Arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${user.username.toUpperCase()}`, 220, 130);
  ctx.fillStyle = "#000000";
    ctx.font = "bold 36px Arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`Ca Coin : ` + bakiye, 20, 280);
  ctx.fillStyle = "#000000";
      ctx.font = "bold 36px Arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`İsim : ` + isim, 20, 350);
  ctx.fillText(`Soy İsim : ` + soy, 20, 420);
  ctx.fillStyle = "#000000";
  const Durum = user.presence.status;
        var Durmm = ''
        if (cacoin >= 500) {
          if (cacoin < 1000) {
ctx.drawImage(avat, 240, 150, 100, 100);
          }
        }
            if (cacoin >= 1000) {
              if (cacoin < 2000) {
ctx.drawImage(avata, 240, 150, 100, 100);
            }
        }
				if (Durum === 'online') { var Durmm = 'green' }
				if (Durum === 'offline') { var Durmm = 'grey' }
				if (Durum === 'dnd') { var Durmm = 'red' }
				if (Durum === 'idle') { var Durmm = 'yellow' }

	
				ctx.lineWidth = 8;
				ctx.arc(406 + -296, 180 + -50, 100, 0, 2 * Math.PI, false);
				ctx.strokeStyle = Durmm;
				ctx.stroke();
				ctx.clip();
				ctx.drawImage(avatar, 10, 25, 200, 200);
  

  const d = new Discord.Attachment(canvas.toBuffer(), "profil.png");
  msg.channel.send(d)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['profile'],
  permLevel: 0,
  kategori: "kullanıcı"
};

exports.help = {
  name: 'profil',
  description: 'Kendi Profilini Görmeyi Görürsünüz.',
  usage: 'profil'
};
