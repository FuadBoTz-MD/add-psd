let handler = async (m, { conn }) => {
  await conn.mPage.setViewportSize({ width: 961, height: 2000 });
  let media = await conn.mPage.screenshot();
  await conn.sendMessage(m.from, media, { quoted: m });
};

handler.help = ['sswa'];
handler.tags = ['owner'];
handler.command = /^(screenshot|ss)wa$/i;
handler.owner = true;

export default handler;

const result = await this.mPage.evaluate(async ({ directPath, encFilehash, filehash, mediaKey, type, mediaKeyTimestamp, mimetype, filename, size, _serialized }) => {
  try {
    const decryptedMedia = await (window.Store.DownloadManager?.downloadAndMaybeDecrypt || window.Store.DownloadManager?.downloadAndDecrypt)({
      directPath,
      encFilehash,
      filehash,
      mediaKey,
      mediaKeyTimestamp,
      type: (type === 'chat') ? (mimetype.split('/')[0] || type) : type,
      signal: new AbortController().signal
    });
    // Lanjutan perintah setelah mendapatkan decryptedMedia
  } catch (error) {
    console.error(error);
  }
});