// Reset/Remove color list with active class
// document.querySelector(".colors-list li.active").classList.remove("active");

// Check if there is Local storage Color option
let mainColor = localStorage.getItem("color_option");

if (mainColor !== null){
    // Get Color from LocalStorage
    document.documentElement.style.setProperty('--main-color', mainColor);
    // Remove Active class from all colors list item
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        // Add Active class on element with data-color === Local storage item
        if (element.dataset.color === mainColor){
            // Add Active class
            element.classList.add("active");
        }
    });

};

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings i").onclick = function(){
    // Toggle Class fa-spin for Rotaion on self
    this.classList.toggle("fa-spin");
    // Toggle Class open on Main settings-box class
    document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop On All List Items
colorsLi.forEach(li => {

    // Click On Every List Items
    li.addEventListener("click", (e) => {

        // Set Color On Root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        // Set Color on local storage
        localStorage.setItem("color_option", e.target.dataset.color);
        handleActive(e);
    });
});

// Random Background Option
let backgroundOption = true;
// Variable to control the Background Interval
let backgroundInterval;

// Switch Random Background Option
let randomBackEl = document.querySelectorAll(".random-backgrounds span");

// Check if there is Local Storage random background item
let backgroundLocalItem = localStorage.getItem("background_option")
// Check if random background local storage is not empty
if (backgroundLocalItem !== null){
    randomBackEl.forEach(element => {
        element.classList.remove("active");
    });
    if (backgroundLocalItem === 'true'){
        backgroundOption = true;
        randomizeImgs();
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else{
        backgroundOption = false;
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
};

// Loop On All Spans
randomBackEl.forEach(span => {

    // Click On Every Span
    span.addEventListener("click", (e) => {
        handleActive(e);

        if (e.target.dataset.background === "yes"){
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);

        } else{
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});


// Select Landing Page Element
let LandingPage = document.querySelector(".landing-page");

// Get Array of Imgs
let imgsArray = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"]


// Function to Randomize Imgs
function randomizeImgs(){
    if (backgroundOption === true){
        backgroundInterval = setInterval(() => {
            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            // Change Background Image URL
            LandingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")'
        }, 5000);
    }
};

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function(){
    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;
    // Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;
    // Window Height
    let windowHeight = window.innerHeight;
    // Window ScrollTop
    let windowScrollTop = window.pageYOffset;

    // console.log("skillsOffsetTop = " + skillsOffsetTop)
    // console.log("skillsOuterHeight = " + skillsOuterHeight)
    // console.log("windowHeight = " + windowHeight)
    // console.log("windowScrollTop = " + windowScrollTop)
    // console.log("-----------------------")

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    };
};

// Create Popup with the image
let ourGallery = document.querySelectorAll(".gallery .images-box img");

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {

        // Create overlay element
        let overlay = document.createElement('div');
        // Add class to the overlay div
        overlay.className = 'popup-overlay';
        // Append the overlay div to the body
        document.body.appendChild(overlay);
        // Create popup-box div
        let popupBox = document.createElement('div');
        // Add class to the popup-box div
        popupBox.className = 'popup-box';

        // Check if the alternate image texet is exist
        if (img.alt !== null){
            // Create Heading
            let imgHeading = document.createElement("h3");
            // Create text for Heading
            let imgText = document.createTextNode(img.alt);
            // Append the text to the heading
            imgHeading.appendChild(imgText);
            // Append the Heading to the Popup Box
            popupBox.appendChild(imgHeading);
        }

        // Create the image
        let popupImage = document.createElement("img");
        // Set Image source
        popupImage.src = img.src;
        // Append popupImage to the popup-box div
        popupBox.appendChild(popupImage);
        // Apped the popup-box div to the Body
        document.body.appendChild(popupBox);
        // Create the close span
        let closeButton = document.createElement("span");
        // Create the close button text
        let closeButtonText = document.createTextNode("X");
        // Append text to close button
        closeButton.appendChild(closeButtonText);
        // Add class to close button
        closeButton.className = 'close-button';
        // Add close button to the popup box
        popupBox.appendChild(closeButton);

    });
});

// Close popup
document.addEventListener("click", function(e){
    if (e.target.className == 'close-button'){
        // Remove the current Popup
        e.target.parentElement.remove();
        // Remove the overlay (with another method)
        document.querySelector(".popup-overlay").remove();
    }
});

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links
const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements){
    elements.forEach(element => {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

scrollToSomewhere(allLinks);
scrollToSomewhere(allBullets);

// Handle Active Classes
function handleActive(ev){
    // Remove Active Class from all childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    // Add Active class on chosen color
    ev.target.classList.add("active");
};


// Show/Hide Bullets Option
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option")

if (bulletLocalItem !== null){
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });
    if(bulletLocalItem === 'block'){
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else{
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    };
}


bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === 'show'){
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets_option" , "block");
        } else{
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets_option" , "none");
        };
        handleActive(e);
    });
});

// Reset Button
document.querySelector(".reset-options").onclick = function(){
    // Empty Local Storage
    // localStorage.clear();
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");
    // Reload the Page
    window.location.reload();
};

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".header-area .links");
toggleBtn.onclick = function(e){
    // Stop Propagation -> to forbide clicking in span inside menu Button
    e.stopPropagation();
    // Toggle class "menu-active" on Button
    this.classList.toggle("menu-active");
    // Toggle class "open" on links
    tLinks.classList.toggle("open");
}

// Stop Propagation on menu -> to forbide clicking in li inside menu
tLinks.onclick = function(e){
    e.stopPropagation();
}
// Click anywhere outside menu and button
document.addEventListener("click", (e) => {
    // console.log(e.target);
    if (e.target !== toggleBtn && e.target !== tLinks){
        // Check if menu is opened
        if (tLinks.classList.contains("open")){
            // Toggle class "menu-active" on Button
            toggleBtn.classList.toggle("menu-active");
            // Toggle class "open" on links
            tLinks.classList.toggle("open");
        }
    };
});

// Click anywhere outside settings-box to close it
let settingBox = document.querySelector(".settings-box");
// Stop Propagation on settingBox
settingBox.onclick = function(e){
    e.stopPropagation();
}

document.addEventListener("click", (e) => {
    // console.log(e.target);
    if (e.target !== settingBox){
        // Check if menu is opened
        if (settingBox.classList.contains("open")){
            // Toggle class "open" on settingBox
            settingBox.classList.toggle("open");
            // Toggle Class fa-spin for Rotaion on self
            document.querySelector(".toggle-settings i").classList.toggle("fa-spin");
        }
    };
});
