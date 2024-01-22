document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section');

    function checkVisibility() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.9) { /* Adjust the percentage for when the section becomes visible */
                section.classList.add('active');
            }
        });
    }

    // Check visibility on page load
    checkVisibility();

    window.addEventListener('scroll', function () {
        checkVisibility();
    });
});
