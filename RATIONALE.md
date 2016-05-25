


* Subir um bot hello world
    * Tentei seguir [esse tutorial](http://mvalipour.github.io/node.js/2015/11/10/build-telegram-bot-nodejs-heroku/)
        - Funcionou na maquina local com pooling
    * Para deployar no heroku, segui [esse tutorial](http://mvalipour.github.io/node.js/2015/12/06/telegram-bot-webhook-existing-express/)
        - Não funcionou. Parece que o web hook não está sendo chamado.
        - Vou tentar seguir o tut ipsis litteris para confirmar que não funfa.
        - Não funfou tb. O log mostra o seguinte erro: "Free app running time quota exhausted"
        - Criei um novo app no heroku e funfou! Yay!!! \o/

* Migrar chaves para variáveis ✅

* Fazer uma query na API SL

Location:
    {
      "Name": "Tunagård (Österåker)",
      "SiteId": "9661",
      "Type": "Station",
      "X": "18307287",
      "Y": "59469630"
    }

* Organizar projeto
    - https://devcenter.heroku.com/articles/node-best-practices
* Subir um BD
* Resolver scheduling
* Customizar teclado
* Support emojis

...

* Google calendar: https://developers.google.com/google-apps/calendar/quickstart/nodejs
