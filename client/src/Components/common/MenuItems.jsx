export const catLinks = [
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
];


export const accommType = [
  {
    id: "7",
    name: "Cottages",
    path: "accommodations/?type=cottage"
  },
  {
    id: "8",
    name: "Rooms",
    path: "accommodations/?type=room",
  }
]


export const sidebarLinks = [
  {
      title: "User",
      path: `admin`,
      icon: "",
  },
  {
      title: "Posts",
      path: "posts",
  },

  {
      title: "Pages",
      path: "pages",
      submenu: [
          {
              title: "About Us",
              path: "pages?edit=about-us",
          }
      ],
  },
  {
      title: "Accomodation",
      path: "accommodations",
  },
  {
      title: "Contact Info",
      path: "contact-details",
  },
  {
      title: "Media",
      path: "media",
  },
]