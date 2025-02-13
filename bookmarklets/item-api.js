(async () => {
    let ctx = window && window._spPageContextInfo;
    if (!ctx) {
        let result = await window.moduleLoaderPromise;
        ctx = result.context._pageContext._legacyPageContext;
    };
    let itemId;
    const urlMatch = /.*[\?\&]ID=(\d+)(?:&|$).*/i.exec(document.location.search)
    if (ctx.pageItemId && ctx.pageItemId !== -1) {
        itemId = ctx.pageItemId;
    } else if (document.querySelector(`div[data-automationid='list-content'] div[aria-selected=true]`)) {
        itemId = document.querySelector(`div[data-automationid='list-content'] div[aria-selected=true]`).attributes[`data-selection-index`].value
    } else if (document.querySelector(`div[data-automationid='DetailsList'] div[aria-selected=true]`)) {
        const dropTargetKey = JSON.parse(document.querySelector(`div[data-automationid='DetailsList'] div[aria-selected=true]`).parentElement.attributes["data-drop-target-key"].value);
        itemId = dropTargetKey[3];
    }
    else if (urlMatch) {
        itemId = urlMatch[1];
    };
    document.location.href = `${ctx.webAbsoluteUrl}/_api/web/lists('${ctx.listId}')/items(${itemId})`
})()
