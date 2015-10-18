function changeFilter(e){e.className="";var t=filters[idx++%filters.length];t&&e.classList.add(t)}function gotStream(e){window.URL?video.src=window.URL.createObjectURL(e):video.src=e,video.onerror=function(t){e.stop()},e.onended=noStream,video.onloadedmetadata=function(e){document.getElementById("splash").hidden=!0,document.getElementById("app").hidden=!1},setTimeout(function(){document.getElementById("splash").hidden=!0,document.getElementById("app").hidden=!1},50),video.onloadedmetadata=function(){canvas.width=video.videoWidth,canvas.height=video.videoHeight}}function noStream(e){var t="No camera available.";1==e.code&&(t="User denied access to use camera."),document.getElementById("errorMessage").textContent=t}function capture(){return intervalId?(clearInterval(intervalId),void(intervalId=null)):void(intervalId=setInterval(function(){var e=(ctx.drawImage(video,0,0),document.createElement("img"));e.src=canvas.toDataURL("image/webp");var t=Math.floor(36*Math.random()),a=Math.floor(2*Math.random())?1:-1;e.style.transform="rotateZ("+a*t+"deg)";var n=document.body.clientWidth,o=document.body.clientHeight;e.style.top=Math.floor(Math.random()*o)+"px",e.style.left=Math.floor(Math.random()*n)+"px",gallery.appendChild(e)},150))}function upload(){}function init(e){return navigator.getUserMedia?(e.onclick=capture,e.textContent="Snapshot",void navigator.getUserMedia({video:!0},gotStream,noStream)):void(document.getElementById("errorMessage").innerHTML="Sorry. <code>navigator.getUserMedia()</code> is not available.")}navigator.getUserMedia=navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia||navigator.getUserMedia,window.URL=window.URL||window.webkitURL;var app=document.getElementById("app"),video=document.getElementById("monitor"),canvas=document.getElementById("canvas"),effect=document.getElementById("effect"),gallery=document.getElementById("gallery"),ctx=canvas.getContext("2d"),intervalId=null,idx=0,filters=["grayscale","sepia","blur","brightness","contrast","hue-rotate","hue-rotate2","hue-rotate3","saturate","invert",""];
//# sourceMappingURL=app.js.map