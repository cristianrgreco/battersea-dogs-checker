import { JSDOM } from "jsdom";

export function parseHtml(html) {
  const dom = new JSDOM(html);
  const dogCards = dom.window.document.querySelectorAll(".view-dogs-listing .card-animal");

  return Array.from(dogCards)
    .filter((dogCard) => dogCard.querySelector(".animal-status")?.textContent !== "Reserved")
    .map((dogCard) => ({
      name: dogCard.querySelector(".card-title").textContent,
      breed: dogCard.querySelector(".breed-name").textContent,
      age: dogCard.querySelector(".animal-age").textContent.split("\n").pop().trim(),
      url: "https://www.battersea.org.uk" + dogCard.querySelector("a").getAttribute("href"),
    }))
    .toSorted((a, b) => a.breed.localeCompare(b.breed));
}

export function filterByBreed(dogs, breedFilters) {
  if (breedFilters.length === 0) {
    return dogs;
  }

  return dogs.filter((dog) =>
    breedFilters.some((breedFilter) => {
      return dog.breed.toLowerCase().includes(breedFilter.toLowerCase());
    }),
  );
}
