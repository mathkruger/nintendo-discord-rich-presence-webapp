# Nintendo Rich Presence!

Com esse programa você pode controlar o jogo que você está jogando no seu console Nintendo.

## Download
Baixe a versão para o seu sistema através dos [Releases](https://github.com/mathkruger/nintendo-discord-rich-presence-webapp/releases). Não se esqueça de criar seu app na twitch para ter acesso às chaves de API, através [deste link](https://dev.twitch.tv/console/apps/create).

## Como buildar localmente
~~~shell
git clone https://github.com/mathkruger/nintendo-discord-rich-presence-webapp.git
npm install
npm run init
~~~

Como estamos usando as APIs de jogos da Twitch, você deverá criar um aplicativo na twitch [neste link](https://dev.twitch.tv/console/apps/create) e passar as informações de `client_id` e `client_secret` para o arquivo `server/config.json`

Depois das configurações feitas:
~~~shell
npm run start:electron
~~~
