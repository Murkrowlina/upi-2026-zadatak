let url = "http://localhost:5000"

async function loadBooks() {
    const res = await fetch(`${url}/books`);

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }

    const books = await res.json();
    console.log(books);
    

    let catalogue = document.getElementById("catalogue")
    for (let i = 0; i < 50; i++) {
        console.log(`https://covers.openlibrary.org/b/isbn/${books[i].ISBN}-M.jpg`);
        
        catalogue.innerHTML += `
            <div class="book">
                <div class="cover">
                    <img 
                        class="book-cover"
                        src="https://covers.openlibrary.org/b/isbn/${books[i].ISBN}-M.jpg?default=false" 
                        alt="${books[i].Naslov}">
                    <img 
                        src="https://static.thenounproject.com/png/944120-200.png"
                        class="unavailable-cover hidden"
                        alt="Ne postoji slika knjige">
                </div>
                <div class="book-info">
                    <h2 class="title">${books[i].Naslov}</h2>
                    <p>Godina izdanja: ${books[i].Godina}.</p>
                    <p>ISBN: ${books[i].ISBN}</p>
                    <p>Količina: ${books[i].Kolicina}</p>
                    <button>Povijest posudbi</button>
                </div>
            </div>
        `;

        document.getElementsByClassName("book-cover")[i].addEventListener("error", () => {
            document.getElementsByClassName("book-cover")[i].classList.add("hidden");
            document.getElementsByClassName("unavailable-cover")[i].classList.remove("hidden")
        })
    }

    // Ne bi da učita svih 300 knjiga pa možda da pritisne na više ako uspijemo to napraviti
    catalogue.innerHTML += `<button id="more-BTN">Više</button>`;

    console.log(books[1]);
}

loadBooks().catch(console.error)