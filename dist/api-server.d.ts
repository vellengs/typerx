export declare class ApiServer {
    private app;
    private server;
    PORT: number;
    constructor();
    /**
     * Configure the express app.
     */
    private config();
    /**
     * Start the server
     * @returns {Promise<any>}
     */
    start(): Promise<any>;
    /**
     * Stop the server (if running).
     * @returns {Promise<boolean>}
     */
    stop(): Promise<boolean>;
}
