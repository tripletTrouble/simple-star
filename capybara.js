var argv = require('minimist')(process.argv.slice(2));
var command = argv['_'][0];
var colors = require("colors");

colors.enable();

switch (command) {
    case 'make:model':
        var service = require('./capybara/modelService.js');
        var name = argv['_'][1];
        service.make(name);
        break;
    case 'make:controller':
        var service = require('./capybara/controllerService.js');
        var name = argv['_'][1];
        service.make(name);
        break;
    default:
        console.log('Perintah yang kamu berikan tidak dikenal, periksa kembali ya!'.red);
}