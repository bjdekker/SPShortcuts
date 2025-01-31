(async() => {
    const newTitle = document.querySelector('.fl-EditableLabel-label').innerText;
    if (newTitle) {
        document.title = newTitle;
        document.addEventListener('visibilitychange', (event) => {
            document.setTimeout(500, () => {
                document.title = newTitle;
            });
        });
    } else {
        console.log('Flow title not found');
    }
})()
