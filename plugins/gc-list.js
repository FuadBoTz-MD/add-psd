

import fs from 'fs';
let handler = async (m, { conn, usedPrefix }) => {
    
	let grup = Object.keys(await conn.groupFetchAllParticipating());
	let pp = 'https://telegra.ph/file/727a1df58afffe5f5acb2.png';
	let rows = [];

	for (let i of grup) {
		const dbnya = db.data.chats[i];
		const expired = `${(dbnya && dbnya.expired > 0) ? msToDate(dbnya.expired - new Date() * 1) : 'Tidak Disetel'}`;
		const gc = await conn.groupMetadata(i);

        try {
            let botAdmin = gc.participants.filter(v => v.id == conn.user.jid)[0].admin;

            rows.push({
                title: gc.subject, 
                description: `Admin?: ${botAdmin ? "Yes" : "No"}\nExpired: ` + expired, 
            }); 

        } catch (e) { 
            console.log(e); 
        } 

    } 

    let info = `${grup.length}`; 

    await conn.reply(m.chat, info, m, { contextInfo: { mentionedJid: [who], forwardingScore: 9999, isForwarded: true, externalAdReply: { mediaType: 1, mediaUrl: pp, title: ']======❏ DAFTAR GROUP BOT ❏======[', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: false, renderLargerThumbnail: true }}}); 
}; 
handler.help = ['grouplist', 'gruplist']; 
handler.tags = ['info','group']; 
handler.command = /^(listgc|listgrup|listgroup|gruplist|grouplist|gclist)$/i; 
export default handler;  

 function msToDate(ms) {  
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));  
    let daysms = ms % (24 * 60 * 60 * 1000);  
    let hours = Math