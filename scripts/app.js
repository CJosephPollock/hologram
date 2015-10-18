navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.getUserMedia;
window.URL = window.URL || window.webkitURL;

var app = document.getElementById('app');
var video = document.getElementById('monitor');
var canvas = document.getElementById('canvas');
var graph = document.getElementById('graph');
var capture = document.getElementById('capture');
var starter = document.getElementById('starter');
var ctx = canvas.getContext('2d');
var intervalId = null;

function gotStream(stream) {
  if (window.URL) {
    video.src = window.URL.createObjectURL(stream);
  } else {
    video.src = stream; // Opera.
  }

  video.onerror = function(e) {
    stream.stop();
  };

  stream.onended = noStream;

  video.onloadedmetadata = function(e) { // Not firing in Chrome. See crbug.com/110938.
    document.getElementById('splash').hidden = true;
    document.getElementById('app').hidden = false;
  };

  // Since video.onloadedmetadata isn't firing for getUserMedia video, we have
  // to fake it.
  setTimeout(function() {
    document.getElementById('splash').hidden = true;
    document.getElementById('app').hidden = false;
  }, 50);

    video.onloadedmetadata = function(){ // Set canvas width and height to video width and height.
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    };
}

function noStream(e) {
  var msg = 'No camera available.';
  if (e.code == 1) {
    msg = 'User denied access to use camera.';
  }
  document.getElementById('errorMessage').textContent = msg;
}


function init() {
  if (!navigator.getUserMedia) {
    document.getElementById('errorMessage').innerHTML = 'Sorry. <code>navigator.getUserMedia()</code> is not available.';
    return;
  }

  navigator.getUserMedia({video: true}, gotStream, noStream);
  document.body.classList.add('running');
}


function loadGraph() {
    graph.classList.add('loaded');
}

starter.addEventListener( 'click', function( event ) {
  init();
}, false );

capture.addEventListener( 'click', function( event ) {
  loadGraph();
  document.body.classList.add('graph-loaded');
}, false );
