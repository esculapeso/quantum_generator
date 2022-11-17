jQuery(document).ready(function ($) {


  let fetcheddata_1 = new Array(1);
  let isfetched = 0;
  let currentNumber = -1;
  let delayIndex = -3
  let numArray = '0000000000000000'

  var emotionsList = [
    { name: "Happy", value: 4 },
    { name: "Joyful", value: 3 },
    { name: "Proud", value: 4 },
    { name: "Satisfied", value: 1 },
    { name: "Sad", value: 0 },
    { name: "Angry", value: 0 },
    { name: "Anxious", value: 0 },
    { name: "Worried", value: 2 },
  ]

  function getOneHex(index) {
    for (let i = 0; i < 1; i++) {
      jQuery.get("https://qrng.anu.edu.au/API/jsonI.php?length=1024&type=uint8", data => {
        fetcheddata_1[i] = fetcheddata_1[i] + data.data.join('');
        isfetched = isfetched + 1;
      });
    }
  };

  function timedCount() {
    getOneHex();
    t = setTimeout(function () { timedCount(); }, 10240);
  };

  function printHex(element, dir, index) {
    let ret;

    for (let i = 0; i < 1; i++) {
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


      createBackgroundGradient(dataHereBottom, dataHereRight, dataHereTop, dataHereLeft);

    }
    t = setTimeout(function () { timedPrint(index); }, 80);
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

  var initFocusText = "Focus";
  var $focusText = $(`<div class="focusText generatorText" >${initFocusText}</div>`);
  $focusText.appendTo(header);

  var initCaptionText = "Gold";
  var $captionText = $(`<div class="captionText generatorText" >${initCaptionText}</div>`);
  $captionText.appendTo(header);

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

  var youtubePlayButton = "https://esculap.org/wp-content/uploads/2022/11/playVideo.png"
  var $youtubePlayButtonImage = $(`<img src="${youtubePlayButton}" class="youtubePlayButtonImage" />`);
  $youtubePlayButtonImage.appendTo($videoControlsDiv);

  $(document).on('click', '.youtubePlayButtonImage', function () {
    player.setVolume($('.videoVolume').val());
    player.playVideo();
  });

  var youtubeRemoveButton = "https://esculap.org/wp-content/uploads/2022/11/removeVideo.png"
  var $youtubeRemoveButtonImage = $(`<img src="${youtubeRemoveButton}" class="youtubeRemoveButtonImage" />`);
  //$youtubeRemoveButtonImage.appendTo($videoControlsDiv);

  $(document).on('click', '.youtubeRemoveButtonImage', function () {
    player.stopVideo();
  });

  var $videoVolumeInput = $('<input type="range" value="10" class="videoVolume" />');
  $videoVolumeInput.appendTo($videoControlsDiv);
  $(document).on('change', '.videoVolume', function () {
    player.setVolume($(this).val());
  });



  var selectVideoMessage = "~~ Choose white noise video ~~"
  var $videoCaptionDiv = $(`<div class="videoCaption" >${selectVideoMessage}</div>`);
  $videoCaptionDiv.appendTo($videoChooserSection);
  var $videoThumbsDiv = $('<div id="videoThumbs" ></div>');
  $videoThumbsDiv.appendTo($videoChooserSection);

  var $videoSelect = $('<select class="videoSelect" ></select>');
  $videoSelect.appendTo($videoChooserSection);

  var videos = getBackgroundVideos();

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
    player.setVolume($('.videoVolume').val());
    player.loadVideoById($(this).attr('videoid'));
  });

  $(document).on('change', '.videoSelect', function () {
    player.setVolume($('.videoVolume').val());
    player.loadVideoById($(this).val());
  });

  var selectImageMessage = "~~ Choose focus image ~~"
  var $imageCaptionDiv = $(`<div class="imageCaption" >${selectImageMessage}</div>`);
  $imageCaptionDiv.appendTo($videoChooserSection);

  var $focusTextTextBox = $(`<input class="focusTextTextBox" type="text" value="${initFocusText}" />`);
  $focusTextTextBox.appendTo($videoChooserSection);

  $(document).on('input', '.focusTextTextBox', function () {
    $(".focusText").html($(this).val());
  });

  var $removeImage = $('<input class="removeImageButton imageButton button" type="button" value="Remove Image" />');
  $removeImage.appendTo($videoChooserSection);
  $(document).on('click', '.removeImageButton', function () {
    $(".imageInnerDiv").css('background-image', '');
  });

  var $uploadImageHiddenButton = $('<input class="uploadImageHiddenButton" type="file" style="display: none;" />');
  $uploadImageHiddenButton.appendTo($videoChooserSection);
  var $uploadImageButton = $('<input class="uploadImageButton imageButton button" type="button" value="Upload Image" />');
  $uploadImageButton.appendTo($videoChooserSection);

  $(document).on('click', '.uploadImageButton', function () {
    $(".uploadImageHiddenButton").click();
  });

  var focusImages = [
    { caption: 'Scalability\nHolopedia', filepath: 'https://esculap.org/wp-content/uploads/2022/10/sextupole.jpg' },
    { caption: 'Esculap\nDARQ', filepath: 'https://esculap.org/wp-content/uploads/2022/10/Esculap_Grail_3d-1.png' },
  ]

  $(focusImages).each(function (k, fi) {
    var $imageDiv = $('<div class="uploadImageExample" src="" ></div>');
    $imageDiv.appendTo($videoChooserSection);

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
    var files = $(this).prop('files');
    if (files && files[0]) { // got sth

      // Clear image container
      $(".imageInnerDiv").removeAttr('src');

      $.each(files, function (index, ff) // loop each image 
      {
        var reader = new FileReader();
        // Put image in created image tags
        reader.onload = function (e) {
          $(".imageInnerDiv").css('background-image', `url("${e.target.result}")`);
        }
        reader.readAsDataURL(ff);
      });

      var fileName = files[0].name.split('.')[0];

      $(".captionText").html(fileName);

    }
  });

  var $focusTextSave = $(`<div class="focusTextSave" ></div>`);
  $focusTextSave.appendTo($videoChooserSection);

  var $focusTextSaveButton = $('<input class="focusTextSaveButton button"  type="button" value="Save Session"  />');
  $focusTextSaveButton.appendTo($focusTextSave);

  $(document).on('click', '.focusTextSaveButton', function () {
    saveSession();
  });


  initializeEmotionsQuantity();

  timedCount();
  timedPrint(32);

  function saveSession() {
    event.preventDefault();

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var dateNow = new Date(Date.now());
    var sessionTime = dateNow.toUTCString();
    var focusText = $(".focusTextTextBox").val();
    var videoID = player.getVideoData()['video_id'];
    var videoName = getVideobyVideoId(videoID)[0].name;
    var focusImage = $(".captionText").html().replace('\n', ' ');

    var emotionsText = "\n\nEmotions Quantity\n\n";
    $(emotionsList).each((i, e) => {
      emotionsText += `${e.name}: ${e.value}\n`;
    })

    var sessionContent = `Session time: ${sessionTime}\nFocus Text: ${focusText}\nVideo Name: ${videoName}\nVideo Id: ${videoID}\nFocus Image: ${focusImage}${emotionsText}`;

    fileName = `${year}_${month}_${day}_${focusText}`;

    // window.location.href="data:application/octet-stream;base64,"+Base64.encode(txtData);
    var blob = new Blob([sessionContent],
      { type: "text/plain;charset=utf-8" });
    saveAs(blob, `${fileName}.txt`);
  }

  function getBackgroundVideos() {
    return [
      { id: "6f0y1Iaorug", name: "Waves 1" },
      { id: "LTmXmskEMas", name: "Waves 2" },
      { id: "5Lzi4T6mu0U", name: "Meditation" },
      { id: "fiSowadSS-E", name: "Tropical Beach" },
      { id: "uWfwDnroMEA", name: "Relax Fire" },
      { id: "mRlat5h_GTM", name: "Chills from Fireplace" },
      { id: "WHPEKLQID4U", name: "Soothing Waves" },
      { id: "YIElwQiqMQ4", name: "Calming Ocean" },
      { id: "WmYgr8zwJmI", name: "Jungle River" },
      { id: "jkLRith2wcc", name: "Water Sounds" },
      { id: "R4QvFu9tn98", name: "SUN Wave" },
      { id: "bz9YoyEXC38", name: "Solar Flare" },
    ];
  }

  function getVideobyVideoId(videoId) {
    console.log(getBackgroundVideos())
    console.log(getBackgroundVideos().filter(v => v.id == videoId))
    return getBackgroundVideos().filter(v => v.id == videoId)
  }

  function createBackgroundGradient(div1, div2, div3, div4) {
    var coralPalette = [166, 76, 49, 240, 128, 128];
    var darkGreenPalette = [20, 28, 4, 20, 28, 4];

    var palette = darkGreenPalette;
    var lowerLeftNumber = $(div1).find('div').html();

    var leftNum = lowerLeftNumber.substring(0, 48)
    var i = leftNum.length;
    var lsum = 0
    while (i--) {
      lsum += parseInt(leftNum.charAt(i));
    }

    var lowerRightNumber = $(div2).find('div').html()
    var rightNum = lowerRightNumber.substring(0, 48)
    var i = rightNum.length;
    var rsum = 0
    while (i--) {
      rsum += parseInt(rightNum.charAt(i));
    }

    var rightNumber = $(div3).find('div').html()
    var rNum = rightNumber.substring(0, 48)
    var i = rNum.length;
    var csum = 0
    while (i--) {
      csum += parseInt(rNum.charAt(i));
    }

    var gradient;
    if ($(div4).find('div').html().length > 48) {
      var lr = palette[0] + parseInt(lowerLeftNumber.substring(0, 16)) % 8 - 4;
      var lg = palette[1] + parseInt(lowerLeftNumber.substring(16, 32)) % 16 - 8;
      var lb = palette[2] + parseInt(lowerLeftNumber.substring(32, 48)) % 16 - 8;
      var la = lsum / 300;

      // console.log({slr: lr - palette[0], lg, lb, la})
      // console.log({lr, lg, lb, la})

      var rr = palette[3] + parseInt(lowerRightNumber.substring(0, 16)) % 8 - 4;
      var rg = palette[4] + parseInt(lowerRightNumber.substring(16, 32)) % 16 - 8;
      var rb = palette[5] + parseInt(lowerRightNumber.substring(32, 48)) % 16 - 8;
      var ra = rsum / 300;

      var cr = palette[3] + parseInt(rightNumber.substring(0, 16)) % 8 - 4;
      var cg = palette[4] + parseInt(rightNumber.substring(16, 32)) % 16 - 8;
      var cb = palette[5] + parseInt(rightNumber.substring(32, 48)) % 16 - 8;
      var ca = csum / 300;

      var col1 = `rgba(${lr},${lg},${lb},${la})`;
      var col2 = `rgba(${rr},${rg},${rb},${ra})`;
      var col3 = `rgba(${cr},${cg},${cb},${ca})`;

      // parametry: color, jasność, przezroczystość, obwiednia, promień, kąt
      gradient = `linear-gradient(90deg, rgba(${lr},${lg},${lb},${la}) 0%, rgba(${rr},${rg},${rb},${ra}) 100%)`;
      gradient = `conic-gradient(${col1}, ${col2}, ${col3}, ${col1}, ${col2}, ${col3}, ${col1}), 
					conic-gradient(from 45deg, ${col1}, ${col2}, ${col3}, ${col1}, ${col2}, ${col3}, ${col1})`
      $('.page-content').css('background', gradient);
    }
  }

  function initializeEmotionsQuantity() {
    $emotionalQuantity = $('.emotionalQuantity')

    var $emotionSections = $('<div class="emotionSections" ></div>');
    $emotionSections.appendTo($emotionalQuantity);

    $(emotionsList).each((i, e) => {
      var $emotion = $('<div class="emotion"></div>');
      $emotion.appendTo($emotionSections);

      var $emotionName = $(`<div class="emotionName">${e.name}</div>`);
      $emotionName.appendTo($emotion);

      var $emotionQuantityBar = $(`<div class="emotionQuantityBar"></div>`);
      $emotionQuantityBar.appendTo($emotion);

      var $emotionQuantityBarFill = $(`<div class="emotionQuantityBarFill"></div>`);
      $emotionQuantityBarFill.appendTo($emotionQuantityBar);

      var $emotionQuantity = $(`<input class="emotionQuantity" type="number" emotion="${e.name}" value="${e.value}" min="0" max="10" />`);
      $emotionQuantity.appendTo($emotion);

    })

    $(document).on('change', '.emotionQuantity', function () {
      var selectedindex = emotionsList.findIndex((e) => e.name == $(this).attr('emotion'))
      emotionsList[selectedindex].value = $(this).val();
      drawStar(150, 150, 80, 50);
    });

    drawStar(150, 150, 80, 50);
  }

  function drawStar(cx, cy, outerRadius, innerRadius) {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.textAlign = 'center';
    ctx.fillStyle = "pink";

    $('.emotionQuantityBarFill').each((i, bar) => {
      $(bar).css('width', `${emotionsList[i].value * 10}%`)
    })

    var selectedEmotions = $(emotionsList).filter((i, e) => e.value > 0)
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