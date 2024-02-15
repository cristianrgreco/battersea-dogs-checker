import { JSDOM } from "jsdom"

export function parseHtml(html) {
    const dom = new JSDOM(html)
    const dogCards = dom.window.document.querySelectorAll(".view-dogs-listing .card-animal");
    
    const dogs = [];

    dogCards.forEach(dogCard => {
        const isReserved = dogCard.querySelector(".animal-status")?.textContent === "Reserved"
        if (isReserved) {
            return;
        }

        dogs.push({
            name: dogCard.querySelector(".card-title").textContent,
            breed: dogCard.querySelector(".breed-name").textContent,
            age: dogCard.querySelector(".animal-age").textContent.split("\n").pop().trim(),
            url: "https://www.battersea.org.uk" + dogCard.querySelector("a").getAttribute("href")
        });
    })

    dogs.sort((a, b) => a.breed.localeCompare(b.breed))

    return dogs;
}

export function filterByBreed(dogs, breedFilters) {
    if (breedFilters.length === 0) {
        return dogs;
    }

    return dogs.filter(dog => 
        breedFilters.some(breedFilter => {
            return dog.breed.toLowerCase().includes(breedFilter.toLowerCase())
        }))
}
