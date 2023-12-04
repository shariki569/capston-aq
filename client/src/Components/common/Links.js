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
        name: "Budget-Friendly",
        path: "category/?cat=budget-friendly",
      },
      {
        id: "2",
        name: "Comfort",
        path: "category/?cat=comfort",
      },
      {
        id: "3",
        name: "Family-fun",
        path: "category/?cat=family-fun",
      },
      {
        id: "4",
        name: "Community",
        path: "category/?cat=community",
      },
      {
        id: "5",
        name: "Special-Offers",
        path: "category/?cat=special-offers",
      },
      {
        id: "6",
        name: "Staycation",
        path: "category/?cat=staycation",
      },
    ],
  },
  {
    title: "Contact",
    path: "/contact-us",
  },
];
