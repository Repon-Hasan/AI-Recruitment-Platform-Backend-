"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./app/config/env");
const bootstrap = () => {
    try {
        app_1.app.listen(env_1.envVars.PORT, () => {
            console.log(`Server is running on http://localhost:${env_1.envVars.PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
    }
};
bootstrap();
