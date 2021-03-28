var uuid;

window.addEventListener("load", () => {
      document.getElementById("joinbutton").addEventListener('click', () => {
        verifySession(document.getElementById('session').value, document.getElementById('name').value, (resp) => {
            var data = JSON.parse(resp);
            if(data['value']) {
                uuid = data['client'];
                init();
            } else {
                document.getElementById('error').innerHTML = "Your session was invalid.";
            }
        });
      })
  });

function init() {
    var emotionWrapper = document.getElementsByClassName('emotionwrapper')[0];
    var canvas = document.getElementsByTagName("canvas")[0];
    var video = document.getElementsByTagName("video")[0];
    var intial = document.getElementsByClassName("initial")[0];
    var active = document.getElementsByClassName("active")[0];
    navigator.mediaDevices
        .getUserMedia({ audio: false, video: true })
        .then(function (stream) {
          window.stream = stream;
          document.querySelector("video").srcObject = stream;
        });
          intial.style.display = "none";
          active.style.display = "block";
        window.setInterval(() => {
            canvas.width = video.offsetWidth;
            canvas.height = video.offsetHeight;
            var context = canvas.getContext("2d");
            context.drawImage(video, 0, 0, video.offsetWidth, video.offsetHeight);
            getEmotionData(canvas.toDataURL("image/png"), (resp) => {
              var json = JSON.parse(resp);
              emotionWrapper.innerHTML = '';
              if (json[0] !== undefined) {
                for (let emotion in json[0]["faceAttributes"]["emotion"]) {
                  emotionWrapper.innerHTML += "<div class='active-emotion'><div class='active-emotion-title'>" + emotion + "</div><div class='active-emotion-value'>" + json[0]["faceAttributes"]["emotion"][emotion].toString() +"</div></div>";
                }

                update(uuid, {
                    'anger': json[0]["faceAttributes"]["emotion"]['anger'],
                    'contempt': json[0]["faceAttributes"]["emotion"]['contempt'],
                    'disgust': json[0]["faceAttributes"]["emotion"]['disgust'],
                    'fear': json[0]["faceAttributes"]["emotion"]['fear'],
                    'happiness': json[0]["faceAttributes"]["emotion"]['happiness'],
                    'neutral': json[0]["faceAttributes"]["emotion"]['neutral'],
                    'sadness': json[0]["faceAttributes"]["emotion"]['sadness'],
                    'surprise': json[0]["faceAttributes"]["emotion"]['surprise'],
                });
              }
            });
          }, 3000);
}