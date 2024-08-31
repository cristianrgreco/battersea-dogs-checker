import * as lib from "./lib.js";

const breedFilters = [
    "Shih Tzu",
    "King Charles",
    "Havanese",
    "Pomapoo",
    "Pomeranian",
    "Cockapoo",
    "Bichon Frise",
    "West Highland",
    "Norfolk",
    "Maltese"
];

fetch("https://www.battersea.org.uk/dogs/dog-rehoming-gallery")
    .then(response => response.text())
    .then(responseText => {
        const dogs = lib.parseHtml(responseText)
        const filteredDogs = lib.filterByBreed(dogs, breedFilters);
        console.log(JSON.stringify(filteredDogs));
    })
