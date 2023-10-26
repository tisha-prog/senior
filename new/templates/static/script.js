var socket = io.connect(
  window.location.protocol + "//" + document.domain + ":" + location.port
);
socket.on("connect", function () {
  console.log("Connected...!", socket.connected);
});
document.addEventListener("DOMContentLoaded", () => {
  let but = document.getElementById("but");
  let but2 = document.getElementById("but2");
  var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
const video = document.querySelector("#videoElement");
  let mediaDevices = navigator.mediaDevices;

  video.width = 600;
  video.height = 500;

  but.addEventListener("click", () => {

      // Accessing the user camera and video.
      mediaDevices
          .getUserMedia({
              video: true,
          })
          .then((stream) => {

              // Changing the source of video to current stream.
              video.srcObject = stream;
              video.addEventListener("loadedmetadata", () => {
                  video.play();
              });
          })
          .catch(alert);

          but2.addEventListener("click", () => {
            video.pause();
            video.srcObject = "";
            localstream.stop();
                    });
        

        const FPS = 5;
          setInterval(() => {
            width = video.width;
            height = video.height;
            context.drawImage(video, 0, 0, width, height);
            var data = canvas.toDataURL("image/jpeg", 0.5);
            context.clearRect(0, 0, width, height);
            socket.emit("image", data);
          }, 1000 / FPS);
          
          socket.on("processed_image", function (image) {
            photo.setAttribute("src", image);
          });
  });
});