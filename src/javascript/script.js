let concentrationTime = 150000, breakTime = 300;

let interval = 0, timer = concentrationTime; 

function formatTime(time){
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function setTimer(timer){
    document.getElementById('timer').innerHTML = formatTime(timer);
}

function toggleTimer() {
    clearInterval(interval);
    let playPauseButton = document.getElementById('play');
    let mode = playPauseButton.getAttribute('action');
    if (mode == 'play' || mode == 'continue'){
        interval = setInterval(() => {
            timer -= 1;
            setTimer(timer);
            if (timer <= 0){clearInterval(interval);}
        }, 10);
        playPauseButton.setAttribute('action', 'pause');
        playPauseButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }else{
        playPauseButton.setAttribute('action', 'continue');
        playPauseButton.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

document.getElementById('play').addEventListener("click", toggleTimer);