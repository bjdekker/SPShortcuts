(async() => {
    var ctx = window && window._spPageContextInfo;
    if (!ctx) {
        let result = await window.moduleLoaderPromise;
        ctx = result.context._pageContext._legacyPageContext;
    }
    prompt("List ID", ctx.listId);
})()
