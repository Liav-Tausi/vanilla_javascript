

function startTimer(amount) {
  const btn = document.getElementById('s-btn')
  const initialTimeTimer = document.getElementById('timer');
  let time = initialTimeTimer.value;
  let stop = false;
  if (amount) {
    time = amount;
  };

  if (btn.textContent === 'Cancel') {
    document.getElementById("count-down").innerText = 0;
    clearInterval(timerId);
    initialTimeTimer.removeAttribute("disabled");
    btn.textContent = 'Start';
  } else {
    btn.textContent = 'Cancel';
    localStorage.setItem("countDown_and_Date", initialTimeTimer.value +'__'+ new Date().getTime());
    timerId = setInterval(() => {
      if (!stop && time >= 0) {
        document.getElementById("count-down").innerText = time;
        initialTimeTimer.setAttribute('disabled', "");
        time--;
        if (time < 0) {
          stop = true;
          btn.textContent = 'Start'
          clearInterval(timerId);
          initialTimeTimer.removeAttribute("disabled");
          document.getElementById("count-down").innerText = 0;
        };
      };
    }, 1000);
  };
};



window.onload = () => {
  const popUp = document.getElementById('popUpDiv')
  const countDownData = localStorage.getItem('countDown_and_Date');
  const para = document.getElementById('para')

  if (countDownData) {
    popUp.style.display = "block"
    const [time, date] = countDownData.split('__');
    const endTime = new Date(Number(date) + time * 1000);
    const currentTime = new Date();
    para.textContent = `You have an unfinished count of ${time} seconds, that was set on ${endTime.toLocaleString()}.`
    if (endTime > currentTime) {
      const timeDiff = Math.abs(endTime - currentTime);
      const timeDiffSeconds = Math.floor(timeDiff / 1000);
    };
  };
};



const closeBtn = document.getElementById('closeBtn')
.addEventListener('click', closePopup)

function closePopup() {
  document.getElementById('popUpDiv').style.display = 'none';
  localStorage.removeItem('countDown_and_Date');
  return false;
};


const resumeBtn = document.getElementById('resumeBtn')
.addEventListener('click', resume)

function resume() {
  const countDownData = localStorage.getItem('countDown_and_Date');
  const time = countDownData.split('__')[0];
  startTimer(time);
  closePopup();
};