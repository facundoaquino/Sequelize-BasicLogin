- ##  Config package.json

```javascript

 "scripts": {
    "start":"node app.js",
    
  },

```


- ## postgresql is default database  on heroku , it needs create an addon

```bash
heroku addons:create cleardb:ignite
# Herouku needs a payment config , it´s ok de database is free ,don't worry

heroku config | grep CLEARDB_DATABASE_URL

#output 

CLEARDB_DATABASE_URL: mysql://b13b87e****:e9b6******@us-****.cleardb.com/heroku_c4c796f2d40c24a?reconnect=true


heroru config:set DATABASE_URL='mysql://b13b87e****:e9b6******@us-****.cleardb.com/heroku_c4c796f2d40c24a?reconnect=true'



```

