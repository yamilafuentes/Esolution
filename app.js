let currentTab = 0
showTab(currentTab)

function showTab (_currentTab) {
  const tabs = document.getElementsByClassName("tab")
  tabs[_currentTab].style.display = "block"

  if (_currentTab == 0)
    document.getElementById("prevBtn").style.display = "none"
  else
    document.getElementById("prevBtn").style.display = "inline"

  if (_currentTab == (tabs.length - 1))
    document.getElementById("nextBtn").innerHTML = "Submit"
  else
    document.getElementById("nextBtn").innerHTML = "Next"
  changeStep(_currentTab)
  showButton(_currentTab)
}

async function nextPrev (newTab) {
  const tabs = document.getElementsByClassName("tab")
  if (newTab == 1 && !validateForm()) 
    return false

  tabs[currentTab].style.display = "none"
  currentTab = currentTab + newTab

  if (currentTab >= tabs.length) {
    await submit()
    location.reload()
    return false
  }

  showTab(currentTab)
}

function validateForm() {
  const email_test = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  let  valid = true
  const tabs = document.getElementsByClassName("tab")
  const inputs = tabs[currentTab].getElementsByTagName("input")
  const password_test = Array.from(inputs).filter(i => i.type === "password")

  for (let i = 0; i < inputs.length; i++) {

    if (inputs[i].value == "") {
      inputs[i].className += " invalid"
      valid = false
    }

    if (inputs[i].type === "number" && inputs[i].value.length < 10 ) {
      inputs[i].className += " invalid"
      valid = false
    }

    if (inputs[i].type === "email" && !email_test.test(inputs[i].value)) {
      inputs[i].className += " invalid"
      valid = false
    }

    if (inputs[i].type === "password" && inputs[i].value.length < 8 ) {
      inputs[i].className += " invalid"
      valid = false
    } 
  }

  if (password_test.length !== 0 && password_test[0].value !== password_test[1].value) {
    inputs[1].className += " invalid"
    inputs[2].className += " invalid"
    valid = false
  }

  if (valid)
    document.getElementsByClassName("step")[currentTab].className += " finish"

  return valid
}

function changeStep(_currentTab) {
  let steps = document.getElementsByClassName("step")
  for (let i = 0; i < steps.length; i++)
    steps[i].className = steps[i].className.replace(" active", "")

  steps[_currentTab].className += " active"
}

function showButton (_currentTab) {
  if (_currentTab !== 0) {
    document.getElementById("nextBtn").style.width = "48%"
  } else {
    document.getElementById("nextBtn").style.width = "97%"
  }
}


async function submit () {
  const tabs = document.getElementsByClassName("tab")
  const user_data = [ 
    ...(tabs[0].getElementsByTagName("input")), 
    ...(tabs[1].getElementsByTagName("input")), 
    ...(tabs[2].getElementsByTagName("input"))
  ].map(element => element.value)

  const users = await (await fetch('https://6276815e15458100a6afdfa5.mockapi.io/api/v1/users')).json()
  const new_id = parseInt(users[users.length - 1].id) + 1
 
  const data = {
    "id": new_id,
    "firstName": user_data[0],
    "lastName": user_data[1],
    "phone": user_data[2],
    "birthday": (new Date(user_data[3])).valueOf(),
    "email": user_data[4],
    "password": user_data[5],
    "repeatPassword": user_data[6],
    "color": user_data[7],
    "place": user_data[8],
    "pet": user_data[9],
    "song": user_data[10],
  }
  console.log(data)
  await fetch('https://6276815e15458100a6afdfa5.mockapi.io/api/v1/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  
}

