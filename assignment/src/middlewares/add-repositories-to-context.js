import {
  WhiteListRepository
} from '../repositories';
import { connectionPool } from '../connection';

const whitelistRepository = new WhiteListRepository({ connection: connectionPool });

export const addRepositoriesToContext = async (ctx, next) => {
  ctx.repositories = {
    whitelistRepository,
  };

  await next();
};
