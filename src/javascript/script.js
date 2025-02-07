let focusTime = 150000, breakTime = 30000;

let interval = 0, timer = focusTime; 

function formatTime(time){
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function setTimer(){
    document.getElementById('timer').innerHTML = formatTime(timer);
}

function toggleTimer() {
    clearInterval(interval);
    let playPauseButton = document.getElementById('play');
    let mode = playPauseButton.getAttribute('action');
    if (mode == 'play' || mode == 'continue'){
        interval = setInterval(() => {
            timer -= 1;
            setTimer();
            if (timer <= 0){
                clearInterval(interval);
                document.getElementById('audioPlayer').play()
            }
        }, 10);
        playPauseButton.setAttribute('action', 'pause');
        playPauseButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }else{
        playPauseButton.setAttribute('action', 'continue');
        playPauseButton.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

function changeMode(){
    clearInterval(interval);
    let breakFocusButton = document.getElementById('break');
    let clockMode = breakFocusButton.getAttribute('action');

    if (clockMode == 'break'){
        timer = breakTime
        setTimer();
        breakFocusButton.setAttribute('action', 'focus');
        breakFocusButton.innerHTML = '<i class="fa-solid fa-bullseye"></i>';
    }else{
        timer = focusTime
        setTimer();
        breakFocusButton.setAttribute('action', 'break');
        breakFocusButton.innerHTML = '<i class="fa-solid fa-mug-hot"></i>';
    }
    
    let playPauseButton = document.getElementById('play');
    playPauseButton.setAttribute('action', 'continue');
    playPauseButton.innerHTML = '<i class="fa-solid fa-play"></i>';
}

document.getElementById('play').addEventListener("click", toggleTimer);
document.getElementById('break').addEventListener("click", changeMode);