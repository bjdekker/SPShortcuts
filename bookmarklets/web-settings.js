(async() => {
    var ctx = window && window._spPageContextInfo;
    if (!ctx) {
        let result = await window.moduleLoaderPromise;
        ctx = result.context._pageContext._legacyPageContext;
    }
    document.location.href = `${ctx.webAbsoluteUrl}/_layouts/15/settings.aspx`
})()
