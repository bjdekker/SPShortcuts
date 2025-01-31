(function () {
    const url = new URL(window.location.href);
    url.searchParams.set('processDebug', '1');
    document.location = url.href;
})();
