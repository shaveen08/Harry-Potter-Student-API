let searchInput = document.getElementById("search-user");
let showUser = document.querySelector(".show-user");

// All the user data will be stored here
let studentsData = [];

// Fetching user data
// fetch("https://hp-api.onrender.com/api/characters/students")
//   .then((res) => res.json())
//   .then((data) => {
//     studentsData = data;
//   });

async function getData() {
  try {
    const response = await fetch(
      "https://hp-api.onrender.com/api/characters/students",
    );
    const data = await response.json();
    studentsData = data;
  } catch (err) {
    console.log(err);
  }
}
getData();

// Listening to user input
searchInput.addEventListener("keyup", () => {
  let searchVal = searchInput.value.toLowerCase().trim();

  // If search input is empty clear UI
  if (!searchVal) {
    // showUser.innerHTML = `<span id="title">Students:</span>`;
    showUser.innerHTML = `<span id="content">Search your favorite student.</span>`;
    return;
  }

  // Filtering data from studentsData
  let filtered = studentsData.filter((student) =>
    student.name.toLowerCase().includes(searchVal),
  );

  // Clearing old UI
  showUser.innerHTML = `<span id="title">Students:</span>`;

  let ul = document.createElement("ul");

  // Rendering results
  if (filtered.length > 0) {
    filtered.forEach((student) => {
      let li = document.createElement("li");
      li.textContent = student.name;
      ul.appendChild(li);
    });
  } else {
    let li = document.createElement("li");
    li.textContent = "No students";
    li.id = "empty-value";
    ul.appendChild(li);
  }

  showUser.appendChild(ul);
});
