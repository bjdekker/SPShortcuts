(function () {
    const url = new URL(window.location.href);
    url.searchParams.set('maintenancemode', !0);
    document.location = url.href
})();
