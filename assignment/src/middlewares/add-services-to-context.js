import {whitelistRepository} from "./add-repositories-to-context";
import {WhitelistService} from "../services/whitelist-service";

export const whitelistService = new WhitelistService({whitelistRepository});

export const addServicesToContext = async (ctx, next) => {
    ctx.services = {
        whitelistService,
    };

    await next();
};
