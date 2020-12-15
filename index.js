const hapi = require('@hapi/hapi');

module.exports = (...params) => class voicecomsim extends require('ut-port-script')(...params) {
    get defaults() {
        return {
            server: {
                port: 8086
            }
        };
    }

    handlers() {
        let server;
        return {
            start: async() => {
                server = new hapi.Server(this.config.server);
                server.route({
                    path: '/multichannel-api/sendmulti/',
                    method: 'post',
                    handler: async(req, h) => {
                        return h.response({
                            return_code: req.payload.sms.text === 'error' ? 1000 : 0
                        });
                    }
                });
                await server.start();
            },
            stop: async() => {
                if (server) {
                    const stopping = server;
                    server = false;
                    await stopping.stop();
                }
            }
        };
    }
};
