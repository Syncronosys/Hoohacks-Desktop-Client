function _getDocument(tail, data, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       callback(this.response);
      }
    };
    xhttp.open("POST", 'https://c6046b76d246.ngrok.io/' + tail);
    xhttp.setRequestHeader("Content-Type", "text/json");
    xhttp.send(JSON.stringify(data));
}

function getEmotionData(base64, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       callback(this.response);
      }
    };
    xhttp.open("POST", 'http://eastus.api.cognitive.microsoft.com/face/v1.0/detect?&recognitionModel=recognition_01&returnFaceAttributes=emotion&returnRecognitionModel=True&detectionModel=detection_01');
    xhttp.setRequestHeader("Content-Type", "application/octet-stream");
    xhttp.setRequestHeader("processData", false);
    xhttp.setRequestHeader("Ocp-Apim-Subscription-Key", "379818e625f54a83bfca8b7647749c90");
    xhttp.send(makeBlob(base64));
  }

  function makeBlob(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);
        return new Blob([raw], { type: contentType });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

  function verifySession(sessionId, name, callback) {
    _getDocument("api/join/?sessionid=" + sessionId + "&name=" + name, {}, (resp) => {
        callback(resp);
    });
  }

  function update(client, data) {
      _getDocument("api/update/?client=" + client, data, () => {});
  }