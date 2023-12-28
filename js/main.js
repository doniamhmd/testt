//Param
var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");

var tableContent = document.getElementById("tableContent");
var requirementList = document.querySelectorAll(".requirement-list li");
var requirementList2 = document.querySelectorAll(".requirements-list li");

var submitBtn = document.getElementById("submitBtn");

var deleteBtns;
var visitBtns;
var siteNameWarn = document.getElementById("siteNameWarn");
var siteURLWarn = document.getElementById("siteURLWarn");
var bookmarks = [];




//Regex//
var nameRegex = /^[A-Z]\w{2,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

const siteNameRequirements = [
  { regex: /.{3,}/, index: 0 },
  { regex: /^[A-Z][a-z]*$/, index: 1 },
];

const siteURLRequirements = [
  { regex: /.{3,}/, index: 0 },
  {
    regex: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/,
    index: 1,
  },
];

if (localStorage.getItem("bookMarker") != null) {
  bookmarks = JSON.parse(localStorage.getItem("bookMarker"));
  displaySites();
}

siteName.addEventListener("keyup", (e) => {
  let isValid = true;
  debugger;
  siteNameRequirements.forEach((item) => {
    const isRequirementMet = item.regex.test(e.target.value);
    const requirementItem = requirementList[item.index];
    debugger;
    if (isRequirementMet) {
      requirementItem.classList.add("valid");
      requirementItem.firstElementChild.className = "fa-solid fa-check";
    } else {
      requirementItem.classList.remove("valid");
      requirementItem.firstElementChild.className = "fa-solid fa-circle";
      isValid = false;
    }
  });
  debugger;
  if (isValid) {
    siteNameWarn.classList.add("d-none");
    validate(siteName, nameRegex);
  } else {
    siteNameWarn.classList.remove("d-none");
    validate(siteName, nameRegex);
  }
});

siteURL.addEventListener("keyup", (e) => {
  let isValid = true;

  siteURLRequirements.forEach((item) => {
    debugger;
    const isRequirementMet = item.regex.test(e.target.value);
    const requirementItem = requirementList2[item.index];

    if (isRequirementMet) {
      requirementItem.classList.add("valid");
      requirementItem.firstElementChild.className = "fa-solid fa-check";
    } else {
      requirementItem.classList.remove("valid");
      requirementItem.firstElementChild.className = "fa-solid fa-circle";
      isValid = false;
    }
  });

  if (isValid) {
    siteURLWarn.classList.add("d-none");
    validate(siteURL, urlRegex);
  } else {
    siteURLWarn.classList.remove("d-none");
    validate(siteURL, urlRegex);
  }
});

//Site Function //
function addSite() {
  if (
    siteName.value == null ||
    siteName.value == "" ||
    siteURL.value == null ||
    siteURL.value == ""
  ) {
    alert("Please make Sure you did fill up all fields ");
    return;
  }
  debugger;

  var siteObject = {
    name: siteName.value,
    url: siteURL.value,
  };

  bookmarks.push(siteObject);
  localStorage.setItem("bookMarker", JSON.stringify(bookmarks));
  clearInputs();
  displaySites();
}

//Validate Function // 
function validate(element, regex) {
  debugger;
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

//Clear inputs //
function clearInputs() {
  siteName.value = "";
  siteURL.value = "";
  siteURL.classList.remove("is-valid");
  siteName.classList.remove("is-valid");
}

//Display Sites //
function displaySites() {
  debugger;
  let data = ``;
  for (var i = 0; i < bookmarks.length; i++) {
    data += `
      <tr>
      <td>${bookmarks[i].name}</td>
      <td>${bookmarks[i].url}</td>
      <td>
        <button class="btn btn-visit" onclick="visitWebsite(${i})">
        <i class="fa-solid fa-eye fa-beat-fade pe-2"></i>Visit
      </button>
      </td>
      <td>
      <button class="btn btn-delete pe-2" onclick="deleteItem(${i})">
      <i class="fa-solid fa-trash-can fa-flip"></i>
      Delete
    </button>
      </td>
      
    </tr>
      `;
  }

  tableContent.innerHTML = data;
}



//Delete Sites //
function deleteItem(i) {
  debugger;
  bookmarks.splice(i, 1);
  localStorage.setItem("bookMarker", JSON.stringify(bookmarks));
  displaySites();
}

//Visit Sites //
function visitWebsite(websiteIndex) {
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(bookmarks[websiteIndex].url)) {
    open(bookmarks[websiteIndex].url);
  } else {
    open(`https://${bookmarks[websiteIndex].url}`);
  }
}


function sendUpdatedData() {
  bookmarks[productIndex].name = siteName.value;
  bookmarks[productIndex].url = siteURL.value;
  localStorage.setItem("bookMarker", JSON.stringify(bookmarks));

  displaySites();

  submitBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
  clearInputs();
}
