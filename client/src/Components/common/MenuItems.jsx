import { FiUsers } from "react-icons/fi";
import { FiPaperclip } from "react-icons/fi";
import { FiBook } from "react-icons/fi";
import { FiBriefcase } from "react-icons/fi";
import { FiHome } from "react-icons/fi";
import { FiTv } from "react-icons/fi";
import { BiBot } from "react-icons/bi";
import { FiPhoneCall } from "react-icons/fi";

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
    title: "Users",
    path: `users`,
    icon: <FiUsers size={20}/>,
  },
  {
    title: "Posts",
    path: "posts",
    icon: <FiPaperclip size={20}/>
  },

  {
    title: "About Us",
    path: "pages",
    icon: <FiBook size={20}/>
  },
  {
    title: "Accomodations",
    path: "accommodations",
    icon: <FiBriefcase size={20}/>
  },
  {
    title: "Facilites",
    path: "facilities",
    icon: <FiHome size={20}/>
  },
  {
    title: "Amenities",
    path: "amenities",
    icon: <FiTv size={20}/>
  },
  {
    title: "Chatbot",
    path: "chatbot",
    icon: <BiBot size={20}/>
  },
  {
    title: "Contact Info",
    path: "contact-details",
    icon: <FiPhoneCall size={20}/>
  },
]