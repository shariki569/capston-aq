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
        path: "posts/?cat=art",
      },
      {
        id: "2",
        name: "Science",
        path: "posts/?cat=science",
      },
      {
        id: "3",
        name: "Technology",
        path: "posts/?cat=technology",
      },
      {
        id: "4",
        name: "Cinema",
        path: "posts/?cat=cinema",
      },
      {
        id: "5",
        name: "Design",
        path: "posts/?cat=design",
      },
      {
        id: "6",
        name: "Foods",
        path: "posts/?cat=foods",
      },
    ],
  },
  {
    title: "Contact",
    path: "/contact-us",
  },
];
