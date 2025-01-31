(function () {
    const url = new URL(window.location.href);
    url.searchParams.set('sortField', 'ID');
    url.searchParams.set('isAscending', !!0);
    document.location = url.href
})();
