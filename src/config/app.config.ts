import * as dotenv from 'dotenv';
dotenv.config();

export default {
    environment: 'local',
    port: process.env.PORT,
    port_ws: process.env.PORT_WS,
    open_meteo: {
        live: process.env.OPEN_METEO
    },
}