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

config.account_host = 'http://192.168.192.134:8000';

config.keystone_host = '192.168.192.134';
config.keystone_port = 5000;

config.app_host = '192.168.192.134';
config.app_port = 1026;
// Use true if the app server listens in https
config.app_ssl = false;

// Credentials obtained when registering PEP Proxy in Account Portal
config.username = 'pep_proxy_30ad8b5dccf74b1181b2daa181952a41';
config.password = 'd7208bf40e51469cb4aaf6c3f23cdd2d';

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
    host: '192.168.192.134',
    port: 8080,
    custom_policy: undefined // use undefined to default policy checks (HTTP verb + path).
};

// list of paths that will not check authentication/authorization
// example: ['/public/*', '/static/css/']
config.public_paths = [];

// options: oauth2/keystone
config.tokens_engine = 'oauth2';

config.magic_key = "test";

module.exports = config;