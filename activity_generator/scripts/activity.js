

const mainDiv = document.getElementById('infoEndPoint');
const displayUl = document.createElement('ul');
displayUl.setAttribute('class', 'container w-auto')

const btn = document.getElementById('btn1');
btn.addEventListener('click', makeApiRequest);

mainDiv.appendChild(displayUl);

const numEndPoint = document.getElementById('numEndPoint');
const selectElement = document.getElementById('selectElement');
const checkElement = document.getElementById('checkElement');



async function makeApiRequest() {
  let options

  if (checkElement.checked) {
    options = {
      'participants': numEndPoint.innerText,
      'type': selectElement.value,
      'price': '0.0'
    };
  } else {
    options = {
      'participants': numEndPoint.innerText,
      'type': selectElement.value,
    };
  }
  const queryParams = new URLSearchParams(options);
  const apiUrl = `${'https://www.boredapi.com/api/activity/'}?${queryParams.toString()}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  let retVal

  if (data.activity) {
    retVal = data.activity
  } else {
    retVal = 'no activitys'
  };


  return displayUl.innerHTML =
  `<li class="bg-dark d-flex justify-content-center rounded mt-5 p-5 text-warning">
    <h3>${retVal}</h3>
  </li>`;
};


function range(event) {
  numEndPoint.innerHTML = `<strong>${event.target.value}</strong>`;
  return event.target.value;
};
