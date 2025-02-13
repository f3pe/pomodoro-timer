let focusTime = 1500, breakTime = 300;

let interval, timer = focusTime; 

function formatTime(time){
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor((time % 60));

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
        }, 1000);
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
        timer = breakTime;
        setTimer();
        breakFocusButton.setAttribute('action', 'focus');
        breakFocusButton.innerHTML = '<i class="fa-solid fa-bullseye"></i>';
        document.getElementById('container').style.boxShadow = "0 0 1rem #39FF14";
        document.getElementById('timer').style.color = "#39FF14";
    }else{
        timer = focusTime;
        setTimer();
        breakFocusButton.setAttribute('action', 'break');
        breakFocusButton.innerHTML = '<i class="fa-solid fa-mug-hot"></i>';
        document.getElementById('container').style.boxShadow = "0 0 1rem #D40909"
        document.getElementById('timer').style.color = "#D40909";
    }
    
    let playPauseButton = document.getElementById('play');
    playPauseButton.setAttribute('action', 'continue');
    playPauseButton.innerHTML = '<i class="fa-solid fa-play"></i>';
}

document.getElementById('play').addEventListener("click", toggleTimer);
document.getElementById('break').addEventListener("click", changeMode);

function redefinir() {
    do{
        focusTime = (prompt("Quantos minutos de foco?") * 60);
        if(isNaN(focusTime) || focusTime < 0){
            alert("Digite um número valido: ");
        }
    }while(isNaN(focusTime) || focusTime < 0);
    do{
        breakTime = (prompt("Quantos minutos de pausa?") * 60);
        if(isNaN(breakTime) || breakTime < 0){
            alert("Digite um número valido: ");
        }
    }while(isNaN(breakTime) || breakTime < 0);

    clearInterval(interval);
    let breakFocusButton = document.getElementById('break');
    timer = focusTime;
    setTimer();
    breakFocusButton.setAttribute('action', 'break');
    breakFocusButton.innerHTML = '<i class="fa-solid fa-mug-hot"></i>';
    let playPauseButton = document.getElementById('play');
    playPauseButton.setAttribute('action', 'continue');
    playPauseButton.innerHTML = '<i class="fa-solid fa-play"></i>';
}