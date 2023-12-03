export const navLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About Us",
    path: "/about-us",
  },
  {
    title: "Facilities",
    path: "/facilities",
  },
  {
    title: "Accommodations",
    path: "/accommodations",
    children: [
      {
        id: "7",
        name: "Cottages",
        path: "accommodations/?type=cottage",
      },
      {
        id: "8",
        name: "Rooms",
        path: "accommodations/?type=room",
      },
    ],
  },
  {
    title: "Posts",
    path: "/posts",
    children: [
      {
        id: "1",
        name: "Art",
        path: "category/?cat=art",
      },
      {
        id: "2",
        name: "Science",
        path: "category/?cat=science",
      },
      {
        id: "3",
        name: "Technology",
        path: "category/?cat=technology",
      },
      {
        id: "4",
        name: "Cinema",
        path: "category/?cat=cinema",
      },
      {
        id: "5",
        name: "Design",
        path: "category/?cat=design",
      },
      {
        id: "6",
        name: "Foods",
        path: "category/?cat=foods",
      },
    ],
  },
  {
    title: "Contact",
    path: "/contact-us",
  },
];
