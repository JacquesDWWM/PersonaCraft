document.addEventListener("DOMContentLoaded", function() {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(question => {
        question.addEventListener("click", function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.style.display === "block";

            document.querySelectorAll(".faq-answer").forEach(answer => {
                answer.style.display = "none";
            });

            if (!isOpen) {
                answer.style.display = "block";
            }
        });
    });
});
