const mb = require('mountebank');
const settings = require('./settings');
const customerService = require('./mock/customers_service')
const demo = require('./mock/demo')
const pred = require('./mock/pred')
const ps = require('./mock/poolscan')

const mbServerInstance = mb.create({
        port: settings.port,
        pidfile: '../mb.pid',
        logfile: '../mb.log',
        protofile: '../protofile.json',
        ipWhitelist: ['*']
    });
    
mbServerInstance.then(function() {
    customerService.addService();
    demo.demoService();
    pred.predService();
    ps.poolService();
});