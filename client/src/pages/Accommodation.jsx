import React from "react";
import Header from "../Components/ui/Header";
import headerImage from "../img/Accommodation-Header.webp";
import smallCottage from "../img/Small-cottage.webp";
import largeCottage from "../img/large-cottage.webp";
import { FiUser } from "react-icons/fi";
const Accommodation = () => {
  const Cottages = [
    {
      id: 1,
      title: "Large Cottage",
      img: largeCottage,
      desc: "Experience a delightful and spacious retreat at Aqua Cainta Resort's large cottage. Situated within the heart of the resort, this accommodation offers the perfect haven for families and groups looking to enjoy a fun-filled getaway with modern comforts.",
      Capacity: "40 people",
      price: "₱400.00",
    },
    {
      id: 2,
      title: "Small Cottage",
      img: smallCottage,
      desc: "A cozy and serene retreat nestled in nature. Its compact design and rustic charm create a peaceful and intimate atmosphere. Step inside to find a snug living space adorned with rustic details, offering a warm and inviting ambiance. Whether used as a vacation getaway or a permanent residence, a small cottage provides a tranquil haven to relax and appreciate the simplicity of life.",
      Capacity: "10 people",
      price: "₱300.00",
    },
  ];

  return (
    <div className="accomodation">
      <Header
        imageUrl={headerImage}
        title="Accomodations"
        pageSlug="accomodation"
        state=""
      />
      <div className="container-accomodation">
        <div className="wrapper">
          {Cottages.map((cottages) => (
            <div className="card" key={cottages.id}>
              <div className="content">
                <img className="img" src={cottages.img} alt="" />
                <div className="description">
                  <div className="title">
                    <h2>{cottages.title}</h2>
                  </div>
                  <p className="price">{cottages.price}</p>
                  <p className="desc">
                    {cottages.desc}
                  </p>
                  <div className="accomodation-details">
                    <div className="accomodation-detail">
                      <FiUser className="icon" />
                      <label>
                        Capacity: <span>{cottages.Capacity}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* <div className="card">
            <div className="content">
              <img className="img" src={largeCottage} alt="" />
              <div className="description">
                <div className="title">
                  <h2>Large Cottage</h2>
                </div>
                <p className="price">₱300.00</p>
                <p className="desc">
                  Experience a delightful and spacious retreat at Aqua Cainta
                  Resort's large cottage. Situated within the heart of the
                  resort, this accommodation offers the perfect haven for
                  families and groups looking to enjoy a fun-filled getaway with
                  modern comforts.
                </p>
                <div className="accomodation-details">
                  <div className="accomodation-detail">
                    <FiUser className="icon" />
                    <label>
                      Capacity: <span>40 people</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Accommodation;
