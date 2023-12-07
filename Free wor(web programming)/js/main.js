// Bookmark Button
let bookmark = document.getElementById("bookmark");
let bookmarkLabel = document.querySelector("#bookmark span");
let icon_book = document.querySelector(".icon_book");
bookmark.addEventListener("click", () => {
  bookmark.classList.toggle("active");
  if (bookmark.classList.contains("active")) {
    icon_book.classList.add("active1");
    bookmarkLabel.innerHTML = "Bookmarked";
  } else {
    bookmarkLabel.innerHTML = "Bookmark";
    icon_book.classList.remove("active1");
  }
});



// let radio_inputs = document.querySelectorAll(".radio_input");
// let rows = document.querySelectorAll(".row");

// radio_inputs.forEach((radio_input, index) => {
//   radio_input.addEventListener("click", () => {
//     // Assuming you want to toggle the "d-none" class for the corresponding row
//     rows[index].classList.remove("d-none");
//   });
// });

let radio_inputs = document.querySelectorAll(".radio_input");
let rows = document.querySelectorAll(".row");

let openRowIndex = null; // Variable to store the index of the currently open row

radio_inputs.forEach((radio_input, index) => {
  radio_input.addEventListener("click", () => {
    if (openRowIndex !== null) {
      // Close the currently open row
      rows[openRowIndex].classList.add("d-none");
    }

    // Toggle the "d-none" class for the clicked row
    rows[index].classList.toggle("d-none");

    // Update the openRowIndex to the clicked row if it was closed, otherwise set it to null
    openRowIndex = rows[index].classList.contains("d-none") ? null : index;
  });
});

function myFunction() {
  var x = document.getElementById("myText").required;
  document.getElementById("demo").innerHTML = x;
}
