(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    const databases = indexedDB.databases();
    const workPointDatabases = databases.filter(d => d.name.startsWith(`WorkPoint`)).map(d => d.name);
    for (const workPointDatabase of workPointDatabases) {
        const req = indexedDB.deleteDatabase(workPointDatabase);
        req.onsuccess = () => console.log(`Cleared WorkPoint Cache successfully`);
        req.onerror = () => console.log(`Couldn't clear WorkPoint Cache`);
        req.onblocked = () => console.log(`Couldn't clear WorkPoint Cache due to the operation being blocked`);
    }
})()
