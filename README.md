# Nintendo Rich Presence!

Com esse programa você pode controlar o jogo que você está jogando no seu console Nintendo.

## Começando a usar
`git clone https://github.com/mathkruger/nintendo-discord-rich-presence-webapp.git`
`npm install`
`npm run init`

Como estamos usando as APIs de jogos da Twitch, você deverá criar um aplicativo na twitch [neste link](https://dev.twitch.tv/console/apps/create) e passar as informações de `client_id` e `client_secret` para o arquivo `server/config.json`

Depois das configurações feitas:

`npm run start:electron`