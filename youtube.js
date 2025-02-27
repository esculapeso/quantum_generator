// Load the YouTube IFrame API
function loadYouTubeAPI() {
  var tag = document.createElement('script');
  tag.src = "//www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Player Manager Class
class YouTubePlayerManager {
  constructor() {
    this.players = [];
    this.containerSets = [];
    this.readyCounts = {};
    this.readyCallbacks = {};
  }

  // Register a new set of containers
  registerContainerSet(setId, containerIds, videoId, options = {}) {
    this.containerSets.push({
      setId: setId,
      containerIds: containerIds,
      videoId: videoId,
      options: options
    });
    
    this.players[setId] = [];
    this.readyCounts[setId] = 0;
    
    // If YouTube API is already loaded, initialize players immediately
    if (typeof YT !== 'undefined' && YT.Player) {
      this.initializeSet(setId);
    }
  }
  
  // Initialize players for a specific set
  initializeSet(setId) {
    const set = this.containerSets.find(s => s.setId === setId);
    if (!set) return;
    
    set.containerIds.forEach(containerId => {
      const playerOptions = {
        height: set.options.height || '390',
        width: set.options.width || '90',
        videoId: set.videoId,
        playerVars: set.options.playerVars || {
          'playsinline': 1, 
          'autoplay': 0, 
          'controls': 0, 
          'showinfo': 0, 
          'autohide': 1
        },
        events: {
          'onReady': (event) => this.onPlayerReady(event, setId),
          'onStateChange': (event) => this.onPlayerStateChange(event, setId)
        }
      };
      
      const player = new YT.Player(containerId, playerOptions);
      this.players[setId].push({
        containerId: containerId,
        player: player
      });
    });
  }
  
  // Handler for when a player is ready
  onPlayerReady(event, setId) {
    this.readyCounts[setId]++;
    const set = this.containerSets.find(s => s.setId === setId);
    
    // Check if all players in this set are ready
    if (this.readyCounts[setId] === set.containerIds.length) {
      if (this.readyCallbacks[setId]) {
        this.readyCallbacks[setId](this.getPlayerInstances(setId));
      }
    }
  }
  
  // Get actual player instances for a set
  getPlayerInstances(setId) {
    return this.players[setId].map(p => p.player);
  }
  
  // Set callback for when all players in a set are ready
  onSetReady(setId, callback) {
    this.readyCallbacks[setId] = callback;
    
    // If players are already ready, call the callback immediately
    const set = this.containerSets.find(s => s.setId === setId);
    if (set && this.readyCounts[setId] === set.containerIds.length) {
      callback(this.getPlayerInstances(setId));
    }
  }
  
  // Handler for player state changes
  onPlayerStateChange(event, setId) {
    console.log(`EVENT: onPlayerStateChange for set ${setId}`);
    
    if (event.data === YT.PlayerState.ENDED) {
      console.log(`EVENT: ENDED for set ${setId}`);
      
      // Custom logic for state change - can be overridden
      if (this.stateChangeCallbacks[setId]) {
        this.stateChangeCallbacks[setId](event, this.getPlayerInstances(setId));
      }
    }
  }
  
  // Set callback for state changes
  onStateChange(setId, callback) {
    if (!this.stateChangeCallbacks) {
      this.stateChangeCallbacks = {};
    }
    this.stateChangeCallbacks[setId] = callback;
  }
  
  // Control all players in a set
  playAll(setId) {
    const players = this.getPlayerInstances(setId);
    players.forEach(player => {
      try {
        player.playVideo();
      } catch (e) {
        console.error(`Error playing video in set ${setId}:`, e);
      }
    });
  }
  
  stopAll(setId) {
    const players = this.getPlayerInstances(setId);
    players.forEach(player => {
      try {
        player.stopVideo();
      } catch (e) {
        console.error(`Error stopping video in set ${setId}:`, e);
      }
    });
  }
}

// Create element IDs dynamically to avoid duplicates
function createUniqueContainerId(prefix, index) {
  return `${prefix}_${new Date().getTime()}_${index}`;
}

// Toggle pyramid view - preserved from your original code
function togglePyramidView(isPyramid, startVideo, zoom, ratio) {
  isPyramid = (typeof isPyramid === "undefined") ? !$('.piramidToggleCB').prop('checked') : isPyramid;

  // Common jQuery selectors
  var $fullView = $('.fullView');
  var $pyramidView = $('.pyramidView');
  var $quadGenerator = $('.quadGenerator');
  var $roundView = $('.roundView');
  var $quadrupoleImage = $('.quadrupoleImage');
  var $pyramidElements = $('.personImage, .therapistImage, .generatorText, .sideText, .liveSection');

  if (zoom) {
    $fullView.hide();
    $pyramidView.show();
    $quadGenerator.add($roundView).css({ 'width': `${zoom}vh`, 'height': `${zoom}vh` });
    $quadGenerator.css('transform', `translateY(-50%) scale(${ratio}, 1)`);
    $roundView.css('transform', `translate(-50%, -50%) scale(${ratio}, 1)`);
    $quadrupoleImage.addClass('pyramidImage');
    $pyramidElements.addClass('pyramidPerson');
  } else {
    $('.piramidToggleCB').prop('checked', isPyramid);

    if (isPyramid) {
      $fullView.hide();
      $pyramidView.show();
      $quadrupoleImage.addClass('pyramidImage');
      $pyramidElements.addClass('pyramidPerson');
    } else {
      $fullView.show();
      $pyramidView.hide();
      $quadrupoleImage.removeClass('pyramidImage');
      $pyramidElements.removeClass('pyramidPerson');
    }
  }

  // Call setDataFontSize if it exists
  if (typeof setDataFontSize === 'function') {
    setDataFontSize();
  }

  // Start focus video if videos are already playing
  if (window.isVideoPlaying && typeof startFocusVideo === 'function') {
    startFocusVideo();
  }
}