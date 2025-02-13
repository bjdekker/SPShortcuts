(async () => {
    const pastedText = await navigator.clipboard.readText();
    const regex = /^\w{32}$/gm;
    let operationId = "";
    while ((m = regex.exec(pastedText)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        m.forEach((match) => {
            operationId = match;
        });
    }
    const [day, month, year] = pastedText.split(/[/\-, ]/);

    const kustoQuery = `
            let startDate = datetime(${year}-${month}-${day});
            let endDate = datetime(${year}-${month}-${parseInt(day) + 1});
            
            let orchestrationInstanceId = toscalar(
            traces
            | where timestamp between (startDate .. endDate)
            | where operation_Id == '${operationId}'
            | where customDimensions['OriginalFormat'] startswith "Started orchestration with ID"
            | project orchestrationId = tostring(customDimensions['InstanceId'])
            | top 1 by orchestrationId
            );

            let firstOperationId = toscalar(
            traces 
            | where timestamp between (startDate .. endDate)
            | where customDimensions.prop__instanceId == orchestrationInstanceId
            | project operation_Id
            | top 1 by operation_Id
            );
            
            traces
            | union exceptions
            | where timestamp between (startDate .. endDate)
            | where operation_Id == firstOperationId
            | project
            timestamp,
            itemType,
            message = iff(message != '', message, iff(outerMessage != '', outerMessage, customDimensions.['prop__{OriginalFormat}'])),
            logLevel = customDimensions.['LogLevel'],
            severityLevel`;
    //const encodedKustoQuery = encodeURIComponent(kustoQuery.trim().replace(/\s+/gmi, " "));

    // Create floating div
    const floatingDiv = document.createElement('div');
    floatingDiv.style.position = 'fixed';
    floatingDiv.style.top = '50%';
    floatingDiv.style.left = '50%';
    floatingDiv.style.transform = 'translate(-50%, -50%)';
    floatingDiv.style.width = '60%';
    floatingDiv.style.height = '60%';
    floatingDiv.style.backgroundColor = 'white';
    floatingDiv.style.border = '1px solid black';
    floatingDiv.style.padding = '10px';
    floatingDiv.style.zIndex = '1000';
    floatingDiv.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';

    // Create textarea
    const textarea = document.createElement('textarea');
    textarea.style.fontFamily = "'Cascadia Code', Consolas, Menlo, monospace";
    textarea.style.width = '100%';
    textarea.style.height = '80%';
    textarea.value = kustoQuery;
    floatingDiv.appendChild(textarea);

    // Create close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '10px';
    closeButton.onclick = () => {
        document.body.removeChild(floatingDiv);
    };
    floatingDiv.appendChild(closeButton);

    document.body.appendChild(floatingDiv);
}
)();