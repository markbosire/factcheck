document.addEventListener('DOMContentLoaded', function () {

    chrome.storage.sync.get(["key"]).then((result) => {
      fetch(`https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en-US&maxAgeDays=700000&query=${encodeURIComponent(result.key)}&key=AIzaSyBLi3Y5EFUl-APtXBp6nrJtO0jmGBARAgE`)
      .then(response => response.json())
      .then(data => {
        updateDOM(data);
       
      });
     
    }); 
  
});
function updateDOM(data) {
  const resultsContainer = document.getElementById('factCheckResults');

  // Clear previous results
  resultsContainer.innerHTML = '';

  // Check if there are any results
  if (data.claims && data.claims.length > 0) {
      // Loop through each result and create a DOM element for it
      data.claims.forEach(claim => {
          const resultElement = document.createElement('div');
          resultElement.classList.add('fact-check-result');

          // Display relevant information from the fact check result
          resultElement.innerHTML = `
              <h2>${claim.text}</h2>
              <p><strong>Claimant:</strong> ${claim.claimant}</p>
              <p><strong>Claim:</strong> ${claim.claimReview[0].textualRating}</p>
              <p><strong>Fact-Source:</strong> ${claim.claimReview[0].publisher.site}</p>
              <p><strong>URL:</strong> <a href="${claim.claimReview[0].url}" target="_blank">${claim.claimReview[0].url}</a></p>
          `;

          // Append the result element to the results container
          resultsContainer.appendChild(resultElement);
      });
  } else {
      resultsContainer.innerHTML = '<p>No results found.</p>';
  }
}
