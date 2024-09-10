console.log("test")

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

