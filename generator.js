jQuery(document).ready(function( $ ){
	
  
  let fetcheddata_1 = new Array(1);
  let isfetched = 0;
  let currentNumber = -1;
  let delayIndex = -3
  let numArray = '0000000000000000'
  
  function getOneHex(index){
    for (let i = 0; i < 1 ; i++) {
      jQuery.get("https://qrng.anu.edu.au/API/jsonI.php?length=1024&type=uint8", data => {
        fetcheddata_1[i] = fetcheddata_1[i] + data.data.join('');
        isfetched = isfetched + 1;
      });
    }
  };
  
  function timedCount(){
    getOneHex();              
    t=setTimeout( function(){timedCount(); },10240);
  };
  
  function printHex(element, dir, index){
    let ret;
    
    for (let i = 0; i < 1 ; i++) {
      let dataToInsert = fetcheddata_1[i][index] ?? '';
      printModHex(element, dir, dataToInsert)
      ret = dataToInsert
    }
    
    return ret
  };
  
  function printModHex(element, dir, currentDigit) {
    if (element) {
      let streamElems = element.getElementsByTagName('div');
      streamElems[0].insertAdjacentHTML(dir, currentDigit);
      
    }
  };
  
  function appendDataHolder(container, id, className) {
    
    if (container) {
      var div = document.createElement('div');
      div.setAttribute("id", id);
      div.setAttribute("class", className);

      for (let i = 0; i < 1 ; i++) {
        div.appendChild(document.createElement('div'));
      }


      container.appendChild(div);
    }
  };
  
  
  function timedPrint(index){
    if(isfetched > 0) {

      let dataHereBottom = document.getElementById('dataHereBottom');
      let dataHereRight = document.getElementById('dataHereRight');
      let dataHereTop = document.getElementById('dataHereTop');
      let dataHereLeft = document.getElementById('dataHereLeft');
      
      let dataDualTop = document.getElementById('dataDualTop');
      let dataDualBottom = document.getElementById('dataDualBottom');
      
      let dataMonopole = document.getElementById('dataMonopole');

      index = (index + 1);  
      
//       if (delayIndex > -2) printModHex(currentNumber, upperRightElem, 'beforeend');
//       if (delayIndex > -1) printModHex(currentNumber, upperLeftElem, 'beforeend'); 
      //if (isfetched > 1 && index > 0) printModHex(upperRightElem, 'afterbegin', currentNumber);
      //if (isfetched > 1 && index > 0) printModHex(upperLeftElem, 'afterbegin', currentNumber);
      //if (isfetched > 1 && index > 0) printModHex(lowerRightElem, 'afterbegin', currentNumber);
      //if (isfetched > 1 && index > 0) printHex(lowerRightElem, 'afterbegin', currentNumber);
      currentNumber = printHex(dataHereBottom, 'afterbegin', index); 
      currentNumber = printHex(dataHereRight, 'afterbegin', index - 1); 
      currentNumber = printHex(dataHereTop, 'afterbegin', index - 2); 
      currentNumber = printHex(dataHereLeft, 'afterbegin', index - 3); 
      
      currentNumber = printHex(dataDualTop, 'afterbegin', index); 
      currentNumber = printHex(dataDualBottom, 'afterbegin', index - 1); 
      
      currentNumber = printHex(dataMonopole, 'afterbegin', index); 


      
      
    }
    t=setTimeout( function(){timedPrint(index); },80);
  };
  
  let header = document.getElementsByClassName('quadrupoleImage')[0];
  
  appendDataHolder(header, "dataHereBottom", "quadrupole")
  appendDataHolder(header, "dataHereRight", "quadrupole")
  appendDataHolder(header, "dataHereTop", "quadrupole")
  appendDataHolder(header, "dataHereLeft", "quadrupole")
  
  let dual = document.getElementsByClassName('dualTeleportationImage')[0];
  appendDataHolder(dual, "dataDualTop", "dipole")
  appendDataHolder(dual, "dataDualBottom", "dipole")
  
  let monopole = document.getElementsByClassName('monoTunnelImage')[0];
  appendDataHolder(monopole, "dataMonopole", "monopole")
	
  

	
  var $imageDiv = $('<div class="uploadImageHolder" ></div>');
  $imageDiv.appendTo(header);
	
  var $imageInnerDiv = $('<div class="imageInnerDiv" ></div>');
  $imageInnerDiv.appendTo($imageDiv);
	
	
  var $videoContainerDiv = $('<div class="video-container" ></div>');
  $videoContainerDiv.appendTo($imageDiv);
	
  var $videoDiv = $('<div id="videoHolder" ></div>');
  $videoDiv.appendTo($videoContainerDiv);
	
  
  var $videoChooserSection = $('<div class="videoChooserSection" ></div>');
  $videoChooserSection.appendTo(header);
	
  var $videoControlsDiv = $('<div id="videoControls" ></div>');
  $videoControlsDiv.appendTo($videoChooserSection);
	
  var youtubePlayButton = "https://esculap.org/wp-content/uploads/2022/10/YouTube_play_button.png"
  var $youtubePlayButtonImage = $('<img src="'+youtubePlayButton+'" class="youtubePlayButtonImage" />');
  $youtubePlayButtonImage.appendTo($videoControlsDiv);
	$(document).on('click', '.youtubePlayButtonImage', function() {
		player.setVolume($('.videoVolume').val());
		player.playVideo();
	});
	
  var $videoVolumeInput = $('<input type="range" value="10" class="videoVolume" />');
  $videoVolumeInput.appendTo($videoControlsDiv);
	$(document).on('change', '.videoVolume', function() {
		player.setVolume($(this).val());
	});
	

	
  var selectVideoMessage = "~~ Choose white noise video ~~"
  var $videoCaptionDiv = $('<div class="videoCaption" >'+selectVideoMessage+'</div>');
  $videoCaptionDiv.appendTo($videoChooserSection);
  var $videoThumbsDiv = $('<div id="videoThumbs" ></div>');
  $videoThumbsDiv.appendTo($videoChooserSection);
	
  var videos = [
	  {id:"6f0y1Iaorug", name:"Waves 1"},
	  {id:"LTmXmskEMas", name:"Waves 2"},
	  {id:"5Lzi4T6mu0U", name:"Meditation"},
	  {id:"fiSowadSS-E", name:"Tropical Beach"},
	  {id:"uWfwDnroMEA", name:"Relax Fire"},
	  {id:"mRlat5h_GTM", name:"Chills from Fireplace"},
	  {id:"WHPEKLQID4U", name:"Soothing Waves"},
	  {id:"YIElwQiqMQ4", name:"Calming Ocean"},
	  {id:"WmYgr8zwJmI", name:"Jungle River"},
	  {id:"jkLRith2wcc", name:"Water Sounds"},
	  {id:"R4QvFu9tn98", name:"SUN Wave"},
	  {id:"bz9YoyEXC38", name:"Solar Flare"},
  ]
  
  $(videos).each(function(k,v) {
	  var thumbUrl = "https://img.youtube.com/vi/"+v.id+"/0.jpg"
	  var $videoThumbPreviewDiv = $('<div '+
										'videoid="'+v.id+'" '+
										'videoname="'+v.name+'" '+
										'class="videoThumb" '+
										'style="background-image:url('+thumbUrl+')" '+
									'></div>');
	  $videoThumbPreviewDiv.appendTo($videoThumbsDiv);
  });

	$(document).on('mouseover', '.videoThumb', function() {
		$(".videoCaption").html($(this).attr('videoname'))
	});

	$(document).on('mouseleave', '#videoThumbs', function() {
		$(".videoCaption").html(selectVideoMessage)
	});

	$(document).on('click', '.videoThumb', function() {
		player.setVolume($('.videoVolume').val());
		player.loadVideoById($(this).attr('videoid'));
	});
	
  var $videoSelect = $('<select class="videoSelect" >'+
						 '<option value="6f0y1Iaorug">Waves 1</option>'+
						 '<option value="LTmXmskEMas">Waves 2</option>'+
						 '<option value="5Lzi4T6mu0U">Meditation</option>'+
						 '<option value="fiSowadSS-E">Tropical Beach</option>'+
						 '<option value="uWfwDnroMEA">Relax Fire</option>'+
						 '<option value="mRlat5h_GTM">Chills from Fireplace</option>'+
						 '<option value="WHPEKLQID4U">Soothing Waves</option>'+
						 '<option value="YIElwQiqMQ4">Calming Ocean</option>'+
						 '<option value="WmYgr8zwJmI">Jungle River</option>'+
						 '<option value="jkLRith2wcc">Water Sounds</option>'+
				 		'</select>');
  $videoSelect.appendTo($videoChooserSection);
	
	 $(document).on('change', '.videoSelect', function() {
		 player.setVolume($('.videoVolume').val());
		 player.loadVideoById($(this).val());
	 });
	
  var selectImageMessage = "~~ Choose focus image ~~"
  var $imageCaptionDiv = $('<div class="imageCaption" >'+selectImageMessage+'</div>');
  $imageCaptionDiv.appendTo($videoChooserSection);
	
  var $removeImage = $('<input class="removeImageButton" type="button" value="Remove Focus Image" />');
  $removeImage.appendTo($videoChooserSection);
	$(document).on('click', '.removeImageButton', function() {
		$(".imageInnerDiv").css('background-image', '');
	});
	
  var $uploadImageHiddenButton = $('<input class="uploadImageHiddenButton" type="file" style="display: none;" />');
  $uploadImageHiddenButton.appendTo($videoChooserSection);
  var $uploadImageButton = $('<input class="uploadImageButton" type="button" value="Upload Focus Image" />');
  $uploadImageButton.appendTo($videoChooserSection);
	$(document).on('click', '.uploadImageButton', function() {
		$(".uploadImageHiddenButton").click();
	});
	
	
	  var $image = $('<img class="uploadImageExample" src="https://esculap.org/wp-content/uploads/2022/10/sextupole.jpg" />');
  $image.appendTo($videoChooserSection);
	
	$(document).on('click', '.uploadImageExample', function() {
		$(".imageInnerDiv").css('background-image', 'url("https://esculap.org/wp-content/uploads/2022/10/sextupole.jpg")');
	});
  
  //var myFile = $('.uploadImageButton').prop('files');
  $(document).on('change', '.uploadImageHiddenButton', function() {
	var files = $(this).prop('files');
	if (files && files[0]) { // got sth

    // Clear image container
    $(".imageInnerDiv").removeAttr('src');
		

    $.each(files, function(index, ff) // loop each image 
      {

        var reader = new FileReader();

        // Put image in created image tags
        reader.onload = function(e) {
          $(".imageInnerDiv").css('background-image', 'url("' + e.target.result + '")');
        }

        reader.readAsDataURL(ff);

      });
  }
  });
  
  timedCount();
  timedPrint(32);
  
});