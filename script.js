console.log("welcome to spotify");

//initialize the variable
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let IsCurrent = false;

let songs = [
    {songName:"Rata lambiya- shersaah",filepath:"songs/1.mp3",coverPath :"covers/1.jpg"},
    {songName:"kithe-chaliye - shershha ",filepath:"songs/2.mp3",coverPath :"covers/2.jpg"},
    {songName:"Mann Bharya - B praak",filepath:"songs/3.mp3",coverPath :"covers/3.jpg"},
];




//handle play pause event 
masterPlay.addEventListener('click',()=>{
    makeAllPlays();
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        IsCurrent = true;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
        let play = document.getElementById(songIndex+1);
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
       
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
        let play = document.getElementById(songIndex+1);
        play.classList.add('fa-play-circle');
        play.classList.remove('fa-pause-circle');
    }
});

//display all info song array 
songItems.forEach((Element,i)=>{
    Element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    Element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    //Element.getElementsByClassName("timeStamp")[0].innerTExt = songs[]

});
//Listen to event
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    var progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value *audioElement.duration)/100
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((Element)=>{
        Element.classList.add("fa-play-circle");
        Element.classList.remove("fa-pause-circle");
        gif.style.opacity = 0;
    })
};


Array.from(document.getElementsByClassName("songItemPlay")).forEach((Element)=>{
    
    Element.addEventListener('click',(e)=>{
        makeAllPlays();
        if(audioElement.paused && !IsCurrent){
            let currentTime = audioElement.currentTime;
            songIndex = parseInt(e.target.id);
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");
            audioElement.src = `songs/${songIndex}.mp3`;
            audioElement.play();
            IsCurrent = true;
            gif.style.opacity = 1;
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
            masterSongName.innerText = songs[songIndex -1].songName;
        }
        else if(audioElement.paused && IsCurrent){
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");
        }
        else if(!audioElement.paused && !(e.target.id == songIndex)){
            songIndex = parseInt(e.target.id);
            audioElement.src = `songs/${songIndex}.mp3`;
            audioElement.play();
            IsCurrent = true;
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");
            gif.style.opacity = 1;
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
            masterSongName.innerText = songs[songIndex -1].songName;

        }
        else{
            audioElement.pause();
            masterPlay.classList.add("fa-play-circle");
            masterPlay.classList.remove("fa-pause-circle");
            e.target.classList.add("fa-play-circle");
            e.target.classList.remove("fa-pause-circle");
            gif.style.opacity = 0;
        }
        
        
    });
});

document.getElementById("previous").addEventListener("click",()=>{
    makeAllPlays();
    if(songIndex <= 0){
        songIndex = 0
    }
    else{
        songIndex -=1
    }
    audioElement.src = `songs/${songIndex +1 }.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterSongName.innerText = songs[songIndex].songName;
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        let play = document.getElementById(songIndex+1);
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
    
});

document.getElementById("next").addEventListener("click",()=>{
    makeAllPlays();
    if(songIndex >= 2){
        songIndex = 0
    }
    else{
        songIndex += 1
    }
    audioElement.src = `songs/${songIndex +1 }.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        let play = document.getElementById(songIndex+1);
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
});