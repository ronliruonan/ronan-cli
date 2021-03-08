function openWithVsCode(fullPathProject) {
    return `code ${fullPathProject}`;
}

function openWithFolder(fullPathProject) {
    return `start ${fullPathProject}`;
}

function openWithBroswer(url) {
    return `start ${url}`;
}

module.exports = { openWithVsCode, openWithFolder, openWithBroswer };
