// Check if service workers are supported in the current browser
if ('serviceWorker' in navigator) {
  // Register the service worker
  navigator.serviceWorker.register('service-worker.js')
  .then((registration) => {
      // Log the successful registration of the service worker
      console.log('Service Worker Registered', registration);
  })
  .catch((error) => {
      // Log the error if the service worker registration fails
      console.log('Service Worker Registration Failed', error);
  });
}

// Function to fetch a quote from the Stoic Quotes API
async function getStoicQuote() {
try {
  // Fetch the quote
  const response = await fetch('https://stoic-quotes.com/api/quote');
  // Parse the response to JSON
  const data = await response.json();
  // Destructure the quote text and author from the data
  const { text, author } = data;

  // Set the quote text and author in the DOM
  document.getElementById("quoteText").innerText = `"${text}"`;
  document.getElementById("quoteAuthor").innerText = `- ${author}`;

} catch (error) {
  // Log any errors that occur during the fetch
  console.error("There was a problem fetching the quote: ", error);
}
}

// Fetch a quote when the script loads
getStoicQuote();

// Add an event listener to the "new quote" button to fetch a new quote when clicked
document.getElementById("newQuote").addEventListener("click", getStoicQuote);

// Check if the Web Share API is available
if (navigator.share) {
// Add an event listener to the "share quote" button to share the quote when clicked
document.getElementById('shareQuote').addEventListener('click', async () => {
  // Get the current quote and author from the DOM
  const text = document.getElementById('quoteText').innerText;
  const author = document.getElementById('quoteAuthor').innerText;
  // Create the share data
  const shareData = {
    title: 'Stoic Quote of the Day',
    text: `${text} — ${author}`,
    url: window.location.href
  };
  try {
    // Attempt to share the quote
    await navigator.share(shareData);
  } catch(err) {
    // Log any errors that occur during sharing
    console.error('Sharing failed:', err);
  }
});
} else {
// Hide the "share quote" button if the Web Share API is not supported
document.getElementById('shareQuote').style.display = 'none';
}