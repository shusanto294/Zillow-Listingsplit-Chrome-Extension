// Define the function to insert custom HTML
function insertCustomHTML() {
    // Check if custom HTML is already inserted
    if (!customHTMLInserted) {
        // Define the HTML content you want to insert
        var customHTML = '<div id="listingsplit"><img src="https://listingsplit.com/wp-content/uploads/cropped-Site-Icon_A.png"> 2.5% commission rate</div>';

        // Create a temporary container element
        var tempContainer = document.createElement('div');
        tempContainer.innerHTML = customHTML;

        // Get the first child of the container (your custom element)
        var customElement = tempContainer.firstChild;

        // Find the target element with the class .styles__StyledStickyColumnBox-fshdp-8-100-2__sc-1ng1voa-1
        var siteContentElement = document.querySelector('.styles__StyledStickyColumnBox-fshdp-8-100-2__sc-1ng1voa-1');

        // Check if the .site-content element exists
        if (siteContentElement) {
            // Append the custom element inside the .site-content element
            siteContentElement.appendChild(customElement);
            // Set the flag to true to indicate that custom HTML has been inserted
            customHTMLInserted = true;
        } else {
            console.error('.styles__StyledStickyColumnBox-fshdp-8-100-2__sc-1ng1voa-1 element not found.');
        }
    }
}

// Callback function to be executed when the target element is added to the DOM
function onElementLoaded() {
    // Call the insertCustomHTML function
    insertCustomHTML();

    // Disconnect the observer to stop further monitoring
    observer.disconnect();
}

// Callback function to be executed when the target element is removed from the DOM
function onElementRemoved() {
    // Reset the flag to allow reinsertion of custom HTML
    customHTMLInserted = false;

    // Reconnect the observer to continue monitoring
    observer.observe(document.body, config);
}

// Function to check if the target element is added to or removed from the DOM
function checkForElement(mutationsList, observer) {
    const targetElement = document.querySelector('.styles__StyledStickyColumnBox-fshdp-8-100-2__sc-1ng1voa-1');
    if (targetElement) {
        // If the element is found, execute the callback function
        onElementLoaded();
    } else {
        // If the element is removed, execute the callback function
        onElementRemoved();
    }
}

// Create a new MutationObserver
const observer = new MutationObserver(checkForElement);

// Options for the observer (which mutations to observe)
const config = { childList: true, subtree: true };

// Flag to track whether custom HTML has been inserted
var customHTMLInserted = false;

// Listen for messages from the extension
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    observer.disconnect();

    // Check if the message is 'TabUpdated'
    if (request.message === 'TabUpdated') {
        console.log(document.location.href);
        insertCustomHTML();
        // Reconnect the observer after inserting custom HTML
        observer.observe(document.body, config);
    }
});
