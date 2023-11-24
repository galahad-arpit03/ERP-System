const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');


menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});





// ------------------------------For Add Faculties --------------------------
function addFaculties() {
    const loginShowButton = document.getElementById("login-show");
    const loginModal = document.getElementById("login-modal");
    const closeModal = loginModal.querySelector(".close-modal");

    loginModal.style.display = "flex";

    closeModal.addEventListener("click", function () {
        loginModal.style.display = "none";
    });
};

// --------------------------Manage Faculties ----------------------------
function manageFaculties() {
    const loginShowButton = document.getElementById("login-show4");
    const loginModal = document.getElementById("login-modal4");
    const closeModal = loginModal.querySelector(".close-modal4");

    loginModal.style.display = "flex";


    closeModal.addEventListener("click", function () {
        loginModal.style.display = "none";
    });
};





// -------------------------------For Add  Students---------------------
function addStudent() {
    console.log("Student working");
    const loginShowButton = document.getElementById("login-show1");
    const loginModal = document.getElementById("login-modal1");
    const closeModal = loginModal.querySelector(".close-modal1");


    loginModal.style.display = "flex";


    closeModal.addEventListener("click", function () {
        loginModal.style.display = "none";
    });
};


// ------------------------------For manage student--------------------------
function manageStudent() {
    const loginShowButton = document.getElementById("login-show5");
    const loginModal = document.getElementById("login-modal5");
    const closeModal = loginModal.querySelector(".close-modal5");

    loginModal.style.display = "flex";


    closeModal.addEventListener("click", function () {
        loginModal.style.display = "none";
    });
};


// --------------------------For Add Subjects----------------------------
function addSubject() {
    console.log("Working");
    const loginShowButton = document.getElementById("login-show2");
    const loginModal = document.getElementById("login-modal2");
    const closeModal = loginModal.querySelector(".close-modal2");

    loginModal.style.display = "flex";


    closeModal.addEventListener("click", function () {
        loginModal.style.display = "none";
    });
};


// -------------------------------For Manage Subject---------------------
function manageSubject() {
    const loginShowButton = document.getElementById("login-show6");
    const loginModal = document.getElementById("login-modal6");
    const closeModal = loginModal.querySelector(".close-modal6");

    loginModal.style.display = "flex";


    closeModal.addEventListener("click", function () {
        loginModal.style.display = "none";
    });
};


