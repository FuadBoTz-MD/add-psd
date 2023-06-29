const fetch = require('node-fetch');
const { createWriteStream, existsSync } = require('fs');
const { promisify } = require('util');
const { join } = require('path');

const confirmation = {};
const repository = 'FuadBoTz-MD/V8';
const branch = 'master';

async function handler(m, { text, conn }) {
  try {
    const res = await fetch(`https://raw.githubusercontent.com/${repository}/${branch}/${text}`);
    if (!res.ok) throw await res.text();
    const filename = join(__dirname, '..', text);
    if (existsSync(filename)) {
      confirmation[m.sender] = {
        res,
        filename,
        text,
        timeout: setTimeout(() => {
          m.reply('timed out');
          delete confirmation[m.sender];
        }, 60000),
      };
      throw 'File exists, are you sure want to overwrite? (Y/n) (60s Timeout)';
    }
    res.body.pipe(createWriteStream(filename));
    res.body.once('end', () => {
      m.reply('Done update!');
      conn.sendFile(m.chat, filename, text, null, m).catch(console.error);
    });
  } catch (e) {
    console.error(e);
    m.reply('Error while updating file');
  }
}

async function confirmationHandler(m) {
  if (!(m.sender in confirmation)) return;
  const { res, filename, text, timeout } = confirmation[m.sender];
  if (/^y(es|a)?$/i.test(m.text)) {
    res.body.pipe(createWriteStream(filename));
    res.body.once('end', () => {
      m.reply('Done overwrite!');
      conn.sendFile(m.chat, filename, text, null, m).catch(console.error);
    });
    clearTimeout(timeout);
    delete confirmation[m.sender];
    return true;
  } else if (/^no?$/i.test(m.text)) {
    delete confirmation[m.sender];
    m.reply('Rejected');
    clearTimeout(timeout);
    return true;
  }
}

handler.all = confirmationHandler;
handler.rowner = true;
handler.help = ['update2'];
handler.tags = ['owner'];
handler.command = /^(update2)$/i;

export default handler;