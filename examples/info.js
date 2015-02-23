var bs = require('../lib/scraper');
bs.scrap(function(err,stations){
  if (err) return console.log(err);

  for (var i = 0; i < stations.length; i++) {
    var st = stations[i];
    console.log(st.id + ' - '+ st.name + ':\n' +
                '  address: ' + st.address + '\n' +
                '  bikes available: ' + st.units + '\n' +
                '  capacity: ' + st.capacity + '\n' +
                '  status: ' + (st.status == 'EO' ? 'online' : ' offline') + '\n' +
                '  lon,lat: ['+st.lon+','+st.lat+']');
  }
});
