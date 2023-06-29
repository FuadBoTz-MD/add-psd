import { createWAConnection } from '@adiwajshing/baileys';
import { Brainly } from 'brainly-scraper-v2';
import fetch from 'node-fetch';

const conn = createWAConnection();
const brainly = new Brainly('id');
await brainly.initialize();

const handler = async (m, { text }) => {
  if (!text) throw 'Input Query';
  await m.reply('Wait...');
  try {
    const res = await brainly.search(text, 'id');
    const answer = res
      .map(({ question, answers }) => {
        const questionText = `*Pertanyaan*${question.grade ? ` (${question.grade})` : ''}\n${question.content.replace(
          /(<br \/>)/gi,
          '\n'
        )}`;
        const answerText = answers
          .map((v, i) => {
            const mediaUrl = v.attachments.length > 0 ? `\n*Media Url*: ${v.attachments.join(', ')}` : '';
            return `*Jawaban Ke ${i + 1}*${v.verification ? ' (Verified)' : ''}${
              v.isBest ? ' (Best)' : ''
            }\n${v.content.replace(/(<br \/>)/gi, '\n').replace(/(<([^>]+)>)/gi, '')}${mediaUrl}`;
          })
          .join('');
        return `${questionText}${answerText}`;
      })
      .join('\n' + '-'.repeat(45));

    await m.reply(answer.trim());
  } catch (e) {
    await m.reply('Error');
  }
};

handler.help = handler.alias = ['brainly'];
handler.tags = ['tools'];
handler.command = /^(brainly)$/i;

export default handler;