//getting input and button from HTML
const signInput = document.getElementById("signInput");
const signFindBtn = document.getElementById("signFind");

//adding event on click to button
signFindBtn.addEventListener("click", getSignInfo);


async function getSignInfo(){
  //getting necessary characteristics from HTML
  const zodiacName = document.getElementById("zodiacName");
  const zodiacDate = document.getElementById("date");
  const zodiacMood = document.getElementById("mood");
  const zodiacDescription = document.getElementById("desc");
  const zodiacColor = document.querySelector(".colorBody");
  const zodiacTime = document.querySelector(".timeBody");
  const zodiacLucky = document.querySelector(".luckyBody");
  const zodiacComp = document.querySelector(".compBody");

  //getting the value of the input in lower case
  const zodiac = signInput.value.toLowerCase();

  //stating options of API
  const options = {
    method: 'POST', //method of getting updated info through server
    url: 'https://sameer-kumar-aztro-v1.p.rapidapi.com/', //url of API 
    params: {sign: zodiac, day: 'today'}, //parameters for finding zodiacs in API server
    headers: { //host address and key of API
      'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com',
      'X-RapidAPI-Key': 'dc1cee9725msh6dcc8a74b55e236p194563jsn7df2a819d65d'
    }
  }

  const responseData = await axios  //assigning response data through axios
  .request(options) //requesting options above
  .then(response => response.data) //getting data
  .catch(error => error); //catching errors 
  console.log(responseData); //testing response output 
    
  //assigning data about characteristics from response to new variables(? sign checks if there's any response)
  const dateRange = responseData?.date_range;
  const color = responseData?.color;
  const description = responseData?.description;
  const mood = responseData?.mood;
  const compatible = responseData?.compatibility;
  const number = responseData?.lucky_number;
  const time = responseData?.lucky_time;

  //outputing gotten data on page by changing inner HTML values
  zodiacName.innerHTML = zodiac.toUpperCase();
  zodiacDate.innerHTML = dateRange;
  zodiacMood.innerHTML = mood;
  zodiacDescription.innerHTML = description;
  zodiacColor.innerHTML = color;
  zodiacTime.innerHTML = time;
  zodiacLucky.innerHTML = number;
  zodiacComp.innerHTML = compatible;
}