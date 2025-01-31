(async() => {
    var ctx = window && window._spPageContextInfo;
    if (!ctx) {
        let result = await window.moduleLoaderPromise;
        ctx = result.context._pageContext._legacyPageContext;
    };
    const url = new URL(`${ctx.webAbsoluteUrl}/_api/web/lists('${ctx.listId}')`);
    document.location = url.href
})()
