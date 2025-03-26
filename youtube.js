// Set YouTube to use no-cookie domain
var YTConfig = {
  host: 'https://www.youtube-nocookie.com'
};

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var players = [];
var playersCount = 0;
var startInverval;
var playersReady = false;


function onYouTubeIframeAPIReady() {
  startInverval = setInterval(startPlayer, 4000);
}

function startPlayer() {
  const holders = [
    'northHolder', 'westHolder', 'southHolder', 'eastHolder', 'videoHolder',
    'northMirrorHolder', 'westMirrorHolder', 'southMirrorHolder', 'eastMirrorHolder', 'videoMirrorHolder'
  ];

  const existingHolders = holders.filter(id => document.getElementById(id));
  playersCount = existingHolders.length; // Update player count dynamically

  existingHolders.forEach(holderId => {
    console.log(`🎬 Creating player in #${holderId}`);
    new YT.Player(holderId, {
      height: '390',
      width: '90',
      videoId: '6f0y1Iaorug',
      playerVars: {
        'playsinline': 1, 'autoplay': 0, 'controls': 0, 'showinfo': 0, 'autohide': 1
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  players.push(event.target)
	
  if (players.length == playersCount) {
    playersReady = true; 
    clearInterval(startInverval);
  }
	
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  console.log("EVENT: onPlayerStateChange");
  if (event.data === YT.PlayerState.ENDED) {
    console.log("EVENT: ENDED");
    try {
      var activePlayers = ($('.piramidToggleCB').is(':checked')) ? players.slice(0, 4) : players.slice(4, 5);
      $(activePlayers).each((i, p) => {
        console.log("FOREACHVIDEO");
        try {
          console.log("PLAYER:", {p});
          p.setVolume($('.videoVolume').val())
           .playVideo()
           .setPlaybackQuality("small")
           .mute();
        } catch (e) {
          console.error("Error playing video: ", e);
          // Handle video play error here
        }
      });
      activePlayers[0].unMute();
    } catch (e) {
      console.error("Error in onPlayerStateChange: ", e);
      // Handle general error here
    }
  }
}

function stopVideo() {
  for (var i = 0; i < players.length; i++) {
    players[i].stopVideo();
  }
}

window.onerror = function(message, source, lineno, colno, error) {
  if (error && error.message.includes('503')) {
    // Handle 503 error specifically
    console.error("Network error: ", error);
  }
  return false; // Propagates the error to the console
};