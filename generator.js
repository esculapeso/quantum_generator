  jQuery(document).ready(function ($) {


    let fetcheddata_1 = new Array(1);
    let isfetched = 0;
    let currentNumber = -1;
    let delayIndex = -3
    let numArray = '0000000000000000'
    const categories = ["esculap", "omreiki", "jezu", "huia"]
    const focusTexts = ["Gold", "Autogenic Om Reiki Training", "Jesus I trust in You", "Orgy"]
    const websiteIndex = 1;
    const category = categories[websiteIndex];
    const focusText = focusTexts[websiteIndex];

    console.log({category})

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

    if (category == categories[websiteIndex]) {
      emotionsList = [
        { name: "Happy", value: 4 },
        { name: "Joyful", value: 3 },
        { name: "Proud", value: 4 },
        { name: "Satisfied", value: 1 },
      ]
    }

    var energiesList = [
      { name: "Energy", value: 4 },
      { name: "Power", value: 3 },
      { name: "Strength", value: 4 },
      { name: "Willpower", value: 1 },
    ]

    var healthList = [
      { name: "Heart", value: 4, link: "https://en.wikipedia.org/wiki/Heart" },
      { name: "Lungs", value: 3, link: "https://en.wikipedia.org/wiki/Lungs" },
      { name: "Vagus", value: 4, link: "https://en.wikipedia.org/wiki/Vagus" },
      { name: "Liver", value: 1, link: "https://en.wikipedia.org/wiki/Liver" },
      { name: "Intestine", value: 1, link: "https://en.wikipedia.org/wiki/Gastrointestinal_tract" },
      { name: "Lymph", value: 1, link: "https://en.wikipedia.org/wiki/Lymph" },
      { name: "Blood", value: 1, link: "https://en.wikipedia.org/wiki/Blood" },
      { name: "Memory", value: 1, link: "https://en.wikipedia.org/wiki/Memory" },
      { name: "Neurons", value: 1, link: "https://en.wikipedia.org/wiki/Neuron" },
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

    var $videoChooserSection = $('<div class="videoChooserSection" ></div>');
    $videoChooserSection.appendTo(header);

    var tabs = [
      { name: 'Video', id: 'videoOptionsContent' },
      { name: 'Focus Text', id: 'focusOptionsContent' },
      { name: 'Image', id: 'imageOptionsContent' },
      { name: 'People', id: 'peopleOptionsContent' },
    ]

    $("#tabs").tabs().appendTo($videoChooserSection);

    var $imageDiv = $('<div class="uploadImageHolder" ></div>');
    $imageDiv.appendTo(header);

    var initFocusText = "Focus";
    var $focusText = $(`<div class="focusText generatorText" >${initFocusText}</div>`);
    $focusText.appendTo(header);

    var initCaptionText = focusText;
    var $captionText = $(`<div class="captionText generatorText" >${initCaptionText}</div>`);
    $captionText.appendTo(header);

    var $imageInnerDiv = $('<div class="imageInnerDiv" ></div>');
    $imageInnerDiv.appendTo($imageDiv);



    /**********************
            VIDEO 
    ***********************/

    var $videoContainerDiv = $('<div class="video-container" ></div>');
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


    var $videoControls = $('<div class="videoControls" ></div>');
    $videoControls.appendTo($tab1);

    var youtubePlayButton = "https://esculap.org/wp-content/uploads/2022/11/playVideo.png"
    var $youtubePlayButtonImage = $(`<img src="${youtubePlayButton}" class="youtubePlayButtonImage" />`);
    $youtubePlayButtonImage.appendTo($videoControls);

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

    var $removeImage = $('<input class="removeImageButton imageButton button" type="button" value="Hide" />');
    $removeImage.appendTo($imageButtons);
    $(document).on('click', '.removeImageButton', function () {
      $(".imageInnerDiv").css('background-image', '');
    });

    var $uploadImageHiddenButton = $('<input class="uploadImageHiddenButton" type="file" style="display: none;" />');
    $uploadImageHiddenButton.appendTo($imageButtons);

    var $uploadImageButton = $('<input class="uploadImageButton imageButton button" type="button" value="Upload" />');
    $uploadImageButton.appendTo($imageButtons);

    $(document).on('click', '.uploadImageButton', function () {
      $(".uploadImageHiddenButton").click();
    });

    var focusImages = getFocusImages();

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
          var reader = new FileReader();
          // Put image in created image tags
          reader.onload = function (e) {
            $(targetImageSelector).css('background-image', `url("${e.target.result}")`);
          }
          reader.readAsDataURL(ff);
        });

        return files[0].name.split('.')[0];
      }
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


    var $thrapistImage = $('<div class="personImage therapistImage bottom" ></div>');
    $thrapistImage.appendTo(header);

    var $thrapistImage = $('<div class="personImage therapistImage right" ></div>');
    $thrapistImage.appendTo(header);

    var $thrapistImage = $('<div class="personImage therapistImage top" ></div>');
    $thrapistImage.appendTo(header);

    var $thrapistImage = $('<div class="personImage therapistImage left" ></div>');
    $thrapistImage.appendTo(header);

    var $person1Image = $('<div class="personImage person1Image" ></div>');
    $person1Image.appendTo(header);

    var $person1Image = $('<div class="personImage person2Image" ></div>');
    $person1Image.appendTo(header);

    var $person1Image = $('<div class="personImage person3Image" ></div>');
    $person1Image.appendTo(header);

    var $person1Image = $('<div class="personImage person4Image" ></div>');
    $person1Image.appendTo(header);

    $(document).on('click', '.personUploadButton', function () {
      var role = $(this).attr('role');
      $(`.${role} .personHiddenUploadButton`).click();
    });

    $(document).on('change', '.personHiddenUploadButton', function () {
      var target = $(this).attr('target');
      var targetSelector = `.${target}Image, .${target}Thumb`;
      uploadImage(targetSelector, $(this));
    });

    /**********************
          SAVE SESSION 
    ***********************/

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

    function getFocusImages() {
      switch (category) {
        case 'esculap':
          return [
            { caption: 'Scalability\nHolopedia', filepath: 'https://esculap.org/wp-content/uploads/2022/10/sextupole.jpg' },
            { caption: 'Esculap\nDARQ', filepath: 'https://esculap.org/wp-content/uploads/2022/10/Esculap_Grail_3d-1.png' },
          ];
        case 'omreiki':
          return [
            { caption: 'Cho Ku Rei', filepath: 'https://omreiki.uk/wp-content/uploads/2022/07/chokurei.gif' },
            { caption: 'Sei He Ki', filepath: 'https://omreiki.uk/wp-content/uploads/2022/07/seiheki.gif' },
          ];
        case 'jezu':
          return [
            { caption: "", filepath: "" },
          ];
        case 'huia':
          return [
            { caption: "", filepath: "" },
          ];
      }
    }

    function getBackgroundVideos() {
      switch (category) {
        case 'esculap':
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
        case 'omreiki':
          return [
            { id: "-CeafZpw_kw", name: "Om Reiki Mandalas" },
            { id: "t0BdKM1dkos", name: "Mireille Healy" },
            { id: "-PSo-c2oByo", name: "Sun Quan" },
            { id: "eKFTSSKCzWA", name: "Nature" },
            { id: "3co7V1xdthA", name: "Quantum Holopedia" },
            { id: "4XT5PsazYcM", name: "House build" },
            //       { id: "xPbPtwL9V30", name: "Lungs" },
          ];
        case 'jezu':
          return [
            { id: "0alWwLqDKBg", name: "Angelina" },
          ];
        case 'huia':
          return [
            { id: "r3WxYr6NA18", name: "Michelli" },
            { id: "KWxDoYgzWpg", name: "Sisisi" },
          ];
      }
    }

    function getVideobyVideoId(videoId) {
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
          if (e.link) $emotionName = $(`<div class="emotionName"><a href=${e.link} target="_blank">${e.name}</a></div>`);
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