
let lang = "fr";

// // Translation
// // ========================================================
function translatePage(datas) {
    // Logos more than one section
    for (const key in datas.logos) {
        document.querySelectorAll('.' + key + '-logo').forEach((logo) => {
            logo.alt = datas.logos[key];
        });
    };

    // Flags
    document.getElementById('flag-france').alt = datas.header.flags.fr.alt;
    document.getElementById('flag-france').setAttribute('aria-label', datas.header.flags.fr.aria);

    document.getElementById('flag-UK').alt = datas.header.flags.en.alt;
    document.getElementById('flag-UK').setAttribute('aria-label', datas.header.flags.en.aria);

    // Nav
    let navLinksIndex = 0;
    document.querySelectorAll('.nav-link').forEach((link) => {
        link.textContent = datas.header.nav[navLinksIndex];
        navLinksIndex++;
    });

    // Project
    document.getElementById('project-title').textContent = datas.projects.title;

    function translateProject(projectToTranslate) {
        document.getElementById(projectToTranslate + '-img').alt = datas.projects.cards[projectToTranslate].alt;
        document.getElementById(projectToTranslate + '-details-paragraph-container').children[0].textContent = datas.projects.cards[projectToTranslate].details[0];
        document.getElementById(projectToTranslate + '-details-paragraph-container').children[1].textContent = datas.projects.cards[projectToTranslate].details[1];
    }

    document.querySelectorAll('.app-card').forEach((project) => {
        const projectName = project.dataset.projectnamedata;
        translateProject(projectName);
    });


    // Tools
    document.getElementById('section-tools-title').textContent = datas.tools.title;
    document.getElementById('dev_tools-title').textContent = datas.tools.dev_tools.title;
    document.getElementById('other_tools-title').textContent = datas.tools.other_tools.title;

    for (let key in datas.tools.other_tools.logos) {
        document.querySelector('.' + key + '-logo').alt = datas.tools.other_tools.logos[key];
    }

    // Profile
    document.getElementById('section-profile-title').textContent = datas.profile.title;
    document.getElementById('profile-picture').alt = datas.profile.img;
    const profileBioContainer = document.querySelector('.profile-bio-container')

    for (let i = 0; i < datas.profile.bio.length; i++) {
        profileBioContainer.children[i].textContent = datas.profile.bio[i];
    }

    document.getElementById('btnCv').textContent = datas.profile.cv;

    // Contact
    document.getElementById('section-contact-title').textContent = datas.contact.title;
    document.querySelector('.linkedin-logo').alt = datas.contact.linkedin;

    // Footer
    document.querySelector('.footer-last_update').textContent = datas.footer;

}

function langJsonFecther() {
    fetch('/src/assets/lang/' + lang + '.json')
        .then((response) => response.json())
        .then((data) => translatePage(data))
        .catch((error) => console.log(error))
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
    let currentLang = lang;

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


// // Get the current URL
// const urlParams = new URLSearchParams(window.location.search);

// // Get the 'urlLang' query parameter
// const urlLang = urlParams.get('lang');
// console.log(urlLang)

// if (urlLang == "fr" ) {
//         alert("fr!!!!!")
// }
// // Check if 'urlLang' exists and log it
// else if (urlLang == "en") {
//     alert("en!!!!!")
//     document.querySelectorAll('.flag-container').forEach((flagToTrim) => {
//         flagToTrim.classList.remove("current-language");
//     });
//     // Add class current-language 
//    const currentFlage = document.getElementById('flag-UK')
//    currentFlage.classList.add(("current-language"));
//     lang = currentFlage.dataset.lang;

//     setTimeout(() => {
//         // Launch the automatic translation
//         langJsonFecther()

//         // Launch the text animation (web dev)
//         textInjection();

//     }, 200)
//     console.log(lang)
// } else{
//     alert("otro!!!!!")
// }



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
                // Launch the automatic translation
                langJsonFecther()

                // Launch the text animation (web dev)
                textInjection();

                // // Prevent a glitch from the widget on the second time translating en english
                // if (lang == "en" && firstLoadOnPage == true) {
                //     translatePage(lang);
                //     firstLoadOnPage = true;
                // }

            }, 200)
            console.log(lang)
        }
    });

    // Execute the div click event for keyboard user
    flag.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.target.click(); }
    });
});

//hamburger
// ====================================
document.querySelector('.hamburger').addEventListener('click', function () {

    this.classList.toggle('is-active');
    const ul = document.querySelector('header>nav>ul');
    ul.classList.toggle("open");

    ul.addEventListener('click', () => {
        ul.classList.remove("open");
    });

    window.addEventListener('scroll', () => {
        ul.classList.remove("open");
        this.classList.remove('is-active');
    });

});


// // Contact
// // ===============================================================
// Btn
// -------------------------------

// Copy the mail, and change the content for 1s
btnContact.addEventListener('click', (btn) => {
    navigator.clipboard.writeText(btn.target.textContent);
    lang == "fr" ? btn.target.textContent = "Copié !" : btn.target.textContent = "Copy !"
    setTimeout(() => { btn.target.textContent = "nathan.simonnet@gmail.com" }, 1000);
});
