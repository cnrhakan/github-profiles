const userInfoCard = document.querySelector(".user-info-card");
const APIURL = "https://api.github.com/users/";
const form = document.querySelector("form");
const searchInput = document.querySelector(".search-input");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (searchInput.value) {
    bringData();
    userInfoCard.style.display = "flex"

  }
});

async function bringData() {
  try {
    const res = await fetch(APIURL + searchInput.value);
    const data = await res.json();
    createUser(data);
    repoDataNames();
  } catch (error) {
    userInfoCard.style.display = "flex";
    showErrorCard("No profile with this username")
  }
}

function createUser(data) {
  userInfoCard.innerHTML = `
  <div class="user-info-card-container">
          <div class="user-div-img">
            <img src="${data.avatar_url}" alt="" />
          </div>
          <div class="user-info">
          <div class="user-title-div">
           <h3 class="user-name">${data.name}</h3>
           <a href="${data.html_url}" target="_blank"><i class="fa-solid fa-up-right-from-square"></i></a>
          </div>           
            <h4 class="user-bio">${data.bio || "No bio available"}</h4>
            <div class="user-stats">
              <p class="followers">${data.followers} <b>Followers</b></p>
              <p class="following">${data.following} <b>Following</b></p>
              <p class="repos">${data.public_repos} <b>Repos</b></p>
            </div>
            <div class="user-projects">
            </div>
          </div>
        </div>
  `;
}

async function repoDataNames() {
  try {
    const userProjects = document.querySelector(".user-projects");
    const res = await fetch(APIURL + searchInput.value + "/repos");
    const repoData = await res.json();

    if (!Array.isArray(repoData)) {
      showErrorCard("No profile with this username");
      return;
    }

    repoData.slice(0, 5).forEach(repo => {
      const repoEl = document.createElement("a");
      repoEl.innerText = repo.name;
      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      userProjects.append(repoEl);
    });
  } catch (error) {
    showErrorCard("Error loading repositories");
  }
}

function showErrorCard(message) {
  userInfoCard.innerHTML = `
    <h2>${message}</h2>
  `;
}
