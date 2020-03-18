// Cloud API base URL and header variables
let url = 'https://api.accusoft.com/prizmdoc';
let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Acs-Api-Key", "U7JHrsbzGGhn06aVFLm-PCBAVCGD1zJlkFNkI6EmjkOAzRNYPh101Vd5nnsnIh_x");

// Get viewing session ID
const getSessionId = () => {
    let raw = JSON.stringify({ "source": { "type": "upload", "displayName": "someuniqueName" } });
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: raw,
        redirect: 'follow'
    };
    fetch(`${url}/ViewingSession`, requestOptions)
        .then(response => response.text())
        .then(result => document.getElementById('sessionResponse').innerHTML = result);
};
document.getElementById('btnFetch').addEventListener('click', getSessionId);

// Upload document with viewingSessionID
const uploadDocument = () => {
    let file = document.getElementById('fileUpload');
    let requestOptions = {
        method: 'PUT',
        headers: { "Acs-Api-Key": "U7JHrsbzGGhn06aVFLm-PCBAVCGD1zJlkFNkI6EmjkOAzRNYPh101Vd5nnsnIh_x" },
        body: file.files[0],
        redirect: 'follow'
    };

    fetch(`${url}/ViewingSession/${getSessionId}/SourceFile`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
document.getElementById('fileUpload').addEventListener('change', uploadDocument);

// Instantiate the viewer
$(function () {
    $('#viewerContainer').pccViewer({
        documentID: getSessionId,
        imageHandlerUrl: '/pas-proxy',
        viewerAssetsPath: 'viewer-assets',
        resourcePath: 'viewer-assets/img',
        language: viewerCustomizations.languages['en-US'],
        template: viewerCustomizations.template,
        icons: viewerCustomizations.icons,
        annotationsMode: "LayeredAnnotations"
    });
});





