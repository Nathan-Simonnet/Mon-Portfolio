
let lang = "fra";

// //Home page
// ============================================================
// Textanim
// -------------------------------------

function textInjection() {
    const textAnimContainer = document.getElementById('text-animation');
    textAnimContainer.textContent = "";
    let letterCounter = 0;

    const devWebArray = {
        "fra": "Développeur web",
        "eng": "Web developer"
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
            // Launch the text animation (web dev)
            setTimeout(() => {
                textInjection();
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

//    // Prevent hamburger alteration for keyboard users
//    document.addEventListener('keydown', function (event) {
//     const ul = document.querySelector('header>nav>ul');
//     if (event.key === 'Enter' && ul.classList.contains("open")) {
//         ul.classList.remove("open");
//         document.querySelector('.hamburger').classList.remove('is-active');
//         console.log(ul.classList.contains("open"))
//     }
// });

// // Projects
// // ===================================================================












