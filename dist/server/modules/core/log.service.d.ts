import { ServiceContext } from 'typescript-rest';
import { Log } from './interfaces/log.interface';
export declare class LogService {
    private readonly context;
    constructor(context: ServiceContext);
    static save(entry: Log): Promise<Log>;
}
