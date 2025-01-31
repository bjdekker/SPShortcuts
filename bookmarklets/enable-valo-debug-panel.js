(() => {
    const keys = Object.keys(localStorage);
    let i = keys.length;
    while (i--) {
        if (keys[i].startsWith(`Valo:Navigation:`)) {
            const config = JSON.parse(localStorage.getItem(keys[i]));
            config.value.valoHubData.config.ValoDeveloperMode = true;
            localStorage.setItem(keys[i], JSON.stringify(config));
        }
    }
})();
