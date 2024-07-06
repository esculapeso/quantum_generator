jQuery(document).ready(function ($) {

  $(document).tooltip();

  let fetcheddata_dec = [];
  let fetcheddata_hex = [];
  let isfetched = 0;
  let sessionObj = {}
  let isVideoPlaying = false;
  let qrngSelected = "omega";
  let currentVideoId = "";

  let pageType = $(".quadrupolePanel").attr('page');

  var qrngOrigDisplayInterval = 60000;
  var qrngFetchInterval;
  var currentDisplayInterval = 938;
  var upcomingDisplayInterval = 938;
  var imageGallerySpeed = 792;

  var isMobile = window.innerHeight > window.innerWidth; // checks if portrait mode 
  var videos = (typeof videosForFocus !== 'undefined' && videosForFocus) ? videosForFocus : [];
  var psalmVideoVar = (typeof psalmVideo !== 'undefined' && psalmVideo) ? psalmVideo : [];
  var view360VideoVar = (typeof view360Video !== 'undefined' && view360Video) ? view360Video : [];
  var focusImages = (typeof imagesForFocus !== 'undefined' && imagesForFocus) ? imagesForFocus : [];
  var roundViewImagesVar = (typeof roundViewImages !== 'undefined' && roundViewImages) ? roundViewImages : [];
  var randomBackgroundMiddleVar = (typeof randomBackgroundMiddle !== 'undefined' && randomBackgroundMiddle) ? randomBackgroundMiddle : null;
  var focusTextsVar = (typeof focusText !== 'undefined' && focusText) ? focusText : "";
  var sideTextsOptionsVar = (typeof sideTextsOptions !== 'undefined' && sideTextsOptions) ? sideTextsOptions : [];
  var jesusMantrasVar = (typeof jesusMantras !== 'undefined' && jesusMantras) ? jesusMantras : [];
  var defaultSessionVar = (typeof defaultSession !== 'undefined' && defaultSession) ? defaultSession : [];
  var liveTransmissionsVar = (typeof liveTransmissions !== 'undefined' && liveTransmissions) ? liveTransmissions : [];
  var emotionsListVar = (typeof emotionsList !== 'undefined' && emotionsList) ? emotionsList : [];
  var energiesListVar = (typeof energiesList !== 'undefined' && energiesList) ? energiesList : [];
  var healthListVar = (typeof healthList !== 'undefined' && healthList) ? healthList : [];
  var pyramidUpperImagesVar = (typeof pyramidUpperImages !== 'undefined' && pyramidUpperImages) ? pyramidUpperImages : [];
  var videosXRVar = (typeof videosXR !== 'undefined' && videosXR) ? videosXR : [];


  function setFetchIntervalAndLength(dispInterval) {
    qrngFetchInterval = qrngOrigDisplayInterval;
  }

  setFetchIntervalAndLength(currentDisplayInterval)

  function getOneHex() {
    switch (qrngSelected) {
      case "esculap":
        jQuery.get(`https://qrng.anu.edu.au/API/jsonI.php?length=60&type=hex16&size=1`, data => {
          useRandomHexArrayData(data.data)
        });
        break;
      case "omega":
        jQuery.get(`https://beacon.nist.gov/beacon/2.0/pulse/last`, data => {
          useRandomHexArrayData(data.pulse.outputValue.match(/.{1,2}/g))
        });
        break;

      default:
        break;
    }
  };

  function useRandomHexArrayData(resultHex) {
    if (resultHex === 'undefined') return;
    var resultDec = resultHex.map(function (x) {
      return parseInt(x, 16);
    });

    fetcheddata_dec = fetcheddata_dec.concat(resultDec);
    fetcheddata_hex = fetcheddata_hex.concat(resultHex);
    isfetched = isfetched + 1;
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
      $(` <div id="${id}" class="${className}" >
            <div class="dec" style="display:none;"></div>
            <div class="hex"></div>
          </div>`).appendTo(container);
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

  // FIND OUT WHAT IS THIS FOR
  // var $roundView = $('<div class="roundView" ></div>').appendTo(header);
  // $('<div class="roundViewInner" ></div>').appendTo($roundView);

  var $quadGenerator = $('<div class="quadGenerator" ></div>').appendTo(header);
  var genCount = typeof generatorsNumber != 'undefined' ? generatorsNumber : 4;
  for (var n = 0; n < genCount; ++n) {
    appendDataHolder($quadGenerator, "generator" + n, "quadrupole")
  }

  if (header.hasClass('double')) {
    var $quadGeneratorDouble = $('<div class="quadGenerator double" ></div>').appendTo(header);
    for (var n = genCount; n < genCount * 2; ++n) {
      appendDataHolder($quadGeneratorDouble, "generator" + n, "quadrupole")
    }
  }

  let dual = $('.dualTeleportationImage');
  appendDataHolder(dual, "dataDualTop", "dipole")
  appendDataHolder(dual, "dataDualBottom", "dipole")

  let monopole = $('.monoTunnelImage');
  appendDataHolder(monopole, "dataMonopole", "monopole")



  var $imageDiv = $('<div class="uploadImageHolder clipped" ></div>').appendTo('.quadGenerator');
  var $focusControls = $('<div class="focusControls" ></div>').appendTo($imageDiv);
  var $focusChangers = $('<div class="focusChangers" ></div>').appendTo($focusControls);
  var $subImageControls = $('<div class="subImageControls" ></div>').appendTo($focusControls);
  $('<div class="previewSelector" ></div>').appendTo($subImageControls);
  var $imageChooser = $(`<div class="imageChooser" ></div>`).hide().appendTo($subImageControls);
  $('<div class="videoSelectsTitle" >Image:</div>').appendTo($imageChooser);
  $(`<div class="removeImageButton button" >X</div>`).appendTo($imageChooser);
  $(`<div class="uploadImageButton button" >🡅</div>`).appendTo($imageChooser);

  var $imageSelect = $('<select class="imageSelect" ></select>').appendTo($imageChooser);
  $(`<option value="empty" >~ Select ~</option>`).appendTo($imageSelect);
  $(focusImages).each(function (k, fi) {
    $(`<option value="${fi.filepath}" ${fi.filepath.includes('.glb') ? 'is3d' : ''} >${fi.text}</option>`).appendTo($imageSelect);
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



  var $focusAndSession = $('<div class="focusAndSession" ></div>').appendTo($focusChangers);
  var $focusChooser = $('<div class="focusChooser" ></div>').appendTo($focusAndSession);
  var $focusTextChooser = $('<div class="focusTextChooser" ></div>').appendTo($focusChooser);
  $('<div class="videoSelectsTitle" >Focus:</div>').appendTo($focusTextChooser);
  $('<input type="text" class="focusTextTextBox" />').appendTo($focusTextChooser);
  var $captionTextChooser = $('<div class="captionTextChooser" ></div>').appendTo($focusChooser);
  $('<div class="videoSelectsTitle" >Caption:</div>').appendTo($captionTextChooser);
  $('<input type="text" class="captionTextTextBox" />').appendTo($captionTextChooser);

  $(document).on('input', '.captionTextTextBox', function () {
    $(".captionText").html($(this).val());
  });

  var $sessionButtons = $('<div class="sessionButtons" ></div>').appendTo($focusAndSession);
  $('<input class="focusTextSaveButton button" type="button" value="Save"  />').appendTo($sessionButtons);
  $('<input class="focusTextLoadButton button" type="button" value="Load"  />').appendTo($sessionButtons);
  var $videoControlsAndFocus = $('<div class="videoControlsAndFocus" ></div>').appendTo($focusChangers);
  $('<div class="videoSelectsTitle" >Controls:</div>').appendTo($videoControlsAndFocus);

  var $videoControls = $('<div class="videoControls" ></div>').appendTo($videoControlsAndFocus);
  $(`<img src="https://github.com/esculapeso/quantum_generator/raw/main/images/removeVideo.png" class="youtubeRemoveButtonImage redButton" />`).appendTo($videoControls);
  $(`<img src="https://github.com/esculapeso/quantum_generator/raw/main/images/pauseVideo.png" class="youtubePauseButtonImage redButton" />`).hide().appendTo($videoControls);
  $(`<img src="https://github.com/esculapeso/quantum_generator/raw/main/images/playVideo.png" class="youtubePlayButtonImage redButton" />`).appendTo($videoControls);
  $('<input type="range" value="10" class="videoVolume" />').appendTo($videoControls);
  var $videoSelects = $('<div class="videoSelects" ></div>').appendTo($subImageControls);

  var $videoSubcategorySelect = $('<select class="videoSubcategorySelect" ></select>').hide().appendTo($videoSelects);
  $('<div class="videoSelectsTitle" >Video:</div>').appendTo($videoSelects);

  var $videoCategorySelect = $('<select class="videoCategorySelect" ></select>').appendTo($videoSelects);
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
      var $psalm = $(`<div class="psalm" number="${number}" lang="${selectedPsalmsLang}">${number}</div>`).appendTo($psalmList);
      addTooltip(p, set, $psalm);
    })
  });

  var $videoSelectInFocus = $('<select class="videoSelect" ></select>').appendTo($videoSelects);

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
          $(`<option value="${v.id}">${v.name}</option>`).appendTo($videoSelectInFocus);
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
          $(`<option value="${set.lang}">${langName} ${speaker}</option>`).appendTo($videoSubcategorySelect);
        });
        break;

      case 'view360':
        $(`<option value="empty">~ Select ~</option>`).appendTo($videoSelectInFocus);
        $(view360VideoVar).each(function (k, v) {
          $(`<option isView="isView" value="${v.url}">${v.name}</option>`).appendTo($videoSelectInFocus);
        });
        break;

      default:
        break;
    }
  });


  $(document).on('change', '.videoSubcategorySelect', function () {
    $focusVideoSelect = $('.focusControls .videoSelect').empty();
    let lang = $(this).val();
    let set = psalmVideoVar.find(e => e.lang == lang)

    $(`<option value="empty">~Sel~</option>`).appendTo($focusVideoSelect);
    $(set.psalms).each((i, p) => {
      var number = p.name.replace('Psalm ', '')
      $(`<option value="${p.youtube}">${number}</option>`).appendTo($focusVideoSelect);
    })
  });


  var $imageInnerBgDiv = $('<div class="imageInnerBgDiv" ></div>').appendTo($imageDiv);
  $('<div class="imageInnerDiv fullView" ></div>').appendTo($imageInnerBgDiv);
  $('<div class="view360InnerDiv" ></div>').appendTo($imageDiv);

  $(document).on('mouseenter', '.uploadImageHolder', function () {
    if (playersReady || true) {
      // $('.focusControls').show();
    }
  });

  $(document).on('mouseleave', '.uploadImageHolder', function () {
    $('.focusControls').hide();
  });

  var $liveSection = $('<div class="liveSection" ></div>').hide().appendTo($quadrupolePanel);

  $(`<div class="hideLivePanel">
        <input class="hideLiveButton button" type="button" value="Live"  />
        <input class="hideMantraButton button" type="button" value="Live"  />
      </div>`).appendTo($liveSection);

  $(document).on('click', '.hideLiveButton', function () {
    $('#lives').toggle();
  });

  $(document).on('click', '.hideMantraButton', function () {
    $('.hideMantraButton').toggle();
  });


  $("#lives").tabs().appendTo($liveSection);
  $(`#lives ul li`).hide();

  // const firstLivesTabSelector = `#lives ul li:has(a[href='${firstLivesTabSelector}'])`;
  // $(firstLivesTabSelector).show().find('a').html(`⏵︎`);

  // $(document).on('click', firstLivesTabSelector, function () {
  //   $(this).html(`⏸︎`)
  //   //$("#tabs-2 a").trigger('click');
  // });

  var transmissions = liveTransmissionsVar.filter((s) => s.page == pageType)
  $.each(transmissions, (i, transmission) => {

    const currentLivesTabSelector = `#lives-${i + 1}`;
    $(`#lives ul li:has(a[href='${currentLivesTabSelector}'])`).show().find('a').html(transmission.name).addClass("is_transmission");
    var $liveTab = $(currentLivesTabSelector);

    switch (transmission.type) {
      case "embedLink":
        $(`<div class="aspect-ratio"><iframe src="${transmission.url}"></iframe></div>`).appendTo($liveTab);
        break;

      case "imageFetch":
        $(`<div class="imagesFetched ${transmission.url.split('/').pop()}"></div>`).appendTo($liveTab);
        updateFetchedImages(transmission.url);
        break;

      case "coin":
        $(`<div class="imagesFetched"></div>`).appendTo($liveTab);
        generateCoin($liveTab);
        generateTokensContent($liveTab, "parent");
        generateTokensContent($liveTab, "child");

        fetchImageUrls(transmission.url).then(coinsData => {
          updateCoin(coinsData);
        });
        break;

      case "widget":
        $(`.cryptoPrices${transmission.selector}`).show().appendTo($liveTab);
        break;

      default:
        // Handle unknown transmission type
        break;
    }

  });

  isRotating = true;
  rotationCounter = 0;

  function rotateLiveTransmissions() {
    if (isRotating) {
      liveTabs = $('#lives ul li.is_transmission');
      rotationCounter = (rotationCounter + 1) % liveTabs.length;
      liveTabs.eq(rotationCounter).trigger('click');
      setTimeout(rotateLiveTransmissions, 1000);
    }
  }

  rotateLiveTransmissions();


  function generateTokensContent(container, type) {
    $coinInfoContainer = $(`<div class="coinInfoContainer ${type}"></div>`).appendTo(container);
    $coinHeader = $(`<div class="coinHeader">${type.toUpperCase()}</div>`).appendTo($coinInfoContainer);
    $coinBody = $(`<div class="coinBody"></div>`).appendTo($coinInfoContainer);
    $coinImage = $(`<div class="coinImage"><img /></div>`).appendTo($coinBody);
    $coinInfo = $(`<div class="coinInfo"></div>`).appendTo($coinBody);
    $coinName = $(`<div class="coinName"></div>`).appendTo($coinInfo);
    $coinSymbol = $(`<div class="coinSymbol"></div>`).appendTo($coinInfo);
  }

  function generateCoin(container) {
    $mainCoin = $(`<div class="coincontainer coin2" style="height: 230px;"></div>`).appendTo(container);
    $tridiv = $(`<div id="tridiv"></div>`).appendTo($mainCoin);
    $scene = $(`<div class="scene"></div>`).appendTo($tridiv);
    $shape = $(`<div class="shape cylinder-2 cyl-2"></div>`).appendTo($scene);

    $(`<div class="face bm" style="background-image: url('');"><div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.1);"></div></div>`).appendTo($shape);
    $(`<div class="face tp" style="background-image: url('');"><div class="photon-shader obverse"></div></div>`).appendTo($shape);
    $.each([0.1, 0.125, 0.16, 0.21, 0.267, 0.325, 0.38, 0.43, 0.475, 0.498, 0.498, 0.475, 0.44, 0.39, 0.333, 0.275, 0.22, 0.17, 0.125, 0.1], (i, alpha) => {
      $(`<div class="face sidecoin s${i}"><div class="photon-shader" style="background-color: rgba(0, 0, 0, ${alpha});"></div></div>`).appendTo($shape);
    });
  }

  function updateCoin(list) {
    let revItem = list[getRandomArrayIndex(list)];
    let obvItem = list[getRandomArrayIndex(list)];
    if (revItem && obvItem) {
      getTokenData(revItem.id, '.bm', 'parent');
      getTokenData(obvItem.id, '.tp', 'child');
    }
    setTimeout(function () { updateCoin(list); }, 60000);
  }

  function getRandomArrayIndex(array) {
    var numb = Math.floor(Math.random() * array.length);
    return numb;
  }

  function getTokenData(coinId, faceSelector, type) {
    fetchImageUrls(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`).then(coinData => {
      let imageUrl = coinData.image.large;
      $(`.face${faceSelector}`).css('background-image', `url('${imageUrl}')`)
      $(`.${type} .coinImage img`).attr('src', `${imageUrl}`)
      $(`.${type} .coinName`).html(coinData.name);
      $(`.${type} .coinSymbol`).html(coinData.symbol);
    });
  }

  function updateFetchedImages(urlToFetch) {

    fetchImageUrls(urlToFetch).then(([url, imageUrls]) => {
      const container = $('.imagesFetched.' + url.split('/').pop());
      let urls = Array.isArray(imageUrls.images) ? imageUrls.images.slice(0, 15) : [];
      if (container.find('.image-container').length == 0)
        $.each(urls, (i, thumb) => {
          const $div = $(`<img index="${i}" src="${thumb.url}" class="image-container" />`);
          $div.css({ 'background-image': `url(${thumb.url})` });
          const $link = $(`<a index="${i}" href="${thumb.href}" target="_blank"></a>`);
          $link.append($div);
          container.append($link);
        });
      else
        $.each(urls, (i, thumb) => {
          $(`a[index="${i}"]`, container).attr('href', thumb.href);
          const image = $(`.image-container[index="${i}"]`, container);
          const old_image_url = image.attr('src');
          $(`.image-container[index="${i}"]`, container).attr('src', thumb.url).css({ 'background-image': `url(${old_image_url})` });
        });
    });

    setTimeout(function () { updateFetchedImages(urlToFetch); }, 10000);
  }

  async function fetchImageUrls(apiUrl) {
    try {

      // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const response = await fetch(apiUrl, {
        method: 'GET',
        // credentials: 'include', // Include cookies in the request
        // mode: 'cors', // Set CORS mode explicitly
        // headers: {
        //   'Origin': window.location.protocol + '//' + window.location.hostname,
        // },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const imageUrls = await response.json();
      return [apiUrl, imageUrls];
    } catch (error) {
      console.error('Error:', error);
      // Handle the error as needed
    }
  }

  var $jesusLitania = $('<div class="jesusLitania" ></div>').appendTo($liveSection);
  var $affStartButton = $(`<input type="number" class="jesusAmountTextbox" value="4" />`).appendTo($jesusLitania);
  var $affStartButton = $(`<input type="button" class="jesusStartButton" value="Start" />`).appendTo($jesusLitania);

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
    console.log("CLICKED")

    $(".jesusLang").hide();
    let $checkedMantras = $(".jesusLang:has(input:checked)").show()
    jesusMantraTextsForAudio = [];
    var repeatAmount = $('.jesusAmountTextbox').val();
    var number = parseInt(repeatAmount, 10);
    console.log({ repeatAmount, number })
    $checkedMantras.each((i, mantra) => {
      console.log({ mantra })
      var lang = $(mantra).find('input').attr('id');
      var text = $(mantra).find('label[for]').text();
      var imageUrl = $(mantra).find('img.imagePreview').attr('src');
      jesusMantraTextsForAudio.push({ lang, text, imageUrl });
    });

    sayMantra(jesusMantraTextsForAudio, 0, number);
    // var repeatAmount = $('.jesusAmountTextbox').val();
    // var repeatAmount = $('.jesusAmountTextbox').val();
    // var result = repeatStringWithComma(exampleString, repeatAmount);


  });

  function sayMantra(array, index, repeat) {
    var text = array[index].text;
    var lang = array[index].lang;
    var imageUrl = array[index].imageUrl;
    UpdateFocusText(text);
    $(`.imageInnerDiv`).css('background-image', `url("${imageUrl}")`);

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

  var $affStopButton = $(`<input type="button" class="jesusStopButton" value="Stop" />`).appendTo($jesusLitania);

  $(document).on('click', '.jesusStopButton', function () {
    jesusSynth.cancel();
    jesusIsPlaying = false;
    $(".jesusLang").show();
  });


  var $jesusLanguages = $('<div class="jesusLanguages" ></div>').appendTo($liveSection);

  $.each(jesusMantrasVar, function (index, value) {
    var isChecked = (value.default) ? "checked" : "";
    $(`
      <div class="jesusLang" >
        <input type="checkbox" id="${value.lang}" name="${value.lang}" ${isChecked} />
        <img class="flagImg" title="${value.lang}" src="https://purecatamphetamine.github.io/country-flag-icons/3x2/${value.lang.toUpperCase()}.svg" />
        <img class="imagePreview" src="${value.image}" />
        <label for="${value.lang}">${value.mantra}</label>
      </div>
    `).appendTo($jesusLanguages);
  });

  var $videoChooserSection = $('<div class="videoChooserSection" ></div>').appendTo($quadrupolePanel);
  $('<input class="hideOptionsButton button" type="button" altvalue="→" value="←"  />').appendTo($videoChooserSection);

  $(document).on('click', '.hideOptionsButton', function () {
    $('#tabs').toggle();
    toggleButtonAltValue($(this));
  });

  function toggleButtonAltValue(button) {
    // Toggle value and altvalue attributes
    toggleAttribute(button, 'value', 'altvalue');

    // Toggle title and alttitle attributes
    toggleAttribute(button, 'title', 'alttitle');
  }

  function toggleAttribute(button, attrName, altAttrName) {
    var newAttrVal = button.attr(altAttrName);
    var curAttrVal = button.attr(attrName);
    if (newAttrVal && curAttrVal) {
        button.attr(altAttrName, curAttrVal).attr(attrName, newAttrVal);
    }
  }


  $('<input class="centerGenerator button" type="button" value="↕"  />').appendTo($videoChooserSection);
  $('<input class="playGeneratorVideo button" type="button" altvalue="II" value="►"  />').appendTo($videoChooserSection);
  $('<input class="togglePyramidButton button" type="button" alttitle="Classic View" title="Pyramid View" altvalue="▣" value="◭"  />').appendTo($videoChooserSection);

  $(document).on('click', '.centerGenerator', function () {
    $(window).scrollTop($(".quadrupolePanel").offset().top);
  });

  $(document).on('click', '.playGeneratorVideo', function () {
    startFocusVideo()

    // ispl = isAnyVideoPlaying();
    // console.log("isVideoPlaying ", ispl)
    // if (ispl) {
    //   pauseFocusVideo()
    // }
    // else {
    //   startFocusVideo()
    // }

    // toggleButtonAltValue($(this));
  });

  $(document).on('click', '.togglePyramidButton', function () {
    togglePyramidView();

    toggleButtonAltValue($(this));
  });


  /**********************
          TABS 
  ***********************/
  $("#tabs").tabs().hide().appendTo($videoChooserSection);

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

  var $sessionContent = $(`<div class="sessionContent" ></div>`).appendTo($tab0);
  var $selectSession = $(`<select class="selectSession"></select>`).appendTo($sessionContent);

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

  var $focusTextSave = $(`<div class="focusTextSave" ></div>`).appendTo($sessionContent);
  $('<input class="focusTextSaveButton button"  type="button" value="Save Session" />').appendTo($focusTextSave);
  $('<input class="focusTextLoadButton button"  type="button" value="Load Session"  />').appendTo($focusTextSave);
  $(`<input class="loadHiddenUploadButton" type="file" style="display: none;" />`).appendTo($focusTextSave);

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



  // Create and append video container elements
  const $videoContainerDiv = $('<div>', { class: 'videoBackground hidden-container fullView' }).appendTo($imageDiv);
  $('<div>', { id: 'videoHolder' }).appendTo($videoContainerDiv);
  const $pyramid = $('<div>', { class: 'video-container pyramid pyramidView' }).appendTo($imageDiv);

  // Initialize pyramid sides
  const sides = ['north', 'west', 'south', 'east'];
  sides.forEach(side => {
    const $side = $('<div>', { class: `side ${side}` }).appendTo($pyramid);
    const $inside = $('<div>', { class: 'inside' }).appendTo($side);
    if (pyramidUpperImagesVar.length > 0)
      $('<div>', { class: 'imageInnerWingsDiv' }).css('background-image', `url('${pyramidUpperImagesVar[0].url}')`).appendTo($inside);
    $('<div>', { class: 'imageInnerDiv' }).appendTo($inside);
    $('<div>', { class: 'videoBackground hidden-container' })
      .append($('<div>', { class: 'videoForeground' })
        .append($('<div>', { id: `${side}Holder` })))
      .appendTo($inside);
    $('<div>', { class: 'view360InnerDiv' }).appendTo($inside);
  });

  // Video chooser content setup
  const $tab1 = $('#tabs-1'); // Assuming $tab1 is defined elsewhere
  const $videoChooserContent = $('<div>', { class: 'videoChooserContent chooserContent' }).appendTo($tab1);
  $('<div>', { class: 'loadOverlay loading' }).appendTo($videoChooserContent);

  // Check player interval setup
  const checkPlayerInterval = setInterval(() => {
    if (playersReady) {
      $('.loadOverlay').removeClass('loading');
      clearInterval(checkPlayerInterval);
    }
  }, 400);

  // Pyramid Toggle
  togglePyramidView(false, true);

  const $pyramidToggle = $('<div class="piramidToggle"></div>').appendTo($videoChooserContent);
  $('<input class="piramidVideoToggleCB piramidToggleCB" type="checkbox">').appendTo($pyramidToggle);
  $('<div class="piramidVideoToggleText piramidToggleText">Pyramid View</div>').appendTo($pyramidToggle);

  $(document).on('change', '.piramidVideoToggleCB', function () {
    togglePyramidView($(this).is(':checked'), true);
  }).on('click', '.piramidVideoToggleText', function () {
    $('.piramidVideoToggleCB').click();
  });

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
        $quadGenerator.css({ 'width': '100vh', 'height': '100vh' });
        $quadrupoleImage.addClass('pyramidImage');
        $pyramidElements.addClass('pyramidPerson');
      } else {
        $fullView.show();
        $pyramidView.hide();
        $quadGenerator.css({ 'width': '63%', 'height': '63%' });
        $quadrupoleImage.removeClass('pyramidImage');
        $pyramidElements.removeClass('pyramidPerson');
      }
    }

    setDataFontSize();

    if (isVideoPlaying) startFocusVideo();
  }

  /* THUMBS */

  var $videoThumbsDiv = $('<div>', { id: "videoThumbs" }).appendTo($videoChooserContent);
  var $videoSelect = $('<select>', { class: "videoSelect" }).appendTo($videoChooserContent);

  videos.forEach(function (v) {
    if (v.only && !v.only.includes(pageType)) return;

    let imageUrl = v.isView
      ? (v.thumbUrl || 'https://github.com/esculapeso/quantum_generator/raw/main/images/playVideo.png')
      : `https://img.youtube.com/vi/${v.id}/0.jpg`;
    let style = `background-image:url(${imageUrl});`;

    if (v.mode == 'isvideo') {
      $('<video>', {
        'videoid': v.id,
        mode: v.mode,
        class: 'videoThumb',
        html: `<source src="${v.id}" type="video/mp4">`,
        title: v.name
      }).appendTo($videoThumbsDiv);
    } else {
      $('<div>', {
        'videoid': v.id,
        'mode': v.mode,
        class: 'videoThumb',
        style: style,
        title: v.name
      }).appendTo($videoThumbsDiv);
    }

    $('<option>', {
      value: v.id,
      text: v.name
    }).appendTo($videoSelect);
  });
  $('<div>', { id: "customVideoText", text: "YouTube Video Link" }).appendTo($videoChooserContent);
  $('<input>', { class: "customVideoInput", type: "text" }).appendTo($videoChooserContent);

  $(document).on('change', '.customVideoInput', function () {
    changeVideo(youtube_parser($(this).val()));
  });

  function youtube_parser(url) {
    var regExp = /^.*(youtu.be\/|v\/|\/u\/w\/|embed\/|watch\?v=|watch\?.+&v=)([^#&?]*).*/;
    var match = url.match(regExp);
    console.log({match})
    console.log({VIDEOID: match[7]})
    return (match && match[7].length == 11) ? match[7] : false;
  }

  $(document).on('click', '.videoThumb', function () {
    changeVideo($(this).attr('videoid'), $(this).attr("mode"));
  });

  $(document).on('change', '.videoSelect', function () {
    changeVideo($(this).val(), $(this).find('option:selected').attr("isView"));
  });

  // Create and append video controls
  var $videoControls = $('<div>', { class: "videoControls" }).appendTo($videoChooserContent);
  $('<img>', { src: "https://github.com/esculapeso/quantum_generator/raw/main/images/removeVideo.png", class: "youtubeRemoveButtonImage redButton" }).appendTo($videoControls);
  $('<img>', { src: "https://github.com/esculapeso/quantum_generator/raw/main/images/pauseVideo.png", class: "youtubePauseButtonImage redButton", style: "display:none;" }).appendTo($videoControls);
  $('<img>', { src: "https://github.com/esculapeso/quantum_generator/raw/main/images/playVideo.png", class: "youtubePlayButtonImage redButton" }).appendTo($videoControls);
  $('<input>', { type: "range", value: "10", class: "videoVolume" }).appendTo($videoControls);

  // Consolidate click event handlers for video controls
  $(document).on('click', '.youtubeRemoveButtonImage', stopFocusVideo)
    .on('click', '.youtubePauseButtonImage', pauseFocusVideo)
    .on('click', '.youtubePlayButtonImage', startFocusVideo);

  // Change event handler for video volume
  $(document).on('change', '.videoVolume', function () {
    var curVal = $(this).val();
    $('.videoVolume').val(curVal);  // Update all volume sliders
    $(players).each((i, p) => p.setVolume(curVal));
  });
  function toggleVideoControls(showPlayButton) {
    $('.youtubePauseButtonImage').toggle(!showPlayButton);
    $('.youtubePlayButtonImage').toggle(showPlayButton);
  }

  function stopFocusVideo() {
    toggleVideoControls(true);
    $(players).each((i, p) => p.stopVideo());
    $('.videoBackground').addClass('hidden-container');
    isVideoPlaying = false;
  }

  function pauseFocusVideo() {
    console.log("pause")
    if (!playersReady)
      return;
    toggleVideoControls(true);
    $(players).each((i, p) => p.pauseVideo());
    isVideoPlaying = false;
  }

  function startFocusVideo(newVideoId) {
    if (!playersReady) {
      setTimeout(() => startFocusVideo(newVideoId), 1000);
      return;
    }
    toggleVideoControls(false);
    currentVideoId = newVideoId || currentVideoId;
    console.log(currentVideoId, newVideoId)
    const activePlayers = getActivePlayers();
    const volumeLevel = $('.videoVolume').val();

    let playersStarted = 0; // Counter for players that have started playing

    activePlayers.forEach((player, index) => {
      player.loadVideoById({
        videoId: currentVideoId,
        events: {
          'onStateChange': (event) => {
            if (event.data === YT.PlayerState.PLAYING) {
              playersStarted++;
              if (playersStarted === activePlayers.length) {
                isVideoPlaying = true; // Set true only when all active players have started
              }
            }
          }
        }
      });

      player.setVolume(volumeLevel);
      if (index === 0) {
        player.unMute();
      } else {
        player.mute();
      }
      player.playVideo().setPlaybackQuality("small");
    });

    $('.videoBackground').removeClass('hidden-container');
  }

  function getActivePlayers() {
    const singleVideoHolderId = "videoHolder";
    const isPyramidViewActive = $('.piramidToggleCB').is(':checked');
    return players.filter(player => isPyramidViewActive ? player.g.id !== singleVideoHolderId : player.g.id === singleVideoHolderId);
  }

  function isAnyVideoPlaying() {
    console.log({ players })
    const activePlayers = getActivePlayers();
    console.log({ activePlayers })
    for (let i = 0; i < players.length; i++) {
      if (players[i].getPlayerState() === YT.PlayerState.PLAYING) {
        return true; // Returns true if any video is playing
      }
    }
    return false; // Returns false if no videos are playing
  }

  function changeVideo(newVideoId, mode) {
    sessionObj.videoId = newVideoId;
    sessionObj.videoMode = mode;

    $(".imageInnerDiv").removeClass('psalmCover');
    $(".view360InnerDiv").empty();

    const $view360InnerDiv = $('.view360InnerDiv').empty();

    switch (mode) {
      case 'isView':
        $('<iframe>', {
          width: "100%",
          height: "100%",
          title: "Esculap ESA ESOC",
          scrolling: "no",
          src: newVideoId
        }).appendTo($view360InnerDiv);
        break;
      case 'isvideo':
        var $video = $('<video>', {
          height: "100%",
          autoplay: true,
          loop: true,
          muted: true,
          html: `<source src="${newVideoId}" type="video/mp4">`
        }).appendTo('.quadGenerator:not(.double) .uploadImageHolder > .view360InnerDiv');

        // Ensure the video element is appended to the DOM
        $video.on('canplay', function() {
          this.play().catch(function(error) {
            console.error('Error attempting to play video:', error);
          });
        });

        // var $canvas = $(`<canvas id="outputCanvas" ></canvas>`).appendTo('.quadGenerator.double .uploadImageHolder > .view360InnerDiv');
        // var context = $canvas[0].getContext('2d');

        // $video.on('loadedmetadata', function () {
        //   // Calculate the height to maintain the aspect ratio
        //   // The canvas width is being set to 200px statically in your original code
        //   // var height = $video[0].videoHeight * (200 / $video[0].videoWidth);
        //   // Adjusting the canvas size dynamically based on the video might not be necessary here
        //   // as your original code sets a static width of 200px for drawing the video frame
        //   $canvas.attr('width', $video[0].videoWidth);
        //   $canvas.attr('height', $video[0].videoWidth);
        // });

        $video.on('play', function () {
          console.log("im playing!!")
          //drawVideoFrame();
        });

        // function drawVideoFrame() {
        //   if ($video[0].paused || $video[0].ended) return;
        //   // Draw the current video frame onto the canvas
        //   context.drawImage($video[0], 0, 0, $video[0].width, $video[0].height);
        //   requestAnimationFrame(drawVideoFrame); // Call drawVideoFrame again to keep updating the canvas
        // }


        break;
      default:
        startFocusVideo(newVideoId);
        break;
    }
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

  const $tab3 = $("#tabs-3");

  // Creating gradient settings
  $("<div>", { text: "Image Background Gradient:" }).hide().appendTo($tab4);

  const $gradientSettings = $('<div class="gradientSettings"></div>').hide().appendTo($tab3);
  $('<span>Left: </span><input class="bgColorLeftTextbox changeInnerBg" type="text" /><span>Right: </span><input class="bgColorRightTextbox changeInnerBg" type="text" />').appendTo($gradientSettings);

  // Event handler for gradient color change
  $(document).on('input', '.changeInnerBg', function () {
    const leftColor = $(".bgColorLeftTextbox").val() || "transparent";
    const rightColor = $(".bgColorRightTextbox").val() || "transparent";
    $(".imageInnerBgDiv").css('background-image', `linear-gradient(to right, ${leftColor}, ${rightColor})`);
  });

  // Image buttons
  $('<div class="imageButtons"><img src="https://github.com/esculapeso/quantum_generator/raw/main/images/removeVideo.png" class="removeImageButton redButton" /><img src="https://github.com/esculapeso/quantum_generator/raw/main/images/uploadButtons.png" class="uploadImageButton redButton" /><input class="uploadImageHiddenButton" type="file" style="display: none;" /></div>').appendTo($tab3);
  $('<div class="imageButtons"><input type="button" class="urlImageButton" value="URL" /><input class="urlImageTextbox" type="text" /></div>').appendTo($tab3);

  // Event handlers for image buttons
  $(document).on('click', '.removeImageButton', function () {
    $(".imageInnerDiv").css('background-image', '');
  }).on('click', '.uploadImageButton', function () {
    $(".uploadImageHiddenButton").click();
  }).on('click', '.urlImageButton', function () {
    $(".imageInnerDiv").css('background-image', `url(${$('.urlImageTextbox').val()})`);
  });

  const $imagesGallerySelected = $("<div>", { class: "imagesGallerySelected" }).appendTo($tab3);

  var index = 0;

  function iterateChildren() {
      var $children = $imagesGallerySelected.children(); // Re-select children each time
      if ($children.length !== 0) {

        var $child = $($children[index]);

        changeInnerImage($child)

        index++;

        if (index >= $children.length) {
            index = 0; // Reset index to loop continuously
        }

      }

      imageGallerySpeed = parseInt($(".imagesGallerySpeedInput").val(), 10)

      setTimeout(iterateChildren, imageGallerySpeed);
  }

  const $imagesGalleryControls = $("<div>", { class: "imagesGalleryControls" }).appendTo($tab3);
  $("<span>", { class: "imagesGallerySpeedText", html: "Speed: " }).appendTo($imagesGalleryControls);
  $("<input>", {
    class: "imagesGallerySpeedInput",
    type: "number",
    step: "1",
    value: imageGallerySpeed
  }).appendTo($imagesGalleryControls);

  // Start the loop
  iterateChildren();


  // Image category select
  const $imageCategoriesSelection = $("<div>", { class: "imageCategoriesSelection" }).appendTo($tab3);
  $("<span>", { text: "Category: " }).appendTo($imageCategoriesSelection);
  const $imageCategorySelect = $('<select class="imageCategorySelect"><option value="all">All</option></select>').appendTo($imageCategoriesSelection);

  const $imagesGallery = $("<div>", { class: "imagesGallery" }).appendTo($tab3);

  // Populate image categories and create image divs
  let imageCategories = [];
  $(focusImages).each(function (k, fi) {
    if (fi.category && !imageCategories.includes(fi.category)) {
      imageCategories.push(fi.category);
      $('<option>', { value: fi.category, text: fi.category }).appendTo($imageCategorySelect);
    }

    const is3D = fi.filepath.includes('.glb');
    const isVideo = fi.filepath.includes('.webm');



    const $imageDiv = $('<div>', {
      class: 'uploadImageExample',
      title: fi.text,
      category: fi.category,
      src: '',
      is3d: is3D ? true : undefined,
      isVideo: isVideo ? true : undefined
    }).appendTo($imagesGallery);

    if (is3D) {
      insert3dModel($imageDiv, fi.preview, fi.filepath);
    } else if (isVideo) {
      $('<img>', { class: 'uploadedImage', src: fi.preview, videopath: fi.filepath }).appendTo($imageDiv);
    } else {
      $('<img>', { class: 'uploadedImage', src: fi.filepath }).appendTo($imageDiv);
    }

    $('<div>', { class: 'uploadImageCaption', text: truncate(fi.caption, 10) }).appendTo($imageDiv);
  });

  // Event handler for category selection
  $(document).on('change', '.imageCategorySelect', function () {
    let selectedCategory = $(this).val();
    $('.uploadImageExample').toggle(selectedCategory === "all").filter(`[category="${selectedCategory}"]`).toggle(selectedCategory !== "all");
  });

  $imagesGallerySelected.sortable({
    items: ".uploadImageExample",
    placeholder: "ui-state-highlight",
    cursor: "move",
    tolerance: "pointer",
  });


  // Setup right-click (context menu) event to remove image
  $(document).on('contextmenu', '.imagesGallerySelected .uploadImageExample', function(e) {
    e.preventDefault();  // Prevent the default context menu from appearing
    $(this).remove();  // Remove the clicked image
    $imagesGallerySelected.sortable('refresh');
    return false;  // Stop further handling of the event
  });

  // Event handler for image selection
  $(document).on('click', '.imagesGallery .uploadImageExample', function () {
    $(this).clone().appendTo($imagesGallerySelected);
    $imagesGallerySelected.sortable('refresh');
  });

  function changeInnerImage(image) {
    clearImageFocus();
    if (image.is("[is3d]")) {
      const source = image.find('model-viewer').attr('target');
      insert3dModel($('.imageInnerDiv'), source);
    } else if (image.is("[isVideo]")) {
      const videoPath = image.find(".uploadedImage").attr('videopath');
      $('<video>', {
        controls: false,
        autoplay: true,
        loop: true
      }).append($('<source>', {
        src: videoPath,
        type: 'video/webm'
      })).appendTo(".imageInnerDiv");
    }
    else {
      const imagePath = image.find(".uploadedImage").attr('src');
      $(".imageInnerDiv").css('background-image', `url(${imagePath})`);
    }
  }

  // Event handler for image upload
  $(document).on('change', '.uploadImageHiddenButton', function () {
    uploadImageToGallery(".imageInnerDiv", $(this));
  });

  // Additional functions
  function insert3dModel($parent, srcUrl, targetUrl) {
    var modelHolder = `<model-viewer
          class="modelviewer3d"
          src="${srcUrl}"
          style="width: 100%; height: 100%;"
          poster="https://github.com/esculapeso/quantum_generator/raw/main/images/animateddna.webp"
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
    if (files && files[0]) {
      // Clear image container
      $(targetImageSelector).removeAttr('src');

      $.each(files, function (index, file) {
        var fileExt = file.name.split('.').pop().toLowerCase();

        switch (fileExt) {
          case 'json':
            readJSON(file);
            break;
          case 'txt':
          case 'glb':
            read3D(file, targetImageSelector);
            break;
          default:
            readImage(file, targetImageSelector);
            break;
        }
      });

      $this.val(''); // Clear file input
    }
  }

  function uploadImageToGallery(targetImageSelector, $this) {
    var files = $this.prop('files');
    if (files && files[0]) {
      $(targetImageSelector).removeAttr('src');
      $.each(files, function (index, file) {
        var fileExt = file.name.split('.').pop().toLowerCase();
        switch (fileExt) {
          case 'json':
            readJSON(file);
            break;
          case 'txt':
          case 'glb':
            read3D(file, targetImageSelector);
            break;
          default:
            readImageToGallery(file);
            break;
        }
      });

      $this.val(''); // Clear file input
      $imagesGallerySelected.sortable('refresh');
    }
  }

  function clearImageFocus() {
    $(".imageInnerDiv").css('background-image', '').empty();
  }

  function read3D(file, targetImageSelector) {
    var reader = new FileReader();
    reader.onload = function (e) {
      insert3dModel($(targetImageSelector), e.target.result);
    };
    reader.readAsDataURL(file);
  }

  function readImage(file, targetImageSelector) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $(targetImageSelector).css('background-image', `url("${e.target.result}")`);
    };
    reader.readAsDataURL(file);
  }

  function readImageToGallery(file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      insertImageToGallery(e.target.result, file.name)
    };
    reader.readAsDataURL(file);
  }

  function clearGallery() {
    $imagesGallerySelected.empty();
  }

  function insertImageToGallery(imageSource, imageCaption) {
    const $ImageDiv = $('<div>', { class: 'uploadImageExample' }).appendTo($imagesGallerySelected);
    $('<img>', { class: 'uploadedImage', src: imageSource}).appendTo($ImageDiv);
    $('<div>', { class: 'uploadImageCaption', text: truncate(imageCaption, 10) }).appendTo($ImageDiv);
  }

  function readJSON(file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      clearImageFocus();
      var json = JSON.parse(e.target.result);
      updateElementsFromSession(json);
    };
    reader.readAsText(file);
  }



  function updateElementsFromSession(jsonObject) {
    if (Array.isArray(jsonObject.people)) {
      jsonObject.people.forEach(p => {
        if (p.role && p.data) $(`.${p.role}Image`).css('background-image', p.data);
      });
    }

    // Conditional updates using a utility function to avoid repetition
    updateIfDefined(jsonObject.focusText, UpdateFocusText, jsonObject['Focus Text']);
    updateIfDefined(jsonObject.sideText, UpdateSideText);
    updateIfDefined(jsonObject.ImageCaption, updateCaptionText);
    updateIfDefined(jsonObject.imageData, data => $('.imageInnerDiv').css('background-image', data));
    updateIfDefined(jsonObject.image3dData, data => insert3dModel($('.imageInnerDiv'), data));
    updateIfDefined(jsonObject.qrngInterval, changeQrngInterval);
    updateIfDefined(jsonObject.isPyramid, togglePyramidView);
    updateIfDefined(jsonObject.callClip, data => $('.clipOptionsSelect').val(data).change());
    updateIfDefined(jsonObject.callClipSize, data => $('.callRange').val(data).change());
    updateIfDefined(jsonObject.innerBgColorLeft, data => $('.bgColorLeftTextbox').val(data).change());
    updateIfDefined(jsonObject.innerBgColorRight, data => $('.bgColorRightTextbox').val(data).change());
    updateIfDefined(jsonObject.gallery, updateGallery);
    $('.changeInnerBg').trigger("input");

    // Handle video related updates
    if (jsonObject.videoId) {
      changeVideo(jsonObject.videoId, jsonObject.videoMode || null);
    } else {
      stopFocusVideo();
    }
  }

  function updateGallery (gallery) {
    imageGallerySpeed = gallery.speed;
    $(".imagesGallerySpeedInput").val(gallery.speed);

    clearGallery();
    $.each(gallery.images, function (i, image) {
      insertImageToGallery(image.source, image.caption);
    });
  }

  function updateIfDefined(value, updateFunction, legacyValue) {
    if (typeof value !== 'undefined') {
      updateFunction(value);
    } else if (typeof legacyValue !== 'undefined') {
      updateFunction(legacyValue);
    }
  }



  /**********************
          PEOPLE 
  ***********************/

  var $tab4 = $("#tabs-4");

  var $peopleContent = $("<div>", { class: "peopleContent" }).appendTo($tab4);

  var people = [
    { name: "Therapist", role: "therapist" },
    { name: "Person 1", role: "person1" },
    { name: "Person 2", role: "person2" },
    { name: "Person 3", role: "person3" },
    { name: "Person 4", role: "person4" },
    { name: "Person 5", role: "person5" },
    { name: "Person 6", role: "person6" },
  ]

  // Iterate over people to create their panels
  $.each(people, function (i, person) {
    var $personPanel = $("<div>", { class: person.role + " personPanel" }).appendTo($peopleContent);

    $("<div>", { class: person.role + "Thumb personImageThumb" }).appendTo($personPanel);
    var $personRightPanel = $("<div>", { class: "personRightPanel" }).appendTo($personPanel);

    $("<div>", { class: "personTag", text: person.name }).appendTo($personRightPanel);
    $("<input>", { role: person.role, class: "personHiddenUploadButton", type: "file", style: "display: none;" }).appendTo($personRightPanel);
    $("<input>", { role: person.role, class: "personLinkTextbox", type: "text" }).appendTo($personRightPanel);
    $("<input>", { role: person.role, class: "personUploadButton", type: "button", value: "Upload" }).appendTo($personRightPanel);
    $("<input>", { role: person.role, class: "personDeleteButton", type: "button", value: "Delete" }).appendTo($personRightPanel);
  });

  // Function to create person images
  function createPersonImage(person, classes, parent) {
    $("<div>", { role: person.role, class: "personImage " + classes }).appendTo(parent);
  }

  // Append therapist and person images to their respective parents
  createPersonImage(people[0], "therapistImage bottom", header);
  createPersonImage(people[0], "therapistImage right", header);
  createPersonImage(people[0], "therapistImage top", header);
  createPersonImage(people[0], "therapistImage left", header);

  $.each(people.slice(1), function (i, person) {
    createPersonImage(person, "inner " + person.role + "Image", $quadGenerator);
  });

  $(document).on('input', '.personLinkTextbox, .personImage', function () {
    const role = $(this).attr('role');
    updateBackgroundImage(role, $(this).val());
  });

  $(document).on('click', '.personUploadButton, .personImage', function () {
    const role = $(this).attr('role');
    $(`.${role} .personHiddenUploadButton`).click();
  });

  $(document).on('click', '.personDeleteButton, .personImage', function () {
    const role = $(this).attr('role');
    updateBackgroundImage(role, '');
  });

  $(document).on('change', '.personHiddenUploadButton', function () {
    const role = $(this).attr('role');
    uploadImage(getRoleSelector(role), $(this));
  });

  function getRoleSelector(role) {
    return `.${role}Image, .${role}Thumb`;
  }

  function updateBackgroundImage(role, value) {
    $(getRoleSelector(role)).css('background-image', `url("${value}")`);
  }



  /**********************
            QRNG
  ***********************/

  var $tab5 = $("#tabs-5");

  var $qrngCaption = $(`<div class="qrngCaption tabHeader" >~~ Choose QRNG settings ~~</div>`);
  $qrngCaption.appendTo($tab5);

  var $qrngContent = $(`<div class="qrngContent" ></div>`);
  $qrngContent.appendTo($tab5);

  var $qrngSelect = $(`<select class="qrngSelect"></select>`).appendTo($qrngContent);
  $(`<option value="omega">Omega</option>`).appendTo($qrngSelect);
  $(`<option value="esculap">Esculap</option>`).appendTo($qrngSelect);

  $(document).on('change', '.qrngSelect', function () {
    qrngSelected = $(this).val();
  });

  var $qrngIntervalCheckbox = $(`<input class="qrngIntervalCheckbox" type="checkbox" />`);
  $qrngIntervalCheckbox.appendTo($qrngContent);

  var $qrngInterval = $(`<input class="qrngInterval" type="range" min="0.1" max="1" step="0.1" value="0.8" />`);
  $qrngInterval.appendTo($qrngContent);

  var $qrngIntervalText = $(`<label class="qrngIntervalText">${qrngOrigDisplayInterval} ms</label>`);
  $qrngIntervalText.appendTo($qrngContent);

  var $qrngLoadCircle = $(`<img src="https://github.com/esculapeso/quantum_generator/raw/main/images/load_circle.gif" class="qrngLoadCircle" />`);
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

  const $tab6 = $("#tabs-6");
  const $soundContent = $("<div>", { class: "soundContent" }).appendTo($tab6);

  $("<img>", { src: "https://github.com/esculapeso/quantum_generator/raw/main/images/speaker.png", class: "speakerOutput soundButton" }).appendTo($soundContent);
  const $usbOutput = $("<img>", { src: "https://github.com/esculapeso/quantum_generator/raw/main/images/usb.png", class: "usbOutput soundButton" }).appendTo($soundContent);

  let isSoundMod = 0;

  $(document).on('click', '.usbOutput', function () {
    isSoundMod = 1 - isSoundMod;
    $usbOutput.css('opacity', isSoundMod ? 0.5 : 1);

    // Assuming 'players' is defined and accessible
    if (!isSoundMod) $(players).each((i, p) => p.unMute());
  });

  /********************
          CALL 
  ********************/

  const $tab7 = $("#tabs-7");

  const $callContent = $("<div>", { class: "callContent" }).appendTo($tab7);

  // Pyramid Toggle
  const $piramidToggleCall = $('<div>', { class: 'piramidToggle callToggle' }).appendTo($callContent);
  $('<input>', { type: 'checkbox', class: 'piramidCallToggleCB piramidToggleCB' }).appendTo($piramidToggleCall);
  $('<div>', { class: 'piramidCallToggleText piramidToggleText cbText', text: 'Pyramid View' }).appendTo($piramidToggleCall);

  // Clip Options
  const $clipOptionsDiv = $("<div>", { class: "clipOptionsDiv" }).appendTo($callContent);
  const $clipOptionsSelect = $("<select>", { class: "clipOptionsSelect" }).appendTo($clipOptionsDiv);

  const clipOptions = ['quad', 'circle', 'octa (hor)', 'octa (ver)', 'hexa (hor)', 'hexa (ver)', 'diamond', 'heth', 'star'];
  $.each(clipOptions, (k, co) => $("<option>", { value: co, text: co }).appendTo($clipOptionsSelect));

  // Call Range
  $('<input>', { type: 'range', class: 'callRange', min: '0', max: '100', value: '90' }).appendTo($callContent);
  $('<input>', { type: 'button', class: 'callResetRange', value: 'reset size' }).appendTo($callContent);

  // Animate Call
  const $animateCallDiv = $('<div>', { class: 'animateCallDiv' }).appendTo($callContent);
  $('<input>', { type: 'checkbox', class: 'animateCallWindowCB' }).appendTo($animateCallDiv);
  $('<div>', { class: 'animateCallWindowText cbText', text: 'Animate Call Window' }).appendTo($animateCallDiv);

  // Call Buttons
  $('<div>', { class: 'callButton button', text: 'Start Call' }).appendTo($callContent);
  $('<div>', { class: 'endcallButton button', text: 'End Call' }).appendTo($callContent);

  // Event Handlers
  $(document).on('change', '.piramidCallToggleCB', function () {
    togglePyramidView($(this).is(':checked'));
  });

  $(document).on('click', '.piramidCallToggleText', function () {
    $('.piramidCallToggleCB').click();
  });

  $(document).on('change', '.clipOptionsSelect', function () {
    const selectedClass = 'clipped' + $(this).val().charAt(0).toUpperCase() + $(this).val().slice(1).replace(/(.∗?)(.∗?)/, '$ 1');
    $('.jitsi-wrapper').attr('class', 'jitsi-wrapper').addClass(selectedClass);
  });

  $(document).on('change mousemove', '.callRange', function () {
    changeCallWindowSize($(this).val());
  });

  $(document).on('click', '.callResetRange', function () {
    const origSize = 90;
    $('.callRange').val(origSize);
    changeCallWindowSize(origSize);
  });

  $(document).on('change', '.animateCallWindowCB', function () {
    $('.jitsi-wrapper').toggleClass('animated', $(this).is(':checked'));
  });

  $(document).on('click', '.animateCallWindowText', function () {
    $('.animateCallWindowCB').click();
  });

  $(document).on('click', '.callButton', function () {
    $('.callWrapper').show().appendTo('.uploadImageHolder');
  });

  $(document).on('click', '.endcallButton', function () {
    $('.callWrapper').hide().appendTo('.uploadImageHolder');
  });

  function changeCallWindowSize(size) {
    const offset = (100 - size) / 2;
    const newStyle = `width: ${size}% !important; height: ${size}% !important; top: ${offset}% !important; left: ${offset}% !important;`;
    $('.jitsi-wrapper').attr('style', newStyle);
  }



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

    var $caption = $(`<div class="uploadImageCaption" >${truncate(fi.caption, 10)}</div>`);
    $caption.appendTo($roundViewImageWrap);
  });

  $(document).on('click', '.roundViewImageWrap', function () {
    var imagePath = $(this).find(".roundViewImage").attr('src');
    $(".roundViewInner").css('background-image', `url("${imagePath})`);
  });

  function truncate(str, n) {
    return (str.length > n) ? str.slice(0, n - 1) + '&hellip;' : str;
  };

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
    var videoId = sessionObj['videoId']
    var videoMode = sessionObj['videoMode']
    var ImageCaption = $(".captionText").html().replace('\n', ' ');
    var imageData = $('.imageInnerDiv').css('background-image');
    var image3dData = $('.imageInnerDiv .modelviewer3d').attr('src');
    var sideText = $(".sideTextTextBox").val();

    var people = [
      { role: 'therapist', data: $('.therapistImage').css('background-image') },
      { role: 'person1', data: $('.person1Image').css('background-image') },
      { role: 'person2', data: $('.person2Image').css('background-image') },
      { role: 'person3', data: $('.person3Image').css('background-image') },
      { role: 'person4', data: $('.person4Image').css('background-image') },
      { role: 'person5', data: $('.person5Image').css('background-image') },
      { role: 'person6', data: $('.person6Image').css('background-image') }
    ]

    var images = [];
    $(".imagesGallerySelected .uploadImageExample").each(function(i, elem) {
        var imageSource = $(elem).find(".uploadedImage").attr('src');
        var imageCaption = $(elem).find(".uploadImageCaption").text();
        images.push({source: imageSource, caption: imageCaption});
    });

    var gallery = {
      speed: imageGallerySpeed,
      images
    }

    var emotionsText = "\n\nEmotions Quantity\n\n";
    $(emotionsListVar).each((i, e) => {
      emotionsText += `${e.name}: ${e.value}\n`;
    })

    var sessionObject = {
      'Session time': sessionTime,
      focusText,
      videoId,
      videoMode,
      imageData,
      image3dData,
      ImageCaption,
      sideText,
      people,
      gallery,
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

      const $energeticSections = $('<div>', { class: "Sections" }).appendTo($(starSelector));
      const $emotionHeaders = $('<div>', { class: "emotionHeaders" }).appendTo($energeticSections);
      const headers = ['Name', 'Intensity', 'R', 'G', 'B'];

      if (!(typeof isMobile !== 'undefined' && isMobile)) {
        headers.push('Rw', 'Gw', 'Bw');
      }

      headers.forEach(header => {
        $('<div>', { class: `header ${header === 'Name' ? 'name' : 'color'}`, text: header }).appendTo($emotionHeaders);
      });

      /*** Quantities Rows ***/

      list.forEach(e => {
        const $emotion = $('<div>', { class: "emotion" }).appendTo($energeticSections);
        const $emotionName = $('<div>', {
          class: "emotionName",
          html: e.link ? `<a href="${e.link}" target="_blank" rel="noopener">${e.name}</a>` : e.name
        }).appendTo($emotion);

        const $emotionQuantityBar = $('<div>', { class: "emotionQuantityBar" }).appendTo($emotion);
        $('<div>', { class: "emotionQuantityBarFill" }).appendTo($emotionQuantityBar);

        $('<input>', {
          class: "emotionQuantity",
          type: "number",
          emotion: e.name,
          value: e.value,
          min: "0",
          max: "10"
        }).appendTo($emotion);

        const colorKeys = ['r', 'g', 'b'];

        colorKeys.forEach(c => {
          addColorValueInput(e.name, c, e[c], $emotion);
        });

        if (!(typeof isMobile !== 'undefined' && isMobile)) {
          colorKeys.forEach(c => {
            addBalanceValueInput(e.name, c, e[c], e.value, $emotion);
          });
        }
      });

      initializeStarAndTable(list, canvasId, starSelector);
    }

    function initializeStarAndTable(list, canvasId, quantitiesClass) {
      drawStar(150, 150, 80, 50, list, canvasId);
      updateBars(list, `${quantitiesClass} .emotionQuantityBarFill`);
    }
    /*** Quantities Helper Function ***/

    function addColorValueInput(name, colorKey, colorVal, container) {
      $('<input>', {
        class: `${colorKey} colorQuantity`,
        type: 'number',
        emotion: name,
        value: colorVal,
        min: getMinColorValue(colorVal),
        max: getMaxColorValue(colorVal)
      }).appendTo(container);
    }

    function addBalanceValueInput(name, colorKey, colorVal, intensity, container) {
      $('<input>', {
        class: `${colorKey} balanceQuantity`,
        type: 'number',
        emotion: name,
        value: intensity * 10,
        min: 0,
        max: 100
      }).appendTo(container);
    }

    function getMaxColorValue(colorValue) {
      return Math.min(colorValue + 33, 255);
    }

    function getMinColorValue(colorValue) {
      return Math.max(colorValue - 33, 0);
    }

    function onQuantityClick(list, containerSelector, _this, canvasId) {
      const selectedIndex = list.findIndex(e => e.name === _this.attr('emotion'));
      list[selectedIndex].value = _this.val();
      initializeStarAndTable(list, canvasId, containerSelector);
    }

  }

  function updateBars(list, contanerSelector) {
    $.each(list, (i, item) => {
      const value = item.value * 10;
      $(contanerSelector).eq(i).css('width', `${value}%`);
    });
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

    if (isMobile) {
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