![image](https://github.com/wendesongomes/BotMusicDiscord/assets/82889172/e2da48f2-0f10-4403-9162-86747c56cb4d)

# Bot de musica para discord

Este projeto surgiu a partir de uma conversa com amigos, onde mencionaram que muitos bots de música para Discord estavam parando de funcionar. Como desenvolvedor, fiquei curioso sobre como criar um bot de música para Discord e decidi enfrentar o desafio. Consegui fazer um bot funcional que já consegue entrar em uma sala e tocar música. Ainda há muito a ser aprimorado, mas estou animado com o progresso até agora.

- [x]  - Entrar na sala
- [x]  - Tocar Musica
- [ ]  - Criar controles de musica (Somente o play, pause e stop esta criado)
- [ ]  - Criar uma fila de musicas
- [ ]  - Tocar Playlist completa

## Bugs Conhecidos

Aqui estão alguns bugs que estou ciente e trabalhando para resolver:

1. **Problema de reconhecimento de sala**: Quando o bot é iniciado e o usuário do Discord não está em nenhuma sala de voz, ele não reconhece quando o usuário entra em uma sala posteriormente. É necessário que o usuário entre na sala antes de iniciar o bot para que ele funcione corretamente.

1. **Interrupção aleatória da reprodução de música**: Às vezes, o bot reproduz a música sem problemas, mas em outras ocasiões, ele para no início ou na metade da música. Nesses casos, é necessário reiniciar o bot para que ele volte a funcionar corretamente.

## Tecnologias Utilizadas.

- `discord.js`
- `@discordjs/voice`
- `libsodium-wrappers`
- `ytdl-core`
- `zod`
- `@types/node`
- `tsx`
- `typescript`

## Requisitos

- `nodejs`
- `npm`

## Instalação

1. Clone o repositório:
```sh
git clone https://github.com/wendesongomes/BotMusicDiscord.git
cd BotMusicDiscord
```

2. Instale as dependências:
```sh
npm install
```

3. Crie uma aplicação no [site do Discord](https://discord.com/developers/applications) e obtenha o token.

4. Crie um arquivo .env na raiz do projeto e adicione seu token:
```
DISCORD_TOKEN=seu_token_aqui
```

## Uso

1. Inicie o bot:

```sh
npm run dev
```

2. Convide o bot para o seu servidor usando o link gerado na página de desenvolvimento do Discord.

3. Use o comando `!music link` para iniciar uma musica.
