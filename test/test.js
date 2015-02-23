var assert = require('assert');
var should = require('should');

var bikesampa = require('../lib/scraper.js')

describe('scrap()', function(){
  it('should get valid data', function(done){
    bikesampa.scrap(function(err, stations){
      should.not.exist(err);
      should.exist(stations);
      stations.should.be.instanceof(Array);
      stations.should.have.lengthOf(237);

      stations[234].id.should.be.exactly('283');
      stations[234].name.should.be.exactly('"Aspicuelta"');
      stations[234].address.should.be.exactly('"Rua Aspicuelta, 344"');
      stations[234].status.should.be.exactly('EI');
      stations[234].service.should.be.exactly('I');
      stations[234].units.should.be.exactly('0');
      stations[234].capacity.should.be.exactly('12');
      stations[234].lat.should.be.exactly('-23.557181');
      stations[234].lon.should.be.exactly('-46.688799');
      done();
    });
  });
});
