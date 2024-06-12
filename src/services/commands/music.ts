import {
  AudioPlayer,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  createAudioResource,
  joinVoiceChannel,
} from '@discordjs/voice'
import { Message } from 'discord.js'
import ytdl from 'ytdl-core'

export async function Music(message: Message, player: AudioPlayer) {
  if (message.guildId && message.guild && message.member) {
    if (message.content.startsWith('!music')) {
      const link = message.content.split(' ')[1]

      if (!link || !ytdl.validateURL(link)) {
        return message.reply(
          'Você precisa fornecer um link do YouTube após o comando !music.',
        )
      }

      if(!message.member.voice.channelId) return message.reply('Voce precisa estar em um canal de voz para usar o comando !music.')

      try {
        const connection = joinVoiceChannel({
          channelId: message.member.voice.channelId,
          guildId: message.guildId,
          adapterCreator: message.guild.voiceAdapterCreator,
        })

        const stream = ytdl(link, {
          filter: 'audioonly',
          quality: 'lowestaudio',
        })
        const resource = createAudioResource(stream)
        const videoInfo = await ytdl.getInfo(link);
        const playingMessage = await message.reply(`Tocando agora: ${videoInfo.videoDetails.title}`);
        await playingMessage.pin()

        player.play(resource)
        connection.subscribe(player)

        player.on(AudioPlayerStatus.Idle, async () => {
          await playingMessage.unpin()
          connection.destroy()
        })

        connection.on(VoiceConnectionStatus.Disconnected, async () => {
          await playingMessage.unpin()
          message.reply('Desconectando do canal')
        })
      
        let timesStamp = parseInt(videoInfo.videoDetails.lengthSeconds);
        let playTime = timesStamp

        let minutes = (number: number) => Math.floor(number / 60)
        let seconds = (number: number) => number % 60
        
        const interval = setInterval(async () => {
          playTime--; 

          const editMessage = `
            >>> Tocando agora: **${videoInfo.videoDetails.title}** \nTempo De Video: **${minutes(timesStamp)} Minutos e ${seconds(timesStamp)} segundos**  Tempo Restante: **${minutes(playTime)} Minutos e ${seconds(playTime)} segundos**
          `

          await playingMessage.edit(editMessage);
        
          if (playTime <= 0) {
            clearInterval(interval);
            await playingMessage.unpin()
            await playingMessage.edit(`~~${editMessage}~~`);
          }
        }, 1000);

        await playingMessage.react('⏮️');
        await playingMessage.react('▶️');
        await playingMessage.react('⏸️');
        await playingMessage.react('⏭️');
        await playingMessage.react('🛑');

      } catch (err) {
        console.error(err)
        message.reply(
          'Ocorreu um erro ao tentar tocar a música. Verifique se o link está correto e tente novamente.',
        )
      }
    }
  }
}
