var settings = require('./settings');
var casper = require('casper').create();
var utils = require('utils');


var url = settings.url+'#'+settings.testItem+'/11';

var selector = '#bib-info';

casper.start(url, function() {
    this.echo (url);
});

casper.echo("OC-64: Editoitavan itemin tekijä ja otsikko näkyvät oikein");

casper.waitForSelector(selector,undefined,function() {
    casper.echo( 'not found.' );
    casper.echo( casper.page.content );
});

casper.then(function() {


    this.test.assertExists(selector)
    var bibinfo = this.getElementInfo(selector + ' input');
    var value = bibinfo.attributes.value;
    var expected = settings.testAuthor + ': ' + settings.testTitle
    this.test.assertEqual(value,expected,'Correct bibinfo');
});

casper.run(function() {
    this.test.done();
    this.exit();
});
