var interval;

function insertHtml(address) {
    // Address data
    var addressData = {
        address: address
    };

    // Send AJAX POST request
    console.log('Sending ajax request');
    $.ajax({
        url: "https://listingsplit.com/wp-json/zillow/v1/commission-rate",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(addressData),
        success: function(response) {
            console.log(response);

            if(response.status == 'found'){
                // Extract commission rate from response data
                var commissionRate = response.custom_fields.finances_buyers_agent_commission[0];
                // Prepare HTML code
                var htmlCode = '<a id="listingsplit" href="' + response.permalink +'" target="_blank"><img src="https://listingsplit.com/wp-content/uploads/cropped-Site-Icon_A.png">' + commissionRate + '% commission rate</a>';
                // Append HTML code into the div with class .layout-sticky-content
                $(".layout-sticky-content").append(htmlCode);
            }else{
                var htmlCode = '<div id="listingsplit"><img src="https://listingsplit.com/wp-content/uploads/cropped-Site-Icon_A.png">Not found</div>';
                // Append HTML code into the div with class .layout-sticky-content
                $(".layout-sticky-content").append(htmlCode);
            }


        },
        error: function(xhr, status, error) {
            console.error("Error occurred:", error);
        }
    });
}

// Function to check if the element is loaded
function checkElementLoaded() {
    console.log('Checking if target element is loaded to the DOM');
    addressElement = $('.styles__AddressWrapper-fshdp-8-100-2__sc-13x5vko-0');

    // Check if element with class ".styles__AddressWrapper-fshdp-8-100-2__sc-13x5vko-0" exists in the DOM
    if (addressElement.length > 0) {
        // Element exists, do something
        console.log('Address Element is loaded!');
        insertHtml(addressElement.text());
        
        // Clear the interval as the element is now loaded
        clearInterval(interval);
    }
}

$(document).ready(function(){
    console.log('Initial checks for target element');
    checkElementLoaded();
});

$(document).on('click', 'article.property-card', function(){
    console.log('Clicked on property card');
    interval = setInterval(checkElementLoaded, 100);
});
