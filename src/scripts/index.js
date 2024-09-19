
let lang = "fr";
let firstLoadOnPage = true;

// // Translation
// // ========================================================
function translatePage(lang) {
    const inputSelect = document.querySelector('.goog-te-combo');
    inputSelect.value = lang;
    const event = new Event('change')
    inputSelect.dispatchEvent(event);
}

// //Home page
// ============================================================
// Textanim
// -------------------------------------

function textInjection() {
    const textAnimContainer = document.getElementById('text-animation');
    textAnimContainer.textContent = "";
    let letterCounter = 0;

    const devWebArray = {
        "fr": "Développeur web",
        "en": "Web developer"
    }
    const textToAnim = devWebArray[lang];
    let currentLang =lang;

    letterInjection()
    function letterInjection() {
        setTimeout(() => {
            textAnimContainer.textContent += textToAnim[letterCounter];
            letterCounter++;
            if (letterCounter < textToAnim.length && currentLang == lang) {
                letterInjection();
            }
        }, 120)
    }
}

textInjection()

// // Header
// ==================================================================
// Flags
// ----------------
document.querySelectorAll('.flag-container').forEach((flag) => {
    
    flag.addEventListener('click', (e) => {

        if (!flag.classList.contains("current-language")) {
            // remove class current-language
            document.querySelectorAll('.flag-container').forEach((flagToTrim) => {
                flagToTrim.classList.remove("current-language");
            });
            // Add class current-language 
            flag.classList.add(("current-language"));
            lang = flag.dataset.lang;

            setTimeout(() => {
                // Launch the text animation (web dev)
                textInjection();
                // Launch the automatic translation
                translatePage(lang)

                // Prevent a glitch from the widget on the second time translating en english
                if(lang == "en" && firstLoadOnPage == true){
                    translatePage(lang);
                    firstLoadOnPage = true;
                }
            },200)
            console.log(lang)
        }
    });

    // Execute the div click event for keyboard user
    flag.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {e.target.click();}
    });
});

//hamburger
// -----------------------------
document.querySelector('.hamburger').addEventListener('click', function () {

    this.classList.toggle('is-active');
    const ul = document.querySelector('header>nav>ul');
    ul.classList.toggle("open");

    // Allow transition only for th hamburger state
    ul.style.transition = "0.3s"
    setTimeout(() => {
        ul.style.transition = "none"
    }, 500)

    ul.addEventListener('click', () => {
        ul.classList.remove("open");
    });

    window.addEventListener('scroll', () => {
        ul.classList.remove("open");
        this.classList.remove('is-active');
    });

});

// // Projects
// // ===================================================================


// // Contact
// // ===============================================================
// Btn
// -------------------------------

// Copy the mail, and change the content for 1s
btnContact.addEventListener('click',(btn) => {
    navigator.clipboard.writeText(btn.target.textContent);
    lang == "fra" ? btn.target.textContent = "Copié !" : btn.target.textContent = "Copy !"
    setTimeout(() => { btn.target.textContent = "nathan.simonnet@gmail.com" }, 1000);
});



// //

// Get the current URL
const urlParams = new URLSearchParams(window.location.search);

// Get the 'urlLang' query parameter
const urlLang = urlParams.get('lang');

// Check if 'urlLang' exists and log it
if (urlLang) {
    console.log(`The 'urlLang' parameter is: ${urlLang}`);
} else {
  console.log("'urlLang' parameter not found in the URL");
}

