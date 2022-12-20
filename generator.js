jQuery(document).ready(function ($) {


  let fetcheddata_1 = [];
  let isfetched = 0;

  var qrngOrigDisplayInterval = 790;
  var qrngLength;
  var qrngFetchInterval;
  var currentDisplayInterval = qrngOrigDisplayInterval;
  var upcomingDisplayInterval = qrngOrigDisplayInterval;

  setFetchIntervalAndLength(currentDisplayInterval)

  function getOneHex(index) {
    jQuery.get(`https://qrng.anu.edu.au/API/jsonI.php?length=${qrngLength}&type=uint8`, data => {
      fetcheddata_1 = fetcheddata_1.concat(data.data);
      isfetched = isfetched + 1;
    });
  };

  function setFetchIntervalAndLength(dispInterval) {
    qrngLength = Math.round(10000 / dispInterval);
    qrngFetchInterval = qrngLength * dispInterval;
  }

  function timedCount() {
    toggleQrngLoadCircle(false);
    $('.qrngIntervalText').removeClass('disabled')
    currentDisplayInterval = upcomingDisplayInterval;
    setFetchIntervalAndLength(currentDisplayInterval)

    getOneHex();
    t = setTimeout(function () { timedCount(); }, qrngFetchInterval);
  };

  function printHex(element, dir, index) {
    let ret;

    for (let i = 0; i < 1; i++) {
      let dataToInsert = fetcheddata_1[index] ?? '';
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
    if (container.length) {
      var $dataDiv = $(`<div id="${id}" class="${className}" ></div>`);
      $dataDiv.appendTo(container);

      var $data = $(`<div></div>`);
      $data.appendTo($dataDiv);
    }
  };


  function timedPrint(index) {
    if (isfetched > 0) {

      let dataDualTop = document.getElementById('dataDualTop');
      let dataDualBottom = document.getElementById('dataDualBottom');

      let dataMonopole = document.getElementById('dataMonopole');

      index = (index + 1);

      var colorDiv = $(`.colorValue[param=1]`);
      var qrngColorValue = fetcheddata_1[index];

      if (isSoundModulation) {
        if (fetcheddata_1[index] > 127) {
          $(players).each((i, p) => p.unMute());
        } else {
          $(players).each((i, p) => p.mute());
        }
      }

      colorDiv.each((i, cd) => {
        var newValue = qrngColorValue;
        if ($(cd).attr('color') == 'false') {
          newValue = qrngColorValue / 255;
        }
        $(cd).val(newValue);
      })

      var cd = $(`.colorValue`);

      var col1 = `rgba(${$(cd[0]).val()},${$(cd[1]).val()},${$(cd[2]).val()},${$(cd[3]).val()})`;
      var col2 = `rgba(${$(cd[4]).val()},${$(cd[5]).val()},${$(cd[6]).val()},${$(cd[7]).val()})`;
      var col3 = `rgba(${$(cd[8]).val()},${$(cd[9]).val()},${$(cd[10]).val()},${$(cd[11]).val()})`;


      // Calculate the middle of the gradient
      var genHeight = $('.quadGenerator').height()
      var genOffTop = $(".quadGenerator").offset().top
      var graOffTop = $(".page-content").offset().top
      var gradCenter = genOffTop - graOffTop + genHeight / 2;

      // parametry: color, jasność, przezroczystość, obwiednia, promień, kąt
      gradient = `conic-gradient(from 0deg at 50% ${gradCenter}px, ${col1}, ${col2}, ${col3}, ${col1}, ${col2}, ${col3}, ${col1})`
      //conic-gradient(from 45deg, ${col1}, ${col2}, ${col3}, ${col1}, ${col2}, ${col3}, ${col1})`
      $('.page-content, .panel-content').css('background', gradient);

      for (var n = 0; n < generatorsNumber; ++n) {
        printHex(document.getElementById('generator' + n), 'afterbegin', index);
      }

      currentNumber = printHex(dataDualTop, 'afterbegin', index);
      currentNumber = printHex(dataDualBottom, 'afterbegin', index - 1);

      currentNumber = printHex(dataMonopole, 'afterbegin', index);
    }

    t = setTimeout(function () { timedPrint(index); }, currentDisplayInterval);
  };

  let $quadrupolePanel = $('.quadrupolePanel');
  let header = $('.quadrupoleImage');

  var $quadGenerator = $('<div class="quadGenerator" ></div>');
  $quadGenerator.appendTo(header);

  for (var n = 0; n < generatorsNumber; ++n) {
    appendDataHolder($quadGenerator, "generator" + n, "quadrupole")
  }

  let dual = $('.dualTeleportationImage');
  appendDataHolder(dual, "dataDualTop", "dipole")
  appendDataHolder(dual, "dataDualBottom", "dipole")

  let monopole = $('.monoTunnelImage');
  appendDataHolder(monopole, "dataMonopole", "monopole")


  var $imageDiv = $('<div class="uploadImageHolder clipped" ></div>');
  $imageDiv.appendTo($quadGenerator);

  var $imageInnerDiv = $('<div class="imageInnerDiv fullView" ></div>');
  $imageInnerDiv.appendTo($imageDiv);


  var $videoChooserSection = $('<div class="videoChooserSection" ></div>');
  $videoChooserSection.appendTo($quadrupolePanel);

  var $hideOptionsButton = $('<input class="hideOptionsButton button" type="button" altvalue="→" value="←"  />');
  $hideOptionsButton.appendTo($videoChooserSection);

  $(document).on('click', '.hideOptionsButton', function () {
    $('.ui-tabs, .focusTextSave').toggle();

    var newValue = $(this).attr('altvalue');
    var curValue = $(this).attr('value');
    $(this).attr('altvalue', curValue).attr('value', newValue)

  });

  var $centerGenerator = $('<input class="centerGenerator button" type="button" value="↕"  />');
  $centerGenerator.appendTo($videoChooserSection);

  $(document).on('click', '.centerGenerator', function () {
    $(window).scrollTop($(".quadrupolePanel").offset().top);
  });

  $(document).on('click', '.animateGenerator', function () {
    var val = parseInt($(this).attr('on'));
    var imageUrl = (val)
      ? "https://esculap.org/wp-content/uploads/2022/12/ezgif.com-gif-maker.webp"
      : "https://esculap.org/wp-content/uploads/2022/12/ezgif.com-gif-maker.webp";

    $(".quadGenerator").css('background-image', `url(${imageUrl})`)

    $(this).attr('on', (val + 1) % 2);
  });

  /**********************
          TABS 
  ***********************/

  $("#tabs").tabs().appendTo($videoChooserSection);

  var initFocusText = "Focus";
  var $focusText = $(`<div class="focusText generatorText" >${initFocusText}</div>`);
  $focusText.appendTo(header);

  var initCaptionText = "Gold";
  var $captionText = $(`<div class="captionText generatorText" >${initCaptionText}</div>`);
  $captionText.appendTo(header);

  /**********************
          VIDEO 
  ***********************/

  var videos = videosForFocus;

  var $videoContainerDiv = $('<div class="video-container hidden-container fullView"></div>');
  $videoContainerDiv.appendTo($imageDiv);

  var $videoDiv = $('<div id="videoHolder" ></div>');
  $videoDiv.appendTo($videoContainerDiv);

  var $pyramid = $('<div class="video-container pyramid pyramidView" ></div>');
  $pyramid.appendTo($imageDiv);

  var sides = ['north', 'west', 'south', 'east'];

  $(sides).each((i, s) => {
    var $side = $(`<div class="side ${s}" ></div>`);
    $side.appendTo($pyramid);

    var $inside = $(`<div class="inside" ></div>`);
    $inside.appendTo($side);

    var $imageInnerDiv = $('<div class="imageInnerDiv" ></div>');
    $imageInnerDiv.appendTo($inside);

    var $videoBackground = $(`<div class="videoBackground hidden-container" ></div>`);
    $videoBackground.appendTo($inside);

    var $videoForeground = $(`<div class="videoForeground" ></div>`);
    $videoForeground.appendTo($videoBackground);

    var $videoHolder = $(`<div id="${s}Holder" ></div>`);
    $videoHolder.appendTo($videoForeground);
  })

  var $tab1 = $("#tabs-1");

  var selectVideoMessage = "~~ Choose white noise video ~~"
  var $videoCaptionDiv = $(`<div class="videoCaption tabHeader" >${selectVideoMessage}</div>`);
  $videoCaptionDiv.appendTo($tab1);

  var $videoChooserContent = $('<div class="videoChooserContent chooserContent" ></div>');
  $videoChooserContent.appendTo($tab1);


  var $loadOverlay = $('<div class="loadOverlay loading" ></div>');
  $loadOverlay.appendTo($videoChooserContent);

  var checkPlayerInverval = setInterval(checkPlayer, 400);

  function checkPlayer() {
    if (playersReady) {
      $('.loadOverlay, .focusTextSave').removeClass('loading')
      clearInterval(checkPlayerInverval);
    }
  }

  /* PYRAMID TOGGLE */

  togglePyramidView(false, true);

  var $piramidToggle = $('<div class="piramidToggle" ></div>');
  $piramidToggle.appendTo($videoChooserContent);

  var $piramidToggleCB = $('<input class="piramidVideoToggleCB piramidToggleCB" type="checkbox" />');
  $piramidToggleCB.appendTo($piramidToggle);

  $(document).on('change', '.piramidVideoToggleCB', function () {
    $('.piramidToggleCB').prop( "checked", $(this).is(':checked'));
    togglePyramidView($(this).is(':checked'), true);
  });

  var $piramidToggleText = $('<div class="piramidVideoToggleText piramidToggleText" >Pyramid View</div>');
  $piramidToggleText.appendTo($piramidToggle);

  $(document).on('click', '.piramidVideoToggleText', function () {
    $('.piramidVideoToggleCB').click();
  });

  function togglePyramidView(isPyramid, startVideo) {
    if (isPyramid) {
      $('.fullView').hide();
      $('.pyramidView').show();
      $('.quadGenerator').css('width', '100vh').css('height', '100vh');
      $('.quadrupoleImage').css('width', '166vh').css('background-image', `url(https://esculap.org/wp-content/uploads/2022/12/TherapistImage.png)`);
      $('.personImage, .therapistImage, .generatorText').addClass('pyramidPerson')
    } else {
      $('.fullView').show();
      $('.pyramidView').hide();
      $('.quadGenerator').css('width', '63%').css('height', '63%')
      $('.quadrupoleImage').css('width', '100vh').css('background-image', `url(https://esculap.org/wp-content/uploads/2022/11/quadrupole_darq_frame.png)`)
      $('.personImage, .therapistImage, .generatorText').removeClass('pyramidPerson')
    }
    setDataFontSize();
    if (startVideo) startFocusVideo();
  }

  /* THUMBS */

  var $videoThumbsDiv = $('<div id="videoThumbs" ></div>');
  $videoThumbsDiv.appendTo($videoChooserContent);

  var $videoSelect = $('<select class="videoSelect" ></select>');
  $videoSelect.appendTo($videoChooserContent);

  $(videos).each(function (k, v) {
    var thumbUrl = "https://img.youtube.com/vi/" + v.id + "/0.jpg"

    var $videoThumbPreviewDiv = $(`<div
          videoid="${v.id}" 
          videoname="${v.name}"
          class="videoThumb"
          style="background-image:url(${thumbUrl})"
        ></div>`);
    $videoThumbPreviewDiv.appendTo($videoThumbsDiv);

    var $videoOption = $(`<option value="${v.id}">${v.name}</option>`);
    $videoOption.appendTo($videoSelect);
  });

  var $customVideoText = $('<div id="customVideoText" >YouTube Video Link</div>');
  $customVideoText.appendTo($videoChooserContent);

  var $customVideoInput = $('<input class="customVideoInput" type="text" />');
  $customVideoInput.appendTo($videoChooserContent);

  $(document).on('change', '.customVideoInput', function () {
    changeVideo(youtube_parser($(this).val()))
  });

  function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
 }

  $(document).on('mouseover', '.videoThumb', function () {
    $(".videoCaption").html($(this).attr('videoname'))
  });

  $(document).on('mouseleave', '#videoThumbs', function () {
    $(".videoCaption").html(selectVideoMessage)
  });

  $(document).on('click', '.videoThumb', function () {
    changeVideo($(this).attr('videoid'))
  });

  $(document).on('change', '.videoSelect', function () {
    changeVideo($(this).val());
  });


  var $videoControls = $('<div class="videoControls" ></div>');
  $videoControls.appendTo($videoChooserContent);

  var $youtubeRemoveButtonImage = $(`<img src="https://esculap.org/wp-content/uploads/2022/11/removeVideo.png" class="youtubeRemoveButtonImage redButton" />`);
  $youtubeRemoveButtonImage.appendTo($videoControls);

  $(document).on('click', '.youtubeRemoveButtonImage', function () {
    stopFocusVideo();
  });

  var $youtubePlayButtonImage = $(`<img src="https://esculap.org/wp-content/uploads/2022/11/pauseVideo.png" class="youtubePauseButtonImage redButton" style="display:none;" />`);
  $youtubePlayButtonImage.appendTo($videoControls);

  $(document).on('click', '.youtubePauseButtonImage', function () {
    pauseFocusVideo();
  });

  var $youtubePlayButtonImage = $(`<img src="https://esculap.org/wp-content/uploads/2022/11/playVideo.png" class="youtubePlayButtonImage redButton" />`);
  $youtubePlayButtonImage.appendTo($videoControls);

  $(document).on('click', '.youtubePlayButtonImage', function () {
    startFocusVideo();
  });

  function stopFocusVideo() {
    $('.youtubePauseButtonImage').hide();
    $('.youtubePlayButtonImage').show();
    $(players).each((i, p) => p.stopVideo());
    $('.videoBackground, .video-container').addClass('hidden-container');
  }

  function pauseFocusVideo() {
    $('.youtubePauseButtonImage').hide();
    $('.youtubePlayButtonImage').show();
    $(players).each((i, p) => p.pauseVideo());
  }

  function startFocusVideo() {
    if (!playersReady) return;
    $('.youtubePlayButtonImage').hide();
    $('.youtubePauseButtonImage').show();
    $(players).each((i, p) => p.stopVideo());
    var activePlayers = getActivePlayers();
    $(activePlayers).each((i, p) => p.setVolume($('.videoVolume').val()).playVideo().setPlaybackQuality("small").mute())
    activePlayers[0].unMute();
    $('.videoBackground, .video-container').removeClass('hidden-container');
  }

  function changeVideo(newVideoId) {
    if (!playersReady) return;
    $(players).each((i, p) => p.loadVideoById(newVideoId).stopVideo());
    startFocusVideo();
  }

  function getActivePlayers() {
    return ($('.piramidToggleCB').is(':checked')) ? players.slice(0, 4) : players.slice(4, 5);
  }

  var $videoVolumeInput = $('<input type="range" value="10" class="videoVolume" />');
  $videoVolumeInput.appendTo($videoControls);
  $(document).on('change', '.videoVolume', function () {
    $(players).each((i, p) => p.setVolume($(this).val()))
  });


  /**********************
        FOCUS TEXT 
  ***********************/

  var $tab2 = $("#tabs-2");

  var selectFocusMessage = "~~ Choose Focus ~~"
  var $focusCaption = $(`<div class="focusCaption tabHeader" >${selectFocusMessage}</div>`);
  $focusCaption.appendTo($tab2);

  var $focusTextTextBox = $(`<input class="focusTextTextBox" type="text" value="${initFocusText}" />`);
  $focusTextTextBox.appendTo($tab2);

  $(document).on('input', '.focusTextTextBox', function () {
    $(".focusText").html($(this).val());
  });

  /**********************
          IMAGES 
  ***********************/

  var $tab3 = $("#tabs-3");

  var selectImageMessage = "~~ Choose Image ~~"
  var $imageCaptionDiv = $(`<div class="imageCaption tabHeader" >${selectImageMessage}</div>`);
  $imageCaptionDiv.appendTo($tab3);

  var $imageButtons = $('<div class="imageButtons" ></div>');
  $imageButtons.appendTo($tab3);

  var $removeImage = $(`<img src="https://esculap.org/wp-content/uploads/2022/11/removeVideo.png" class="removeImageButton redButton" />`);
  $removeImage.appendTo($imageButtons);

  $(document).on('click', '.removeImageButton', function () {
    $(".imageInnerDiv").css('background-image', '');
  });

  var $uploadImageButton = $(`<img src="https://esculap.org/wp-content/uploads/2022/11/uploadButtons.png" class="uploadImageButton redButton" />`);
  $uploadImageButton.appendTo($imageButtons);

  var $uploadImageHiddenButton = $('<input class="uploadImageHiddenButton" type="file" style="display: none;" />');
  $uploadImageHiddenButton.appendTo($imageButtons);

  $(document).on('click', '.uploadImageButton, .imageInnerDiv', function () {
    $(".uploadImageHiddenButton").click();
  });

  var focusImages = imagesForFocus;

  $(focusImages).each(function (k, fi) {
    var $imageDiv = $('<div class="uploadImageExample" src="" ></div>');
    $imageDiv.appendTo($tab3);

    var $image = $(`<img class="uploadedImage" src="${fi.filepath}" />`);
    $image.appendTo($imageDiv);

    var $caption = $(`<div class="uploadImageCaption" >${fi.caption}</div>`);
    $caption.appendTo($imageDiv);
  });

  $(document).on('click', '.uploadImageExample', function () {
    var imagePath = $(this).find(".uploadedImage").attr('src');
    $(".imageInnerDiv").css('background-image', `url("${imagePath})`);
    $(".captionText").html($(this).find(".uploadImageCaption").html());
  });

  //var myFile = $('.uploadImageButton').prop('files');
  $(document).on('change', '.uploadImageHiddenButton', function () {
    var fileName = uploadImage(".imageInnerDiv", $(this));
    $(".captionText").html(fileName);
  });

  function uploadImage(targetImageSelector, $this) {
    var files = $this.prop('files');
    if (files && files[0]) { // got sth

      // Clear image container
      $(targetImageSelector).removeAttr('src');

      $.each(files, function (index, ff) // loop each image 
      {
        var fileNameSplit = ff.name.split('.')
        fileExt = fileNameSplit[fileNameSplit.length - 1]

        if (fileExt == 'json') {
          readJSON(ff);
        } else {
          readImage(ff, targetImageSelector);
        }

      });

      var retVal = files[0].name.split('.')[0]
      $this[0].value = '';
      return retVal;
    }
  }

  function readImage(ff, targetImageSelector) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $(targetImageSelector).css('background-image', `url("${e.target.result}")`);
    }
    reader.readAsDataURL(ff)
  }

  function readJSON(ff) {
    var reader = new FileReader();
    reader.onload = function (e) {
      json = e.target.result;
      jsonObject = JSON.parse(json);
      $('.focusText').html(jsonObject['Focus Text']);

      $(jsonObject.people).each((i, p) => {
        $(`.${p.role}Image`).css('background-image', p.data);
      });

      $('.imageInnerDiv').css('background-image', jsonObject.imageData);
      if (typeof jsonObject.ImageCaption !== 'undefined') $(".captionText").html(jsonObject.ImageCaption);
      if (typeof jsonObject.qrngInterval !== 'undefined') changeQrngInterval(jsonObject.qrngInterval);
      if (typeof jsonObject.isPyramid !== 'undefined') {
        $('.piramidToggleCB').prop('checked', jsonObject.isPyramid);
        togglePyramidView(jsonObject.isPyramid);
      }
      if (typeof jsonObject.videoId !== 'undefined') changeVideo(jsonObject.videoId);
      if (typeof jsonObject.callClip !== 'undefined') $('.clipOptionsSelect').val(jsonObject.callClip).change();
      if (typeof jsonObject.callClipSize !== 'undefined') $('.callRange').val(jsonObject.callClipSize).change();

    }
    reader.readAsText(ff);
  }



  /**********************
          PEOPLE 
  ***********************/

  var $tab4 = $("#tabs-4");

  var $peopleCaption = $(`<div class="focusCaption tabHeader" >~~ Choose People ~~</div>`);
  $peopleCaption.appendTo($tab4);

  var $peopleContent = $(`<div class="peopleContent" ></div>`);
  $peopleContent.appendTo($tab4);

  var people = [
    { name: "Therapist", role: "therapist" },
    { name: "Person 1", role: "person1" },
    { name: "Person 2", role: "person2" },
    { name: "Person 3", role: "person3" },
    { name: "Person 4", role: "person4" },
    { name: "Person 5", role: "person5" },
    { name: "Person 6", role: "person6" },
  ]

  $(people).each((i, p) => {

    var $personPanel = $(`<div class="${p.role} personPanel" ></div>`);
    $personPanel.appendTo($peopleContent);

    var $personImage = $(`<div class="${p.role}Thumb personImageThumb"></div>`);
    $personImage.appendTo($personPanel);

    var $personRightPanel = $(`<div class="personRightPanel"></div>`);
    $personRightPanel.appendTo($personPanel);

    var $personTag = $(`<div class="personTag" >${p.name}</div>`);
    $personTag.appendTo($personRightPanel);

    var $personHiddenUploadButton = $(`<input class="personHiddenUploadButton" target="${p.role}" type="file" style="display: none;" />`);
    $personHiddenUploadButton.appendTo($personRightPanel);

    var $personUploadButton = $(`<input role="${p.role}" class="personUploadButton" type="button" value="Upload Image" />`);
    $personUploadButton.appendTo($personRightPanel);

  })


  var $thrapistImage = $(`<div role="${people[0].role}" class="personImage therapistImage bottom" ></div>`);
  $thrapistImage.appendTo(header);

  var $thrapistImage = $(`<div role="${people[0].role}" class="personImage therapistImage right" ></div>`);
  $thrapistImage.appendTo(header);

  var $thrapistImage = $(`<div role="${people[0].role}" class="personImage therapistImage top" ></div>`);
  $thrapistImage.appendTo(header);

  var $thrapistImage = $(`<div role="${people[0].role}" class="personImage therapistImage left" ></div>`);
  $thrapistImage.appendTo(header);

  var $person1Image = $(`<div role="${people[1].role}" class="personImage inner person1Image" ></div>`);
  $person1Image.appendTo($quadGenerator);

  var $person1Image = $(`<div role="${people[2].role}" class="personImage inner person2Image" ></div>`);
  $person1Image.appendTo($quadGenerator);

  var $person1Image = $(`<div role="${people[3].role}" class="personImage inner person3Image" ></div>`);
  $person1Image.appendTo($quadGenerator);

  var $person1Image = $(`<div role="${people[4].role}" class="personImage inner person4Image" ></div>`);
  $person1Image.appendTo($quadGenerator);

  var $person1Image = $(`<div role="${people[5].role}" class="personImage inner person5Image" ></div>`);
  $person1Image.appendTo($quadGenerator);

  var $person1Image = $(`<div role="${people[6].role}" class="personImage inner person6Image" ></div>`);
  $person1Image.appendTo($quadGenerator);

  $(document).on('click', '.personUploadButton, .personImage', function () {
    var role = $(this).attr('role');
    $(`.${role} .personHiddenUploadButton`).click();
  });

  $(document).on('change', '.personHiddenUploadButton', function () {
    var target = $(this).attr('target');
    var targetSelector = `.${target}Image, .${target}Thumb`;
    uploadImage(targetSelector, $(this));
  });


  /**********************
            QRNG
  ***********************/

  var $tab5 = $("#tabs-5");

  var $qrngCaption = $(`<div class="qrngCaption tabHeader" >~~ Choose QRNG settings ~~</div>`);
  $qrngCaption.appendTo($tab5);

  var $qrngContent = $(`<div class="qrngContent" ></div>`);
  $qrngContent.appendTo($tab5);

  var $qrngIntervalCheckbox = $(`<input class="qrngIntervalCheckbox" type="checkbox" />`);
  $qrngIntervalCheckbox.appendTo($qrngContent);

  var $qrngInterval = $(`<input class="qrngInterval" type="range" min="0.1" max="1" step="0.1" value="0.8" />`);
  $qrngInterval.appendTo($qrngContent);

  var $qrngIntervalText = $(`<label class="qrngIntervalText">${qrngOrigDisplayInterval} ms</label>`);
  $qrngIntervalText.appendTo($qrngContent);

  var $qrngLoadCircle = $(`<img src="https://esculap.org/wp-content/uploads/2022/11/load_circle.gif" class="qrngLoadCircle" />`);
  $qrngLoadCircle.appendTo($qrngContent);

  $(document).on('change', '.qrngIntervalCheckbox', function () {
    if (this.checked) {
      changeQrngInterval($('.qrngInterval').val() * 1000);
    } else {
      changeQrngInterval(qrngOrigDisplayInterval);
    }
  });

  $(document).on('change', '.qrngInterval', function () {
    $('.qrngIntervalCheckbox').prop('checked', true);
    changeQrngInterval($(this).val() * 1000);
  });

  function changeQrngInterval(newInterval) {
    upcomingDisplayInterval = newInterval;
    toggleQrngLoadCircle(true);
    $('.qrngIntervalText').html(`${newInterval} ms`).addClass('disabled')
  }

  function toggleQrngLoadCircle(isLoading) {
    $('.qrngLoadCircle').toggle(isLoading);
  }

  var $colorTable = $(`<div class="colorTable" ></div>`);
  $colorTable.appendTo($qrngContent);

  var colors = [`color 1`, `color 2`, `color 3`];
  var cVariables = [`Red`, `Green`, `Blue`, `Amp`];

  var colorValues = [
    [200, 225, 160, 0.7],
    [120, 180, 220, 0.6],
    [250, 125, 60, 0.4],
  ]

  var paramValues = [
    [0, 0, 1, 1],
    [1, 1, 0, 0],
    [0, 1, 0, 1],
  ]

  var $colorHeader = $(`<div class="colorHeader" ></div>`);
  $colorHeader.appendTo($colorTable);

  var $colorCell = $(`<div class="colorCell" ></div>`);
  $colorCell.appendTo($colorHeader);

  $(colors).each((i, c) => {
    var $colorRow = $(`<div class="colorRow" ></div>`);
    $colorRow.appendTo($colorTable);

    var $colorCell = $(`<div class="colorCell" >${c}</div>`);
    $colorCell.appendTo($colorRow);

    $(cVariables).each((j, v) => {

      if (i == 0) {
        var $colorCell = $(`<div class="colorCell" >${v}</div>`);
        $colorCell.appendTo($colorHeader);
      }

      var $colorCell = $(`<div class="colorCell" ></div>`);
      $colorCell.appendTo($colorRow);

      var colorValue = colorValues[i][j];
      var paramValue = paramValues[i][j];

      var buttonValues = ["CONST", "VAR"];
      var buttonValue = buttonValues[0];

      if (paramValue) {
        buttonValue = buttonValues[1];
      }

      var min, max, step;
      min = 0

      var isColor = true;

      if (j != 3) {
        max = 255;
        step = 1;
      } else {
        max = 1;
        step = 0.1;
        isColor = false;
      }

      var matrixIndex = '' + i + j;

      var $colorParam = $(`<div class="colorParam" index="${matrixIndex}" param="${paramValue}">${buttonValue}</div>`);
      $colorParam.appendTo($colorCell);

      var $colorValue = $(`<input class="colorValue" index="${matrixIndex}" type="number" param="${paramValue}" min="${min}" max="${max}" step="${step}" color="${isColor}" value="${colorValue}" />`);
      $colorValue.appendTo($colorCell);

    })
  })

  $(document).on('click', '.colorParam', function () {
    var param = parseInt($(this).attr('param'));
    var index = $(this).attr('index');
    var buttonValues = ["CONST", "VAR"];

    var newParam = (param + 1) % 2;

    $(`.colorValue[index='${index}']`).attr('param', newParam);
    $(this).attr('param', newParam).html(buttonValues[newParam]);
  });


  /**********************
          SOUND
  ***********************/

  var isSoundModulation = 0;

  var $tab6 = $("#tabs-6");

  var $soundCaption = $(`<div class="soundCaption tabHeader" >~~ Sound Settings ~~</div>`);
  $soundCaption.appendTo($tab6);

  var $soundContent = $(`<div class="soundContent" ></div>`);
  $soundContent.appendTo($tab6);

  var $speakerOutput = $(`<img src="https://esculap.org/wp-content/uploads/2022/11/speaker.png" class="speakerOutput soundButton" />`);
  $speakerOutput.appendTo($soundContent);

  var $usbOutput = $(`<img src="https://esculap.org/wp-content/uploads/2022/11/usb.png" class="usbOutput soundButton" />`);
  $usbOutput.appendTo($soundContent);

  $(document).on('click', '.usbOutput', function () {
    isSoundModulation = (isSoundModulation + 1) % 2;
    $(this).css('opacity', (isSoundModulation + 1) / 2);
    if (!isSoundModulation) $(players).each((i, p) => p.unMute());
  });

  /**********************
        CALL 
***********************/

  var $tab7 = $("#tabs-7");

  var $callCaption = $(`<div class="callCaption tabHeader" >~~ Sound Settings ~~</div>`);
  $callCaption.appendTo($tab7);

  var $callContent = $(`<div class="callContent" ></div>`);
  $callContent.appendTo($tab7);

  var $piramidToggle = $('<div class="piramidToggle callToggle" ></div>');
  $piramidToggle.appendTo($callContent);

  var $piramidToggleCB = $('<input class="piramidCallToggleCB piramidToggleCB" type="checkbox" />');
  $piramidToggleCB.appendTo($piramidToggle);

  $(document).on('change', '.piramidCallToggleCB', function () {
    $('.piramidToggleCB').prop( "checked", $(this).is(':checked'));
    togglePyramidView($(this).is(':checked'), true);
  });

  var $piramidToggleText = $('<div class="piramidCallToggleText piramidToggleText cbText" >Pyramid View</div>');
  $piramidToggleText.appendTo($piramidToggle);

  $(document).on('click', '.piramidCallToggleText', function () {
    $('.piramidCallToggleCB').click();
  });


  /*  Call window clipped 
  paths generated at: https://bennettfeely.com/clippy/
  */

  var $clipOptionsDiv = $(`<div class="clipOptionsDiv" ></div>`);
  $clipOptionsDiv.appendTo($callContent);

  var $clipOptionsSelect = $('<select class="clipOptionsSelect" ></select>');
  $clipOptionsSelect.appendTo($clipOptionsDiv);

  var clipOptions = ['quad', 'circle', 'octa (hor)', 'octa (ver)', 'hexa (hor)', 'hexa (ver)', 'diamond', 'heth', 'star'];

  $(clipOptions).each(function (k, co) {
    var $clipOption = $(`<option value="${co}">${co}</option>`);
    $clipOption.appendTo($clipOptionsSelect);
  });

  $(document).on('change', '.clipOptionsSelect', function () {
    $('.jitsi-wrapper').removeClass('clippedCircle clippedOctaHor clippedOctaVer clippedHexaHor clippedHexaVer clippedHeth clippedDiamond clippedStar')
    switch ($(this).val()) {
      case 'square':
        break;
      case 'circle':
        $('.jitsi-wrapper').addClass('clippedCircle')
        break;
      case 'octa (hor)':
        $('.jitsi-wrapper').addClass('clippedOctaHor')
        break;
      case 'octa (ver)':
        $('.jitsi-wrapper').addClass('clippedOctaVer')
        break;
      case 'hexa (hor)':
        $('.jitsi-wrapper').addClass('clippedHexaHor')
        break;
      case 'hexa (ver)':
        $('.jitsi-wrapper').addClass('clippedHexaVer')
        break;
      case 'heth':
        $('.jitsi-wrapper').addClass('clippedHeth')
        break;
      case 'diamond':
        $('.jitsi-wrapper').addClass('clippedDiamond')
        break;
      case 'star':
        $('.jitsi-wrapper').addClass('clippedStar')
        break;
      default:
        break;
    }
  });

  var $callRange = $('<input class="callRange" type="range" min="0" max="100" value="90" />');
  $callRange.appendTo($callContent);

  $(document).on('change mousemove', '.callRange', function () {
    changeCallWindowSize($(this).val())
  });


  var $callResetRange = $('<input class="callResetRange" type="button" value="reset size" />');
  $callResetRange.appendTo($callContent);

  $(document).on('click', '.callResetRange', function () {
    var origSize = 90;
    $('.callRange').val(origSize);
    changeCallWindowSize(origSize);
  });


  // Call window animated toggle

  var $animateCallDiv = $('<div class="animateCallDiv" ></div>');
  $animateCallDiv.appendTo($callContent);

  var $animateCallWindowCB = $('<input class="animateCallWindowCB" type="checkbox" />');
  $animateCallWindowCB.appendTo($animateCallDiv);

  $(document).on('change', '.animateCallWindowCB', function () {
    $('.jitsi-wrapper').toggleClass('animated', $(this).is(':checked'));
  });

  var $animateCallWindowText = $('<div class="animateCallWindowText cbText" >Animate Call Window</div>');
  $animateCallWindowText.appendTo($animateCallDiv);

  $(document).on('click', '.animateCallWindowText', function () {
    $('.animateCallWindowCB').click();
  });

  function changeCallWindowSize(size) {
    var dim = size;
    var offset = (100 - dim) / 2
    var newStyle = `width: ${dim}% !important; height: ${dim}% !important; top: ${offset}% !important; left: ${offset}% !important; `
    $('.jitsi-wrapper').attr('style', newStyle);;
  }


  var $callButton = $(`<div class="callButton button" >Start Call</div>`);
  $callButton.appendTo($callContent);

  var $endcallButton = $(`<div class="endcallButton button" >End Call</div>`);
  $endcallButton.appendTo($callContent);

  $(document).on('click', '.callButton', function () {
    $('.callWrapper').show().appendTo('.uploadImageHolder');
  });

  $(document).on('click', '.endcallButton', function () {
    $('.callWrapper').hide().appendTo('.uploadImageHolder');
  });

  /**********************
SAVE SESSION 
***********************/

  var $focusTextSave = $(`<div class="focusTextSave loading" ></div>`);
  $focusTextSave.appendTo($videoChooserSection);

  var $focusTextSaveButton = $('<input class="focusTextSaveButton button"  type="button" value="Save Session"  />');
  $focusTextSaveButton.appendTo($focusTextSave);

  var $focusTextSaveButton = $('<input class="focusTextLoadButton button"  type="button" value="Load Session"  />');
  $focusTextSaveButton.appendTo($focusTextSave);

  var $loadHiddenUploadButton = $(`<input class="loadHiddenUploadButton" type="file" style="display: none;" />`);
  $loadHiddenUploadButton.appendTo($focusTextSave);

  $(document).on('click', '.focusTextSaveButton', function () {
    saveSession();
  });

  $(document).on('click', '.focusTextLoadButton', function () {
    $('.loadHiddenUploadButton').click();
  });

  $(document).on('change', '.loadHiddenUploadButton', function () {
    uploadImage('', $(this));
  });

  initializeEmotionsQuantity();

  timedCount();
  timedPrint(0);

  function saveSession() {
    event.preventDefault();

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var dateNow = new Date(Date.now());
    var sessionTime = dateNow.toUTCString();
    var focusText = $(".focusText").html();
    var videoID = players[0].getVideoData()['video_id'];
    var videoName = getVideobyVideoId(videoID)[0].name;
    var ImageCaption = $(".captionText").html().replace('\n', ' ');

    var emotionsText = "\n\nEmotions Quantity\n\n";
    $(emotionsList).each((i, e) => {
      emotionsText += `${e.name}: ${e.value}\n`;
    })

    var sessionObject = {
      'Session time': sessionTime,
      'Focus Text': focusText,
      'videoId': videoID,
      'imageData': $('.imageInnerDiv').css('background-image'),
      ImageCaption,
      'people': [
        { role: 'therapist', data: $('.therapistImage').css('background-image') },
        { role: 'person1', data: $('.person1Image').css('background-image') },
        { role: 'person2', data: $('.person2Image').css('background-image') },
        { role: 'person3', data: $('.person3Image').css('background-image') },
        { role: 'person4', data: $('.person4Image').css('background-image') },
        { role: 'person5', data: $('.person5Image').css('background-image') },
        { role: 'person6', data: $('.person6Image').css('background-image') }
      ],
      qrngInterval: currentDisplayInterval,
      isPyramid: $('.piramidToggleCB').is(':checked'),
      callClip: $('.clipOptionsSelect').val(),
      callClipSize: $('.callRange').val(),

    };

    fileName = `${year}_${month}_${day}_${focusText}`;
    download(`${fileName}.json`, JSON.stringify(sessionObject));

  }

  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  function getVideobyVideoId(videoId) {
    return videosForFocus.filter(v => v.id == videoId)
  }

  function initializeEmotionsQuantity() {

    instantiateStar('.emotionalQuantity', emotionsList)
    instantiateStar('.energeticQuantity', energiesList)
    instantiateStar('.healthyQuantity', healthList)

    drawStar(150, 150, 80, 50, emotionsList, "canvas");
    updateBars(emotionsList, '.emotionalQuantity .emotionQuantityBarFill')

    drawStar(150, 150, 80, 50, energiesList, "canvas_energy");
    updateBars(energiesList, '.energeticQuantity .emotionQuantityBarFill')

    drawStar(150, 150, 80, 50, healthList, "canvas_health");
    updateBars(healthList, '.healthyQuantity .emotionQuantityBarFill')

    $(document).on('change', '.emotionalQuantity .emotionQuantity', function () {
      onQuantityClick(emotionsList, '.emotionalQuantity .emotionQuantityBarFill', $(this), "canvas")
    });

    $(document).on('change', '.energeticQuantity .emotionQuantity', function () {
      onQuantityClick(energiesList, '.energeticQuantity .emotionQuantityBarFill', $(this), "canvas_energy")
    });

    $(document).on('change', '.healthyQuantity .emotionQuantity', function () {
      onQuantityClick(healthList, '.healthyQuantity .emotionQuantityBarFill', $(this), "canvas_health")
    });


    function instantiateStar(starSelector, list) {

      /*** Title ***/

      var $energeticSections = $('<div class="Sections" ></div>');
      $energeticSections.appendTo($(starSelector));

      /*** Headers Row ***/

      var $emotionHeaders = $('<div class="emotionHeaders"></div>');
      $emotionHeaders.appendTo($energeticSections);

      var $intensityHeader = $('<div class="name header">Name</div>');
      $intensityHeader.appendTo($emotionHeaders);

      var $intensityHeader = $('<div class="intensity header">Intensity</div>');
      $intensityHeader.appendTo($emotionHeaders);

      var $intensityHeader = $('<div class="color header">R</div>');
      $intensityHeader.appendTo($emotionHeaders);

      var $intensityHeader = $('<div class="color header">G</div>');
      $intensityHeader.appendTo($emotionHeaders);

      var $intensityHeader = $('<div class="color header">B</div>');
      $intensityHeader.appendTo($emotionHeaders);

      if (!(typeof isMobile !== 'undefined' && isMobile)) {
        var $intensityHeader = $('<div class="color header">Rw</div>');
        $intensityHeader.appendTo($emotionHeaders);

        var $intensityHeader = $('<div class="color header">Gw</div>');
        $intensityHeader.appendTo($emotionHeaders);

        var $intensityHeader = $('<div class="color header">Bw</div>');
        $intensityHeader.appendTo($emotionHeaders);
      }

      /*** Quantities Rows ***/

      $(list).each((i, e) => {
        var $emotion = $('<div class="emotion"></div>');
        $emotion.appendTo($energeticSections);

        var $emotionName = $(`<div class="emotionName">${e.name}</div>`);
        if (e.link) $emotionName = $(`<div class="emotionName"><a href="${e.link}" target="_blank" rel="noopener">${e.name}</a></div>`);
        $emotionName.appendTo($emotion);

        var $emotionQuantityBar = $(`<div class="emotionQuantityBar"></div>`);
        $emotionQuantityBar.appendTo($emotion);

        var $emotionQuantityBarFill = $(`<div class="emotionQuantityBarFill"></div>`);
        $emotionQuantityBarFill.appendTo($emotionQuantityBar);

        var $emotionQuantity = $(`<input class="emotionQuantity" type="number" emotion="${e.name}" value="${e.value}" min="0" max="10" />`);
        $emotionQuantity.appendTo($emotion);

        colorKeys = ['r', 'g', 'b'];

        $(colorKeys).each((i, c) => {
          addColorValueInput(e.name, c, e[c], $emotion);
        })

        if (!(typeof isMobile !== 'undefined' && isMobile)) {
          $(colorKeys).each((i, c) => {
            addBalanceValueInput(e.name, c, e[c], e.value, $emotion);
          })
        }

      })
    }

    /*** Quantities Helper Function ***/

    function addColorValueInput(name, colorKey, colorVal, container) {
      var $colorQuantity = $(`<input class="${colorKey} colorQuantity" type="number" emotion="${name}" value="${colorVal}" min="${getMinColorValue(colorVal)}" max="${getMaxColorValue(colorVal)}" />`);
      $colorQuantity.appendTo(container);
    }

    function addBalanceValueInput(name, colorKey, colorVal, intensity, container) {
      var $balanceQuantity = $(`<input class="${colorKey} balanceQuantity" type="number" emotion="${name}" value="${intensity * 10}" min="0" max="100" />`);
      $balanceQuantity.appendTo(container);
    }

    function getMaxColorValue(colorValue) {
      return (colorValue + 33 > 255) ? 255 : colorValue + 33;
    }

    function getMinColorValue(colorValue) {
      return (colorValue - 33 < 0) ? 0 : colorValue - 33;
    }

    function onQuantityClick(list, contanerSelector, _this, canvasId) {
      var selectedindex = list.findIndex((e) => e.name == _this.attr('emotion'))
      list[selectedindex].value = _this.val();
      drawStar(150, 150, 80, 50, list, canvasId);
      updateBars(list, contanerSelector)
    }

  }

  function updateBars(list, contanerSelector) {
    $(contanerSelector).each((i, bar) => {
      $(bar).css('width', `${list[i].value * 10}%`)
    })
  }

  function drawStar(cx, cy, outerRadius, innerRadius, list, canvasId) {

    var canvas = document.getElementById(canvasId);
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    ctx.textAlign = 'center';
    ctx.fillStyle = "pink";

    var selectedEmotions = $(list).filter((i, e) => e.value > 0)
    spikes = selectedEmotions.length
    emotions = selectedEmotions

    ctx.clearRect(0, 0, 300, 300);
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    ctx.strokeSyle = "#000";
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius)
    for (i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y)

      var xt = cx + Math.cos(rot) * outerRadius * 1.3;
      var yt = cy + Math.sin(rot) * outerRadius * 1.3;
      ctx.font = `${emotions[i].value * 3 + 10}px serif`;
      ctx.fillText(emotions[i].name, xt, yt);
      rot += step

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y)
      rot += step
    }
    ctx.lineTo(cx, cy - outerRadius)
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.fillStyle = 'pink';
    ctx.fill();
  }

  function setDataFontSize() {
    var paddingCss = $('.quadrupole').css('padding-bottom').replace('px', '');
    var padding = parseInt(paddingCss);
    $('.quadrupole').css('font-size', `${padding / 9}px`);

    if (typeof isMobile !== 'undefined' && isMobile) {
      $('.videoChooserSection').css('margin', 'auto');
      $('.videoChooserSection').css('position', 'static');
    }

  }

  $(window).on("resize", function (event) {
    setDataFontSize()
  });

});