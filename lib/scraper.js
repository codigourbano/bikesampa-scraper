(function () {

  var mapUrl = 'http://mobilicidade.com.br/bikesampa/mapaestacao.asp';

  var _ = require('underscore');
  var request = require('request');
  var cheerio = require('cheerio');

  var Bikesampa = {};

  Bikesampa.scrape = function(cb) {
    request.get(mapUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        parse(body, cb);
      } else {
        var err = new Error('Error retriving Bikesampa map page');
        return cb(err);
      }
    });
  }

  function parse(body, cb) {
    var $ = cheerio.load(body);
    var text = $('script').text();
    var textArray = text.split('\r\n');
    var currentLine;
    var stationTextArray;
    var stations = [];


    /// TODO Refactor this, probably using 'for' loop
    do {
      currentLine = textArray.shift();
      if (currentLine == '// Criando ponto - plotanto ponto no mapa') {
        stationTextArray = _.first(textArray,10);
        stations.push(scrapStation(stationTextArray));
      }
    } while (textArray.length > 0);
    cb(null, stations);
  }

  function scrapStation(arr) {
    var station = {};

    // remove " and ",
    function clear(str) { return str.substr(0, str.length-2).substr(1); }

    // coordinates
    station.lat = parseFloat(arr[0].substr(18,10));
    station.lon = parseFloat(arr[1].substr(1,10));

    // general description
    station.id = parseInt(clear(arr[4]));
    station.name = arr[3].substr(0, arr[3].length-1);
    station.address = arr[9].substr(0, arr[9].length-2);

    // Operational status:
    // EO - Operative
    // EM - In maintanance
    // EI - Under Construction
    station.status = arr[6].substr(1,2);
    station.online = station.status == 'EO';

    // This property shows if a station is in service.
    // Some stations under maintenance are show as active, which
    // seems to be a inconsistency.
    station.service = arr[5][1];

    station.units = parseInt(clear(arr[7]));
    station.capacity = parseInt(clear(arr[8]));

    return station;
  }

  // Node.js
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Bikesampa;
  }

  // AMD / RequireJS
  else if (typeof define !== 'undefined' && define.amd) {
    define([], function () {
      return Bikesampa;
    });
  }
  // included directly via <script> tag
  else {
    root.Bikesampa = Bikesampa;
  }

}());
