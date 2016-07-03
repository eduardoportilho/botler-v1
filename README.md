# Armínio

Your personal botler

* [Keys](file:/~/Dropbox (Personal)/_root/_Projects/Arminio/_keys.md)

Glossary:

* Actions: What the bot can do in response to user's command
* Controllers: Handle the interaction between the bot (or other interface) and the actions
* Model: Entities of the app
* Services: Units of logic. Export instances instead of classes.
* Other files:
    - env_config: Keep track of the app variables dependent on the environment.

FAQ:

* Como testar API SL?
    - $ node -r ./private/local_prod.js
    - > let sl = require('./src/services/sl_service');
    - > sl.findStations('tunag').then(stations => console.log(stations));

* Como testar Firebase?
    - $ node -r ./private/local_prod.js
    - > let fb = require('./src/services/firebase_service');
    - > fb.saveUserState({id:1, name: 'edu', sex: 'M'})
    - > fb.getUserState(1).then(user => console.log(user))

* Como testar o bot?
    - node -r ./private/local_bot.js

Next steps:
