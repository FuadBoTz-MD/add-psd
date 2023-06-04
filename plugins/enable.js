import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
	const sections = [
   {
        title: `☞ Setingan Bagi Pengguna BOT~~`,
        rows: [
            {title: "Auto Level Up", rowId: `${usedPrefix + command} autolevelup`, description: "Untuk Untuk Auto Level Up Secara Oktomatis, Di Nyalakan Owner-_-!"},
            ]
   },
   {
	title: `☞ Settings Group~~`,
	rows: [
	{title: "Welcome", rowId: `${usedPrefix + command} welcome`},
	{title: "️Simi", rowId: `${usedPrefix + command} simi`},
	{title: "Nsfw", rowId: `${usedPrefix + command} nsfw`},
	{title: "Anti Badword", rowId: `${usedPrefix + command} antibadword`},
	{title: "Anti Spam", rowId: `${usedPrefix + command} antispam`},
	{title: "Anti Bot Lain", rowId: `${usedPrefix + command} antibot`},
	{title: "Anti Link Group", rowId: `${usedPrefix + command} antilink`},
	{title: "Anti Semua Link", rowId: `${usedPrefix + command} antilinkall`},
	{title: "Anti Phising", rowId: `${usedPrefix + command} antiphising`},
    {title: "️Anti Sticker", rowId: `${usedPrefix + command} antisticker`},
	{title: "Anti Delete", rowId: `${usedPrefix + command} antidelete`},
	{title: "Anti VoiceNote", rowId: `${usedPrefix + command} antivn`},
	{title: "Anti Virtex", rowId: usedPrefix + command + " antivirtex" },
	{title: "Anti Virus", rowId: usedPrefix + command + " antivirus"},
	{title: "Auto Sticker", rowId: `${usedPrefix + command} autosticker`},
	{title: "Anti RPG", rowId: `${usedPrefix + command} antirpg`},
	{title: "Anti Game", rowId: `${usedPrefix + command} antigame`},
	{title: "Indo Only", rowId: `${usedPrefix + command} antiluar`},
	{title: "Admin Only", rowId: usedPrefix + command + " adminonly"},
    {title: "Auto Pesence (Grup)", rowId: `${usedPrefix + command} autopesence`},
	{title: "Auto Persence (Bot)", rowId: `${usedPrefix + command} autopersence`},
	{title: "Autodelvn", rowId: `${usedPrefix + command} autodelvn`},
	{title: "PremNsfwChat", rowId: `${usedPrefix + command} premnsfwchat`},
	{title: "Delete", rowId: `${usedPrefix + command} delete`},
	{title: "Document", rowId: `${usedPrefix + command} document`},
	{title: "WhiteListMyContact", rowId: `${usedPrefix + command} whitelistmycontact`},
	{title: "Detect", rowId: `${usedPrefix + command} detect`},
	{title: "Anime News", rowId: `${usedPrefix + command} animenews`},
	{title: "Anime Update", rowId: `${usedPrefix + command} animeupdate`},
	{title: "Autoread", rowId: `${usedPrefix + command} autoread`},
	]
    },
    {
        title: `☞ Settings Bot~~`,
        rows: [
            {title: "Auto Backup", rowId: `${usedPrefix + command} autobackup`},
            {title: "Auto React", rowId: `${usedPrefix + command} autoreact`},
            {title: "Owner Only", rowId: `${usedPrefix + command} owneronly`},
            {title: "PcOnly", rowId: `${usedPrefix + command} pconly`},
            {title: "GcOnly", rowId: `${usedPrefix + command} gconly`},
            {title: "SwOnly", rowId: `${usedPrefix + command} swonly`},
            {title: "Restrict", rowId: `${usedPrefix + command} restrict`},
            {title: "Bot Nyimak", rowId: `${usedPrefix + command} nyimak`},
            ]
    },
]

