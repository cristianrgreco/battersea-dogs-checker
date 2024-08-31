import fs from "fs";
import { test, expect } from "vitest";
import * as lib from "../src/lib";

const html = fs.readFileSync("test/data.html").toString("utf-8");

test("should return list of dog names, breeds, ages and URLs", () => {
  const dogs = lib.parseHtml(html);

  expect(dogs).toEqual(
    expect.arrayContaining([
      {
        name: "CASPER",
        breed: "greyhound",
        age: "3 Years",
        url: "https://www.battersea.org.uk/dogs/dog-rehoming-gallery/casper",
      },
      {
        name: "IVAN",
        breed: "lurcher",
        age: "4 Years, 2 Months",
        url: "https://www.battersea.org.uk/dogs/dog-rehoming-gallery/ivan",
      },
    ]),
  );
});

test("should exclude reserved dogs", () => {
  const dogs = lib.parseHtml(html);
  const dogNames = dogs.map((dog) => dog.name);

  expect(dogNames).not.toContain("ELA");
});

test("should sort by breed", () => {
  const dogs = lib.parseHtml(html);
  const dogBreeds = dogs.map((dog) => dog.breed);

  expect(dogBreeds[0]).toEqual("anatolian shepherd");
});

test("should return all dogs when filters are empty", () => {
  const dogs = lib.parseHtml(html);

  const filters = [];

  expect(lib.filterByBreed(dogs, filters)).toHaveLength(50);
});

test("should filter by breed substring", () => {
  const dogs = lib.parseHtml(html);

  const filters = ["spaniel"];

  expect(lib.filterByBreed(dogs, filters).map((dog) => dog.breed)).toContain("spaniel: cocker");
});

test("should filter by breed substring case insensitive", () => {
  const dogs = lib.parseHtml(html);

  const filters = ["Spaniel"];

  expect(lib.filterByBreed(dogs, filters).map((dog) => dog.breed)).toContain("spaniel: cocker");
});
