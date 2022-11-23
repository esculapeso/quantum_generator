// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player1, player2, player3, player4
var players = [player1, player2, player3, player4]
var startInverval

var holders = ['northHolder', 'westHolder', 'southHolder', 'eastHolder'];

function onYouTubeIframeAPIReady() {
  startInverval = setInterval(startPlayer, 4000);
}

function startPlayer() {
  for (var i = 0; i < holders.length; i++) {
    players[i] = new YT.Player(holders[i], {
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

  var player = players[0]
  if (player && player.h && player.h.id == 'northHolder') {
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