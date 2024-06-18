$(document).ready(function() {
    // Function to insert message when Enter key is pressed
    $(window).on('keydown', function(e) {
        if (e.which == 13) {
            insertMessage();
            return false;
        }
    });

    // Function to handle sending message on button click
    $('#send-button').click(function() {
        insertMessage();
    });

    // Function to insert and process message
    function insertMessage() {
        const msg = $('#text-input').text().trim().toLowerCase(); // Convert to lowercase for easier checking
        
        if (msg === '') {
            return; // If message is empty, do not proceed
        }

        // Clear previous messages
        $('.output-area').empty();

        // Create new message element
        const messageElement = $('<div class="message message-personal">' + msg + '</div>').addClass('message-new');

        // Append message element to chat container
        $('.output-area').append(messageElement);

        // Create verification result message element
        const verificationMessage = $('<div class="message message-bot">Hasil verifikasi kalimat anda adalah: <br></div>');

        // Append verification result message element to chat container
        $('.output-area').append(verificationMessage);

        // Random result generator
        const outputRand = Math.random(); 

        if (outputRand < 0.45) {
            // Create message indicating it's a hoax
            const resultMessage = $('<span class="result-history result-history-2">HOAX</span>').css('color', '#D7083A');
            verificationMessage.append(resultMessage);

            // Add source links for hoax
            const hoaxSources = $('<div class="hoax-sources">Sumber: <br><a href="https://www.google.com/" style="font-size: 16px; color: blue;">https://www.cnn.com</a><br><a href="https://www.kompas.com/" style="font-size: 16px; color: blue;">https://www.youtube.com/</a><br><a href="https://www.cnbc.com/" style="font-size: 16px; color: blue;">https://www.bbc.com/</a></div>');
            $('.output-area').append(hoaxSources);

            // Add class to history card
            const historyCard = $('<div class="history-card history-card-hoax">' +
                '<span class="news-title">Berita ' + ($('.history-card').length + 1) + '</span>' +
                '<span class="status hoax">HOAX</span>' +
                '</div>').addClass('show');
            $('#history').append(historyCard);
        } else {
            // Create message indicating it's not a hoax
            const resultMessage = $('<span class="result-history result-history-1">TIDAK HOAX</span>').css('color', '#00B512');
            verificationMessage.append(resultMessage);

            // Add source links for not a hoax
            const notHoaxSources = $('<div class="not-hoax-sources">Sumber: <br><a href="https://www.google.com/" style="font-size: 16px; color: blue;">https://www.cnn.com/</a><br><a href="https://www.kompas.com/" style="font-size: 16px; color: blue;">https://www.youtube.com/</a><br><a href="https://www.cnbc.com/" style="font-size: 16px; color: blue;">https://www.bbc.com</a></div>');
            $('.output-area').append(notHoaxSources);

            // Add class to history card
            const historyCard = $('<div class="history-card history-card-not-hoax">' +
                '<span class="news-title">Berita ' + ($('.history-card').length + 1) + '</span>' +
                '<span class="status not-hoax">TIDAK HOAX</span>' +
                '</div>').addClass('show');
            $('#history').append(historyCard);
        }

        // Clear input field after sending message
        $('#text-input').empty(); // Empty the input field

        // Optionally, scroll to the bottom of the chat container
        $('.output-area').scrollTop($('.output-area')[0].scrollHeight);

        // Adjust the height of the input box
        adjustInputBoxHeight();

        // Expand the new message element
        expandMessage(messageElement[0]);
    }

    // Function to expand message div based on its content
    function expandMessage(messageElement) {
        messageElement.style.height = 'auto'; // Reset
        messageElement.style.height = 'auto'; // Reset the height
        messageElement.style.height = messageElement.scrollHeight + 'px'; // Set it to the scroll height
    }

    // Function to handle click on history card
    $(document).on('click', '.history-card', function() {
        // Clear previous messages
        $('.output-area').empty();

        // Get the title and status from the clicked history card
        const title = $(this).find('.news-title').text();
        const status = $(this).find('.status').text();

        // Create verification result message element
        const verificationMessage = $('<div class="message message-bot">Hasil verifikasi kalimat dari riwayat: <br></div>');

        // Append verification result message element to chat container
        $('.output-area').append(verificationMessage);

        // Create message indicating the title and status
        const resultMessage = $('<span class="result-history">' + title + ' ' + status + '</span>').css('color', status === 'HOAX' ? '#D7083A' : '#00B512');
        verificationMessage.append(resultMessage);

        // Optionally, scroll to the bottom of the chat container
        $('.output-area').scrollTop($('.output-area')[0].scrollHeight);
    });

    // Expand text input as the user types
    $('#text-input').on('input', function() {
        adjustInputBoxHeight();
    });

    // Function to adjust the height of the input box
    function adjustInputBoxHeight() {
        let textInput = $('#text-input');

        // Reset the height to compute the next height correctly
        textInput.css('height', 'auto');

        let scrollHeight = textInput[0].scrollHeight;
        let maxHeight = parseInt(window.getComputedStyle(textInput[0]).lineHeight) * 4; // 4 lines maximum

        if (scrollHeight > maxHeight) {
            scrollHeight = maxHeight;
        }

        // Set the height to scrollHeight or maxHeight
        textInput.css('height', scrollHeight + 'px');
    }
});