const listMessage = {
  text: ' ',
  footer: botdate,
  title: `━━━━━▢ *OPTIONS* ▢━━━━━`,
  buttonText: "𝗖𝗟𝗜𝗖𝗞 𝗛𝗘𝗥𝗘",
  sections
}

  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let named = conn.getName(m.sender)
  let fkon = { key: { fromMe: false, participant: `${m.sender.split`@`[0]}@s.whatsapp.net`, ...(m.chat ? { remoteJid: '0@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${named}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${named}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
  let kled = 'https://telegra.ph/file/c4788912ab6567017ef2c.jpg'
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let bot = global.db.data.settings[conn.user.jid] || {}
  let type = (args[0] || '').toLowerCase()
  let isAll = false, isUser = false
  
  switch (type) {
    case 'autobackup':
        if (!isROwner) {
            dfail('rowner', m, conn)
            throw false
        }
        bot.backup = isEnable
        break
        
    case 'autoreact':
        if (!isOwner) {
            dfail('owner', m, conn)
            throw false
        }
        bot.reacts = isEnable
        break
        
    case 'antivn':
        if (!m.isGroup) {
            global.dfail('group', m, conn)
            throw false
        } else if (!(isAdmin || isOwner)) {
            global.dfail('admin', m, conn)
            throw false
        }
        chat.antivn = isEnable
        break
        
    case 'antirpg':
        if (!m.isGroup) {
            global.dfail('group', m, conn)
            throw false
        } else if (!(isAdmin || isOwner)) {
            global.dfail('admin', m, conn)
            throw false
        }
        chat.antirpg = isEnable
        break
        
    case 'antigame':
        if (!m.isGroup) {
            global.dfail('group', m, conn)
            throw false
        } else if (!(isAdmin || isOwner)) {
            global.dfail('admin', m, conn)
            throw false
        }
        chat.antigame = isEnable
        break
        
    case 'antiluar':
    case 'indoonly':
    case 'anti212':
  		if (!m.isGroup) {
  			global.dfail('group', m, conn)
  			throw false;
  		} else if (!(isAdmin || isOwner)) {
  			global.dfail('admin', m, conn)
  			throw false;
  		}
        chat.antiLuar = isEnable
        break
        
    case 'autopesence':
        if (!isROwner) {
            global.dfail('rowner', m, conn)
            throw false
        }
        chat.autoPesence = isEnable
        break
        
    case 'autopersence':
        if (!isROwner) {
            global.dfail('rowner', m, conn)
            throw false
        }
        bot.autoPersence = isEnable
        break
        
    case 'animenews':
        if (!isROwner) {
          global.dfail('rowner', m, conn)
          throw false
      }
       chat.updateAnimeNews = isEnable
       break
       
    case 'animeupdate':
        if (!isROwner) {
          global.dfail('rowner', m, conn)
          throw false
      }
       chat.updateAnime = isEnable
       break
       
  	case 'antibot':
  		if (!m.isGroup) {
  			global.dfail('group', m, conn)
  			throw false;
  		} else if (!(isAdmin || isOwner)) {
  			global.dfail('admin', m, conn)
  			throw false;
  		}
  		chat.antiBot = isEnable
  	break
  	
    case 'welcome':
        if (!m.isGroup) {
  			global.dfail('group', m, conn)
  			throw false;
  		} else if (!(isAdmin || isOwner)) {
  			global.dfail('admin', m, conn)
  			throw false;
  		}
      chat.welcome = isEnable
      break
      
      /* admin only By Fokus ID */
	 case 'adminonly':
	 case 'hanyaadmin':
	 case 'modeadmin':
        if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
       chat.adminOnly = isEnable
       break
       
	 /* Batasan */
     case 'antivirus':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiVirtex = isEnable
      break
      
      case 'antivirtex':
          if (m.isGroup) {
              if (!(isAdmin || isOwner)) {
                  global.dfail('admin', m, conn)
                  throw false
              }
          }
          chat.antivirtex = isEnable
          break
          
     case 'detect':
       if (!m.isGroup) {
         if (!isOwner) {
           global.dfail('group', m, conn)
           throw false
         }
       } else if (!isAdmin) {
         global.dfail('admin', m, conn)
         throw false
       }
       chat.detect = isEnable
       break
       
     case 'autosticker':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.stiker = isEnable
      break
      
    case "antitoxic":
    case 'antibadword':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiBadword = isEnable
      break
      
    case 'antispam':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      chat.antiSpam = isEnable
      break
      
    case 'antidelete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          dfail('admin', m, conn)
          throw false
        }
      }
      chat.delete = !isEnable
      break
      
     case 'document':
       chat.useDocument = isEnable
       break;
       
    /** By Fokus ID */
    case 'owneronly':
    case 'public':
    case 'self':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      bot.self = isEnable
      break
      
    case 'antilink':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLink = isEnable
      break
      
    case 'antilinkall':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLinkall = isEnable
      break
      
    case 'antiphising':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiPhising = isEnable
      break
      
      case 'antisticker':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiSticker = isEnable
      break
      
      case 'simi':
        if (!isROwner) {
          global.dfail('rowner', m, conn)
          throw false
        }
      chat.simi = isEnable
      break
      
      case 'nsfw':
        if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }}
      chat.nsfw = isEnable
      break
      
    case 'autolevelup':
       isUser = true
       user.autolevelup = isEnable
       break 
       
    // case 'mycontact':
    // case 'mycontacts':
    // case 'whitelistcontact':
    // case 'whitelistcontacts':
    // case 'whitelistmycontact':
    // case 'whitelistmycontacts':
    //   if (!isOwner) {
    //     global.dfail('owner', m, conn)
    //     throw false
    //   }
    //   conn.callWhitelistMode = isEnable
    //   break
    case 'restrict':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      bot.restrict = isEnable
      break
      
    case 'nyimak':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['nyimak'] = isEnable
      break
      
    case 'autoread':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      global.opts['autoread'] = isEnable
      break
      
    case 'pconly':
    case 'privateonly':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['pconly'] = isEnable
      break
      
    case 'gconly':
    case 'grouponly':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['gconly'] = isEnable
      break
      
    case 'swonly':
    case 'statusonly':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['swonly'] = isEnable
      break
      
    default:
      if (!/[01]/.test(command)) return await conn.sendMessage(m.chat, listMessage, { ephemeralExpiration: 86400, quoted: m })
      throw false
  }
  
    await conn.reply(m.chat, `━━━━━▢ *SUCSESS* ▢━━━━━
*Type:* ${type}
*Options:* ${isEnable ? 'Enable' : 'Disable'}
*Status:* Succes
*For:* ${isAll ? 'This Bot' : isUser ? '' : 'This Chats'}${chat.antiPhising == true ? '\n\n*Tip:*\nKarna Anti Phising aktif jangan sampe ada kalimat sperti dibawah ini\n_Followers, subscribe, masukin, xxnx, facebook, bit.ly, kartel, fifa, 50gb, xvideos, legends, twilight, 805.000, mediaflare, ssimontok, okep_' : ''}
`, m, { contextInfo: { isForwarded: false, forwardingScore: 9999, externalAdReply :{ mediaType: 1, mediaUrl: kled, title: `® By FuadXy`, thumbnail: { url: kled }, thumbnailUrl: kled, renderLargerThumbnail: true }}})
}
handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['group', 'owner']
handler.command = /^(on|off|enable|disable)$/i

export default handler