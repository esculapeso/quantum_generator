// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var players = [];
var playersCount = 5;
var startInverval;
var playersReady = false;

var holders = ['northHolder', 'westHolder', 'southHolder', 'eastHolder', 'videoHolder'];

function onYouTubeIframeAPIReady() {
  startInverval = setInterval(startPlayer, 4000);
}

function startPlayer() {
  for (var i = 0; i < playersCount; i++) {
    new YT.Player(holders[i], {
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
  }

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
  if (event.data === YT.PlayerState.ENDED) {
    for (var i = 0; i < players.length; i++) {
      // players[i].playVideo();
      var activePlayers = ($('.piramidToggleCB').is(':checked')) ? players.slice(0, 4) : players.slice(4, 5);
      $(activePlayers).each((i, p) => p.setVolume($('.videoVolume').val()).playVideo().setPlaybackQuality("small").mute())
      activePlayers[0].unMute();
    }
  }
}
function stopVideo() {
  for (var i = 0; i < players.length; i++) {
    players[i].stopVideo();
  }
}