// DOM Element Selection
const dataInfoContainers = document.querySelectorAll(".data-info");
const signoutBtn = document.querySelector(".log-out");
const settingBtn = document.querySelector(".setting-btn");
const xBtn = document.querySelector(".fa-x");
const settingBox = document.querySelector(".setting-box");
const backgroundColors = document.querySelectorAll(".setting-box ul li:nth-child(4) ul li");

// Load and set main background color from local storage
const rootStyles = getComputedStyle(document.documentElement);
const savedColor = localStorage.getItem("color") || rootStyles.getPropertyValue('--mainBackgroundColor').trim();
document.documentElement.style.setProperty('--mainBackgroundColor', savedColor);

// Function to handle XMLHttpRequest
function fetchData() {
  const myrequest = new XMLHttpRequest();
  myrequest.open("GET", "./json.json");
  myrequest.send();

  myrequest.onload = function() {
    if (myrequest.status >= 200 && myrequest.readyState ===4) {
      const jsonOb = JSON.parse(myrequest.responseText);
      const { models, prices, imgs, description } = jsonOb.products;
      
      dataInfoContainers.forEach((container, index) => {
        for (let i = index * 6; i < (index + 1) * 6; i++) {
          const boxHTML = `
            <div class="box">
              <img src="${imgs[i * 2]}" alt="">
              <img src="${imgs[i * 2 + 1]}" alt="">
              <div>
                <h3>${models[i]}</h3>
                <p>${prices[i]}</p>
                <p>${description[i]}</p>
                <div style="display: flex;justify-content: space-between;width: 100%;">
                  <a href="">Buy Now</a><i class="fas fa-star card-star" aria-expanded="" style="margin-right: 30px;"></i>
                </div>
              </div>
            </div>
          `;
          const div = document.createElement("div");
          div.innerHTML = boxHTML;
          container.appendChild(div);
        }
      });

      // Event delegation for star rating toggle
      document.addEventListener("click", function(event) {
        if (event.target.classList.contains("card-star")) {
          event.target.classList.toggle("active");
        }
      });

    } else {
      console.error("Failed to load data. Status: " + myrequest.status);
    }
  };

  myrequest.onerror = function() {
    console.error("Request error");
  };
}

// Initial fetch
fetchData();

// Event listeners
signoutBtn.addEventListener("click", () => {
  window.close(); // Close the window on sign out
});

settingBtn.addEventListener("click", () => {
  settingBox.style.transform = 'scale(1)'; // Show the settings box
});

xBtn.addEventListener("click", () => {
  settingBox.style.transform = 'scale(0)'; // Hide the settings box
});

backgroundColors.forEach(el => {
  el.addEventListener("click", (e) => {
    const selectedColor = e.currentTarget.dataset.color;
    localStorage.setItem("color", selectedColor);
    document.documentElement.style.setProperty('--mainBackgroundColor', selectedColor);
  });
});
