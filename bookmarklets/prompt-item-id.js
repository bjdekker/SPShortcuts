(async() => {
    let ctx = window && window._spPageContextInfo;
    if (!ctx) {
        let result = await window.moduleLoaderPromise;
        ctx = result.context._pageContext._legacyPageContext;
    };
    let itemId;
    const urlMatch = /.*[\?\&]ID=(\d+)(?:&|$).*/i.exec(document.location.search)
    if (ctx.pageItemId && ctx.pageItemId !== -1) {
        itemId = ctx.pageItemId;
    } else if(document.querySelector(`div[aria-selected=true]`)) {
        itemId = document.querySelector(`div[aria-selected=true]`).attributes[`data-selection-index`].value
    } else if (urlMatch) {
        itemId = urlMatch[1];
    };
    prompt(`ItemID`, itemId);
})();