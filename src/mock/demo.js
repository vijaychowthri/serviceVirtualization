const mbHelper = require('./../mountebank-helper');
const settings = require('./../settings');
const response = { message: "data received" };
function demoService() {
    const stubs = [
        {
            predicates: [
                { "equals": { "method": "PUT", "path": "/demo" }}
            ],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                        "Content-Type": "application/json"
                        },
                        body: response
                    },
                    is: {
                        statusCode: 400,
                        headers : { "Content-Type": "application/json" },
                        body : "{\"errors\":[{\"someKey\":\"Must not be blank\"}]}"
                        },
                }
            ]
        }
    ];

    const imposter = {
        port: settings.demo,
        protocol: 'http',
        stubs: stubs
    };

    return mbHelper.postImposter(imposter);
}
module.exports = { demoService };