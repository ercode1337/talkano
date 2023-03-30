// Talkano - coded by ercode1337

const chatBtn = document.getElementById('conBtn');

chatBtn.addEventListener('click', () => {
  // Get the selected tags
  const selectedTags = document.querySelectorAll('input[name="tags"]:checked');
  const selectedTagValues = Array.from(selectedTags).map(tag => tag.value);

  // Save the selected tags to localStorage
  localStorage.setItem('selectedTags', JSON.stringify(selectedTagValues));

  // Navigate to the chat page
  window.location.href = 'chat.html';
});


// Get references to the input and output boxes
const inputBox = document.getElementById('tagBox');
const outputBox = document.getElementById('outputBox');

// Load existing tags from local storage, or start with an empty array if none exist
let tagCount = 0;
let tagsArray = JSON.parse(localStorage.getItem('tags')) || [];

// Function to update local storage with the current state of the tags array
function updateTagsArray() {
  localStorage.setItem('tags', JSON.stringify(tagsArray));
}

// Function to remove a tag from both the output box and the tags array
function removeTag(tagBox) {
  const tagIndex = tagsArray.indexOf(tagBox.innerText);
  tagsArray.splice(tagIndex, 1);
  updateTagsArray();
  outputBox.removeChild(tagBox);
  tagCount--;
}

// Event listener for the input box, to add tags when the user presses enter
inputBox.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const value = inputBox.value.trim(); // Get the trimmed input value
    const regex = /^[a-zA-Z\s]*$/; // Define a regular expression to check if the value contains only letters and spaces
    if (value.length > 0 && regex.test(value) && tagCount < 5) { // If the value is not empty, contains only letters and spaces, and there are fewer than 5 tags already
      const tagBox = document.createElement('div'); // Create a new tag element
      tagBox.innerText = value; // Set the tag element's text to the input value
      outputBox.appendChild(tagBox); // Add the tag element to the output box
      inputBox.value = ''; // Reset the input box value to an empty string
      tagsArray.push(value); // Add the tag value to the tags array
      updateTagsArray(); // Update local storage with the current state of the tags array
      tagCount++; // Increment the tag count
    } else {
      return; // Otherwise, do nothing
    }
  }
});

// Event listener for the output box, to remove tags when the user clicks on them
outputBox.addEventListener('click', e => {
  if (e.target.tagName === 'DIV') { // If the user clicked on a tag element
    removeTag(e.target); // Remove the corresponding tag from the output box and the tags array
  }
});

// On page load, add any existing tags from local storage to the output box
window.addEventListener('load', () => {
  if (tagsArray.length > 0) {
    tagsArray.forEach(tag => {
      const tagBox = document.createElement('div');
      tagBox.innerText = tag;
      outputBox.appendChild(tagBox);
      tagCount++;
    });
  }
});