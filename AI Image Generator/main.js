const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".image-gallery");

const OPENAI_API_KEY = "********";

let isImageGenerating = false;

const updateImageCard = (imgDataArray) => {
    imgDataArray.forEach((imgObject, index) => {
        const imgCard = imageGallery.querySelectorAll(".img-card")[index];
        const imgElement = imgCard.querySelector("img");
        const downloadBtn = imgCard.querySelector(".download-btn");

        const aiGeneratedImg = `data:image/jpeg;base64,${imgObject.b64_json}`;
        imgElement.src = aiGeneratedImg;

        imgElement.onload = () => {
            imgCard.classList.remove("loading");
            downloadBtn.setAttribute("href", aiGeneratedImg);
            downloadBtn.setAttribute("download", `${new Date().getTime()}.jpeg`);
        };
    });
};

const generateAiImages = async (userPrompt, userImageQuality) => {
    if (!userPrompt || userPrompt.trim() === "") {
        alert("Prompt cannot be empty. Please enter a valid prompt.");
        isImageGenerating = false;
        return;
    }

    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}` // Ensure the API key is correct and valid
            },
            body: JSON.stringify({
                prompt: userPrompt, // Ensure the prompt is valid
                n: parseInt(userImageQuality), // Ensure this is a valid integer (between 1 and 10)
                size: "512x512", // You can change this to another valid size like 256x256 or 1024x1024
                response_format: "b64_json" // This is the required format for the image
            })
        });

        // Check for error in response
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Failed to generate images: ${errorResponse.error.message}`);
        }

        const { data } = await response.json();
        updateImageCard([...data]); // Update the UI with the generated images
    } catch (error) {
        alert(`Error: ${error.message}`);
    } finally {
        isImageGenerating = false;
    }
};

const handleFormSubmission = (e) => {
    e.preventDefault();
    if (isImageGenerating) return;
    isImageGenerating = true;

    const formElements = e.target.elements;
    const userPrompt = formElements[0].value.trim();
    const userImageQuality = parseInt(formElements[1].value, 10); // Ensure it's an integer

    if (isNaN(userImageQuality) || userImageQuality < 1 || userImageQuality > 10) {
        alert("Please enter a valid image quantity (1-10).");
        isImageGenerating = false;
        return;
    }

    const imgCardMarkup = Array.from({ length: userImageQuality }, () =>
        `<div class="img-card loading">
            <img src="images/loader.svg" alt="loading image">
            <a href="#" class="download-btn">
                <img src="images/download.svg" alt="download button">
            </a>
        </div>`
    ).join("");

    imageGallery.innerHTML = imgCardMarkup;
    generateAiImages(userPrompt, userImageQuality);
};

generateForm.addEventListener("submit", handleFormSubmission);
