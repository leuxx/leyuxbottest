const Discord = require('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const db = require("quick.db")
const Jimp = require("jimp")
const request = require('node-superfetch');
const ms = require('parse-ms')
client.login(ayarlar.token)
const moment = require('moment');
require('./util/eventLoader')(client);



var prefix = ayarlar.prefix;


//----------------------Bot'un Bağlandı Kısmı -----------------------------//


const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.on("ready", () => {
    client.user.setActivity(`LeuxBot`,`!yardım`);
        }, 
  console.log("Bağlandım!")
);


//----------------------Bot'un Bağlandı Kısmı SON-----------------------------//


//------------------Message Kısmı Burayı silersen bot cevap vermez ----------------// 

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  let permlvl = 0;
  if(!message.guild) {
  if (message.author.id === ayarlar.sahip) permlvl = 4;
	return; }
  if (message.member.hasPermission("MANAGE_WEBHOOKS")) permlvl = 1;
  if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

//------------------Message Kısmı Burayı silersen bot cevap vermez SON----------------// 
//--------------AFK KOD BAŞLANGIÇ------------------//
client.on("message" , async message => {
  const msg = message;
  if(message.content.startsWith(ayarlar.prefix+"afk")) return;  
let afk = message.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${message.author.id}_${message.guild.id}`)
  
  const isim = db.fetch(`afkAd_${message.author.id}_${message.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${message.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${message.guild.id}`)
   if(message.content.includes(kisi3)){
     const embed = new Discord.RichEmbed()
      .setColor("#db08d4")
      .setAuthor("LeuxBot" , "avatar")
      .setDescription(`Etiketlediğiniz Kişi Afk \n Sebep : ${sebep}`)
      .setTimestamp()
      .setFooter(`${message.author.username} Tarafından İstendi`)
       message.channel.send(embed)
   }
 }
  if(message.author.id === kisi){
    const embed = new Discord.RichEmbed()
      .setColor("#db08d4")
      .setAuthor("LeuxBot")
      .setDescription(`Afk'lıktan Çıktınız`)
      .setTimestamp()
      .setFooter(`${message.author.username} Tarafından İstendi`)
       message.channel.send(embed)
   db.delete(`afkSebep_${message.author.id}_${message.guild.id}`)
   db.delete(`afkid_${message.author.id}_${message.guild.id}`)
   db.delete(`afkAd_${message.author.id}_${message.guild.id}`)
    message.member.setNickname(isim)
    
  }
  
})

//-------------AFKSON-----//
//-----------oto rol-----//
client.on('guildMemberAdd', async (member, guild, message) => {
 
let role = db.fetch(`otorolisim_${member.guild.id}`)
 let otorol = db.fetch(`autoRole_${member.guild.id}`)
 let i = db.fetch(`otorolKanal_${member.guild.id}`)
 if (!otorol || otorol.toLowerCase() === 'yok') return;
else {
 try {
 
 
  if (!i) return
if (!role) {
  member.addRole(member.guild.roles.get(otorol))
                        var embed = new Discord.RichEmbed()
                        .setDescription("**Sunucuya Yeni Katılan** @" + member.user.tag + " **Kullanıcısına** <@&" + otorol + ">  **Rolü verildi.**")
                        .setColor('0x36393E')
                        .setFooter(`Otorol Sistemi`)
     member.guild.channels.get(i).send(embed)
} else if (role) {
    member.addRole(member.guild.roles.get(otorol))
                        var embed = new Discord.RichEmbed()
                        .setDescription(`**Sunucuya Yeni Katılan** \`${member.user.tag}\` **Kullanıcısına** \`${role}\` **Rolü verildi.**`)
                        .setColor('0x36393E')
                        .setFooter(`Otorol Sistemi`)
     member.guild.channels.get(i).send(embed)
 
}
 
 } catch (e) {
 console.log(e)
}
}
 
});
 
 
 
//------------otorol son---------//
client.emojiler = {
  gold: "656943365660737555", //?PARAM DAKİ ALTIN EMOJİSİ
  paraGitti: "315009174163685377", // X İŞARETİ
  paraGitmedi: "690266213426790480", // TİK İŞARETİ
  paraROZET: "685475563065966613", // PARA İLE ALINAN YILDIRIM ROZET EMOJİSİ
  onayRozet: "653599878085083146", // ONAY ROZETİ
  modRozet: "685475563065966613", // MOD ROZETİ
  yetkiliRozet: "685475563065966613", // YETKİLİ ROZETİ
  destekçiRozet: "657237148063236096",
  evet: "691967508420231198", // TİK İŞARET
  hayır: "315009174163685377", // X İŞARETİ
  acikk: "618934482992627743",
  kapalii: "690266213426790480",
  kendineParaYollama: "705363337344581632", // KENDİNE PARA ATMAYA ÇALIŞANLAR İÇİN SİNİRLİ EMOJİSİ
  konfeti: "653556299224842241", // MESLEK SAHİBİ OLUNCA RENGARENK KONFETİ ATIYOR
  yukleniyor: "653556309823717376", // YÜKLENİYOR EMOJİ İŞTE :D
  sinirli: "705363337344581632", // TİTREYEN SİNİRLİ :D
  mutlu: "657248157071179807", // MUTLU EMOJİ
  rahatsızetme: "705364934204194816", // RAHATSIZ ETMEYİN EMOJİSİ
  çevrimiçi: "691967508420231198", // ÇEVRİMİÇİ EMOJİSİ
  yayıncı: "617150034655576095", // YAYINCI EMOJİSİ
  çevrimdışı: "315009174163685377", // ÇEVRİM DIŞI EMOJİSİ
  boşta: "685475690103046230", // BOŞTA EMOJİSİ
  bot: "653554650410385428", // BOT EMOJİSİ
  polis: "536480421685362699", // POLİS EMOJİ
  Yvar: "691967508420231198", // YETKİLERİM KOMUDUNDAKİ TİK İŞARETİ
  Yyok: "315009174163685377", // YETKİLERİM KOMUDUNDAKİ X İŞARETİ
  yan: "653569046821863435", // > GİBİ EMOJİ İŞTE :ç
  kalpSarılmalı: "561146492648161284",
  olumlu: "",
  olumsuz: "",

  // AYARLAR KOMUDUNDAKİ AÇIK KAPALI EMOJİLERİ >>>>>>>>>>>>>>>>>
  kapalıA: "690266213426790480",
  açıkA: "690266274336342068",

  // AÇIK BONUS EMOJİLERİ -------------- >>>>>>>>>>

  açıkB: "549204804468211740", // B
  açıkO: "549204805151621141", // O
  açıkN: "549204804446978058", // N
  açıkU: "549204806796050462", // U
  açıkS: "549204806380552202", // S

  // KAPALI BONUS EMOJİLERİ ---------------- >>>>>>>>>>>>>

  kapalıO: "549205266130927648", // O
  kapalıN: "549205265702977542", // N
  kapalıU: "549205268051787776", // U
  kapalıS: "549205267246612482" // S
};
 client.ayarlar = {
  prefix: "!",
  };
client.a = {
  sa: `${bot.version}`
};

client.avatarURL = `https://resimag.com/p1/e6281801e9b.png`;
client.en = require("./en.js");

client.tr = require("./tr.js");// ayarlancak
//----------Koruma Sistemi--------------------//


client.on("message", async msg => {
  var sistem = await db.fetch(`ddos`);
  if (sistem === true) {
    if (client.ping > 400) {
      var bölgeler = [
        "singapore",
        "eu-central",
        "india",
        "us-central",
        "london",
        "eu-west",
        "amsterdam",
        "brazil",
        "us-west",
        "hongkong",
        "us-south",
        "southafrica",
        "us-east",
        "sydney",
        "frankfurt",
        "russia"
      ];
      var yeniBölge = bölgeler[Math.floor(Math.random() * bölgeler.length)];
      msg.guild.setRegion(yeniBölge);
      let kanal = msg.guild.channels.find(c => c.name === "anti-ddos");
      if (!kanal) {
        msg.guild.createChannel(`anti-ddos`, `text`).then(ch => {
          let ever = msg.guild.roles.find(r => r.name === "@everyone");
          ch.overwritePermissions(ever, {
            VIEW_CHANNEL: false
          });
          setTimeout(async function() {
            ch.send(
              `<@${msg.guild.ownerID}>, sunucunun pingi yükseldiğinden dolayı saldırı ihtimaline karşı bölgeyi değiştirdim.`
            );
          }, 1500);
        });
      } else {
        kanal.send(
          `<@${msg.guild.ownerID}>, sunucunun pingi yükseldiğinden dolayı saldırı ihtimaline karşı bölgeyi değiştirdim.`
        );
      }
    }
  } else {
  }
});

client.on("emojiDelete", async emo => {
  var sistem = await db.fetch(`emo`);
  if (emo === null) return;
  else {
    const entry = await emo.guild
      .fetchAuditLogs({ type: "EMOJI_DELETE" })
      .then(audit => audit.entries.first());
    const exec = await emo.guild.members.get(entry.executor.id);
    if (exec.hasPermission("ADMINISTRATOR")) return;
    emo.guild.createEmoji(emo.url, emo.name);
    exec.removeRoles(exec.roles);
    setTimeout(async function() {
      let role = emo.guild.roles.find(r => r.name === "Cezalı");
      if (!role) {
        emo.guild
          .createRole({
            name: "Cezalı",
            color: "GREY",
            position: emo.guild.roles.size - 1,
            permissions: []
          })
          .then(rol => {
            exec.addRole(rol);
          })
          .catch(e => console.error(e));
        setTimeout(async function() {});
      } else {
        exec.addRole(role);
      }
    }, 400);
  }
});

client.on("channelDelete", async channel => {
  var sistem = await db.fetch(`kanal`);
  if (sistem === null) return;
  else {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());
    const exec = await channel.guild.members.get(entry.executor.id);
    if (exec.hasPermission("ADMINISTRATOR")) return;
    exec.removeRoles(exec.roles);
    setTimeout(async function() {
      let role = channel.guild.roles.find(r => r.name === "Cezalı");
      if (!role) {
        channel.guild
          .createRole({
            name: "Cezalı",
            color: "GREY",
            position: channel.guild.roles.size - 1,
            permissions: []
          })
          .then(rol => {
            exec.addRole(rol);
          })
          .catch(e => console.error(e));
        setTimeout(async function() {});
      } else {
        exec.addRole(role);
      }
    }, 400);
  }
});

client.on("guildMemberAdd", async member => {
  if (!member.user.bot) return;
  var sistem = await db.fetch(`rightbot`);
  if (sistem === null) return;
  let log = await member.guild
    .fetchAuditLogs()
    .then(denetim => denetim.entries.first());
  let botuSokan = log.executor.id;
  if (member.guild.ownerID === botuSokan) return;
  else {
    let botuSokanv2 = await member.guild.members.get(botuSokan);
    let cezalı = member.guild.roles.find(r => r.name === "Cezalı");
    if (!cezalı) {
      try {
        member.guild
          .createRole({
            name: "Cezalı",
            color: "GREY",
            position: member.guild.roles.size - 1,
            permissions: []
          })
          .then(rol => {
            botuSokanv2.removeRoles(botuSokanv2.roles);
            setTimeout(async function() {
              botuSokanv2.addRole(rol);
            }, 500).catch(e => console.error(e));
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        botuSokanv2.removeRoles(botuSokanv2.roles);
        setTimeout(async function() {
          botuSokanv2.addRole(cezalı);
          member.ban(
            `Bot koruma sistemi, ${botuSokanv2.user.tag} tarafından ${member.user.tag} botu sokuldu, sistem tarafından yasaklandı.`
          );
        }, 500);
      } catch (e) {
        console.log(e);
      }
    }
  }
});

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  let eklenenRol = newMember.roles.filter(rol => !oldMember.roles.has(rol.id));
  if (eklenenRol.size > 0) {
    if (
      db.has(
        `${eklenenRol.map(rol => rol.guild.id)}.${eklenenRol.map(
          rol => rol.id
        )}`
      ) === false
    ) {
      db.set(
        `${eklenenRol.map(rol => rol.guild.id)}.${eklenenRol.map(
          rol => rol.id
        )}`,
        eklenenRol.map(r => r.members.map(m => m.id))
      );
    } else {
      db.delete(
        `${eklenenRol.map(rol => rol.guild.id)}.${eklenenRol.map(
          rol => rol.id
        )}`
      );
      setTimeout(async function() {
        db.set(
          `${eklenenRol.map(rol => rol.guild.id)}.${eklenenRol.map(
            rol => rol.id
          )}`,
          eklenenRol.map(r => r.members.map(m => m.id))
        );
      }, 150);
    }
  }
});

client.on("roleDelete", async role => {
  var sistem = await db.fetch(`rol`);
  if (sistem === null) return;
  let log = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(kay => kay.entries.first());
  let exec = role.guild.members.get(log.executor.id);
  if (exec.hasPermission("ADMINISTRATOR")) return;
  else {
    let cezalı = role.guild.roles.find(r => r.name === "Cezalı");
    if (!cezalı) {
      try {
        role.guild
          .createRole({
            name: "Cezalı",
            color: "GREY",
            position: role.guild.roles.size - 1,
            permissions: []
          })
          .then(r => {
            exec.removeRoles(exec.roles);
            setTimeout(async function() {
              exec.addRole(r);
            }, 500);
          })
          .catch(e => console.error(e));
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        exec.removeRoles(exec.roles);
        setTimeout(async function() {
          exec.addRole(cezalı);
        });
      } catch (e) {
        console.log(e);
      }
    }
    let members = await db.fetch(`${role.guild.id}.${role.id}`);
    members.forEach(ui => {
      console.log(ui);
    });
  }
});

client.on("guildBanAdd", async (guild, user) => {
  var sistem = await db.fetch(`rightban`);
  if (sistem === null) return;
  else {
    let log = guild
      .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
      .then(k => k.entries.first());
    let exec = guild.members.get(log.executor.id);
    let banned = guild.members.get(user.id);
    if (exec.hasPermission("ADMINISTRATOR")) return;
    else {
      exec.removeRoles(exec.roles);
      let cezalı = guild.roles.find(r => r.name === "Cezalı");
      if (!cezalı) {
        try {
          guild
            .createRole({
              name: "Cezalı",
              color: "GREY",
              position: guild.roles.size - 1,
              permissions: []
            })
            .then(r => {
              exec.addRole(r);
            })
            .catch(e => console.log(e));
          setTimeout(async function() {
            exec.removeRoles(exec.roles);
          }, 200);
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          exec.addRole(cezalı);
          setTimeout(async function() {
            exec.removeRoles(exec.roles);
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
});

//----------------KORUMA SİSTEMİ SON-----------//
// SEVİYE SİSTEMİ //
client.on("message", async message => {
  let prefix = ayarlar.prefix;

  var id = message.author.id;
  var gid = message.guild.id;

  let hm = await db.fetch(`seviyeacik_${gid}`);
  let kanal = await db.fetch(`svlog_${gid}`);
  let xps = await db.fetch(`verilecekxp_${gid}`);
  let seviyerol = await db.fetch(`svrol_${gid}`);
  let rollvl = await db.fetch(`rollevel_${gid}`);

  if (!hm) return;
  if (message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);

  if (!lvl) {
    if (xps) {
      db.set(`xp_${id}_${gid}`, xps);
    }
    db.set(`xp_${id}_${gid}`, 4);
    db.set(`lvl_${id}_${gid}`, 1);
    db.set(`xpToLvl_${id}_${gid}`, 100);
  } else {
    if (xps) {
      db.add(`xp_${id}_${gid}`, xps);
    }
    db.add(`xp_${id}_${gid}`, 4);

    if (xp > xpToLvl) {
      db.add(`lvl_${id}_${gid}`, 1);
      db.add(
        `xpToLvl_${id}_${gid}`,
        (await db.fetch(`lvl_${id}_${gid}`)) * 100
      );
      if (kanal) {
        client.channels
          .get(kanal.id)
          .send(
            message.member.user.username +
              "** Seviye Atladı! Yeni seviyesi; `" +
              lvl +
              "` Tebrikler! :tada: **"
          );

      }
    }

    if (seviyerol) {
      if (lvl >= rollvl) {
        message.guild.member(message.author.id).addRole(seviyerol);
        if (kanal) {
          client.channels
            .get(kanal.id)
            .send(
              message.member.user.username +
                "** Seviyesi **" +
                rollvl +
                "** e ulaştı ve " +
                seviyerol +
                " Rolünü kazandı! :tada: **"
            );
        }
      }
    }
  }

});

// SEVİYE SİSTEMİ SON //
// SAYAÇ //
client.on("message", async message => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
    if(sayac[message.guild.id]) {
        if(sayac[message.guild.id].sayi <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Tebrikler, başarılı bir şekilde ${sayac[message.guild.id].sayi} kullanıcıya ulaştık!`)
                .setColor("0x808080")
                .setTimestamp()
            message.channel.send({embed})
            delete sayac[message.guild.id].sayi;
            delete sayac[message.guild.id];
            fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
                console.log(err)
            })
        }
    }
})
client.on("guildMemberRemove", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("RED")
    .setFooter("", client.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: ${member.user.tag}, aramızdan ayrıldı, \**${sayac[member.guild.id].sayi}\** kişi olmamıza \**${sayac[member.guild.id].sayi - member.guild.memberCount}\** kişi kaldı!`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }
 
});
client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("GREEN")
    .setFooter("", client.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: ${member.user.tag}, aramıza katıldı **${sayac[member.guild.id].sayi}** kişi olmamıza **${sayac[member.guild.id].sayi - member.guild.memberCount}** kişi kaldı!` );
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }
 
});
// SAYAÇ SON //

// KÜFÜR ENGELLEME //
client.on("message", async msg => {
  
  
 const i = await db.fetch(`${msg.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir.').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});

client.on("messageUpdate", msg => {
  
  
 const i = db.fetch(`${msg.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir.').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});
// KÜFÜR ENGELLEME SON //
// MOD LOG SİSTEMİ //
const botadi = "LeuxBot"

client.on('messageDelete', message => {
  let modlogs = db.get(`modlogkanaly_${message.guild.id}`)
  const modlogkanal = message.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    if (message.content.length > 1024) {
      modlogkanal.send({embed: {
    color: 3447003,
    author: {
      name: `${message.author.tag} tarafından gönderilen bir mesaj silindi`,
      icon_url: message.author.DisplayAvatarURL
    },
    fields: [{
        name: `Silinen mesaj 1024 karakterden fazla mesajı gösteremem`,
        value: `\`\`\`Bilinmiyor...\`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: message.author.DisplayAvatarURL,
      text: `${botadi} | Mod-Log Sistemi`
    }
  }
});
    } else {
      modlogkanal.send({embed: {
    color: 3447003,
    author: {
      name: `${message.author.tag} kullanıcısının mesajı silindi\n`,
      icon_url: message.author.DisplayAvatarURL
    },
    fields: [{
        name: `Silinen mesaj:`,
        value: `\`\`\` ${message.content} \`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: message.author.DisplayAvatarURL,
      text: `${botadi} | Mod-Log Sistemi`
    }
  }
});
    }
  }
})


client.on('guildBanAdd', async (guild, user) => {
  let modlogs = db.get(`modlogkanaly_${guild.id}`)
  const modlogkanal = guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.RichEmbed()
    .setColor("3447003")
    .setAuthor("Bir kişi sunucudan yasaklandı")
    .setThumbnail(user.avatarURL||user.defaultAvatarURL)
    .addField(`Yasaklanan kişi`, `\`\`\` ${user.tag} \`\`\` `)
    .setFooter(`${botadi} | Mod-Log Sistemi`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});

client.on('guildBanRemove', async (guild, user) => {
  let modlogs = db.get(`modlogkanaly_${guild.id}`)
  const modlogkanal = guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.RichEmbed()
    .setColor("3447003")
    .setAuthor("Bir kişinin yasağı kaldırıldı")
    .setThumbnail(user.avatarURL||user.defaultAvatarURL)
    .addField(`Yasağı kaldırılan kişi`, `\`\`\` ${user.tag} \`\`\` `)
    .setFooter(`${botadi} | Mod-Log Sistemi`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});

client.on('channelCreate', async channel => {
  let modlogs = db.get(`modlogkanaly_${channel.guild.id}`)
  const modlogkanal = channel.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    if (channel.type === "text") {
      modlogkanal.send({embed: {
      color: 3447003,
      fields: [{
          name: `Bir Kanal Oluşturuldu. \nOluşturulan Kanalin İsmi:`,
          value: `\`\`\` ${channel.name} \`\`\``
        },
        {
          name: `Oluşturulan Kanalin Türü`,
          value: `\`\`\` Metin Kanalı \`\`\``
        }
      ],
      timestamp: new Date(),
      footer: {
        text: `${botadi} | Mod-Log Sistemi`
      }
     }});
    } else {
      if (channel.type === "voice") {
       modlogkanal.send({embed: {
    color: 3447003,
    fields: [{
        name: `Bir Kanal Oluşturuldu. \nOluşturulan Kanalin İsmi:`,
        value: `\`\`\` ${channel.name} \`\`\``
      },
      {
        name: `Oluşturulan Kanalin Türü`,
        value: `\`\`\` Ses Kanalı \`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `${botadi} | Mod-Log Sistemi`
    }
  }
}); 
      }
    }
  }
});

client.on('channelDelete', async channel => {
  let modlogs = db.get(`modlogkanaly_${channel.guild.id}`)
  const modlogkanal = channel.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    if (channel.type === "text") {
      modlogkanal.send({embed: {
      color: 3447003,
    fields: [{
        name: `Bir Kanal Silindi. \nSilinen Kanalin İsmi:`,
        value: `\`\`\` ${channel.name} \`\`\``
      },
      {
        name: `Silinen Kanalin Türü`,
        value: `\`\`\` Ses Kanalı \`\`\``
      }
      ],
      timestamp: new Date(),
      footer: {
        text: `${botadi} | Mod-Log Sistemi`
      }
     }});
    } else {
      if (channel.type === "voice") {
       modlogkanal.send({embed: {
    color: 3447003,
    fields: [{
        name: `Bir Kanal Silindi. \nSilinen Kanalin İsmi:`,
        value: `\`\`\` ${channel.name} \`\`\``
      },
      {
        name: `Silinen Kanalin Türü`,
        value: `\`\`\` Ses Kanalı \`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `${botadi} | Mod-Log Sistemi`
    }
  }
}); 
      }
    }
  }
});

client.on('roleDelete', async role => {
  let modlogs = db.get(`modlogkanaly_${role.guild.id}`)
  const modlogkanal = role.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    modlogkanal.send({embed: {
    color: 3447003,
    fields: [{
        name: `Bir Rol Silindi. \nSilinen Rolun İsmi:`,
        value: `\`\`\` ${role.name} \`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `${botadi} | Mod-Log Sistemi`
    }
  }
});
  }
});

client.on('emojiDelete', async emoji => {
  let modlogs = db.get(`modlogkanaly_${emoji.guild.id}`)
  const modlogkanal = emoji.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    modlogkanal.send({embed: {
    color: 3447003,
    fields: [{
        name: `Bir Emoji Silindi. \nSilinen Emojinin İsmi:`,
        value: `\`\`\` ${emoji.name} \`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `${botadi} | Mod-Log Sistemi`
    }
  }
});
  
  }
});


client.on('roleCreate', async role => {
  let modlogs = db.get(`modlogkanaly_${role.guild.id}`)
  const modlogkanal = role.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
     modlogkanal.send({embed: {
    color: 3447003,
    fields: [{
        name: `Yeni Bir Rol Oluşturuldu. \nOluşturulan Rolun İsmi:`,
        value: `\`\`\` ${role.name} \`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `${botadi} | Mod-Log Sistemi`
    }
  }
});
  }
});


client.on('messageUpdate', async (oldMessage, newMessage) => {
  let modlogs = db.get(`modlogkanaly_${oldMessage.guild.id}`)
  const modlogkanal = oldMessage.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    if (oldMessage.author.bot) {
        return false;
    }

    if (!oldMessage.guild) {
        return false;
    }

    if (oldMessage.content == newMessage.content) {
        return false;
    }
    modlogkanal.send({embed: {
      color: 3447003,
      author: {
      name: `${oldMessage.author.tag} mesajını düzenledi:\n`,
      icon_url: oldMessage.author.DisplayAvatarURL
      },
      fields: [{
        name: `Eski mesaj:`,
        value: `\`\`\` ${oldMessage.content} \`\`\``
      },
      {
        name: `Yeni Mesaj:`,
        value: `\`\`\` ${newMessage.content} \`\`\``
      }
      ],
      timestamp: new Date(),
      footer: {
      icon_url: oldMessage.author.DisplayAvatarURL,
      text: `${botadi} | Mod-Log Sistemi`
      }
    }
    });
  }
});


client.on('emojiCreate', async emoji => {
  let modlogs = db.get(`modlogkanaly_${emoji.guild.id}`)
  const modlogkanal = emoji.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    modlogkanal.send({embed: {
    color: 3447003,
    fields: [{
        name: `Bir emoji eklendi. \nEklenen Emojinin İsmi:`,
        value: `\`\`\` ${emoji.name} \`\`\``
    }
    ],
    timestamp: new Date(),
    footer: {
      text: `${botadi} | Mod-Log Sistemi`
    }
    }
  })
  } //SözdizimiHata: eksik ) bağımsız değişken listesinden sonra


});

// SES LOG AYARLA //
client.on('voiceStateUpdate', (oldMember, newMember) => {
if(oldMember.selfMute == true) {
if(newMember.selfMute == false) 
return
}
if(oldMember.selfMute == false) {
if(newMember.selfMute == true) 
return
}
if(oldMember.selfDeaf == true) {
if(newMember.selfDeaf == false) 
return
}
if(oldMember.selfDeaf == false) {
if(newMember.selfDeaf == true) 
return
}
if(oldMember.serverMute == true) {
if(newMember.serverMute == false) 
return
}
if(oldMember.serverMute == false) {
if(newMember.serverMute == true) 
return
}
if(oldMember.serverDeaf == true) {
if(newMember.serverDeaf == false) 
return
}
if(oldMember.serverDeaf == false) {
if(newMember.serverDeaf == true) 
return
}
if(oldMember.streaming == true) {
if(newMember.streaming == false) 
return
}
if(oldMember.streaming == false) {
if(newMember.streaming == true) 
return
}
 let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel
let ms1 = require('parse-ms')
let süre = db.fetch(`seslisüre_${newMember.guild.id + newMember.id}`)
 let timeObj = ms1(Date.now() - süre)
let mlog =  db.fetch(`seslog_${oldMember.guild.id}`) 
if(!mlog) return
if(oldMember.user.bot) return;
if(newMember.user.bot) return;

let kanal = client.channels.get(mlog)
 if(oldUserChannel === undefined) {
let embed = new Discord.RichEmbed()
.setTitle("Bir Kullanıcı Sesli Kanala Girdi!")
.setDescription(`Kullanıcı : ${newMember} \nKanalın Adı : ${newUserChannel}`)
.setColor("#66ff00")
.setTimestamp()
kanal.send(embed)
db.delete(`seslisüre_${newMember.guild.id + newMember.id}`)
 db.set(`seslisüre_${newMember.guild.id + newMember.id}`, Date.now()) 
 }
if(newUserChannel === undefined) {
let embed = new Discord.RichEmbed()
.setTitle("Bir Kullanıcı Sesli Kanaldan Çıktı!")
.setDescription(`Kullanıcı : ${oldMember} \nKanalın Adı : ${oldUserChannel}\n Sesli Kanalda Bulunma Süresi: **${timeObj.days} gün ${timeObj.hours} saat ${timeObj.minutes} dakika ${timeObj.seconds} saniye!**`)
.setColor("#ff0000")
.setTimestamp()
kanal.send(embed)
db.delete(`seslisüre_${newMember.guild.id + newMember.id}`)
db.set(`seslisüre_${newMember.guild.id + newMember.id}`, Date.now()) 
 }
if(newUserChannel) {
if(newUserChannel === undefined) return
if(oldUserChannel === undefined) return
let embed = new Discord.RichEmbed()
.setTitle("Bir Kullanıcı Başka Bir Sesli Kanala Geçti!")
.setDescription(`Kullanıcı : ${newMember} \nEski Kanalın Adı : ${oldUserChannel}\nEski Kanalda Bulunma Süresi : **${timeObj.days} gün ${timeObj.hours} saat ${timeObj.minutes} dakika ${timeObj.seconds} saniye!**\nYeni Kanalın Adı : ${newUserChannel}`)
.setColor("#ffff00")
.setTimestamp()
kanal.send(embed)
db.delete(`seslisüre_${newMember.guild.id + newMember.id}`)
db.set(`seslisüre_${newMember.guild.id + newMember.id}`, Date.now()) 
}
})

client.on("message",async message => {
let prefix = "!"
 if (message.content.startsWith(prefix)) return;
 db.add(`mesajsayısı_${message.guild.id + message.author.id}` , 1)
})

// SES LOG SON //
// BOT EKLEME//
client.on("guildDelete", guild => {
  let kndembed = new Discord.RichEmbed()

    .setColor("RED")
    .setTitle(" Bot Kickledi ")
    .addField("Sunucu Adı:", guild.name)
    .addField("Sunucu sahibi", guild.owner)
    .addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
    .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount);

  client.channels.get("723179842434105344").send(kndembed);
});

client.on("guildCreate", guild => {
  let kndembed = new Discord.RichEmbed()

    .setColor("GREEN")
    .setTitle("Bot Eklendi ")
    .addField("Sunucu Adı:", guild.name)
    .addField("Sunucu sahibi", guild.owner)
    .addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
    .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount);

  client.channels.get("723179842434105344").send(kndembed);
});

// OTO TAG //
client.on('guildMemberAdd', async (member, guild, message) => {

  let ototag = await db.fetch(`ototag_${member.guild.id}`);
  let kanal = await db.fetch(`ototagKanal_${member.guild.id}`)
  let kayıt = await db.fetch(`kayıt_${member.guild.id}`)
  
  if (!ototag) return
  try {
  member.setNickname(`${ototag} ${member.user.username}`)
  if (!kanal) return
  member.guild.channels.get(kanal).send(`<a:tik3:711295763073728612> Sunucuya yeni giriş yapan **${member.user.username}**'a [**${ototag}**] tagı verildi.`)
  } catch(e) {
  }
  
});
// OTO TAG SON//
//Canvas-Giriş-Çıkış , Kod Tamemen (arka plan dışı herşey resim editi dahil) CodAre'den '~'Resađ Seferov✨#0809 a Aitdir
client.on("guildMemberRemove", async member => {
  let resimkanal = JSON.parse(fs.readFileSync("./ayarlar/gç.json", "utf8"));
  const canvaskanal = member.guild.channels.get(
    resimkanal[member.guild.id].resim
  );
  if (!canvaskanal) return;
 
  const request = require("node-superfetch");
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");
 
  var randomMsg = ["Sunucudan Ayrıldı."];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];
 
  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = `{uye}, ${randomMsg_integer}`;
 
  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");
 
  const background = await Canvas.loadImage(
    "https://i.hizliresim.com/Wrn1XW.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
 
  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
 
  ctx.fillStyle = `#D3D3D3`;
  ctx.font = `37px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);
 
  let avatarURL = member.user.avatarURL || member.user.defaultAvatarURL;
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);
 
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 250, 55, 110, 110);
 
  const attachment = new Discord.Attachment(
    canvas.toBuffer(),
    "ro-BOT-güle-güle.png"
  );
 
    canvaskanal.send(attachment);
    canvaskanal.send(
      msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
    );
    if (member.user.bot)
      return canvaskanal.send(`? Bu bir bot, ${member.user.tag}`);
 
});
 
client.on("guildMemberAdd", async member => {
  let resimkanal = JSON.parse(fs.readFileSync("./ayarlar/gç.json", "utf8"));
  const canvaskanal = member.guild.channels.get(
    resimkanal[member.guild.id].resim
  );
  if (!canvaskanal) return;
  const request = require("node-superfetch");
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");
 
  var randomMsg = ["Sunucuya Katıldı."];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];
 
  let paket = await db.fetch(`pakets_${member.id}`);
  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = `{uye}, ${randomMsg_integer}`;
 
  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");
 
  const background = await Canvas.loadImage(
    "https://i.hizliresim.com/UyVZ4f.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
 
  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
//Umarım çalmadan(ben yapdım kod bana ait falan demeden) kullanırsınız❤️
  ctx.fillStyle = `#D3D3D3`;
  ctx.font = `37px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);
 
  let avatarURL = member.user.avatarURL || member.user.defaultAvatarURL;
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);
 
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 250, 55, 110, 110);
 
  const attachment = new Discord.Attachment(
    canvas.toBuffer(),
    "ro-BOT-hosgeldin.png"
  );
 
  canvaskanal.send(attachment);
  canvaskanal.send(
    msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
  );
  if (member.user.bot)
    return canvaskanal.send(`? Bu bir bot, ${member.user.tag}`);
});
// giriş çıkış son
// sunucu kurulum
//////////////////////SUNUCU KURMA/////////////////////
client.on('message', async message => {
  const ms = require('ms');
  const args = message.content.slice(ayarlar.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "sunucu-kur") {
  if (message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
  if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir.");
    message.channel.send(`Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`)
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
    .then((collected) => {
   message.guild.createChannel('|▬▬|ÖNEMLİ KANALLAR|▬▬|', 'category', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])



        
 message.guild.createChannel('「📃」kurallar', 'text', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
 message.guild.createChannel('「🚪」gelen-giden', 'text', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])
.then(channel =>
       channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
       message.guild.createChannel('「✅」sayaç', 'text', [{
        id: message.guild.id,
        deny: ['SEND_MESSAGES']
      }])
.then(channel =>
             channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
             message.guild.createChannel('「💾」log-kanalı', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
            .then(channel => channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
            message.guild.createChannel('「📢」duyuru-odası', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));

       }) 
       .then((collected) => {
        message.guild.createChannel('|▬▬|GENEL KANALLAR|▬▬|', 'category', [{
       id: message.guild.id,
     }]);
             
      message.guild.createChannel(`「💡」şikayet-ve-öneri`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));
     message.guild.createChannel(`「👥」pre-arama-odası`, 'text')
     .then(channel =>
            channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));
     message.guild.createChannel(`「📷」görsel-içerik`, 'text')
     .then(channel =>
                  channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));
     message.guild.createChannel(`「🤖」bot-komutları`, 'text')
     .then(channel =>
                  channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));
     message.guild.createChannel(`「💬」sohbet`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));

      message.guild.createChannel(`🏆》Kurucu Odası`, "voice")
      .then(channel =>
        channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|SES KANALLARI|▬▬|")))
      .then(c => {
        let role = message.guild.roles.find("name", "@everyone");
        let role2 = message.guild.roles.find("name", "Kurucu");
        
        c.overwritePermissions(role, {
            CONNECT: false,
        });
        c.overwritePermissions(role2, {
            CONNECT: true,
            
        });
    })

    message.guild.createChannel('|▬▬|SES KANALLARI|▬▬|', 'category', [{
      id: message.guild.id,
    }]);

    message.guild.createChannel(`🏆》Yönetici Odası`, "voice")
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|SES KANALLARI|▬▬|")))
    .then(c => {
      let role = message.guild.roles.find("name", "@everyone");
      let role2 = message.guild.roles.find("name", "Kurucu");
      let role3 = message.guild.roles.find("name", "Yönetici");
      c.overwritePermissions(role, {
          CONNECT: false,
      });
      c.overwritePermissions(role2, {
          CONNECT: true,
      });
      c.overwritePermissions(role3, {
          CONNECT: true,
      });
  })

  message.guild.createChannel(`💬》Sohbet Odası`, "voice")
  .then(channel =>
    channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|SES KANALLARI|▬▬|")))
  .then(c => {
    let role = message.guild.roles.find("name", "@everyone");
    c.overwritePermissions(role, {
        CONNECT: true,
    });
})

message.guild.createChannel('|▬▬|OYUN ODALARI|▬▬|', 'category', [{
  id: message.guild.id,
}]);

message.guild.createChannel(`🎮》LOL`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
 message.guild.createChannel(`🎮》ZULA`, 'voice')
 .then(channel =>
  channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
 message.guild.createChannel(`🎮》COUNTER STRİKE`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
 message.guild.createChannel(`🎮》PUBG`, 'voice')
 .then(channel =>
  channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
  message.guild.createChannel(`🎮》FORTNİTE`, 'voice')
  .then(channel =>
   channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
   message.guild.createChannel(`🎮》MİNECRAFT`, 'voice')
   .then(channel =>
    channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
    message.guild.createChannel(`🎮》ROBLOX`, 'voice')
    .then(channel =>
     channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
     message.guild.createChannel(`🎮》WOLFTEAM`, 'voice')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))



      message.guild.createRole({
        name: 'Kurucu',
        color: 'RED',
        permissions: [
            "ADMINISTRATOR",
    ]
      })

      
      message.guild.createRole({
        name: 'Yönetici',
        color: 'BLUE',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
    ]
      })

      message.guild.createRole({
        name: 'Moderatör',
        color: 'GREEN',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
    ]
      })

      message.guild.createRole({
        name: 'V.I.P',
        color: '00ffff',
      })

      message.guild.createRole({
        name: 'Üye',
        color: 'WHITE',
      })

      message.guild.createRole({
        name: 'Bot',
        color: 'ORANGE',
      })

       message.channel.send("Gerekli Odalar Kuruldu!")
     
            })   
    
}
});
// sunucu kuruulm son
// JAİL
client.on('guildMemberAdd', async member => {// chimp ᵈ♡#0110
  const data = require('quick.db')
  const asd = data.fetch(`${member.guild.id}.jail.${member.user.id}`)
  if(asd) {
  let data2 = await data.fetch(`jailrol_${member.guild.id}`)
  let rol = member.guild.roles.get(data2)
  if(!rol) return;
  let kişi = member.guild.members.get(member.user.id)
  kişi.roles.forEach(r => {
  kişi.removeRole(r.id)
  data.set(`${member.guild.id}.jail.${kişi.id}.roles.${r.id}`, r.id )})
      data.set(`${member.guild.id}.jail.${kişi.id}`, 'LeuxBot')
  kişi.addRole(rol.id);
    const wasted = new Discord.RichEmbed()
    .setAuthor(member.user.tag, member.user.avatarURL)
    .setColor(`#f3c7e1`)
    .setDescription(`Aa, beni kandıramazsın!`)
    .setTimestamp()
      member.send(wasted)
  } 
    
    
  })
  // JAİL SON
  // yasaklı tag
  client.on('guildMemberAdd', async member => {// chimp#0110
    let guild = member.guild; 
    let user = guild.members.get(member.id);
    
    const chimp = await data.fetch(`banned-tag.${guild.id}`)
    const sayı = await data.fetch(`atıldın.${guild.id}.${user.id}`)
    if(user.user.username.includes(chimp)) {
      
    if(sayı === null) {
    await data.add(`atıldın.${guild.id}.${user.id}`, 1)
    user.send(new Discord.RichEmbed()
    .setColor('RED')
    .setAuthor(guild.name, guild.iconURL)
    .setDescription(`Sunucumuzun yasaklı tagında bulunduğunuz için atıldınız, tekrar giriş yapmayı denerseniz **yasaklanacaksınız**!`))
    await user.kick() }
    
    if(sayı === 1) {
    await data.delete(`atıldın.${guild.id}.${user.id}`)
    user.send(new Discord.RichEmbed()
    .setColor('RED')
    .setAuthor(guild.name, guild.iconURL)
    .setDescription(`Sunucumuzun yasaklı tagında bulunduğunuz için atılmıştınız, tekrar giriş yapmayı denediğiniz için **${guild.name}** sunucusundan kalıcı olarak **yasaklandınız**!`))
    await user.ban() } }
      
    })
    // yasaklı tag son
    // Reklam Engelle//
    client.on("message", async  msg => {
      var i = await db.fetch(`reklam_${msg.guild.id}`)
         if (i == 'acik') {
            const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl",".ga","cf", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party"];
             if (reklam.some(word => msg.content.includes(word))) {
               try {
                 if (!msg.member.hasPermission("BAN_MEMBERS")) {
                       msg.delete();
                         return msg.reply('no reklam').then(msg => msg.delete(3000));
         
     
       msg.delete(3000);                              
     
                 }              
               } catch(err) {
                 console.log(err);
               }
             }
         }
         else if (i == 'kapali') {
           
         }
         if (!i) return;
       })
       ;
       // reklam engelle
       // fake katıl ayrıl
       client.on('message', async message => {
        if (message.content === '.fakekatıl') { // . yerine prefixi yaz
          client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
            }
        });

        client.on('message', async message => {
          if (message.content === '.fakeayrıl') { // . yerine prefixi yaz
            client.emit('guildMemberRemove', message.member || await message.guild.fetchMember(message.author));
              }
          });