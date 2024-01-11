jQuery(document).ready(function ($) {

  let fetcheddata_dec = [];
  let fetcheddata_hex = [];
  let isfetched = 0;
  let sessionObj = {}
  let isVideoPlaying = false;

  let pageType = $(".quadrupolePanel").attr('page');

  var qrngOrigDisplayInterval = 60000;
  var qrngLength;
  var qrngFetchInterval;
  var currentDisplayInterval = 938;
  var upcomingDisplayInterval = 938;

  var isMobile = doOnOrientationChange() || false;
  var videos = (typeof videosForFocus !== 'undefined' && videosForFocus) ? videosForFocus : null;;
  var psalmVideoVar = (typeof psalmVideo !== 'undefined' && psalmVideo) ? psalmVideo : null;
  var view360VideoVar = (typeof view360Video !== 'undefined' && view360Video) ? view360Video : null;
  var focusImages = (typeof imagesForFocus !== 'undefined' && imagesForFocus) ? imagesForFocus : null;
  var roundViewImagesVar = (typeof roundViewImages !== 'undefined' && roundViewImages) ? roundViewImages : null;
  var randomBackgroundMiddleVar = (typeof randomBackgroundMiddle !== 'undefined' && randomBackgroundMiddle) ? randomBackgroundMiddle : null;
  var focusTextsVar = (typeof focusText !== 'undefined' && focusText) ? focusText : "";
  var sideTextsVar = (typeof customSideText !== 'undefined' && customSideText) ? customSideText : "";
  var sideTextsOptionsVar = (typeof sideTextsOptions !== 'undefined' && sideTextsOptions) ? sideTextsOptions : [];
  var jesusMantrasVar = (typeof jesusMantras !== 'undefined' && jesusMantras) ? jesusMantras : [];
  var defaultSessionVar = (typeof defaultSession !== 'undefined' && defaultSession) ? defaultSession : [];
  var liveTransmissionsVar = (typeof liveTransmissions !== 'undefined' && liveTransmissions) ? liveTransmissions : [];
  var emotionsListVar = (typeof emotionsList !== 'undefined' && emotionsList) ? emotionsList : [];
  var energiesListVar = (typeof energiesList !== 'undefined' && energiesList) ? energiesList : [];
  var healthListVar = (typeof healthList !== 'undefined' && healthList) ? healthList : [];


  function doOnOrientationChange() {
    switch(window.orientation) {
      case 90: return false;
      case -90: return false;
      case 0: return true;
      case 180: return true;
    }
}


  function setFetchIntervalAndLength(dispInterval) {
    qrngLength = Math.round(10000 / dispInterval);
    // qrngFetchInterval = qrngLength * dispInterval;
    qrngFetchInterval = qrngOrigDisplayInterval;
  }

  setFetchIntervalAndLength(currentDisplayInterval)

  function getOneHex(index) {


    // jQuery.get(`https://qrng.anu.edu.au/API/jsonI.php?length=${qrngLength}&type=uint8`, data => {
    jQuery.get(`https://beacon.nist.gov/beacon/2.0/pulse/last`, data => {
      var resultHex = data.pulse.outputValue.match(/.{1,2}/g) ?? [];
      var resultDec = resultHex.map(function (x) {
        return parseInt(x, 16);
      });

      fetcheddata_dec = fetcheddata_dec.concat(resultDec);
      fetcheddata_hex = fetcheddata_hex.concat(resultHex);
      isfetched = isfetched + 1;
    });
  };

  function timedCount() {
    toggleQrngLoadCircle(false);
    $('.qrngIntervalText').removeClass('disabled')
    currentDisplayInterval = upcomingDisplayInterval;
    setFetchIntervalAndLength(currentDisplayInterval)

    getOneHex();
    t = setTimeout(function () { timedCount(); }, qrngFetchInterval);
  };

  function printHex(element, dir, index) {
    for (let i = 0; i < 1; i++) {
      let decToInsert = fetcheddata_dec[index] ?? '';
      let hexToInsert = fetcheddata_hex[index] ?? '';
      printModHex(element, dir, decToInsert, hexToInsert)
    }
  };

  function printModHex(element, dir, currentDec, currentHex) {
    if (element) {
      element.find('div.dec').prepend(currentDec);
      element.find('div.hex').prepend(currentHex);
    }
  };

  function appendDataHolder(container, id, className) {
    if (container.length) {
      var $dataDiv = $(`<div id="${id}" class="${className}" ></div>`);
      $dataDiv.appendTo(container);

      var $data = $(`<div class="dec" style="display:none;"></div><div class="hex"></div>`);
      $data.appendTo($dataDiv);
    }
  };


  function timedPrint(index) {
    if (isfetched > 0) {

      let dataDualTop = $('#dataDualTop');
      let dataDualBottom = $('#dataDualBottom');

      let dataMonopole = $('#dataMonopole');

      index = (index + 1);

      var colorDiv = $(`.colorValue[param=1]`);
      var qrngColorValue = fetcheddata_dec[index];

      if (isSoundModulation) {
        if (fetcheddata_dec[index] > 127) {
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


      var gradVerCenter;
      if (randomBackgroundMiddleVar) {
        gradVerCenter = randomBackgroundMiddleVar
      } else {
        // Calculate the middle of the gradient
        var genHeight = $('.quadGenerator').height();
        var genOffTop = $(".quadGenerator").offset() ? $(".quadGenerator").offset().top : 0;
        var graOffTop = $(".et_pb_fullwidth_section").offset() ? $(".et_pb_fullwidth_section").offset().top : 0;
        var gradCenter = genOffTop - graOffTop + genHeight / 2;

        gradVerCenter = `${gradCenter}px`;
      }

      // parametry: color, jasność, przezroczystość, obwiednia, promień, kąt
      gradient = `conic-gradient(from 0deg at 50% ${gradVerCenter}, ${col1}, ${col2}, ${col3}, ${col1}, ${col2}, ${col3}, ${col1})`
      //conic-gradient(from 45deg, ${col1}, ${col2}, ${col3}, ${col1}, ${col2}, ${col3}, ${col1})`
      $('.page-content').css('background', gradient);

      var genCount = typeof generatorsNumber != 'undefined' ? generatorsNumber : 4;
      for (var n = 0; n < genCount; ++n) {
        printHex($('#generator' + n), 'afterbegin', index);
      }

      printHex(dataDualTop, 'afterbegin', index);
      printHex(dataDualBottom, 'afterbegin', index - 1);

      printHex(dataMonopole, 'afterbegin', index);
    }

    t = setTimeout(function () { timedPrint(index); }, currentDisplayInterval);
    toggleHexDecNumbers();
    d = setTimeout(function () { toggleHexDecNumbers(); }, currentDisplayInterval / 2);
  };

  function toggleHexDecNumbers() {
    $('div.hex, div.dec').toggle();
  }

  let $quadrupolePanel = $('.quadrupolePanel');
  let header = $('.quadrupoleImage');

  var $roundView = $('<div class="roundView" ></div>');
  $roundView.appendTo(header);

  $('<div class="roundViewInner" ></div>').appendTo($roundView);

  $('<div class="quadGenerator" ></div>').appendTo(header);
  var $quadGenerator = $('.quadGenerator');

  var genCount = typeof generatorsNumber != 'undefined' ? generatorsNumber : 4;
  for (var n = 0; n < genCount; ++n) {
    appendDataHolder($quadGenerator, "generator" + n, "quadrupole")
  }

  let dual = $('.dualTeleportationImage');
  appendDataHolder(dual, "dataDualTop", "dipole")
  appendDataHolder(dual, "dataDualBottom", "dipole")

  let monopole = $('.monoTunnelImage');
  appendDataHolder(monopole, "dataMonopole", "monopole")



  var $imageDiv = $('<div class="uploadImageHolder clipped" ></div>');
  $imageDiv.appendTo($quadGenerator);

  var $focusControls = $('<div class="focusControls" ></div>');
  $focusControls.appendTo($imageDiv);


  var $focusChangers = $('<div class="focusChangers" ></div>');
  $focusChangers.appendTo($focusControls);

  var $subImageControls = $('<div class="subImageControls" ></div>');
  $subImageControls.appendTo($focusControls);

  var $previewSelector = $('<div class="previewSelector" ></div>');
  $previewSelector.appendTo($subImageControls);

  var $imageChooser = $('<div class="imageChooser" ></div>');
  $imageChooser.hide().appendTo($subImageControls);

  $('<div class="videoSelectsTitle" >Image:</div>').appendTo($imageChooser);

  var $removeImage = $(`<div class="removeImageButton button" >X</div>`);
  $removeImage.appendTo($imageChooser);

  var $uploadImageButton = $(`<div class="uploadImageButton button" >🡅</div>`);
  $uploadImageButton.appendTo($imageChooser);

  var $imageSelect = $('<select class="imageSelect" ></select>');
  $imageSelect.appendTo($imageChooser);

  $(`<option value="empty" >~ Select ~</option>`).appendTo($imageSelect);
  $(focusImages).each(function (k, fi) {

    var is3D = fi.filepath.includes('.glb');

    $(`<option value="${fi.filepath}" ${is3D ? 'is3d' : ''} >${fi.text}</option>`).appendTo($imageSelect);

  });

  $(document).on('change', '.imageSelect', function () {
    var imagePath = $(this).val();
    var caption = $(this).find('option:selected').text();
    var is3D = $(this).find('option:selected').is("[is3d]");

    clearImageFocus();

    if (is3D) {
      insert3dModel($('.imageInnerDiv'), imagePath)
    } else {
      $(".imageInnerDiv").css('background-image', `url("${imagePath})`);
    }
    updateCaptionText(caption);
  });



  var $focusAndSession = $('<div class="focusAndSession" ></div>');
  $focusAndSession.appendTo($focusChangers);

  var $focusChooser = $('<div class="focusChooser" ></div>');
  $focusChooser.appendTo($focusAndSession);

  var $focusTextChooser = $('<div class="focusTextChooser" ></div>');
  $focusTextChooser.appendTo($focusChooser);

  $('<div class="videoSelectsTitle" >Focus:</div>').appendTo($focusTextChooser);
  $('<input type="text" class="focusTextTextBox" />').appendTo($focusTextChooser);

  var $captionTextChooser = $('<div class="captionTextChooser" ></div>');
  $captionTextChooser.appendTo($focusChooser);

  $('<div class="videoSelectsTitle" >Caption:</div>').appendTo($captionTextChooser);
  $('<input type="text" class="captionTextTextBox" />').appendTo($captionTextChooser);

  $(document).on('input', '.captionTextTextBox', function () {
    $(".captionText").html($(this).val());
  });

  var $sessionButtons = $('<div class="sessionButtons" ></div>');
  $sessionButtons.appendTo($focusAndSession);

  $('<input class="focusTextSaveButton button" type="button" value="Save"  />').appendTo($sessionButtons);
  $('<input class="focusTextLoadButton button" type="button" value="Load"  />').appendTo($sessionButtons);



  var $videoControlsAndFocus = $('<div class="videoControlsAndFocus" ></div>');
  $videoControlsAndFocus.appendTo($focusChangers);

  $('<div class="videoSelectsTitle" >Controls:</div>').appendTo($videoControlsAndFocus);

  var $videoControls = $('<div class="videoControls" ></div>');
  $videoControls.appendTo($videoControlsAndFocus);

  var $youtubeRemoveButtonImage = $(`<img src="https://esculap.org/wp-content/uploads/2022/11/removeVideo.png" class="youtubeRemoveButtonImage redButton" />`);
  $youtubeRemoveButtonImage.appendTo($videoControls);

  var $youtubePlayButtonImage = $(`<img src="https://esculap.org/wp-content/uploads/2022/11/pauseVideo.png" class="youtubePauseButtonImage redButton" style="display:none;" />`);
  $youtubePlayButtonImage.appendTo($videoControls);

  var $youtubePlayButtonImage = $(`<img src="https://esculap.org/wp-content/uploads/2022/11/playVideo.png" class="youtubePlayButtonImage redButton" />`);
  $youtubePlayButtonImage.appendTo($videoControls);

  var $videoVolumeInput = $('<input type="range" value="10" class="videoVolume" />');
  $videoVolumeInput.appendTo($videoControls);



  var $videoSelects = $('<div class="videoSelects" ></div>');
  $videoSelects.appendTo($subImageControls);

  var $videoSubcategorySelect = $('<select class="videoSubcategorySelect" ></select>').hide();
  $videoSubcategorySelect.appendTo($videoSelects);

  $('<div class="videoSelectsTitle" >Video:</div>').appendTo($videoSelects);

  var $videoCategorySelect = $('<select class="videoCategorySelect" ></select>');
  $videoCategorySelect.appendTo($videoSelects);

  $(`<option value="empty">~ Select ~</option>`).appendTo($videoCategorySelect);
  $(`<option value="meditation">Meditation</option>`).appendTo($videoCategorySelect);
  if (psalmVideoVar) $(`<option value="psalms">Psalms</option>`).appendTo($videoCategorySelect);
  if (view360VideoVar) $(`<option value="view360">360 view</option>`).appendTo($videoCategorySelect);


  $(document).on('click', '.psalmLang', function () {
    selectedPsalmsLang = $(this).attr('lang');

    $('.psalmLang').removeClass('selected');
    $(this).addClass('selected');

    let set = psalmVideoVar.find(e => e.lang == selectedPsalmsLang)

    $psalmList.empty();
    $(set.psalms).each((i, p) => {
      var number = p.name.replace('Psalm ', '')
      var $psalm = $(`<div class="psalm" number="${number}" lang="${selectedPsalmsLang}">${number}</div>`);
      $psalm.appendTo($psalmList);
      addTooltip(p, set, $psalm);
    })
  });



  var $videoSelectInFocus = $('<select class="videoSelect" ></select>');
  $videoSelectInFocus.appendTo($videoSelects);

  var languages = [
    { lang: 'en', name: 'British' },
    { lang: 'de', name: 'German' },
    { lang: 'pl', name: 'Polish' },
  ]


  var gerders = [
    { gender: 'f', name: 'Female' },
    { gender: 'm', name: 'Male' },
  ]


  $(document).on('change', '.videoCategorySelect', function () {
    $videoSelectInFocus.empty()
    $videoSubcategorySelect.empty().hide();

    switch ($(this).val()) {

      case 'meditation':
        $(`<option value="empty">~ Select ~</option>`).appendTo($videoSelectInFocus);
        $(videos).each(function (k, v) {
          var $videoOption = $(`<option value="${v.id}">${v.name}</option>`);
          $videoOption.appendTo($videoSelectInFocus);
        });
        break;

      case 'psalms':
        $videoSubcategorySelect.show();
        $(`<option value="empty">~ Select ~</option>`).appendTo($videoSubcategorySelect);
        $(psalmVideoVar).each((i, set) => {
          var langSplit = set.lang.split('_')
          var lang = langSplit[0]
          var langName = languages.find(l => l.lang == lang).name;
          var speaker = (langSplit.length > 1) ? gerders.find(g => g.gender == langSplit[1]).name : '';
          var $langOption = $(`<option value="${set.lang}">${langName} ${speaker}</option>`);
          $langOption.appendTo($videoSubcategorySelect);
        });
        break;

      case 'view360':
        $(`<option value="empty">~ Select ~</option>`).appendTo($videoSelectInFocus);
        $(view360VideoVar).each(function (k, v) {
          var $videoOption = $(`<option isView="isView" value="${v.url}">${v.name}</option>`);
          $videoOption.appendTo($videoSelectInFocus);
        });
        break;

      default:
        break;
    }
  });


  $(document).on('change', '.videoSubcategorySelect', function () {
    $focusVideoSelect = $('.focusControls .videoSelect');
    $focusVideoSelect.empty()
    let lang = $(this).val();
    let set = psalmVideoVar.find(e => e.lang == lang)

    $(`<option value="empty">~Sel~</option>`).appendTo($focusVideoSelect);
    $(set.psalms).each((i, p) => {
      var number = p.name.replace('Psalm ', '')
      $(`<option value="${p.youtube}">${number}</option>`).appendTo($focusVideoSelect);
    })
  });


  var $imageInnerBgDiv = $('<div class="imageInnerBgDiv" ></div>');
  $imageInnerBgDiv.appendTo($imageDiv);
  var $imageInnerDiv = $('<div class="imageInnerDiv fullView" ></div>');
  $imageInnerDiv.appendTo($imageInnerBgDiv);

  var $view360InnerDiv = $('<div class="view360InnerDiv" ></div>');
  $view360InnerDiv.appendTo($imageDiv);


  $(document).on('mouseenter', '.uploadImageHolder', function () {
    if (playersReady || true) {
      // $('.focusControls').show();
    }
  });

  $(document).on('mouseleave', '.uploadImageHolder', function () {
    $('.focusControls').hide();
  });

  var $liveSection = $('<div class="liveSection" ></div>').hide();
  $liveSection.appendTo($quadrupolePanel);



  $(`<div class="hideLivePanel">
        <input class="hideLiveButton button" type="button" value="Live"  />
      </div>`).appendTo($liveSection);

  $(document).on('click', '.hideLiveButton', function () {
    $('#lives').toggle();
  });


  $("#lives").tabs().appendTo($liveSection);

  var coinsData = [];

  var transmissions = liveTransmissionsVar.filter((s) => s.page == pageType)
  $.each(transmissions, (i, transmission) => {
    var $liveTab = $(`#lives-${i + 1}`);
    $(`a[href='#lives-${i + 1}']`).html(transmission.name);
    if (transmission.type == "embedLink") $(`<div class="aspect-ratio"><iframe src="${transmission.url}"></iframe></div>`).appendTo($liveTab);
    if (transmission.type == "imageFetch") {
      $imagesFetched = $(`<div class="imagesFetched"></div>`);
      $imagesFetched.appendTo($liveTab);
      updateFetchedImages($imagesFetched, transmission.url)
    };
    if (transmission.type == "coin") {
      coinsData = fetchImageUrls(transmission.url);

      $imagesFetched = $(`<div class="imagesFetched"></div>`);
      $imagesFetched.appendTo($liveTab);
      updateFetchedImages($imagesFetched, transmission.url);
      generateCoin($liveTab);
      updateCoin(coinsData);
    };

    function generateCoin(container) {
      $mainCoin = $(`<div class="coincontainer coin2" style="height: 230px;"></div>`).appendTo(container);
      $tridiv = $(`<div id="tridiv"></div>`).appendTo($mainCoin);
      $scene = $(`<div class="scene"></div>`).appendTo($tridiv);
      $shape = $(`<div class="shape cylinder-2 cyl-2"></div>`).appendTo($scene);

      $(`<div class="face bm" style="background-image: url('');"><div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.1);"></div></div>`).appendTo($shape);
      $(`<div class="face tp" style="background-image: url('');"><div class="photon-shader obverse"></div></div>`).appendTo($shape);
      $.each([0.1, 0.125, 0.16, 0.21, 0.267, 0.325, 0.38, 0.43, 0.475, 0.498, 0.498, 0.475, 0.44, 0.39, 0.333, 0.275, 0.22, 0.17, 0.125, 0.1], (i, alpha) => {
        $(`<div class="face side s${i}"><div class="photon-shader" style="background-color: rgba(0, 0, 0, ${alpha});"></div></div>`).appendTo($shape);
      });
    }

    function updateCoin(list) {
      let revItem = list[getRandomArrayIndex(list)];
      let obvItem = list[getRandomArrayIndex(list)];
      console.log({revItem, obvItem});
      if (revItem && obvItem) {
        getTokenData(revItem.id, '.bm');
        getTokenData(obvItem.id, '.tp');
      }
    }

    function getRandomArrayIndex(array) {
      var numb = Math.floor(Math.random() * array.length);
      console.log({numb});
      return numb;
    }

    function getTokenData(coinId, faceSelector) {
      console.log({coinId, faceSelector});
      fetchImageUrls(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`).then(coinData => {
        let imageUrl = coinData.image.large;
        $(`.face${faceSelector}`).css('background-image', `url('${imageUrl}')`)
      });
    }


  });

  function updateFetchedImages(container, urlToFetch) {
    fetchImageUrls(urlToFetch).then(imageUrls => {
      if (container.find('img').length == 0)
        $.each(imageUrls.slice(0, 15), (i, thumb) => $(`
          <a index="${i}" href="${thumb.href}" target="_blank">
            <img index="${i}" src="${thumb.url}" />
          </a>
        `).appendTo(container));
      else
        $.each(imageUrls.slice(0, 15), (i, thumb) => {
          $(`a[index="${i}"]`).attr('href', thumb.href);
          $(`img[index="${i}"]`).attr('src', thumb.url);
        });
    });
    setTimeout(function () { updateFetchedImages(urlToFetch); }, 10000);
  }

  async function fetchImageUrls(apiUrl) {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const imageUrls = await response.json();
      return imageUrls;
    } catch (error) {
    }
  }

  var $jusesLitania = $('<div class="jusesLitania" ></div>');
  $jusesLitania.appendTo($liveSection);

  var $affStartButton = $(`<input type="number" class="jesusAmountTextbox" value="4" />`);
  $affStartButton.appendTo($jusesLitania);

  var $affStartButton = $(`<input type="button" class="jesusStartButton" value="Start" />`);
  $affStartButton.appendTo($jusesLitania);

  var jesusUtter = new SpeechSynthesisUtterance();
  var jesusSynth = window.speechSynthesis;
  var jesusIsPlaying = false;

  function repeatStringWithComma(string, num) {
    if (num <= 0) {
      return "";
    }
    return Array(num).fill(string).join(", ");
  }

  var jesusMantraTextsForAudio = [];

  $(document).on('click', '.jesusStartButton', function () {

    $(".jusesLang").hide();
    $(".jusesLang:has(input:checked)").show()


    jesusMantraTextsForAudio = [];
    var repeatAmount = $('.jesusAmountTextbox').val();
    var number = parseInt(repeatAmount, 10);
    $(".jusesLang input:checked").each((i, box) => {
      var lang = $(box).attr('id');
      var text = $(`label[for="${lang}"]`).text();
      jesusMantraTextsForAudio.push({ lang, text });
    });

    sayMantra(jesusMantraTextsForAudio, 0, number);
    // var repeatAmount = $('.jesusAmountTextbox').val();
    // var repeatAmount = $('.jesusAmountTextbox').val();
    // var result = repeatStringWithComma(exampleString, repeatAmount);


  });

  function sayMantra(array, index, repeat) {
    var text = array[index].text;
    var lang = array[index].lang;
    UpdateFocusText(text);
    $(`.imageInnerDiv`).css('background-image', `url("/wp-content/uploads/2022/12/${lang}.jpg")`);
    $(`.person2Image`).css('background-image', `url("/wp-content/uploads/2024/01/jesus_bevel.png")`);

    jesusUtter.text = repeatStringWithComma(text, repeat);
    msg.rate = 0.8;
    jesusUtter.lang = lang;
    jesusSynth.speak(jesusUtter);
    jesusIsPlaying = true;

    jesusUtter.onend = (event) => {
      index = (index + 1) % array.length;
      if (jesusIsPlaying) sayMantra(array, index, repeat);
    }
  }


  var $affStopButton = $(`<input type="button" class="jesusStopButton" value="Stop" />`);
  $affStopButton.appendTo($jusesLitania);

  $(document).on('click', '.jesusStopButton', function () {
    jesusSynth.cancel();
    jesusIsPlaying = false;
    $(".jusesLang").show();
    $(`.person2Image`).css('background-image', `url("/wp-content/uploads/2022/12/la.jpg")`);
    $('.imageInnerDiv').css('background-image', 'url("/wp-content/uploads/2024/01/jesus_bevel.png")');
  });


  var $jusesLanguages = $('<div class="jusesLanguages" ></div>');
  $jusesLanguages.appendTo($jusesLitania);

  $.each(jesusMantrasVar, function (index, value) {
    var isChecked = (value.default) ? "checked" : "";
    $(`
      <div class="jusesLang" >
        <input type="checkbox" id="${value.lang}" name="${value.lang}" ${isChecked} />
        <img class="flagImg" src="https://purecatamphetamine.github.io/country-flag-icons/3x2/${value.lang.toUpperCase()}.svg" />
        <label>(${value.lang}) </label>
        <label for="${value.lang}">${value.mantra}</label>
      </div>
    `).appendTo($jusesLanguages);
  });



  // var elem = document.body.getElementById("ls_embed_1676270103");
  // function openFullscreen() {
  //   if (elem.requestFullscreen) {
  //     elem.requestFullscreen();
  //   } else if (elem.webkitRequestFullscreen) { /* Safari */
  //     elem.webkitRequestFullscreen();
  //   } else if (elem.msRequestFullscreen) { /* IE11 */
  //     elem.msRequestFullscreen();
  //   }
  // }

  var $videoChooserSection = $('<div class="videoChooserSection" ></div>');
  $videoChooserSection.appendTo($quadrupolePanel);

  var $hideOptionsButton = $('<input class="hideOptionsButton button" type="button" altvalue="→" value="←"  />');
  $hideOptionsButton.appendTo($videoChooserSection);

  $(document).on('click', '.hideOptionsButton', function () {
    $('#tabs').toggle();

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

  var initFocusText = focusTextsVar;
  var initCaptionText = "Quantum";
  var initSideText = "";
  $(`<div class="focusText generatorText" ></div>`).appendTo(header);
  $(`<div class="sideText left" ></div>`).appendTo(header);
  $(`<div class="sideText right" ></div>`).appendTo(header);

  UpdateFocusText(initFocusText);
  UpdateSideText(initSideText)
  $(`<div class="captionText generatorText" ></div>`).appendTo(header);
  updateCaptionText(initCaptionText);


  /**********************
        SESSION
  ***********************/

  var $tab0 = $("#tabs-0");
  $(`<div class="soundCaption tabHeader" >~~ Session Settings ~~</div>`).appendTo($tab0);

  var $sessionContent = $(`<div class="sessionContent" ></div>`);
  $sessionContent.appendTo($tab0);

  var $selectSession = $(`<select class="selectSession"></select>`);
  $selectSession.appendTo($sessionContent);

  function getPageSessions() {
    return defaultSessionVar.filter((s) => s.page == pageType);
  }

  let sessions = getPageSessions();
  $.each(sessions, function (i, value) {
    $(`<option value="${value.name}">${value.name}</option>`).appendTo($selectSession);
  });

  $(document).on('change', '.selectSession', function () {
    let session = defaultSessionVar.find((s) => s.name == $(this).val());
    updateElementsFromSession(session);
  });

  var $focusTextSave = $(`<div class="focusTextSave" ></div>`);
  $focusTextSave.appendTo($sessionContent);

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


  /**********************
          VIDEO 
  ***********************/



  var $videoContainerDiv = $('<div class="videoBackground hidden-container fullView"></div>');
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

    var $view360InnerDiv = $('<div class="view360InnerDiv" ></div>');
    $view360InnerDiv.appendTo($inside);

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
      $('.loadOverlay').removeClass('loading')
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
    togglePyramidView($(this).is(':checked'), true);
  });

  var $piramidToggleText = $('<div class="piramidVideoToggleText piramidToggleText" >Pyramid View</div>');
  $piramidToggleText.appendTo($piramidToggle);

  $(document).on('click', '.piramidVideoToggleText', function () {
    $('.piramidVideoToggleCB').click();
  });

  function togglePyramidView(isPyramid, startVideo, zoom, ratio) {
    console.log({isPyramid, startVideo, zoom, ratio})

    if (zoom) {
      $('.fullView').hide();
      $('.pyramidView').show();
      $('.quadGenerator, .roundView').css('width', `${zoom}vh`).css('height', `${zoom}vh`);
      $('.quadGenerator').css('transform', `translateY(-50%) scale(${ratio}, 1)`);
      $('.roundView').css('transform', `translate(-50%, -50%) scale(${ratio}, 1)`);
      $('.quadrupoleImage').addClass('pyramidImage');
      $('.personImage, .therapistImage, .generatorText').addClass('pyramidPerson')
    } else {
      $('.piramidToggleCB').prop('checked', isPyramid);
      if (isPyramid) {
        console.log("im in toggle pyramid")
        $('.fullView').hide();
        $('.pyramidView').show();
        $('.quadGenerator').css('width', '100vh').css('height', '100vh');
        $('.quadrupoleImage').addClass('pyramidImage');
        $('.personImage, .therapistImage, .generatorText, .sideText, .liveSection').addClass('pyramidPerson')
      } else {
        $('.fullView').show();
        $('.pyramidView').hide();
        $('.quadGenerator').css('width', '63%').css('height', '63%')
        $('.quadrupoleImage').removeClass('pyramidImage');
        $('.personImage, .therapistImage, .generatorText, .sideText, .liveSection').removeClass('pyramidPerson')
      }
    }
    setDataFontSize();
    if (isVideoPlaying) startFocusVideo();
  }

  /* THUMBS */

  var $videoThumbsDiv = $('<div id="videoThumbs" ></div>');
  $videoThumbsDiv.appendTo($videoChooserContent);

  var $videoSelect = $('<select class="videoSelect" ></select>');
  $videoSelect.appendTo($videoChooserContent);

  $(videos).each(function (k, v) {

    if (v.only && !v.only.includes(pageType)) return;

    let style = '';
    if (v.isView) {
      style = (v.thumbUrl)
        ? `background-image:url(${v.thumbUrl});`
        : `background-image:url(https://ww2.e-s-p.com/wp-content/uploads/2018/12/youtube-play.png);`
    }
    else {
      style = `background-image:url(https://img.youtube.com/vi/${v.id}/0.jpg);`
    }

    var $videoThumbPreviewDiv = $(`<div
              videoid="${v.id}" 
              videoname="${v.name}"
              isView="${v.isView}"
              class="videoThumb"
              style="${style}"
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

  function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
  }

  $(document).on('mouseover', '.videoThumb', function () {
    $(".videoCaption").html($(this).attr('videoname'))
  });

  $(document).on('mouseleave', '#videoThumbs', function () {
    $(".videoCaption").html(selectVideoMessage)
  });

  $(document).on('click', '.videoThumb', function () {
    changeVideo($(this).attr('videoid'), $(this).attr("isView"))
  });

  $(document).on('change', '.videoSelect', function () {
    changeVideo($(this).val(), $(this).find('option:selected').attr("isView"));
  });


  var $videoControls = $('<div class="videoControls" ></div>');
  $videoControls.appendTo($videoChooserContent);

  var $youtubeRemoveButtonImage = $(`<img src="https://esculap.org/wp-content/uploads/2022/11/removeVideo.png" class="youtubeRemoveButtonImage redButton" />`);
  $youtubeRemoveButtonImage.appendTo($videoControls);

  var $youtubePlayButtonImage = $(`<img src="https://esculap.org/wp-content/uploads/2022/11/pauseVideo.png" class="youtubePauseButtonImage redButton" style="display:none;" />`);
  $youtubePlayButtonImage.appendTo($videoControls);

  var $youtubePlayButtonImage = $(`<img src="https://esculap.org/wp-content/uploads/2022/11/playVideo.png" class="youtubePlayButtonImage redButton" />`);
  $youtubePlayButtonImage.appendTo($videoControls);

  var $videoVolumeInput = $('<input type="range" value="10" class="videoVolume" />');
  $videoVolumeInput.appendTo($videoControls);


  $(document).on('click', '.youtubeRemoveButtonImage', function () {
    stopFocusVideo();
  });

  $(document).on('click', '.youtubePauseButtonImage', function () {
    pauseFocusVideo();
  });

  $(document).on('click', '.youtubePlayButtonImage', function () {
    startFocusVideo();
  });

  $(document).on('change', '.videoVolume', function () {
    var curVal = $(this).val()
    $(players).each((i, p) => p.setVolume(curVal));
    $('.videoVolume').val(curVal);
  });


  function stopFocusVideo() {
    $('.youtubePauseButtonImage').hide();
    $('.youtubePlayButtonImage').show();
    $(players).each((i, p) => p.stopVideo());
    $('.videoBackground').addClass('hidden-container');
    isVideoPlaying = false;
  }

  function pauseFocusVideo() {
    if (!playersReady) return;
    $('.youtubePauseButtonImage').hide();
    $('.youtubePlayButtonImage').show();
    $(players).each((i, p) => p.pauseVideo());
    isVideoPlaying = false;
  }

  function startFocusVideo(newVideoId) {
    if (!playersReady) {
      t = setTimeout(function () { startFocusVideo(newVideoId); }, 1000);
      return;
    };
    $('.youtubePlayButtonImage').hide();
    $('.youtubePauseButtonImage').show();
    $(players).each((i, p) => p.loadVideoById(newVideoId).stopVideo());
    var activePlayers = getActivePlayers();
    $(activePlayers).each((i, p) => p.setVolume($('.videoVolume').val()).playVideo().setPlaybackQuality("small").mute())
    activePlayers[0].unMute();
    $('.videoBackground').removeClass('hidden-container');
    isVideoPlaying = true;
  }

  function changeVideo(newVideoId, mode) {

    sessionObj['videoId'] = newVideoId;
    sessionObj['videoMode'] = mode;

    $(".imageInnerDiv").removeClass('psalmCover')
    $(".view360InnerDiv").empty()

    switch (mode) {
      case 'isView':
        $(`<iframe width="100%" height="100%" title="Esculap ESA ESOC" scrolling="no" 
              src="${newVideoId}">
            </iframe>`).appendTo('.view360InnerDiv');
        break;
      case 'isVideo':
        $(`<video width="100%" height="100%" autoplay loop>
              <source src="${newVideoId}" type="video/mp4">
            </video>`).appendTo('.view360InnerDiv');
        break;
      default:
        startFocusVideo(newVideoId);
        break;
    }

  }

  function getActivePlayers() {
    var singleVideoHolderId = "videoHolder"
    return ($('.piramidToggleCB').is(':checked')) ? players.filter(p => p.g.id != singleVideoHolderId) : players.filter(p => p.g.id == singleVideoHolderId);
  }


  /**********************
        FOCUS TEXT 
  ***********************/

  var $tab2 = $("#tabs-2");

  var selectFocusMessage = "~~ Choose Main Focus ~~"
  var $focusCaption = $(`<div class="focusCaption tabHeader" >${selectFocusMessage}</div>`);
  $focusCaption.appendTo($tab2);

  var $focusContent = $(`<div class="focusContent" ></div>`);
  $focusContent.appendTo($tab2);

  var $focusTextTextBox = $(`<input class="focusTextTextBox focustextClass" type="text" value="${initFocusText}" />`);
  $focusTextTextBox.appendTo($focusContent);

  $(document).on('input', '.focusTextTextBox', function () {
    UpdateFocusText($(this).val())
  });

  var $captionTextTextBox = $(`<input class="captionTextTextBox focustextClass" type="text" value="${initCaptionText}" />`);
  $captionTextTextBox.appendTo($focusContent);

  $(document).on('input', '.captionTextTextBox', function () {
    updateCaptionText($(this).val())
  });

  $(`<input class="sideTextTextBox focustextClass" type="text" value="${initSideText}" list="sideTexts" />`).appendTo($focusContent);
  var $sideTextDataList = $(`<datalist id="sideTexts"></datalist>`);
  $sideTextDataList.appendTo($focusContent);

  $.each(sideTextsOptionsVar, function (index, value) {
    $(`<option>${value}</option>`).appendTo($sideTextDataList);
  });

  $(document).on('input', '.sideTextTextBox', function () {
    UpdateSideText($(this).val());
  });

  function UpdateSideText(text) {
    $(".sideText").html(text);
    $(".sideTextTextBox").val(text);
    $(".sideText").attr('style', `font-size: ${CalculateSideTextSize(text.length)}vh !important`);
  }

  function UpdateFocusText(text) {
    $('.focusText').html(text);
    $('.focusTextTextBox').val(text);
  }



  function CalculateSideTextSize(textLength) {
    var newFontSize = 15;
    if (textLength > 3) newFontSize = 60 / textLength;
    if (textLength > 15) newFontSize = 4;
    return newFontSize;
  }

  var $focusDictionary = $(`<div class="focusDictionary" ></div>`);
  $focusDictionary.appendTo($focusContent);

  $(focusTextsVar).each((i, f) => {
    var $focusPhrase = $(`<div class="focusPhrase" >${f}</div>`);
    $focusPhrase.appendTo($focusDictionary);
  });

  $(document).on('click', '.focusPhrase', function () {
    UpdateFocusText($(this).html())
  });



  var selectedLang;
  var langs = ['GB', 'PL', 'PT', 'DE', 'DK'];

  var $affFlags = $(`<div class="affFlags" ></div>`);
  $affFlags.appendTo($focusContent);

  $(langs).each((i, l) => {

    var flagUrl = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${l}.svg`;
    var $affFlag = $(`<img class="affFlag" lang="${l}" src="${flagUrl}" />`);
    $affFlag.appendTo($affFlags);

  })

  $(document).on('click', '.affFlag', function () {
    selectedLang = $(this).prop('lang');
  });

  var $affInsert = $(`<input type="text" class="affInsert" />`);
  $affInsert.appendTo($focusContent);

  var $affStartButton = $(`<input type="button" class="affStartButton" value="say" />`);
  $affStartButton.appendTo($focusContent);

  var msg = new SpeechSynthesisUtterance();
  const synth = window.speechSynthesis;
  var isPlaying = false;

  $(document).on('click', '.affStartButton', function () {
    msg.text = $('.affInsert').val();
    msg.rate = 0.8;
    msg.lang = selectedLang;
    synth.speak(msg);
    isPlaying = true;

    msg.onend = (event) => {
      if (isPlaying) synth.speak(event.utterance);
    }
  });

  var $affStopButton = $(`<input type="button" class="affStopButton" value="stop" />`);
  $affStopButton.appendTo($focusContent);

  $(document).on('click', '.affStopButton', function () {
    synth.cancel();
    isPlaying = false;
  });


  /**********************
          IMAGES 
  ***********************/

  var $tab3 = $("#tabs-3");

  var selectImageMessage = "~~ Choose Image ~~"
  var $imageCaptionDiv = $(`<div class="imageCaption tabHeader" >${selectImageMessage}</div>`);
  $imageCaptionDiv.appendTo($tab3);

  $('<input class="bgColorLeftTextbox changeInnerBg" type="text" />').appendTo($tab3);
  $('<input class="bgColorRightTextbox changeInnerBg" type="text" />').appendTo($tab3);

  $(document).on('input', '.changeInnerBg', function () {
    const leftColor = $(".bgColorLeftTextbox").val() || "transparent";
    const rightColor = $(".bgColorRightTextbox").val() || "transparent";
    $(".imageInnerBgDiv").css('background-image', `linear-gradient(to right, ${leftColor}, ${rightColor})`);
  });

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

  $(document).on('click', '.uploadImageButton', function () {
    $(".uploadImageHiddenButton").click();
  });

  var $urlImageButton = $(`<img src="https://esculap.org/wp-content/uploads/2022/11/uploadButtons.png" class="urlImageButton redButton" />`);
  $urlImageButton.appendTo($imageButtons);

  var $urlImageTextbox = $('<input class="urlImageTextbox" type="text" />');
  $urlImageTextbox.appendTo($imageButtons);

  $(document).on('click', '.imageButtons', function () {
    $('.modelviewer3d').attr('src', $('.urlImageTextbox').val())
  });


  $(focusImages).each(function (k, fi) {

    var is3D = fi.filepath.includes('.glb');

    var $imageDiv = $(`<div class="uploadImageExample" text="${fi.text}" src="" ${is3D ? 'is3d' : ''} ></div>`);
    $imageDiv.appendTo($tab3);

    if (is3D) {
      insert3dModel($imageDiv, fi.preview, fi.filepath)
    } else {
      var $image = $(`<img class="uploadedImage" src="${fi.filepath}" />`);
      $image.appendTo($imageDiv);
    }

    var $caption = $(`<div class="uploadImageCaption" >${fi.caption}</div>`);
    $caption.appendTo($imageDiv);
  });

  $(document).on('click', '.uploadImageExample', function () {

    clearImageFocus();

    if ($(this).is("[is3d]")) {
      var source = $(this).find('model-viewer').attr('target');
      insert3dModel($('.imageInnerDiv'), source)
    } else {
      var imagePath = $(this).find(".uploadedImage").attr('src');
      $(".imageInnerDiv").css('background-image', `url(${imagePath})`);
      // updateCaptionText($(this).attr("text"));
    }
  });

  //var myFile = $('.uploadImageButton').prop('files');
  $(document).on('change', '.uploadImageHiddenButton', function () {
    var fileName = uploadImage(".imageInnerDiv", $(this));
    // updateCaptionText(fileName);
  });


  function insert3dModel($parent, srcUrl, targetUrl) {
    var modelHolder = `<model-viewer
          class="modelviewer3d"
          src="${srcUrl}"
          style="width: 100%; height: 100%;"
          poster="https://esculap.org/wp-content/uploads/2022/12/animateddna.webp"
          target="${targetUrl}"
          background-color="transparent"
          preload
          reveal-when-loaded
          auto-rotate
          controls
          ></model-viewer>`
    $parent.html(modelHolder);
  }

  function uploadImage(targetImageSelector, $this) {
    clearImageFocus();
    var files = $this.prop('files');
    if (files && files[0]) { // got sth

      // Clear image container
      $(targetImageSelector).removeAttr('src');

      $.each(files, function (index, ff) // loop each image 
      {
        var fileNameSplit = ff.name.split('.')
        fileExt = fileNameSplit[fileNameSplit.length - 1]

        switch (fileExt) {
          case 'json':
            readJSON(ff);
            break;
          case 'txt':
            read3D(ff, targetImageSelector);
            break;
          case 'glb':
            read3D(ff, targetImageSelector);
            break;
          default:
            readImage(ff, targetImageSelector);
            break;
        }


      });

      var retVal = files[0].name.split('.')[0]
      $this[0].value = '';
      return retVal;
    }
  }

  function clearImageFocus() {
    $(".imageInnerDiv").css('background-image', ``).empty();
  }

  function read3D(ff, targetImageSelector) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var source = e.target.result
      insert3dModel($(targetImageSelector), source)
    }
    reader.readAsDataURL(ff)
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
      clearImageFocus()
      json = e.target.result;
      updateElementsFromSession(JSON.parse(json));
    }
    reader.readAsText(ff);
  }



  function updateElementsFromSession(jsonObject) {
    $(jsonObject.people).each((i, p) => {
      $(`.${p.role}Image`).css('background-image', p.data);
    });

    if (checkParamValue(jsonObject['Focus Text'])) UpdateFocusText(jsonObject['Focus Text']);
    if (checkParamValue(jsonObject.sideText)) UpdateSideText(jsonObject.sideText);
    if (checkParamValue(jsonObject.ImageCaption)) updateCaptionText(jsonObject.ImageCaption);
    if (checkParamValue(jsonObject.imageData)) $('.imageInnerDiv').css('background-image', jsonObject.imageData);
    if (checkParamValue(jsonObject.image3dData)) insert3dModel($('.imageInnerDiv'), jsonObject.image3dData);
    if (checkParamValue(jsonObject.qrngInterval)) changeQrngInterval(jsonObject.qrngInterval);
    if (checkParamValue(jsonObject.isPyramid)) togglePyramidView(jsonObject.isPyramid);
    let videoMode = (checkParamValue(jsonObject.videoMode)) ? jsonObject.videoMode : null;
    if (checkParamValue(jsonObject.videoId)) { changeVideo(jsonObject.videoId, videoMode) } else { stopFocusVideo() };
    if (checkParamValue(jsonObject.callClip)) $('.clipOptionsSelect').val(jsonObject.callClip).change();
    if (checkParamValue(jsonObject.callClipSize)) $('.callRange').val(jsonObject.callClipSize).change();
    if (checkParamValue(jsonObject.innerBgColorLeft)) $('.bgColorLeftTextbox').val(jsonObject.innerBgColorLeft).change();
    if (checkParamValue(jsonObject.innerBgColorRight)) $('.bgColorRightTextbox').val(jsonObject.innerBgColorRight).change();
    $('.changeInnerBg').trigger("input");
  }

  function checkParamValue(param) {
    return typeof param !== 'undefined';
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

    var $personUploadButton = $(`<input role="${p.role}" class="personUploadButton" type="button" value="Upload" />`);
    $personUploadButton.appendTo($personRightPanel);

    var $personUploadButton = $(`<input role="${p.role}" class="personDeleteButton" type="button" value="Delete" />`);
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

  $(document).on('click', '.personDeleteButton, .personImage', function () {
    var role = $(this).attr('role');
    var targetSelector = `.${role}Image, .${role}Thumb`;
    $(targetSelector).css('background-image', ``);
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

  /********************
          CALL 
  ********************/

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
    togglePyramidView($(this).is(':checked'));
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
          360
  ***********************/

  var $tab10 = $("#tabs-10");

  var $soundCaption = $(`<div class="soundCaption tabHeader" >~~ 360 Settings ~~</div>`);
  $soundCaption.appendTo($tab10);

  var $roundViewSizeSlider = $(`<input type="range" class="roundViewSizeSlider" min=40 max=150 value=63 />`);
  $roundViewSizeSlider.appendTo($tab10);

  var $roundViewSizeText = $(`<input type="text" class="roundViewSizeText" value=63 />`);
  $roundViewSizeText.appendTo($tab10);

  var $roundViewRatioSlider = $(`<input type="range" class="roundViewRatioSlider" min=1 max=3 step=0.01 value=1 />`);
  $roundViewRatioSlider.appendTo($tab10);

  var $roundViewRatioText = $(`<input type="text" class="roundViewRatioText" value=1 />`);
  $roundViewRatioText.appendTo($tab10);

  var $roundViewContent = $(`<div class="roundViewContent" ></div>`);
  $roundViewContent.appendTo($tab10);

  $(document).on('input', '.roundViewSizeSlider', function () {
    $('.roundViewSizeText').val($(this).val());
    togglePyramidView(false, false, $(this).val(), $('.roundViewRatioSlider').val());
  });

  $(document).on('input', '.roundViewRatioSlider', function () {
    $('.roundViewRatioText').val($(this).val());
    togglePyramidView(false, false, $('.roundViewSizeSlider').val(), $(this).val());
  });

  $(roundViewImagesVar).each(function (k, fi) {
    var $roundViewImageWrap = $(`<div class="roundViewImageWrap"></div>`);
    $roundViewImageWrap.appendTo($roundViewContent);

    var $roundViewImage = $(`<img class="roundViewImage" src="${fi.filepath}" />`);
    $roundViewImage.appendTo($roundViewImageWrap);

    var $caption = $(`<div class="uploadImageCaption" >${fi.caption}</div>`);
    $caption.appendTo($roundViewImageWrap);
  });

  $(document).on('click', '.roundViewImageWrap', function () {
    var imagePath = $(this).find(".roundViewImage").attr('src');
    $(".roundViewInner").css('background-image', `url("${imagePath})`);
  });


  /********************
        OM REIKI 
  ********************/

  var $tab8 = $("#tabs-8");

  var $omegaCaption = $(`<div class="omegaCaption tabHeader" >~~ Om Reiki Settings ~~</div>`);
  $omegaCaption.appendTo($tab8);

  var $omegaContent = $(`<div class="omegaContent" ></div>`);
  $omegaContent.appendTo($tab8);

  var $omegaSelect = $(`<select class="omegaSelect"></select>`);
  $omegaSelect.appendTo($omegaContent);

  $(`<option value="empty">~ Select ~</option>`).appendTo($omegaSelect);
  $(`<option value="invocation">Invocation</option>`).appendTo($omegaSelect);
  $(`<option value="affirmation">Affirmation</option>`).appendTo($omegaSelect);
  $(`<option value="symbols">Symbols</option>`).appendTo($omegaSelect);
  $(`<option value="grail">Grail</option>`).appendTo($omegaSelect);
  $(`<option value="song">Song</option>`).appendTo($omegaSelect);

  $(document).on('change', '.omegaSelect', function () {
    var step = $(this).val();
    $(".omegaStep").hide();
    $("." + step).show();
  });

  var $omegaAffTextbox = $(`<textarea class="omegaAffTextbox omegaStep invocation" rows="8" cols="30" ></textarea>`);
  $omegaAffTextbox.appendTo($omegaContent);

  // $(document).on('load', '.omegaAffTextbox', function () {
  //   $(".imageInnerDiv").html($(this).val());
  // });

  $(document).on('input', '.omegaAffTextbox', function () {
    $(".imageInnerDiv").html($(this).val());
  });

  var $omegaAffTextbox = $(`<textarea class="omegaAffTextbox omegaStep affirmation" rows="8" cols="30" ></textarea>`);
  $omegaAffTextbox.appendTo($omegaContent);

  var $omegaAffCount = $(`<input type="number" class="omegaAffCount" value="8" />`);
  $omegaAffCount.appendTo($omegaContent);

  var $omegaAffStartButton = $(`<input type="button" class="omegaAffStartButton" value="Start" />`);
  $omegaAffStartButton.appendTo($omegaContent);

  var msgOm = new SpeechSynthesisUtterance();
  const synthOm = window.speechSynthesis;
  var isPlaying = false;

  $(document).on('click', '.omegaAffStartButton', function () {

  });

  $(document).on('suspended', '.omegaAffStartButton', function () {
    var repeatCount = $('.omegaAffCount').val();

    $(".imageInnerDiv").html($('.omegaAffTextbox').val());
    msgOm.text = $('.omegaAffTextbox').val();
    msgOm.rate = 0.8;
    synth.speak(msgOm);
    isPlaying = true;

    msgOm.onend = (event) => {

      if (isPlaying) {
        repeatCount--;
        if (repeatCount > 0) {
          synthOm.speak(event.utterance);
        } else {
          //show symbols
          // $(".imageInnerDiv").html('');
          // $(".imageInnerDiv").css('background-image', 'url("https://omreiki.uk/wp-content/uploads/2022/07/chokurei.gif)"');

          // var ckrUtt = new SpeechSynthesisUtterance();
          // ckrUtt.text = 'Cho, Ku, Rey. Cho, Ku, Rey. Cho, Ku, Rey.';
          // ckrUtt.rate = 0.75;
          // synthOm.speak(ckrUtt);

          // ckrUtt.onend = (event) => {
          // $(".imageInnerDiv").css('background-image', 'url("https://omreiki.uk/wp-content/uploads/2022/07/seiheki.gif)"');
          $(".imageInnerDiv").html('');
          $(".imageInnerDiv").css('background-image', 'url("https://omreiki.uk/wp-content/uploads/2022/12/linga.gif)"');

          var shkUtt = new SpeechSynthesisUtterance();
          // shkUtt.text = 'Say, hay, Ki. Say, hay, Ki. Say, hay, Ki.';
          shkUtt.text = 'linga. linga. linga. linga. linga. linga. linga. linga. ';
          shkUtt.rate = 0.1;
          synthOm.speak(shkUtt);

          shkUtt.onend = (event) => {
            $(".imageInnerDiv").html($('.omegaAffTextbox').val());
            $(".imageInnerDiv").css('background-image', '');
            repeatCount = $('.omegaAffCount').val();

            synthOm.speak(msgOm);
          }
          // }
        }
      }
    }
  });

  var $affStopButton = $(`<input type="button" class="affStopButton" value="stop" />`);
  $affStopButton.appendTo($omegaContent);

  $(document).on('click', '.affStopButton', function () {
    synthOm.cancel();
    isPlaying = false;
  });


  /**********************
          PSALMS
  ***********************/

  var isSoundModulation = 0;

  var $tab9 = $("#tabs-9");

  var $psalmsaption = $(`<div class="psalmsaption tabHeader" >~~ Psalms Settings ~~</div>`);
  $psalmsaption.appendTo($tab9);

  var $psalmsContent = $(`<div class="psalmsContent" ></div>`);
  $psalmsContent.appendTo($tab9);

  var $psalmLangs = $(`<div class="psalmLangs"></div>`);
  $psalmLangs.appendTo($psalmsContent);

  var $psalmList = $(`<div class="psalmList"></div>`);
  $psalmList.appendTo($psalmsContent);

  let selectedPsalmsLang = '';
  let selectedPsalm = '';

  $(psalmVideoVar).each((i, set) => {
    var $psalmLang = $(`<div class="psalmLang" lang="${set.lang}">${set.flag}${set.speaker}</div>`);
    $psalmLang.appendTo($psalmLangs);
  })

  $(document).on('click', '.psalmLang', function () {
    selectedPsalmsLang = $(this).attr('lang');

    $('.psalmLang').removeClass('selected');
    $(this).addClass('selected');

    let set = psalmVideoVar.find(e => e.lang == selectedPsalmsLang)

    $psalmList.empty();
    $(set.psalms).each((i, p) => {
      var number = p.name.replace('Psalm ', '')
      var $psalm = $(`<div class="psalm" number="${number}" lang="${selectedPsalmsLang}">${number}</div>`);
      $psalm.appendTo($psalmList);
      addTooltip(p, set, $psalm);
    })
  });

  $("#tabs-9").tooltip({
    content: function () {
      return $(this).prop('title');
    }
  });

  $('.psalmLang[lang="en"]').click();

  var $psalmText = $(`<div class="psalmText" selectedIndex="" ></div>`);
  $psalmText.appendTo($psalmsContent);

  $(document).on('click', '.psalm', function () {
    let number = $(this).attr('number');
    selectedPsalm = `${selectedPsalmsLang}:${number}`

    let set = psalmVideoVar.find(e => e.lang == selectedPsalmsLang)
    let psalm = set.psalms.find(p => p.name == "Psalm " + number);

    $('.psalm').removeClass('selected');
    $(this).addClass('selected');

    previewPsalm(psalm, set);

    clearImageFocus();
    changeVideo(psalm.youtube)
    $(".imageInnerDiv").addClass('psalmCover').html(psalm.name);

  });

  function addTooltip(psalm, set, $element) {
    let psalmPreview = `
          <div class="psalmPreview tooltip">
            <div class="thumb"><img src="//img.youtube.com/vi/${psalm.youtube}/maxresdefault.jpg"
              onload="if (this.width < 130) this.src = '//img.youtube.com/vi/${psalm.youtube}/mqdefault.jpg'" /></div>
            <div class="psalmDetails">
              <div class="psalmTitle">${set.flag}${set.speaker} ${psalm.name}</div>
              <div class="psalmContent">${psalm.text ?? ''}</div>
            </div>
          </div>
        `
    $element.attr('title', psalmPreview);
  }

  function previewPsalm(psalm, set) {
    let psalmPreview = `
          <div class="psalmTitle">${set.flag}${set.speaker} ${psalm.name}</div>
          <div class="linki">
            <div class="youtube"><a target="_blank" href="https://www.youtube.com/watch?v=${psalm.youtube}"><img src="//img.youtube.com/vi/${psalm.youtube}/mqdefault.jpg" /></a></div>
            <div class="wiki"><a target="_blank" href="https://${selectedPsalmsLang.split('_')[0]}.wikipedia.org/wiki/Psalm_${psalm.name.replace('Psalm ', '')}"><img src="https://upload.wikimedia.org/wikipedia/commons/7/77/Wikipedia_svg_logo.svg" /></a></div>
          </div>
          <div class="psalmDesc">${psalm.text ?? ''}</div>
        `
    $(".psalmText").html(psalmPreview);
  }


  /********************
      SAVE SESSION 
  ********************/


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
    var videoID = sessionObj['videoId']
    var videoMode = sessionObj['videoMode']
    var ImageCaption = $(".captionText").html().replace('\n', ' ');
    var imageData = $('.imageInnerDiv').css('background-image');
    var image3dData = $('.imageInnerDiv .modelviewer3d').attr('src');
    var sideText = $(".sideTextTextBox").val();

    var emotionsText = "\n\nEmotions Quantity\n\n";
    $(emotionsListVar).each((i, e) => {
      emotionsText += `${e.name}: ${e.value}\n`;
    })

    var sessionObject = {
      'Session time': sessionTime,
      'Focus Text': focusText,
      'videoId': videoID,
      videoMode,
      imageData,
      image3dData,
      ImageCaption,
      sideText,
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
      innerBgColorLeft: $('.bgColorLeftTextbox').val(),
      innerBgColorRight: $('.bgColorRightTextbox').val(),

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
    return videos.filter(v => v.id == videoId)
  }

  function initializeEmotionsQuantity() {

    instantiateStar(emotionsListVar, "canvas", '.emotionalQuantity')
    instantiateStar(energiesListVar, "canvas_energy", '.energeticQuantity')
    instantiateStar(healthListVar, "healthyQuantity", '.healthyQuantity')

    $(document).on('change', '.emotionalQuantity .emotionQuantity', function () {
      onQuantityClick(emotionsListVar, '.emotionalQuantity', $(this), "canvas")
    });

    $(document).on('change', '.energeticQuantity .emotionQuantity', function () {
      onQuantityClick(energiesListVar, '.energeticQuantity', $(this), "canvas_energy")
    });

    $(document).on('change', '.healthyQuantity .emotionQuantity', function () {
      onQuantityClick(healthListVar, '.healthyQuantity', $(this), "canvas_health")
    });


    function instantiateStar(list, canvasId, starSelector) {

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

      initializeStarAndTable(list, canvasId, starSelector);

    }

    function initializeStarAndTable(list, canvasId, quantitiesClass) {
      drawStar(150, 150, 80, 50, list, canvasId);
      updateBars(list, quantitiesClass + ' .emotionQuantityBarFill')
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
      initializeStarAndTable(list, canvasId, contanerSelector);
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

    if (checkParamValue(isMobile)) {
      $('.videoChooserSection').css('margin', 'auto');
      $('.videoChooserSection').css('position', 'static');
    }
  }

  function updateCaptionText(text) {
    $(".captionText").html(text);
    $('.captionTextTextBox').val(text);
  }

  $(window).on("resize", function (event) {
    setDataFontSize()
  });

  let currentSessions = getPageSessions();
  if (currentSessions.length > 0) updateElementsFromSession(currentSessions[0]);
  var pageAttr = $(".quadrupolePanel").attr('page');
  if (typeof pageAttr !== 'undefined' && pageAttr !== false) {
    $('.liveSection').show();
  };

});