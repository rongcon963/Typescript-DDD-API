import { Db } from 'mongodb';
import { TYPES } from '../constants/types';
import config from '../config/main';
import { IDataMapper } from '../core/IDataMapper';
import { IUserRepository } from '../domain/user/IUserRepository';
import { User } from '../domain/user/User';
import { AsyncContainerModule, interfaces } from 'inversify';
import { UserDataMapper } from './dataMapper/UserDataMapper';
import { createMongodbConnection } from './db/mongodb';
import { UserRepository } from './repositories/UserRepository';

export const infrastructureContainerModule = new AsyncContainerModule(async(bind: interfaces.Bind) => {
  const db: Db = await createMongodbConnection(config.MONGODB_URI);
  bind<Db>(TYPES.Db).toConstantValue(db);
  bind<IDataMapper<User>>(TYPES.UserDataMapper).to(UserDataMapper);
  bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
});