function openWithVsCode(fullPathProject) {
    return `code ${fullPathProject}`;
}

function openWithFolder(fullPathProject) {
    return `xxx ${fullPathProject}`;
}

function openWithBroswer(url) {
    return `open ${url}`;
}

module.exports = { openWithVsCode, openWithFolder, openWithBroswer };
