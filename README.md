# Bike Sampa Scraper

A Javascript client to [scrape](https://en.wikipedia.org/wiki/Web_scraping) data from  [Bike Sampa](http://ww2.mobilicidade.com.br/bikesampa/mapaestacao.asp), a bicycle sharing system in São Paulo.

## Install


    npm install codigourbano/bikesampa-scraper


## Example

The following code will log to console station names and bikes available:

``` javascript
var scraper = require('bikesampa-scraper');
scraper.scrape(function(err,stations){
  if (err) return console.log(err);

  for (var i = 0; i < stations.length; i++) {
    var st = stations[i];
    console.log(st.name + ': '+ st.units);
  }
});
```

## Development

Write tests and run:

    npm test

Currently tests are made directly to the live map.
