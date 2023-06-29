import fetch from "node-fetch";
import { generateWAMessageFromContent } from "@adiwajshing/baileys";
import fs from 'fs';

let handler = async (m, { conn, text }) => {
  await conn.sendMessage(m.chat, 'Sedang Mendeteksi Getaran....', 'conversation');

  try {
    let res = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');
    let named = conn.getName(m.sender);
    let fkon = {
      key: {
        fromMe: false,
        participant: `${m.sender.split('@')[0]}@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: '0@s.whatsapp.net' } : {})
      },
      message: {
        contactMessage: {
          displayName: `${named}`,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${named}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
      }
    };

    let data = await res.json();
    let json = data.result;
    let deteksi = `Wᴀsᴘᴀᴅᴀ ɢᴇᴍᴘᴀ ᴛᴇʀᴅᴇᴛᴇᴋsɪ!!
🗓️ Tanggal: ${json.Tanggal}
⌚ Jam: ${json.Jam}
⌛ Datetime: ${json.DateTime}
🗾 Coordinat: ${json.coordinates}
🌏 Lintang: ${json.Lintang}
🌐 Bujur: ${json.Bujur}
📳 Magnitude: ${json.Magnitude}
🚧 Kedalaman: ${json.Kedalaman}
❗ Potensi: ${json.Potensi}
♨️ Dirasakan: ${json.Dirasakan}`;

    let map = json.Shakemap;
    let response = await conn.sendMessage(m.chat, deteksi, 'extendedTextMessage', { quoted: fkon });
    let mediaUrl = json.shakemap;
    let thumbnailUrl = json.shakemap;

    let mediaData = await fetch(mediaUrl);
    let contentType = mediaData.headers.get('content-type');

    if (contentType.startsWith('image')) {
      let imageBase64 = await mediaData.buffer();
      await conn.sendMessage(m.chat, imageBase64, 'imageMessage', { quoted: response, caption: 'Info Gempa', thumbnail: imageBase64 });
    } else {
      await conn.sendMessage(m.chat, mediaUrl, 'videoMessage', { quoted: response, caption: 'Info Gempa', thumbnail: thumbnailUrl });
    }
  } catch (error) {
    console.log(error);
    await conn.sendMessage(m.chat, 'Terjadi kesalahan saat mengambil data gempa', 'conversation');
  }
};

handler.help = ['infogempa'];
handler.tags = ['info'];
handler.command = /^(infogempa|gempa)$/i;

export default handler;