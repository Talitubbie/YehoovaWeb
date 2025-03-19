// Function to fetch tweets from yzy-twts.com
async function fetchTweets() {
    try {
        const response = await fetch("https://yzy-twts.com/");
        const htmlText = await response.text();

        // Create a virtual DOM to parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");

        // Extract tweets from tweet container (adjust selector if needed)
        const tweetElements = doc.querySelectorAll(".tweet-container p");

        // Convert NodeList to an array of text content
        const tweets = Array.from(tweetElements).map(el => el.innerText);

        if (tweets.length > 0) {
            return tweets;
        } else {
            throw new Error("No tweets found.");
        }

    } catch (error) {
        console.error("Error fetching tweets:", error);
        return ["Failed to load tweets. Try again later!"];
    }
}

// Function to update the tweet generator
async function generateTweet() {
    const tweetText = document.getElementById('tweetText');
    const tweets = await fetchTweets();
    
    // Pick a random tweet from the scraped list
    const randomTweet = tweets[Math.floor(Math.random() * tweets.length)];
    tweetText.innerText = randomTweet;

    // Play a random Kanye audio clip
    const audioClips = [
        "audio/ye1.mp3",
        "audio/ye2.mp3",
        "audio/ye3.mp3"
    ];
    const randomClip = audioClips[Math.floor(Math.random() * audioClips.length)];
    const audio = new Audio(randomClip);
    audio.play();
}

// Add event listener to button
document.getElementById('generateBtn').addEventListener('click', generateTweet);
