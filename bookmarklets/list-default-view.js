(async() => {
    var ctx = window && window._spPageContextInfo;
    if (!ctx) {
        let result = await window.moduleLoaderPromise;
        ctx = result.context._pageContext._legacyPageContext;
    }
    var headers = new Headers({});
    headers.set('Accept', 'application/json;odata=nometadata');
    headers.set('ContentType', 'application/json;odata=nometadata');
    var init = {
        method: 'GET',
        headers: headers,
        credentials: 'include'
    };
    const jsonResponse = await fetch(ctx.webAbsoluteUrl + `/_api/web/lists('${ctx.listId}')/views?$filter=DefaultView eq true&$select=ServerRelativeUrl`, init);
    data = await jsonResponse.json();
    const newUrl = data.value.length === 1 && data.value[0].ServerRelativeUrl;
    window.location.href = newUrl;
})();
