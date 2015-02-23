var bs = require('../lib/scraper');
bs.scrap(function(err,stations){
  if (err) return console.log(err);

  for (var i = 0; i < stations.length; i++) {
    var st = stations[i];
    console.log(st.name + ': '+ st.units);
  }
});
