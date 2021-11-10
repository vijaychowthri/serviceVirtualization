const mbHelper = require('./../mountebank-helper');
const settings = require('./../settings');
const response = { message: "data received" };
function poolService() {

    const stubs = [
        {
          "predicates": [{
            "equals": { "query": { "zip": "21117" } },
            "startsWith" : { "path": "/property/pool" }

          }],
          "responses": [{
            "is": { "body": "{provider : poolscan , pool : 1}" }
          }]
        },
        {
          "predicates": [{
            "equals": { "query": {"zip": "10007"} }
          }],
          "responses": [{
            "is": { "body": "{provider : poolscan , pool : 0}" }
          }]
        }
      ]


    const imposter = {
        port: settings.pool,
        protocol: 'http',
        stubs: stubs
    };

    return mbHelper.postImposter(imposter);
}
module.exports = { poolService };