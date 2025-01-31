(async() => {
    var data;
    if (typeof(g_listData) !== 'undefined') {
        data = g_listData.ListData.Row[parseInt(document.querySelector('.ms-DetailsRow.is-selected').attributes['data-item-index'].value)]
    } else {
        var headers = new Headers({});
        headers.set('Accept', 'application/json;odata=nometadata');
        headers.set('ContentType', 'application/json;odata=nometadata');
        var init = {
            method: 'GET',
            headers: headers,
            credentials: 'include'
        };
        const itemId = SP.ListOperation.Selection.getSelectedItems()[0].id;
        const jsonResponse = await fetch(_spPageContextInfo.webAbsoluteUrl + `/_api/web/lists('${_spPageContextInfo.listId}')/items(${itemId})?$select=FileRef`, init);
        data = await jsonResponse.json();
    }
    prompt('Url:', `${document.location.origin}/${data.FileRef.replace(/^\/ /, '')}`);
})();
