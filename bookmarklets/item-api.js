(async() => {
    let ctx = window && window._spPageContextInfo;
    if (!ctx) {
        let result = await window.moduleLoaderPromise;
        ctx = result.context._pageContext._legacyPageContext;
    };
    let itemId;
    if (ctx.pageItemId && ctx.pageItemId !== -1) {
        itemId = ctx.pageItemId;
    } else if (typeof(g_listData) !== 'undefined') {
        itemId = g_listData.ListData.Row[parseInt(document.querySelector('.ms-DetailsRow.is-selected').attributes['data-item-index'].value)].ID
    } else if (typeof(SP) !== 'undefined' && SP.ListOperation.Selection.getSelectedItems().length > 0) {
        itemId = SP.ListOperation.Selection.getSelectedItems()[0].id;
    } else if (document.location.search) {
        itemId = document.location.search.replace(/.*[?&]ID=(\\\\d+)(?:&|$).*/, '$1');
    };
    document.location.href = `${ctx.webAbsoluteUrl}/_api/web/lists('${ctx.listId}')/items(${itemId})`
})()
