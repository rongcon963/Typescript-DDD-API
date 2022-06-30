import { TYPES } from '../constants/types';
import { ContainerModule, interfaces } from 'inversify';
import { UserApplication } from './user/UserApplication';

export const applicationContainerModule = new ContainerModule(
  (
    bind: interfaces.Bind,
  ) => {
    bind<UserApplication>(TYPES.UserApplication).to(UserApplication);
  }
);