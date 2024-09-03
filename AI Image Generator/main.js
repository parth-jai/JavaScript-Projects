const generateForm = document.querySelector(".generate-form")
const imageGallery = document.querySelector(".image-gallery")

const OPENAI_API_KEY = "";

const generateAiImages = async(userPrompt, userImageQuality) => {
    try{
        const response = await fetch("https://api.openai.com/v1/images/generations",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            "prompt": userPrompt,
            "n": userImageQuality,
            "size": "512x512",
            "response_format" : "b64_json"
            })
            
    });
    }catch{
        console.error("Error generating AI images");
    }
}

const handleFormSubmission = (e) => {
    e.preventDefault();

    const userPrompt = e.srcElement[0].value;
    const userImageQuality = e.srcElement[1].value;

    const imgCardMarkup = Array.from({length: userImageQuality}, ()=>
    `<div class="img-card loading">
    <img src="images/loader.svg" alt="image">
    <a href="#" class="download-btn">
        <img src="images/download.svg" alt="download btn">
    </a>
</div>`
).join("");

imageGallery.innerHTML = imgCardMarkup;

console.log(imgCardMarkup);
}

generateForm.addEventListener("submit", handleFormSubmission);

