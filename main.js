
document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("poem-list");
  const dialog = document.getElementById("poem-dialog");
  const closeButton = document.getElementById("close-dialog");

  const titleElement = document.getElementById("dialog-title");
  const dateElement = document.getElementById("dialog-date");
  const poemElement = document.getElementById("dialog-poem");

  const poems = Array.isArray(window.poemario)
    ? window.poemario
    : [];

  if (poems.length === 0) {
    list.innerHTML = '<p class="empty-message">Todavía no hay escritos publicados.</p>';
    return;
  }

  list.innerHTML = "";

  poems.forEach((poem, index) => {
    const button = document.createElement("button");
    button.className = "poem-entry";
    button.type = "button";

    const number = document.createElement("span");
    number.className = "poem-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const title = document.createElement("span");
    title.className = "poem-title";
    title.textContent = poem.title || "Sin título";

    const date = document.createElement("span");
    date.className = "poem-date";
    date.textContent = poem.date || "";

    button.append(number, title, date);

    button.addEventListener("click", () => {
      titleElement.textContent = poem.title || "Sin título";
      dateElement.textContent = poem.date || "";
      poemElement.textContent = poem.text || "";

      dialog.showModal();
    });

    list.appendChild(button);
  });

  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
});
