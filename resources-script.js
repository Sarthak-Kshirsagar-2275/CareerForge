const searchInput =
    document.getElementById("searchInput");

const cards =
    document.querySelectorAll(".card");

searchInput.addEventListener("keyup", () => {

    const search =
        searchInput.value.toLowerCase();

    cards.forEach(card => {

        const text =
            card.innerText.toLowerCase();

        if (text.includes(search)) {
            card.style.display = "block";
        }
        else {
            card.style.display = "none";
        }

    });

});