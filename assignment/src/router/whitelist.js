import Router from 'koa-router';

const router = new Router({
    prefix: '/whitelist',
});

router.get('/', async ctx => {
    ctx.body =  await ctx.repositories.whitelistRepository.get(ctx.query);
});

router.put('/:groupId/:version', async ctx => {
    await ctx.repositories.whitelistRepository.updateByGroupId({
        groupId: ctx.params.groupId,
        version: ctx.params.version,
    }, ctx.request.body);

    ctx.body = {};
});

router.post('/', async ctx => {
    ctx.body = (await ctx.repositories.whitelistRepository.create(ctx.request.body));
});

router.delete('/:sportId', async ctx => {
    ctx.body = (await ctx.repositories.whitelistRepository.deleteById(ctx.params.sportId));
});


export const whitelistRouter = router;
