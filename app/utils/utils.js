"use server";

import { faker, fakerRU, fakerJA } from "@faker-js/faker";

export const generateFakeBooks = async (
  seed,
  reviews,
  likes,
  pageIndex,
  language
) => {
  let selectedFaker = faker;
  if (language === "RU") {
    selectedFaker = fakerRU;
  } else if (language === "JA") {
    selectedFaker = fakerJA;
  }
  selectedFaker.seed(seed + pageIndex * 1000);

  const books = [];
  let defaultValue = 20;
  if (pageIndex > 0) {
    defaultValue = 10;
  }
  for (let i = 0; i < defaultValue; i++) {
    const title = selectedFaker.book.title();
    const loremTitle = selectedFaker.lorem.sentence({ min: 2, max: 3 });
    const authors =
      selectedFaker.number.float({ min: 0, max: 1 }) > 0.5
        ? [
            selectedFaker === faker
              ? selectedFaker.book.author()
              : selectedFaker.person.fullName(),
          ]
        : [
            selectedFaker === faker
              ? selectedFaker.book.author()
              : selectedFaker.person.fullName(),
            selectedFaker === faker
              ? selectedFaker.book.author()
              : selectedFaker.person.fullName(),
          ];

    books.push({
      isbn: selectedFaker.commerce.isbn(),
      title:
        selectedFaker === faker
          ? title
          : loremTitle.charAt(0).toUpperCase() + loremTitle.slice(1, -1), // Random book title with 2-5 words
      authors: authors, // Generate author names
      publisher:
        selectedFaker === faker
          ? selectedFaker.book.publisher()
          : selectedFaker.company.name(), // Random publisher name
      coverImage: selectedFaker.image.urlPlaceholder({
        width: 100,
        height: 150,
        backgroundColor: "787878",
        textColor: "1f1e1e",
        format: "png",
        text: selectedFaker === faker
        ? title
        : loremTitle.charAt(0).toUpperCase() + loremTitle.slice(1),
      }),
      reviews: Array.from(
        {
          length:
            selectedFaker.number.float({ min: 0, max: 1 }) < reviews % 1
              ? Math.ceil(reviews)
              : Math.floor(reviews),
        },
        () => ({
          author: selectedFaker.person.fullName(),
          text: selectedFaker.lorem.sentence(),
        })
      ),
      detailsVisible: false, // For expandable rows
    });
  }

  return books;
};

// books.push({
//   isbn: faker.commerce.isbn(),
//   title: faker.book.title(),
//   authors: [faker.book.author(), faker.book.author()],
//   publisher: faker.book.publisher(),
//   coverImage: `https://via.placeholder.com/100x150?text=${faker.lorem.word()}`,
//   reviews: Array.from({ length: Math.floor(reviews) }, () => ({
//     author: faker.person.fullName(),
//     text: faker.lorem.sentence(),
//   })),
//   detailsVisible,
// });
// `https://via.placeholder.com/100x150.png?text=${encodeURIComponent(
//   selectedFaker === faker ? title : loremTitle
// )}`;
