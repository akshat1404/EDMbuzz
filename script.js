console.log('EDM buzz');
let songIndex=0;
let currentSong=new Audio();
currentSong.volume=0.5;
let masterPlay=document.getElementById('masterPlay');
let backward=document.getElementById('backward');
let forward=document.getElementById('forward');
let progressBar=document.getElementById('progressBar');
let volumeControl=document.getElementById('volumeControl');
let volumeBar=document.getElementById('slider');
let gif=document.getElementById('gif');
let songCollection=Array.from(document.getElementsByClassName('song'));
let songs= [
      {songName:'Alan Walker - Spectre',filePath:'songs/1.mp3'},
      {songName:'Avicii - Levels',filePath:'songs/2.mp3'},
      {songName:'Calvin Harris - C.U.B.A',filePath:'songs/3.mp3'},
      {songName:'Cartoon - On & On (feat. Daniel Levi)',filePath:'songs/4.mp3'},
      {songName:'Deadmau5 - Strobe',filePath:'songs/5.mp3'},
      {songName:'DEAF KEV - Invincible',filePath:'songs/6.mp3'},
      {songName:'Elektronomia - Sky High',filePath:'songs/7.mp3'},
      {songName:'Marshmello - Alone',filePath:'songs/8.mp3'},
      {songName:'Martin Garrix & Brooks - Byte',filePath:'songs/9.mp3'},
      {songName:'Warriyo - Mortals (feat. Laura Brehm)',filePath:'songs/10.mp3'},
]

let currenttime=document.getElementById('currentTime');
currenttime.innerText='00:00';
let songDuration=document.getElementById('duration');
songDuration.innerText='00:00';

let title=document.getElementById('title');


makeAllpause=()=>{
      songCollection.forEach((song)=>{
            song.id="pause";
      })
}

songCollection.forEach((song,i)=>{
      song.getElementsByClassName('songName')[0].innerText=songs[i].songName;

      song.addEventListener('click',(event)=>{
            let id=event.target.id;
            if(id==='pause'){
                  makeAllpause();
                  masterPlay.classList.remove('fa-play-circle');
                  masterPlay.classList.add('fa-pause-circle');
                  event.target.id='nowPlaying';
                  songIndex=parseInt(i+1);
                  currentSong.src='songs/'+songIndex+'.mp3';
                  currentSong.duration=0;
                  currentSong.play();
                  title.innerText=songs[songIndex-1].songName;
                  gif.src="images/moving.gif";
                  progressBar.value=0;
            }
      })
})

masterPlay.addEventListener('click',()=>{
      if(currentSong.paused||currentSong.currentTime===0){
            if(songIndex!==0){
                  currentSong.play();
                  masterPlay.classList.remove('fa-play-circle');
                  masterPlay.classList.add('fa-pause-circle');
                  gif.src="images/moving.gif";
            }
      }else{
            currentSong.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.src="images/still.gif";
      }
})

backward.addEventListener('click',()=>{
      if(songIndex!==0){
            songCollection[songIndex-1].id='pause';
            songIndex=songIndex-1;
            if(songIndex==0)  songIndex=10;
            songCollection[songIndex-1].id='nowPlaying';
            currentSong.src='songs/'+songIndex+'.mp3';
            currentSong.play();
            title.innerText=songs[songIndex-1].songName;
            gif.src="images/moving.gif";
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            progressBar.value=0;      
      }
})

forward.addEventListener('click',()=>{
      if(songIndex!==0){
            songCollection[songIndex-1].id='pause';
            songIndex=songIndex+1;
            if(songIndex==11) songIndex=1;
            songCollection[songIndex-1].id='nowPlaying';
            currentSong.src='songs/'+songIndex+'.mp3';
            currentSong.play();
            title.innerText=songs[songIndex-1].songName;
            gif.src="images/moving.gif";
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            progressBar.value=0;
      }
})

currentSong.addEventListener('timeupdate',()=>{
      progressBar.value=0;
      let progress=parseInt((currentSong.currentTime/currentSong.duration)*100);
      let totalMin=parseInt(currentSong.duration/60);
      let totalSec=parseInt(currentSong.duration-totalMin*60);
      let min=parseInt(currentSong.currentTime/60);
      let sec=parseInt(currentSong.currentTime-min*60);
      if (totalMin< 10) { totalMin = "0" + totalMin; }
      if (totalSec < 10) { totalSec = "0" + totalSec; }
      if (min< 10) { min = "0" + min; }
      if (sec < 10) { sec = "0" + sec; }
      currenttime.innerText=min+':'+sec;
      songDuration.innerText=totalMin+':'+totalSec;
      progressBar.value=progress;
})

progressBar.addEventListener('change',()=>{
      currentSong.currentTime=(progressBar.value*currentSong.duration)/100;
})

volumeBar.addEventListener('change',()=>{
      currentSong.volume=(volumeBar.value)/100;
      console.log(currentSong.volume);
      if(currentSong.volume===0){
            volumeControl.classList.remove('fa-volume-off');
            volumeControl.classList.remove('fa-volume-low');
            volumeControl.classList.remove('fa-volume-high');
            volumeControl.classList.add('fa-volume-off');
      }else if(currentSong.volume<=0.5){
            volumeControl.classList.remove('fa-volume-off');
            volumeControl.classList.remove('fa-volume-low');
            volumeControl.classList.remove('fa-volume-high');
            volumeControl.classList.add('fa-volume-low');
      }else{
            volumeControl.classList.remove('fa-volume-off');
            volumeControl.classList.remove('fa-volume-low');
            volumeControl.classList.remove('fa-volume-high');
            volumeControl.classList.add('fa-volume-high');            
      }
})