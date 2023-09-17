if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then((registration) => {
      console.log('Service Worker Registered', registration);
    })
    .catch((error) => {
      console.log('Service Worker Registration Failed', error);
    });
  }

  // Fetch quote from API
async function getStoicQuote() {
  try {
    const response = await fetch('https://stoic-quotes.com/api/quote');
    const data = await response.json();
    const { text, author } = data;
    // console.log("data", data) // debug

    document.getElementById("quoteText").innerText = `"${text}"`;
    document.getElementById("quoteAuthor").innerText = `- ${author}`;


  } catch (error) {
    console.error("There was a problem fetching the quote: ", error);
  }
}


getStoicQuote();


document.getElementById("newQuote").addEventListener("click", getStoicQuote);