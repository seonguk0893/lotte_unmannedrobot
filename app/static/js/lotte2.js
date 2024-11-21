document.getElementById("home-btn").addEventListener("click", function() {
    window.location.href = "lotte";
});

document.addEventListener("DOMContentLoaded", function () {
    var doc = document.documentElement;
    var FullPage = document.getElementById("logo-image");

    // 전체화면 설정
    function openFullScreenMode() {
        if (doc.requestFullscreen)
            doc.requestFullscreen();
        else if (doc.webkitRequestFullscreen)
            doc.webkitRequestFullscreen();
        else if (doc.mozRequestFullScreen) 
            doc.mozRequestFullScreen();
        else if (doc.msRequestFullscreen) 
            doc.msRequestFullscreen();
        $('.fullscreen').hide();
        $('.close-fullscreen').show();
    }

    function closeFullScreenMode() {
        if (document.exitFullscreen)
            document.exitFullscreen();
        else if (document.webkitExitFullscreen)
            document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen) 
            document.mozCancelFullScreen();
        else if (document.msExitFullscreen) 
            document.msExitFullscreen();
        $('.fullscreen').show();
        $('.close-fullscreen').hide();
    }

    FullPage.addEventListener("click", function () {
        if (!document.fullscreenElement && 
            !document.webkitFullscreenElement && 
            !document.mozFullScreenElement && 
            !document.msFullscreenElement) { 
            openFullScreenMode();
        } else {
            closeFullScreenMode();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var mapButton = document.querySelector(".map-button");
    var imgModal = document.querySelector(".img-modal");
    var closeButton = document.querySelector(".close-btn");
    var buttonContainer = document.querySelector(".button-container");
    var modalImage = document.getElementById("modal-image");

    function setDefaultFloor() {
        var defaultButton = buttonContainer.querySelector("button[floor='1']");
        handleButtonClick({ target: defaultButton });
    }

    mapButton.addEventListener("click", function () {
        imgModal.style.display = "block";
        setDefaultFloor();
    });

    closeButton.addEventListener("click", function () {
        imgModal.style.display = "none";
    });

    imgModal.addEventListener("click", function (event) {
        if (event.target === imgModal) {
            imgModal.style.display = "none";
        }
    });

    function handleButtonClick(event) {
        var buttons = buttonContainer.querySelectorAll("button");
        buttons.forEach(function (button) {
            button.classList.remove("active");
        });
        event.target.classList.add("active");

        var floor = event.target.getAttribute("floor");
        modalImage.src = "/static/img/lotte_map" + floor + ".png";
    }

    for (var i = 1; i <= 2; i++) {
        var button = document.createElement("button");
        button.textContent = i + "F";
        button.setAttribute("floor", i);
        button.addEventListener("click", handleButtonClick);
        buttonContainer.appendChild(button);
    }
});


/*------------------------------------------------------------*/

document.addEventListener("DOMContentLoaded", function () {
    var micButton = document.querySelector(".mic-button");
    var micIcon = micButton.querySelector("i");
    var micButtonLoader = micButton.querySelector(".mic-button-loader");
    var waveContainer = document.querySelector(".waveContainer");
    const modalImage = document.getElementById("store-modal-image");
    const imgModal = document.querySelector(".store-modal");
    const cancelButton = document.querySelector('.store-modal .cancel-btn');
    const GuideButton = document.querySelector('.store-modal .start-guide-btn');
    const moveModal = document.querySelector(".movemodal");
    const moveModalImage = document.getElementById("move-modal-image");

    function hideWaveContainer() {
        waveContainer.style.display = "none";
    }

    function showWaveContainer() {
        waveContainer.style.display = "flex";
    }

    hideWaveContainer();

    const recognition = new webkitSpeechRecognition(); 
    recognition.continuous = true; 
    recognition.lang = 'ko-KR'; 
    let recognitionActive = false; 
    let isVoicePlayed = false;

    micButton.addEventListener("click", function () {

        micIcon.classList.toggle("m-active");
        micButtonLoader.classList.toggle("active"); 

        if (micIcon.classList.contains("m-active")) {
            showWaveContainer(); 
        } else {
            hideWaveContainer(); 
        }

        if (!recognitionActive) {
            recognition.start();
            recognitionActive = true;
        } else {
            recognition.stop();
            recognitionActive = false;
        }
    });

    recognition.onresult = function (event) {
        const result = event.results[event.results.length - 1]; 
        const transcript = result[0].transcript; 
        console.log('인식된 단어:', transcript);

        checkStoreMatch(transcript);
        
        hideWaveContainer();
        recognition.stop();
        micIcon.classList.remove("m-active");
        micButtonLoader.classList.remove("active");
        recognitionActive = false;
    };

    recognition.onerror = function (event) {
        console.error('음성 인식 오류:', event.error);
    };

    function checkStoreMatch(transcript) {
        const storeDataList = JSON.parse(localStorage.getItem('storeNamesForLotte2')) || [];
        
        const matchedStoreData = storeDataList.find(storeData => transcript.includes(storeData.storeName));

        console.log(matchedStoreData);

        if (matchedStoreData) {
            const { store_floor, storeName, store_x, store_y, click_num, upment, downment } = matchedStoreData;

            if (modalImage && imgModal) {
                if (store_floor === '2F') {
                    modalImage.src = `/static/img/lotte_map2.png`;
                } else {
                    modalImage.src = `/static/img/lotte_map1.png`;
                }

                imgModal.style.display = 'block';

                const existingMarker = document.querySelector('.store-marker');
                if (existingMarker) {
                    existingMarker.remove();
                }

                const marker = document.createElement('div');
                const additionalMarker = document.createElement('div');

                marker.classList.add('store-marker');
                marker.style.position = 'absolute';
                marker.style.width = '30px'; 
                marker.style.height = '30px'; 
                marker.style.backgroundImage = 'url(/static/img/marker.png)'; 
                marker.style.backgroundSize = 'contain'; 
                marker.style.backgroundRepeat = 'no-repeat'; 
                marker.style.left = `${store_x}px`;
                marker.style.top = `${store_y}px`;
                marker.style.transform = 'translate(-50%, -100%)';
                marker.style.pointerEvents = 'none'; 

                imgModal.appendChild(marker);

                if (storeName === '화장실') {
                        additionalMarker.classList.add('store-marker');
                        additionalMarker.style.position = 'absolute';
                        additionalMarker.style.width = '30px'; 
                        additionalMarker.style.height = '30px'; 
                        additionalMarker.style.backgroundImage = 'url(/static/img/marker.png)'; 
                        additionalMarker.style.backgroundSize = 'contain'; 
                        additionalMarker.style.backgroundRepeat = 'no-repeat'; 
                        additionalMarker.style.left = '880px';
                        additionalMarker.style.top = '122px';
                        additionalMarker.style.transform = 'translate(-50%, -100%)';
                        additionalMarker.style.pointerEvents = 'none';

                        imgModal.appendChild(additionalMarker);
                }

                let utterance;

                if (storeName === '화장실') {
                    utterance = new SpeechSynthesisUtterance(`화장실은 이 위치에 있습니다. 가까운 화장실로 안내를 시작할까요?`);
                } else {
                        utterance = new SpeechSynthesisUtterance(`${storeName} 매장은 이 위치에 있습니다. 안내를 시작할까요?`);
                }

                if (store_floor === '2F') {
                    utterance.text = `${storeName} 매장은 2층에 있습니다. 가까운 에스컬레이터로 안내를 시작할까요?`;
                }

                speechSynthesis.speak(utterance);
                
                let previousClickNum = null;
                let lastGoingValue = null;


                function updateClickNumInDB(clickNum) {

                    if (previousClickNum === clickNum) {
                        return;
                    }
                        
                    previousClickNum = clickNum;
                            
                    fetch('/update_click_num', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ click_num: clickNum })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('DB 업데이트 성공:', data); 
                        
                        setTimeout(function() {
                            checkGoingStatus();
                        }, 3000);
                    })
                    .catch(error => {
                        console.error('데이터 가져오기 실패:', error);
                    });
                }

                function checkGoingStatus() {
                    const interval = setInterval(() => {
                        fetch('/get_going_status', { 
                            method: 'GET', 
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(response => response.json())
                        .then(data => {
                                
                            console.log('현재 going 값:', data.going, 'direction:', data.direction);

                            let completionMessage;
                            speechSynthesis.cancel();

                            if (data.going === 0) {
                                    
                                moveModal.style.display = 'none';  

                                if (lastGoingValue !== 0) {
                                    lastGoingValue = data.going;
                                    //direction == 0 (상행), direction == 1 (하행)
                                    if (data.direction === 0 && upment) {
                                        completionMessage = new SpeechSynthesisUtterance(upment);
                                        console.log('멘트:', upment);
                                    } else if (data.direction === 1 && downment) {
                                        completionMessage = new SpeechSynthesisUtterance(downment);
                                        console.log('멘트:', downment);
                                    }

                                    if (completionMessage) {
                                        speechSynthesis.speak(completionMessage);
                                    } else {
                                        console.error('음성 메시지가 설정되지 않았습니다.');
                                    }

                                    clearInterval(interval);
                                }
                            } else {
                                lastGoingValue = data.going;
                            }
                        })
                        .catch(error => {
                            console.error('데이터 가져오기 실패:', error);
                            clearInterval(interval); 
                        });
                    }, 1000);
                }               
                GuideButton.addEventListener('click', function() {
                        imgModal.style.display = 'none';
                        marker.remove();
                        additionalMarker.remove();

                        const clickNum = click_num;
                        
                        updateClickNumInDB(clickNum); 

                        moveModalImage.src = '/static/img/movemodal.png';
                        moveModal.style.display = 'block';
                                            
                });

                cancelButton.addEventListener('click', function() {
                    imgModal.style.display = 'none';
                    marker.remove();
                    additionalMarker.remove();
                        
                    const clickNum = storeData.click_num;

                    previousClickNum = null;

                    if (previousClickNum === clickNum) {
                        return;
                    }
                        
                    previousClickNum = clickNum;

                });

            } else {
                console.error("모달 이미지 또는 모달 요소를 찾을 수 없습니다.");
            }
        }
    }



    function playAudio(audioPath) {
        var audio = new Audio(audioPath);
        audio.play();
    }

    function utf8_to_b64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }

    개인 키값 필요
  
    function transcribeAudio(audioContent) {
        const audioData = utf8_to_b64(audioContent);

        const url = 'https://speech.googleapis.com/v1/speech:recognize?key=' + apiKey;
        const requestData = {
            "config": {
                "encoding": "LINEAR16",
                "sampleRateHertz": 16000,
                "languageCode": "ko-KR"
            },
            "audio": {
                "content": audioData
            }
        };

        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(requestData),
            contentType: 'application/json',
            success: function (response) {
                console.log('음성 인식 결과:', response);
            },
            error: function (xhr, status, error) {
                console.error('오류 발생:', error);
            }
        });
    }

});


function hideWaveContainer() {
    var waveContainer = document.querySelector(".waveContainer");
    waveContainer.style.display = "none";
}


window.onload = function () {
    playWelcomeVoice();
};

function playWelcomeVoice() {
    if (typeof Audio === "undefined") {
        alert("이 브라우저는 오디오를 지원하지 않습니다.");
        return;
    }

    var welcomeAudio = new Audio("/static/audio/welcome.wav");
    welcomeAudio.play();
}

function stopWelcomeVoice() {
    if (typeof welcomeVoice !== "undefined" && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
}
