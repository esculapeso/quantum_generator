// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var startInverval
function onYouTubeIframeAPIReady() {
  startInverval= setInterval(startPlayer, 4000);
}

function startPlayer() {
  player = new YT.Player('videoHolder', {
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

  if (player && player.h && player.h.id == 'videoHolder') {
    clearInterval(startInverval);
  }
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  console.log('playerready')
  //event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    player.playVideo();
  }
  if (event.data === YT.PlayerState.CUED) {
    $('.youtubePauseButtonImage').hide();
    $('.youtubePlayButtonImage').show();
  }
}
function stopVideo() {
  player.stopVideo();
}