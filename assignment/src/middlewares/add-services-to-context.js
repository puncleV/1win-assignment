import {whitelistRepository} from "./add-repositories-to-context";

export const whitelistService = new WhitelistService({whitelistRepository});

export const addServicesToContext = async (ctx, next) => {
    ctx.services = {
        whitelistService,
    };

    await next();
};
