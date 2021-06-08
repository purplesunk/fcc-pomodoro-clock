const timerDisplay = document.getElementById('time-left')
const selectors = document.querySelector('.time-selectors')
const buttons = selectors.querySelectorAll('button')
const sessionLength = selectors.querySelector('#session-length')
const breakLength = selectors.querySelector('#break-length')
const timerLabel = document.querySelector('#timer-label')
const sound = document.querySelector('#beep')
let timerState = timerDisplay.dataset.state
let timerSession = timerDisplay.dataset.session

/*====== BUTTONS CHANGING VALUES ============*/
buttons.forEach(button => button.addEventListener('click', event => {
  if (timerState === "running") return
  const button = event.currentTarget
  const timeLength = button.parentNode.querySelector('.lengths')
  const number = Number(timeLength.innerText)
  const classes = button.classList


  if (classes.contains('increment')) {
    if (number < 60) { 
      timeLength.innerText = number + 1 
    }
  }


  if (classes.contains('decrement')) {
    if (number > 1) {
      timeLength.innerText = number - 1
    }
  }

  if (classes.contains('session')) {
    m = Number(timeLength.innerText)
    s = 0
    if (timerLabel.innerText === 'Session') {
      timerDisplay.innerText = timeLength.innerText + ":" + "00"
    }
  }

  if (classes.contains('break') && timerLabel.innerText === 'Break') {
      m = Number(timeLength.innerText)
      s = 0
      timerDisplay.innerText = timeLength.innerText + ":" + "00"
    }
}))

/*============= PLAY STOP CLOCK =====================*/

let s = 0
let m = 25
function count() {
    if (s === 0) {
      if (m === 0) {
          if (timerSession !== "break") {
            timerSession = "break"
      
            timerLabel.innerText = "Break"
      
            m = Number(breakLength.innerText)
            
            timerDisplay.innerText = checkNumber(m) + ":" + checkNumber(s)
            return

          } else {
            timerSession = "main"
            timerLabel.innerText = "Session"
            m = Number(sessionLength.innerText)

            timerDisplay.innerText = checkNumber(m) + ":" + checkNumber(s)
            return
          }
        }


     m -= 1
     s = 59
     
     timerDisplay.innerText = checkNumber(m) + ":" + checkNumber(s)
   } else {
      s -= 1
      timerDisplay.innerText = checkNumber(m) + ":" + checkNumber(s)
   }
  if (m === 0 && s === 0) { sound.play() }
}

function checkNumber(num) {
  if (num < 10) { num = "0" + num }
  return num
}


/*========= PLAY CLICK EVENT ===========*/
const playStop = document.querySelector('#start_stop')
let timeout = 0

playStop.addEventListener('click', () => {
  if (timerState === "running") {
    clearTimeout(timeout)
    timerState = "stoped"
  } else {
    timerState = "running"
    timeout = setInterval(count, 1000)
  }
})

/*========= RESET CLICK EVENT ===========*/
const reset = document.querySelector('#reset')
reset.addEventListener('click', () => {
  clearTimeout(timeout)
  sound.pause()
  sound.currentTime = 0

  m = 25
  s = 0
  
  sessionLength.innerText = 25
  breakLength.innerText = 5
  timerDisplay.innerText = m + ":" + checkNumber(s)
  timerLabel.innerText = "Session"

  timerState = ""
  timerSession = ""
})
