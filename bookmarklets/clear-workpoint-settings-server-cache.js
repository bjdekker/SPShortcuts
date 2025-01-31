(() => {
    const regex = /SPHostUrl=(?<sphosturl>[^&$]+)/gm;
    const match = regex.exec(document.location.search);
    if (match) {
        const sphostUrl = match.groups['sphosturl'];
        window.open(`https://app.workpoint365.com/Update/ClearWorkPointSettingsCacheForSolution?SPHostUrl=${sphostUrl}`);
    }
})()
