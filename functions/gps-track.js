exports.handler = function(context, event, callback) {

    console.log(event);

    var Airtable = require('airtable');

    var base = new Airtable({apiKey: process.env.AIRTABLE}).base(process.env.AIRTABLE_BASE);

    base('gps').create([
        {
          "fields": {   "device" : event.id,
                        "latitude" : event.lat,
                        "longitude" : event.lon,
                        "speed" : event.speed,
                        "altitude" : event.altitude
                    }
        }
      ], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function (record) {
          console.log(record.getId());

          callback(null, 'done'); 

        });
    });

}