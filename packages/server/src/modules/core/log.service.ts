import { Appearance } from '../../types/appearance';
import { ServiceContext, Errors } from 'typescript-rest';
import { Account } from './interfaces/account.interface';
import { CoreDatabase as Db } from './core.database';
import { CreateLogDto, LogResponse } from './dto/log.dto';

export class LogService {
  constructor(private readonly context: ServiceContext) { }

  static async save(entry: CreateLogDto) {
    return (await Db.Log.create(entry)) as LogResponse;
  }
}
