const quoteContainer = document.getElementById('quote-container');
const quoteTextA = document.getElementById('quotea');
const quoteTextE = document.getElementById('quotee');
const ayahText = document.getElementById('ayah');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');




let apiQuote = []

//show new quote


function loading()
{
    loader.hidden = false;
    quoteContainer.hidden = true;
    
}

function complete()
{
 quoteContainer.hidden = false;
 loader.hidden = true;   
}

async function newQuote()
{
    loading();
    verse = Math.floor(Math.random()* 6237)+1;
    const apiurl = 'http://api.alquran.cloud/ayah/'+verse+'/editions/quran-uthmani,en.pickthall'

    try {
        const response = await fetch(apiurl) 
        apiQuote = await response.json();
        console.log(apiQuote);

    } catch (error) {
        
        //catch error
        
    }

    //check quote length to decide style

    arabic = apiQuote['data'][1]['text'];
    english = apiQuote['data'][0]['text'];
    


    if(english.length > 50)
    {
        quoteTextA.classList.add('long-quote');
        quoteTextE.classList.add('long-quote');
        console.log("long")
    
    }else {
        quoteTextA.classList.remove('long-quote');
        quoteTextE.classList.remove ('long-quote');
    }
   

    
    quoteTextA.textContent = arabic
    quoteTextE.textContent = english

    ayahText.textContent = apiQuote['data'][0]['surah']['englishName']+
    "("+(apiQuote['data'][0]['surah']['number'])+")"+":"+
    apiQuote['data'][0]['numberInSurah']

    complete();


}

//get ayah from api
async function getayah()
{
    loading();
    verse = Math.floor(Math.random()* 6237)+1;
    const apiurl = 'http://api.alquran.cloud/ayah/'+verse+'/editions/quran-uthmani,en.pickthall'

    try {
        const response = await fetch(apiurl) 
        apiQuote = await response.json();
        console.log(apiQuote);

    } catch (error) {
        
        //catch error
        
    }
   
    arabic = apiQuote['data'][1]['text'];
    english = apiQuote['data'][0]['text'];
    


    if(english.length>50)
    {
        quoteTextA.classList.add('long-quote');
        quoteTextE.classList.add('long-quote');
        console.log("long")
    
    }else {
        quoteTextA.classList.remove('long-quote');
        quoteTextE.classList.remove ('long-quote');
    }
   

    
    quoteTextA.textContent = arabic
    quoteTextE.textContent = english

    ayahText.textContent = apiQuote['data'][0]['surah']['englishName']+
    "("+(apiQuote['data'][0]['surah']['number'])+")"+":"+
    apiQuote['data'][0]['numberInSurah']

    complete();

}


function telegram()
{
    const teleurl = `https://t.me/share/url?url=${pageurl}&text=${message}`
    window.open(teleurl,'_blank');
}




//Eventlistner

newQuoteBtn.addEventListener('click',newQuote)
twitterBtn.addEventListener('click',telegram)




getayah();
