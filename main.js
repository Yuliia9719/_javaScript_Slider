(function () {
const body = document.body;
const container = document.querySelector('#carousel');
const slides = container.querySelectorAll('.slide');
const indicatorsContainer = container.querySelector('#indicators-container');
const indicatorItems = container.querySelectorAll('.indicator');
const pauseBtn = container.querySelector('#pause-btn');
const prevBtn = container.querySelector('#prev-btn');
const nextBtn = container.querySelector('#next-btn');
const SLIDES_COUNT = slides.length
const CODE_ARROW_LEFT = 'ArrowLeft'
const CODE_ARROW_RIGHT = 'ArrowRight'
const CODE_SPACE = 'Space'

let currentSlide = 0;
let timerId = null;
let isPlaying = true;
let startPosX = null;
let endPosX = null;
let interval = 2000;

function goToNth(n) {
 slides[currentSlide].classList.toggle('active')
 indicatorItems[currentSlide].classList.toggle('active')
 currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT
 slides[currentSlide].classList.toggle('active')
 indicatorItems[currentSlide].classList.toggle('active')
  }

function setBgToBody() { 
  body.style.backgroundImage = slides[currentSlide].style.backgroundImage
  }

function goToNext() { 
  goToNth(currentSlide + 1)
   setBgToBody()
  }
  
function goToPrev() {
  goToNth(currentSlide - 1)
  setBgToBody()
  }
  
function tick() {
  timerId = setInterval(goToNext, interval);
}
//*pause
function pauseHandler() {
  if (!isPlaying) return
  clearInterval(timerId)
  pauseBtn.innerHTML = 'Play'
  isPlaying = false
}
//*play
function playHandler() {
  tick()
  pauseBtn.innerHTML = 'Pause'
  isPlaying = true
  }

function pausePlayHandler() {
  isPlaying ? pauseHandler() : playHandler()
  }

function nextHandler() { 
  pauseHandler()
  goToNext()
  setBgToBody()
}

function prevHandler() { 
  pauseHandler()
  goToPrev()
  setBgToBody()
  }
 
function indicateHandler(e) {
  const { target } = e
  if (target && target.classList.contains('indicator')) {
  pauseHandler()
  goToNth(+target.dataset.slideTo) 
  setBgToBody()
  }
}
  
function pressKeyHandler(e) {
  const { code } = e
  e.preventDefault()
  if (code === CODE_ARROW_LEFT) prevHandler()
  if (code === CODE_ARROW_RIGHT) nextHandler()
  if (code === CODE_SPACE) pausePlayHandler()
}

function swipeStart(e) {
  startPosX = e instanceof MouseEvent ? e.pageX:e.changedTouches[0].pageX
}

function swipeEnd(e) {
  endPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX

  if (endPosX - startPosX > 100) prevHandler()
  console.log('prev')
  if (endPosX - startPosX < -100) nextHandler()
  console.log('next')
  }
  
function initListeners() {
  pauseBtn.addEventListener('click', pausePlayHandler)
  nextBtn.addEventListener('click', nextHandler)
  prevBtn.addEventListener('click', prevHandler)
  indicatorsContainer.addEventListener('click', indicateHandler)
  container.addEventListener('touchstart', swipeStart)
  container.addEventListener('touchend', swipeEnd)
  container.addEventListener('mousedown', swipeStart)
  container.addEventListener('mouseup', swipeEnd)
  document.addEventListener('keydown', pressKeyHandler)
  }
  
function init() {
  initListeners()
  tick()
}
 
init()
})()

