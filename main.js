// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Function to open video in new window
    function openMp4Window(fileName) {
        const videoWindow = window.open('', '_blank', 'width=800,height=600');
        videoWindow.document.write(`
            <html>
                <head>
                    <title>Video Player</title>
                    <style>
                        body {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            flex-direction: column;
                            margin: 0;
                            padding: 0;
                            font-family: Arial, sans-serif;
                            background-color: #f0f0f0;
                        }
                        video {
                            max-width: 100%;
                            max-height: 80%;
                        }
                        button {
                            margin-top: 10px;
                            padding: 10px 20px;
                            background-color: #007BFF;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                        }
                        button:hover {
                            background-color: #0056b3;
                        }
                    </style>
                </head>
                <body>
                    <h3>Playing: ${fileName}</h3>
                    <video controls autoplay>
                        <source src="assets/video/${fileName}" type="video/mp4">
                        Your browser does not support the video element.
                    </video>
                    <button onclick="window.close()">Close</button>
                </body>
            </html>
        `);
    }

    // Get all images that should trigger popups
    const popupTriggers = document.querySelectorAll('img[role="button"]');
    
    // Add click event listener to each trigger
    popupTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            // Find the closest popup-overlay to this trigger
            const popupOverlay = this.closest('.row').querySelector('.popup-overlay');
            if (popupOverlay) {
                popupOverlay.style.display = 'flex';
            }
        });
    });

    // Handle all close buttons
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const popupOverlay = this.closest('.popup-overlay');
            if (popupOverlay) {
                popupOverlay.style.display = 'none';
            }
        });
    });

    // Close popup when clicking outside
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('popup-overlay')) {
            event.target.style.display = 'none';
        }
    });

    // Handle all video demo buttons
    const videoButtons = {
        'admin-demo': 'admin-demo.mp4',
        'user-demo': 'user-demo.mp4',
        'jobAI-demo': 'jobAI-demo.mp4',
        'scraping-demo': 'scraping-demo.mp4'
    };

    // Add click handlers for all video buttons
    Object.entries(videoButtons).forEach(([buttonClass, videoFile]) => {
        const button = document.querySelector(`.${buttonClass}`);
        if (button) {
            button.addEventListener('click', () => openMp4Window(videoFile));
        }
    });
});