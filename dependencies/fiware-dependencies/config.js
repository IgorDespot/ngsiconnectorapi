require("dotenv").config();

var config = {};

// Used only if https is disabled
config.pep_port = 82;

// Set this var to undefined if you don't want the server to listen on HTTPS
config.https = {
    enabled: false,
    cert_file: 'cert/cert.crt',
    key_file: 'cert/key.key',
    port: 443
};

config.account_host = 'http://172.17.0.6:8000';

config.keystone_host = '172.17.0.6';
config.keystone_port = 5000;

config.app_host = '172.17.0.4';
config.app_port = 1026;
// Use true if the app server listens in https
config.app_ssl = false;

// Credentials obtained when registering PEP Proxy in Account Portal
config.username = 'pep_proxy_587cbf5b10ef46de9b02b1abf95662f0';
config.password = '11ea2c62ef714c33a5fc391022c77339';

// in seconds
config.cache_time = 300;

// if enabled PEP checks permissions with AuthZForce GE. 
// only compatible with oauth2 tokens engine
//
// you can use custom policy checks by including programatic scripts 
// in policies folder. An script template is included there
config.azf = {
	enabled: true,
	protocol: 'http',
    host: '172.17.0.2',
    port: 8080,
    custom_policy: undefined // use undefined to default policy checks (HTTP verb + path).
};

// list of paths that will not check authentication/authorization
// example: ['/public/*', '/static/css/']
config.public_paths = [];

// options: oauth2/keystone
config.tokens_engine = 'oauth2';

config.magic_key = process.env.FIWARE_PEP_PROXY_MAGIC_KEY;

module.exports = config;