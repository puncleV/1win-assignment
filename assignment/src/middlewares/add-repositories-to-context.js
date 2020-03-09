import {
  WhiteListRepository
} from '../repositories';
import { connectionPool } from '../connection';

const whitelistRepo = new WhiteListRepository({ connection: connectionPool });

export const addRepositoriesToContext = async (ctx, next) => {
  ctx.repositories = {
    whitelistRepository: whitelistRepo,
  };

  await next();
};

export const whitelistRepository = whitelistRepo;
