// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Modal Functionality
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalLink = document.getElementById("modal-link");
const modalCodeLink = document.getElementById("modal-code-link");
const closeModal = document.querySelector(".close");

document.querySelectorAll(".project-item").forEach((item, index) => {
    item.addEventListener("click", function() {
        console.log("Opening modal for project:", index); // Debug log
        modalTitle.innerText = this.querySelector("h3").innerText;
        modalDescription.innerText = this.querySelector("p").innerText;
        modalLink.href = this.querySelector(".cta-btn").href;
        modalCodeLink.href = this.querySelectorAll(".cta-btn")[1].href;
        modal.style.display = "block";
    });
});

closeModal.onclick = function() {
    console.log("Closing modal"); // Debug log
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        console.log("Closing modal by outside click"); // Debug log
        modal.style.display = "none";
    }
};



