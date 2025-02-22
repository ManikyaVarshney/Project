const API_KEY = "TpHs5aIHER6exLqZqkgVC4G8BmuZXn64CQrqgufY"; 
const URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

async function fetchSpaceData() {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        document.getElementById("title").textContent = data.title;
        document.getElementById("image").src = data.url;
        document.getElementById("description").textContent = data.explanation;
    } catch (error) {
        console.error("Error fetching NASA data", error);
    }
}


