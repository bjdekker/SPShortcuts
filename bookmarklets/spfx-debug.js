(function () {
    const debugData = {
        liveReload: false,
        manifestsFileUrl: 'https://localhost:4321/temp/manifests.js'
    };
    sessionStorage.setItem('spfx-debug', JSON.stringify(debugData));
    const url = new URL(window.location.href);
    url.searchParams.set('loadSPFX', !0);
    url.searchParams.set('debugManifestsFile', 'https://localhost:4321/temp/manifests.js');
    document.location = url.href;
})();
