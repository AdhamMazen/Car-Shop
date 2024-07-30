// Select necessary elements
const signoutBtn = document.querySelector(".log-out");
const countElement = document.querySelector("#count");
const settingBtn = document.querySelector(".setting-btn");
const xBtn = document.querySelector(".fa-x");
const settingBox = document.querySelector(".setting-box");
const backgroundColors = document.querySelectorAll(".setting-box ul li:nth-child(4) ul li");



// Get the initial background color from local storage or CSS variable
const rootStyles = getComputedStyle(document.documentElement);
const savedColor = window.localStorage.getItem("color") || rootStyles.getPropertyValue('--mainBackgroundColor').trim();
document.documentElement.style.setProperty('--mainBackgroundColor', savedColor);

// Event listener for the sign-out button
signoutBtn.addEventListener("click", () => {
    window.close(); // Close the window on sign out
});

// Event listener to toggle the settings box visibility
settingBtn.addEventListener("click", () => {
    settingBox.style.transform = 'scale(1)'; // Show settings box
});

xBtn.addEventListener("click", () => {
    settingBox.style.transform = 'scale(0)'; // Hide settings box
});

// Event listener for background color selection
backgroundColors.forEach(el => {
    el.addEventListener("click", (e) => {
        const selectedColor = e.currentTarget.dataset.color;
        window.localStorage.setItem("color", selectedColor);
        document.documentElement.style.setProperty('--mainBackgroundColor', selectedColor);
    });
});

// Function to update the count
const updateCount = () => {
    let currentCount = parseInt(localStorage.getItem("counter")) || 100;

    // Increment the counter and update local storage
    currentCount++;
    localStorage.setItem("counter", currentCount);
    countElement.innerHTML = currentCount;

    // Reset the counter if it exceeds 200
    if (currentCount > 200) {
        localStorage.setItem("counter", 100);
    }
};

// Event listener for window load to initialize the counter
window.addEventListener("load", updateCount);

// Update count every 6 seconds
setInterval(updateCount, 6000);
