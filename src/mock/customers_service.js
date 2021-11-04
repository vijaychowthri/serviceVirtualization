const mbHelper = require('./../mountebank-helper');
const settings = require('./../settings');
const response = { message: "data received" };
function addService() {

    const stubs = [
        {
            predicates: [{
                and: [
                    { equals: { method: "GET" } },
                    { startsWith: { "path": "/customers/" } }
                ]
            }],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                        "Content-Type": "application/json"
                        },
                        //body: '{ "firstName": +'${row}[first_name]+', "lastName": `${row}[last_name]`, "Gender": `${row}[gen]` }'
                        body: response.message
                    },
                    _behaviors: {
                        lookup: [
                            {
                                "key": {
                                  "from": "path",
                                  "using": { "method": "regex", "selector": "/customers/(.*)$" },
                                  "index": 1
                                },
                                "fromDataSource": {
                                  "csv": {
                                    "path": "./customers.csv",
                                    "keyColumn": "id"
                                  }
                                },
                                "into": "${row}"
                              }
                        ]
                    }
                }
            ]
        }
    ];

    const imposter = {
        port: settings.customer_service_port,
        protocol: 'http',
        stubs: stubs
    };

    return mbHelper.postImposter(imposter);
}

module.exports = { addService };