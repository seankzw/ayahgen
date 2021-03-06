const quoteContainer = document.getElementById("quote-container");
const quoteTextA = document.getElementById("quotea");
const quoteTextE = document.getElementById("quotee");
const ayahText = document.getElementById("ayah");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let prod = true;
let url = new URL(prod ? "https://ayahgen.vercel.app/" : "http://127.0.0.1:5501/index.html"); //prod

let apiQuote = [];

//show new quote

//Show loader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide loader
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

async function newQuote() {
  loading();
  const query = window.location.search;
  const urlParams = new URLSearchParams(query);
  let verse = 0;
  if (urlParams.get("v") == null) {
    verse = Math.floor(Math.random() * 6237) + 1;
  } else {
    verse = urlParams.get("v");
  }

  const apiurl =
    "https://api.alquran.cloud/ayah/" +
    verse +
    "/editions/quran-uthmani,en.pickthall";

  try {
    let time1 = performance.now();
    const response = await fetch(apiurl);
    apiQuote = await response.json();
    let time2 = performance.now();
    console.log("newQuote() performance:");
    console.log(time2 - time1);
    console.log(apiQuote);
  } catch (error) {
    //catch error
  }

  //check quote length to decide style

  arabic = apiQuote["data"][1]["text"];
  english = apiQuote["data"][0]["text"];

  if (english.length > 50) {
    quoteTextA.classList.add("long-quote");
    quoteTextE.classList.add("long-quote");
    console.log("long");
  } else {
    quoteTextA.classList.remove("long-quote");
    quoteTextE.classList.remove("long-quote");
  }

  quoteTextA.textContent = arabic;
  quoteTextE.textContent = english;
  ayahText.textContent =
    apiQuote["data"][0]["surah"]["englishName"] +
    "(" +
    apiQuote["data"][0]["surah"]["number"] +
    ")" +
    ":" +
    apiQuote["data"][0]["numberInSurah"];

  complete();
}

//get ayah from api
async function getayah() {
  console.log('v1.2')
  loading();
  //let verse = Math.floor(Math.random() * 6237) + 1;
  const query = window.location.search;
  const urlParams = new URLSearchParams(query);
  let verse = urlParams.get("v");
    verse =  verse == null ? Math.floor(Math.random() * 6237) + 1 : verse;

  const apiurl =
    "https://api.alquran.cloud/ayah/" +
    verse +
    "/editions/quran-uthmani,en.pickthall";

  try {
    let time1 = performance.now(); //! Time Start
    const response = await fetch(apiurl);
    apiQuote = await response.json();
    let time2 = performance.now(); //! Time End

    console.log("getAyah() performance :");
    console.log(time2 - time1); //! Time taken to execute
    console.log(apiQuote);
  } catch (error) {
    //catch error
  }

  arabic = apiQuote["data"][1]["text"];
  english = apiQuote["data"][0]["text"];

  if (english.length > 50) {
    quoteTextA.classList.add("long-quote");
    quoteTextE.classList.add("long-quote");
    console.log("long");
  } else {
    quoteTextA.classList.remove("long-quote");
    quoteTextE.classList.remove("long-quote");
  }

  quoteTextA.textContent = arabic;
  quoteTextE.textContent = english;

  ayahText.textContent =
    apiQuote["data"][0]["surah"]["englishName"] +
    "(" +
    apiQuote["data"][0]["surah"]["number"] +
    ")" +
    ":" +
    apiQuote["data"][0]["numberInSurah"];


  url.searchParams.set("v", verse);
  //window.location.href=url;

  window.history.replaceState(null, null, `?${verse}`)
  console.log(url);
  complete();
}

function telegram() {
  //const teleurl = `https://t.me/share/url?url=${pageurl}&text=${message}`;
  window.open("https://t.me/share/url?url=hi&text=bro", "_blank");
}

//Eventlistner

newQuoteBtn.addEventListener("click", getayah);
twitterBtn.addEventListener("click", telegram);

getayah();
