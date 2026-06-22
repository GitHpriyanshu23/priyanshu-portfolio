export type Book = {
  title: string;
  author: string;
  cover: string;
};

export const books: Book[] = [
  {
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    cover: "/assets/books/the-almanack-of-naval-ravikant.png",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    cover: "/assets/books/zero-to-one.png",
  },
  {
    title: "The Power of Your Subconscious Mind",
    author: "Joseph Murphy",
    cover: "/assets/books/the-power-of-your-subconscious-mind.png",
  },
  {
    title: "The Secret",
    author: "Rhonda Byrne",
    cover: "/assets/books/the-secret.png",
  },
  {
    title: "Psycho-Cybernetics",
    author: "Maxwell Maltz",
    cover: "/assets/books/psycho-cybernetics.png",
  },
  {
    title: "Ikigai",
    author: "Héctor García & Francesc Miralles",
    cover: "/assets/books/ikigai.png",
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "/assets/books/the-psychology-of-money.png",
  },
];
