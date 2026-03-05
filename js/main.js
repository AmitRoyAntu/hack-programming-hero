const milestonesData = JSON.parse(data).data;

// load course milestones data
function loadMilestones() {
  const milestones = document.querySelector(".milestones");

  milestones.innerHTML = `${milestonesData
    .map(function (milestone) {
      return `<div class="milestone border-b" id="${milestone._id}">
        <div class="flex">
          <div class="checkbox"><input type="checkbox" onClick="markMileStone(this, ${milestone._id})" /></div>
          <div onclick="openMilestone(this, ${milestone._id})">
            <p>${milestone.name}<span><i class="fas fa-chevron-down"></i></span></p>
          </div>
        </div>
        <div class="hidden_panel">
          ${milestone.modules
            .map(function (module) {
              return `<div class="module border-b"><p>${module.name}</p></div>`;
            })
            .join("")}
        </div>
      </div>`;
    }).join("")
    }`;
}

function openMilestone(milestoneElement, id) {
  const currentPanel = milestoneElement.parentNode.nextElementSibling;
  const shownPanel = document.querySelector(".show");
  const active = document.querySelector(".active");

  if (!milestoneElement.classList.contains("active") && active) {
    active.classList.remove("active");
  }

  milestoneElement.classList.toggle("active");

  if (!currentPanel.classList.contains("show") && shownPanel)
    shownPanel.classList.remove("show");

  currentPanel.classList.toggle("show");

  showMilestone(id);
}

function showMilestone(id) {
  const milestoneImage = document.querySelector(".milestoneImage");
  const name = document.querySelector(".title");
  const description = document.querySelector(".details");

  milestoneImage.style.opacity = "0";

  milestoneImage.src = milestonesData[id].image;
  name.innerText = milestonesData[id].name;
  description.innerText = milestonesData[id].description;
}

const milestoneImage = document.querySelector(".milestoneImage");

milestoneImage.addEventListener("load", function () {
  this.style.opacity = "1";
});

function markMileStone(checkbox, id) {
  const doneList = document.querySelector(".doneList");
  const markMileStoneList = document.querySelector(".milestones");

  const item = document.getElementById(id);

  if (checkbox.checked) {
    // it removes from its previous dom and append to the new one
    doneList.appendChild(item);
  } else {
    markMileStoneList.appendChild(item);
  }

  if (markMileStoneList) sortById(markMileStoneList);
  if (doneList) sortById(doneList);
}

function sortById(parent) {
  Array.from(parent.children)
    .sort((a, b) => parseInt(a.id) - parseInt(b.id))
    .forEach((item) => parent.appendChild(item));
}

loadMilestones();
