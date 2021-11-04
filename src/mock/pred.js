const mbHelper = require('./../mountebank-helper');
const settings = require('./../settings');
const response = { message: "data received" };
function predService() {
    const stubs = [
        {
          "predicates": [{
            "equals": { "query": { "query": "0" } }
          }],
          "responses": [{
            "is": { "body": "1001" }
          }]
        },
        {
          "predicates": [{
            "equals": { "query": {"query": "1"} }
          }],
          "responses": [{
            "is": { "body": "1002" }
          }]
        }
      ]

    const imposter = {
        port: settings.pred,
        protocol: 'http',
        stubs: stubs
    };

    return mbHelper.postImposter(imposter);
}
module.exports = { predService };