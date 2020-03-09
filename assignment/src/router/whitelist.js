import Router from 'koa-router';

const router = new Router({
    prefix: '/whitelist',
});

router.get('/', async ctx => {
    ctx.body =  await ctx.repositories.whitelistRepository.get(ctx.query);
});

router.put('/:groupId/:version', async ctx => {
    await ctx.repositories.whitelistRepository.updateByGroupIdAndVersion({
        groupId: ctx.params.groupId,
        version: ctx.params.version,
    }, ctx.request.body);

    ctx.services.whitelistService.clearCache(ctx.params.groupId);
    ctx.body = {};
});

export const whitelistRouter = router;
