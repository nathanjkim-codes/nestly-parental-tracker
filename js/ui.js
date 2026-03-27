// --- Create child card function (global)
export function createChildCard(child) {
  const childCard = document.createElement("div");
  childCard.classList.add("child-card");
  childCard.textContent = child.name;

  childList.appendChild(childCard);

  // Display child details when the card is clicked
  childCard.addEventListener("click", () => {
    selectedCard = child; // Save the selected card
    childName.textContent = `Name: ${child.name}`;
    childBirth.textContent = `Birth Date: ${child.dob}`;
    childHeight.textContent = `Height: ${child.height}`;
    childWeight.textContent = `Weight: ${child.weight}`;
    childGender.textContent = `Gender: ${child.gender}`;
  });
}
