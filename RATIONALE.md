


* Subir um bot hello world
    * Tentei seguir [esse tutorial](http://mvalipour.github.io/node.js/2015/11/10/build-telegram-bot-nodejs-heroku/)
        - Funcionou na maquina local com pooling
    * Para deployar no heroku, segui [esse tutorial](http://mvalipour.github.io/node.js/2015/12/06/telegram-bot-webhook-existing-express/)
        - Não funcionou. Parece que o web hook não está sendo chamado.
        - Vou tentar seguir o tut ipsis litteris para confirmar que não funfa.
        - Não funfou tb. O log mostra o seguinte erro: "Free app running time quota exhausted"
        - Criei um novo app no heroku e funfou! Yay!!! \o/