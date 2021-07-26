//TO DO: hide controls and build own interface- button to pause/play, button for volume slider, speed button, skip buttons, click videoit will pause/play

//1. get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip');
const ranges = player.querySelectorAll('.player__slider');

//2. build functions
function togglePlay() {
  if (video.paused) { //no playing property, only pause property
    video.play();
  } else {
    video.pause();
  }
};

function updateButton () {
  const icon = this.paused ? '►' : '❚ ❚'; //we use this as it is an object bound to the video itself. when the video is paused we want button to be play button
  toggle.textContent = icon; // toggle is the button to change icon per the query selector, textContent is the property of the button that needs to change
};

function skip() {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip); //this is a string so wrap it in parseFloat to turn into a number to pass to video.currentTime
};

function handleRangeUpdate() {
  video[this.name] = this.value;
};

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};


//3. event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', () => mousedown && scrub(e)); //checks that the mousedown is true before it goes on to execute scrub(e)
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
