exports.handler = function(context, event, callback) {

    var polyline = require('@mapbox/polyline');

    var Airtable = require('airtable');

    var base = new Airtable({apiKey: process.env.AIRTABLE}).base(process.env.AIRTABLE_BASE);

    var route = [];

    base('gps').select({
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {

        records.forEach(function(record) {

            var tmp = [ record.get('longitude'), record.get('latitude') ]
            
            route.push(tmp)

        });

        //callback(null, polyline.encode(route));
        callback(null, route);

    });

    


}