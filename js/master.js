// check if there is local storage color option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
    // check for active class
    document.documentElement.style.setProperty('--main-color', mainColors);
    // remove active class from all colors list item
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        //add active class on element with data-color === local storage item
        if (element.dataset.color === mainColors) {
            // add active class
            element.classList.add("active");
        };
    });
};

// random background option
let backgroundOption = true;

// variable to control the interval
let backgroundInterval; 

//  check if there is local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {
    
    if (backgroundLocalItem === 'true') {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }

    // remove active class from all spans
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active")
    });
    if (backgroundLocalItem === 'true') {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}
// toggle spin class on icon 
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    // toggle class fa-spin for rotation on self
    this.classList.toggle("fa-spin");
    //toggle class open on main settings box
    document.querySelector(".settings-box").classList.toggle("open");
};

// switch colors
const colorsLi = document.querySelectorAll(".colors-list li");
// loop on all list Items
colorsLi.forEach(li => {
    //click on every list Items
    li.addEventListener("click", (e) => {
        // set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        // SET color on local storage
        localStorage.setItem("color_option", e.target.dataset.color);
        handleActive(e);
    });
});
// switch backgrounds
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
// loop on all spans
randomBackEl.forEach(span => {
    //click on every list Items
    span.addEventListener("click", (e) => {
        // remove active class from all childrens
        handleActive(e);
        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});
// select landing page element
let landingPage = document.querySelector(".landing-page");

// get array of imgs
let imagesArray = ["2.jpg", "3.jpg", "4.jpg", "5.jpg"];

// function to randomize imgs
function randomizeImgs() {
    if (backgroundOption === true) {
        // get random number

    backgroundInterval = setInterval(() => {
    // get random number
    let randomNumber = Math.floor(Math.random() * imagesArray.length);
    // change background image url
    landingPage.style.backgroundImage = 'url("images/' + imagesArray[randomNumber] +'")';
    }, 1000);
}
}

randomizeImgs();





// select skills selector
// let ourSkills = document.querySelector(".skills");

// window.onscroll = function () {
//     let skillsOffsetTop = ourSkills.OffsetTop;
//     let skillsOuterHeight = ourSkills.OffsetHeight;
//     let windowHeight = this.innerHeight;
//     let windowScrollTop = this.pageYOffset;
//     if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
//         let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
//         allSkills.forEach(skill => {
//             skill.style.width = skill.dataset.progress;
//         });
//     }
// };


let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener('click', (e) => {
        let overlay = document.createElement("div");
        overlay.className = 'popup-overlay';
        document.body.appendChild(overlay);
        let popupBox = document.createElement("div");
        popupBox.className = 'popup-box';
        if (img.alt !== null) {
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);
        }
        let popupImage = document.createElement("img");
        popupImage.src = img.src;
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);
        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);
        closeButton.className = 'close-button';
        popupBox.appendChild(closeButton);
    });
});


document.addEventListener("click", function (e) {
    if (e.target.className === 'close-button') {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    };
});


const allBullets = document.querySelectorAll(".nav-bullets .bullet");

const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
};

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
        ev.target.classList.add("active");
    });
}


let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");

    });
    if (bulletLocalItem === 'block') {
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active")
    } else {
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active")
    }
}
bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets_option", 'block');
        } else {
            bulletsContainer.style.display = 'none'
            localStorage.setItem("bullets_option", 'none');
        }
        handleActive(e);
    });
});

// reset button
document.querySelector(".reset-options").onclick = function () {
    // localStorage.clear();
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    // reload window
    window.location.reload();
};

// toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    e.stopPropagation();
    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open");
};
// click anywhere outside menu and toggle button
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== tLinks) {

        // check if menu is open
        if (tLinks.classList.contains("open")) {
            toggleBtn.classList.toggle("menu-active");
            tLinks.classList.toggle("open");
        }
    }
});

tLinks.onclick = function (e) {
    e.stopPropagation();
}