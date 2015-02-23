# Bike Sampa Scraper

A Javascript client to [scrape](https://en.wikipedia.org/wiki/Web_scraping) [Bike Sampa map](http://ww2.mobilicidade.com.br/bikesampa/mapaestacao.asp) of bicycle sharing stations in São Paulo.

## Install


    npm install vgeorge/bikesampa-scraper


## Example

The following code will log to console station names and bikes available:

``` javascript
var scraper = require('bikesampa-scraper');
scraper.scrap(function(err,stations){
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
