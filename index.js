document.addEventListener("DOMContentLoaded", function () {
    // Function to get a cookie by name
    function getCookie(name) {
        const cookieArr = document.cookie.split("; ");
        for (let i = 0; i < cookieArr.length; i++) {
            const cookiePair = cookieArr[i].split("=");
            if (cookiePair[0] === name) {
                return cookiePair[1];
            }
        }
        return null;
    }

    // Function to set a cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Function to generate random math problem
    function generateMathProblem() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operator = Math.random() < 0.5 ? '+' : '-';
        const question = `${num1} ${operator} ${num2}`;
        const answer = operator === '+' ? num1 + num2 : num1 - num2;
        return { question, answer };
    }

    // Function to update the verification question on page load
    function updateVerificationQuestion() {
        const { question, answer } = generateMathProblem();
        document.getElementById("verificationQuestion").textContent = `(${question}) = ?`;
        document.getElementById("verification").setAttribute("data-answer", answer);
    }

    // Update the verification question on page load
    updateVerificationQuestion();

    // Function to check the answer of the verification question
    function checkVerificationAnswer() {
        const userAnswer = parseInt(document.getElementById("verification").value);
        const correctAnswer = parseInt(document.getElementById("verification").getAttribute("data-answer"));
        return userAnswer === correctAnswer;
    }

    // Login form submission
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (checkVerificationAnswer()) {
            if (getCookie("psyapy_name2") === ""){
                const name = document.getElementById("name").value;
                setCookie("psyapy_name2", name, 365); // Store the name for 1 year
                document.getElementById("submitbutton").textContent = "Creating accounting..";
                setInterval(function(){
                    window.location.href = "/dashboard.html"
                }, 2000);
            } else{
                alert("You already have an account | Welcome back " + getCookie("psyapy_name2"));
                setInterval(function(){
                    window.location.href = "/dashboard.html"
                },1000);
            }
        } else {
            alert("Incorrect verification answer. Please try again.");
            // Update the verification question for a new attempt
            updateVerificationQuestion();
            document.getElementById("verification").value = "";
        }
    });

    // Function to check if the user is logged in
    function checkLoginStatus() {
        const name = getCookie("psyapy_name2");
        if (name) {
            window.location.href = "/dashboard.html";
        }
    }

    // Check login status on page load
    checkLoginStatus();
});