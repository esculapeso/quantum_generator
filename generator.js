jQuery(document).ready(function ($) {


  let fetcheddata_1 = [];
  let isfetched = 0;

  var qrngOrigDisplayInterval = 790;
  var qrngLength = 16;
  var qrngFetchInterval = qrngOrigDisplayInterval * qrngLength;

  var currentDisplayInterval = qrngOrigDisplayInterval;
  var upcomingDisplayInterval = qrngOrigDisplayInterval;

  function getOneHex(index) {
    jQuery.get(`https://qrng.anu.edu.au/API/jsonI.php?length=${qrngLength}&type=uint8`, data => {
      fetcheddata_1 = fetcheddata_1.concat(data.data);
      isfetched = isfetched + 1;
    });
  };

  function timedCount() {
    getOneHex();
    toggleQrngLoadCircle(false);
    $('.qrngIntervalText').removeClass('disabled')
    qrngFetchInterval = upcomingDisplayInterval * qrngLength;
    currentDisplayInterval = upcomingDisplayInterval;
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

    if (container) {
      var div = document.createElement('div');
      div.setAttribute("id", id);
      div.setAttribute("class", className);

      for (let i = 0; i < 1; i++) {
        div.appendChild(document.createElement('div'));
      }


      container.appendChild(div);
    }
  };


  function timedPrint(index) {
    if (isfetched > 0) {

      let dataHereBottom = document.getElementById('dataHereBottom');
      let dataHereRight = document.getElementById('dataHereRight');
      let dataHereTop = document.getElementById('dataHereTop');
      let dataHereLeft = document.getElementById('dataHereLeft');

      let dataDualTop = document.getElementById('dataDualTop');
      let dataDualBottom = document.getElementById('dataDualBottom');

      let dataMonopole = document.getElementById('dataMonopole');

      index = (index + 1);

      var colorDiv = $(`.colorValue[param=1]`);
      var qrngColorValue = fetcheddata_1[index];

      if (isSoundModulation) {
        if (fetcheddata_1[index] > 127) {
          player.unMute();
        } else {
          player.mute();
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


      // parametry: color, jasność, przezroczystość, obwiednia, promień, kąt
      gradient = `conic-gradient(from 0deg at 50% 1810px, ${col1}, ${col2}, ${col3}, ${col1}, ${col2}, ${col3}, ${col1})`
      //conic-gradient(from 45deg, ${col1}, ${col2}, ${col3}, ${col1}, ${col2}, ${col3}, ${col1})`
      $('.page-content, .panel-content').css('background', gradient);



      currentNumber = printHex(dataHereBottom, 'afterbegin', index);
      currentNumber = printHex(dataHereRight, 'afterbegin', index - 1);
      currentNumber = printHex(dataHereTop, 'afterbegin', index - 2);
      currentNumber = printHex(dataHereLeft, 'afterbegin', index - 3);

      currentNumber = printHex(dataDualTop, 'afterbegin', index);
      currentNumber = printHex(dataDualBottom, 'afterbegin', index - 1);

      currentNumber = printHex(dataMonopole, 'afterbegin', index);
    }

    t = setTimeout(function () { timedPrint(index); }, currentDisplayInterval);
  };

  let $quadrupolePanel = $('.quadrupolePanel');
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

  var $videoChooserSection = $('<div class="videoChooserSection" ></div>');
  $videoChooserSection.appendTo($quadrupolePanel);

  var $hideOptionsButton = $('<input class="hideOptionsButton button" type="button" altvalue="→" value="←"  />');
  $hideOptionsButton.appendTo($videoChooserSection);

  $(document).on('click', '.hideOptionsButton', function () {
    $('.ui-tabs, .focusTextSave').toggle();
    var bgImg = $('.quadrupoleImage').css('background-image');
    var bgSufix = '_open';

    var newValue = $(this).attr('altvalue');
    var curValue = $(this).attr('value');
    $(this).attr('altvalue', curValue).attr('value', newValue)

    if (bgImg.includes(bgSufix)) {
      bgImg = bgImg.replace(bgSufix, '');
    } else {
      bgImg = bgImg.replace('.png', `${bgSufix}.png`);
    }

    $('.quadrupoleImage').css('background-image', bgImg);
  });

  /**********************
          TABS 
  ***********************/

  $("#tabs").tabs().appendTo($videoChooserSection);

  var $imageDiv = $('<div class="uploadImageHolder" ></div>');
  $imageDiv.appendTo(header);

  var initFocusText = "Focus";
  var $focusText = $(`<div class="focusText generatorText" >${initFocusText}</div>`);
  $focusText.appendTo(header);

  var initCaptionText = "Gold";
  var $captionText = $(`<div class="captionText generatorText" >${initCaptionText}</div>`);
  $captionText.appendTo(header);

  var $imageInnerDiv = $('<div class="imageInnerDiv" ></div>');
  $imageInnerDiv.appendTo($imageDiv);



  /**********************
          VIDEO 
  ***********************/

  var videos = videosForFocus;

  var $videoContainerDiv = $('<div class="video-container hidden-container" ></div>');
  $videoContainerDiv.appendTo($imageDiv);

  var $videoDiv = $('<div id="videoHolder" ></div>');
  $videoDiv.appendTo($videoContainerDiv);

  var $tab1 = $("#tabs-1");

  var selectVideoMessage = "~~ Choose white noise video ~~"
  var $videoCaptionDiv = $(`<div class="videoCaption tabHeader" >${selectVideoMessage}</div>`);
  $videoCaptionDiv.appendTo($tab1);

  var $videoChooserContent = $('<div class="videoChooserContent chooserContent" ></div>');
  $videoChooserContent.appendTo($tab1);

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

  $(document).on('mouseover', '.videoThumb', function () {
    $(".videoCaption").html($(this).attr('videoname'))
  });

  $(document).on('mouseleave', '#videoThumbs', function () {
    $(".videoCaption").html(selectVideoMessage)
  });

  $(document).on('click', '.videoThumb', function () {
    player.loadVideoById($(this).attr('videoid'));
    startFocusVideo();
  });

  $(document).on('change', '.videoSelect', function () {
    player.loadVideoById($(this).val());
    startFocusVideo();
  });


  var $videoControls = $('<div class="videoControls" ></div>');
  $videoControls.appendTo($tab1);

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
    player.stopVideo();
    $('.video-container').addClass('hidden-container');
  }

  function pauseFocusVideo() {
    $('.youtubePauseButtonImage').hide();
    $('.youtubePlayButtonImage').show();
    player.pauseVideo();
  }

  function startFocusVideo() {
    $('.youtubePlayButtonImage').hide();
    $('.youtubePauseButtonImage').show();
    player.setVolume($('.videoVolume').val());
    player.playVideo();
    $('.video-container').removeClass('hidden-container');
  }

  var $videoVolumeInput = $('<input type="range" value="10" class="videoVolume" />');
  $videoVolumeInput.appendTo($videoControls);
  $(document).on('change', '.videoVolume', function () {
    player.setVolume($(this).val());
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

      $this[0].value = '';
      return files[0].name.split('.')[0];
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
      $('.therapistImage').css('background-image', jsonObject.people.find(p => p.role == 'therapist').data);
      $('.person1Image').css('background-image', jsonObject.people.find(p => p.role == 'person1').data);
      $('.person2Image').css('background-image', jsonObject.people.find(p => p.role == 'person2').data);
      $('.person3Image').css('background-image', jsonObject.people.find(p => p.role == 'person3').data);
      $('.person4Image').css('background-image', jsonObject.people.find(p => p.role == 'person4').data);
      $('.imageInnerDiv').css('background-image', jsonObject.imageData);
      if (jsonObject.ImageCaption) $(".captionText").html(jsonObject.ImageCaption);
      if (jsonObject.qrngInterval) changeQrngInterval(jsonObject.qrngInterval)


      player.loadVideoById(jsonObject.videoId);
      startFocusVideo();
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

  var $person1Image = $(`<div role="${people[1].role}" class="personImage person1Image" ></div>`);
  $person1Image.appendTo(header);

  var $person1Image = $(`<div role="${people[2].role}" class="personImage person2Image" ></div>`);
  $person1Image.appendTo(header);

  var $person1Image = $(`<div role="${people[3].role}" class="personImage person3Image" ></div>`);
  $person1Image.appendTo(header);

  var $person1Image = $(`<div role="${people[4].role}" class="personImage person4Image" ></div>`);
  $person1Image.appendTo(header);

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
    if (!isSoundModulation) player.unMute();
  });

  /**********************
        SAVE SESSION 
  ***********************/

  var $focusTextSave = $(`<div class="focusTextSave" ></div>`);
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
    var videoID = player.getVideoData()['video_id'];
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
        { role: 'person4', data: $('.person4Image').css('background-image') }
      ],
      qrngInterval: currentDisplayInterval
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

  // Start file download.

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
      $energeticQuantity = $(starSelector)
      var $energeticSections = $('<div class="Sections" ></div>');
      $energeticSections.appendTo($energeticQuantity);

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

      })
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

});