document.addEventListener("DOMContentLoaded", function () {
    // Function to get the user's name from the cookie
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

    // Function to get the user's name from the cookie
    function getUserName() {
        const name = getCookie("psyapy_name2");
        if (name) {
            return name;
        } else {
            return "Guest";
        }
    }

    // Update the user's name in the dashboard
    const userNameSpan = document.getElementById("userName");
    const userNameLabel = document.getElementById("userRoleLabel");
    const userName = getUserName();
    userNameSpan.textContent = userName;
    userNameSpan.style.fontWeight = "bold";

    // Display the user label
    const userRole = getUserRole();
    userNameLabel.textContent = userRole === "admin" ? "Admin" : "Customer";

    // Function to check if the user is logged in
    function checkLoginStatus() {
        const name = getCookie("psyapy_name2");
        if (!name) {
            window.location.href = "/index.html"; // Redirect to the login page if the user is not logged in
        }
    }

    // Check login status on page load
    checkLoginStatus();

    // Function to check if the user is an admin based on the promo code
    function isUserAdmin() {
        const role = getCookie("psyapy_role");
        return role;
    }

    // Check if the user is an admin on page load
    if (isUserAdmin() === "Admin") {
        userNameLabel.textContent = "Admin"; // Update the user label to show "Admin"
        const sessionBox = document.getElementById("sessionBox");
        const changeStatusBtn = document.getElementById("changeStatusBtn");
        sessionBox.style.display = "block"; // Show the session box
        changeStatusBtn.style.display = "block"; // Show the "Change Session Status" button
    }
    const specialCode = "102";
    const submitCodeBtn = document.getElementById("submitCodeBtn");
    submitCodeBtn.addEventListener("click", function () {
        const promoCode = document.getElementById("specialCode").value.trim(); // Trim the input value
        if (promoCode === specialCode) {
            setCookie("psyapy_role", "Admin", 365); // Set the user role to admin for 1 year
            userNameLabel.textContent = "Admin"; // Update the user label to show "Admin"
            const sessionBox = document.getElementById("sessionBox");
            const changeStatusBtn = document.getElementById("changeStatusBtn");
            sessionBox.style.display = "block"; // Show the session box
            alert("Promo code redeemed - Given Administrator Access");
            changeStatusBtn.style.display = "block"; // Show the "Change Session Status" button
            window.location.reload(); // Reload the page to display admin features
        } else {
            alert("Invalid promo code. Please try again.");
            document.getElementById("specialCode").value = ""; // Clear the input field
        }
    });

    // Function to get the user role from localStorage
    function getUserRole() {
        const role = localStorage.getItem("psyapy_role");
        if (role) {
            return role;
        } else {
            return "client";
        }
    }

    // Update the session status and button text
    function updateSessionStatus() {
        const status = getSessionStatus();
        const sessionStatusElem = document.getElementById("sessionStatus");
        const changeStatusBtn = document.getElementById("changeStatusBtn");
        sessionStatusElem.textContent = status === "online" ? "Online" : "Offline"; 
        changeStatusBtn.textContent = status === "online" ? "Change to Offline" : "Change to Online";
    }

    // Function to get the session status from localStorage
    function getSessionStatus() {
        const status = localStorage.getItem("psyapy_session_status");
        if (status) {
            return status;
        } else {
            return "offline";
        }
    }

    // Change session status on button click
    const changeStatusBtn = document.getElementById("changeStatusBtn");
    changeStatusBtn.addEventListener("click", function () {
        const currentStatus = getSessionStatus();
        const newStatus = currentStatus === "online" ? "offline" : "online";
        localStorage.setItem("psyapy_session_status", newStatus);
        updateSessionStatus();
    });

    // Update the session status on page load
    updateSessionStatus();
});