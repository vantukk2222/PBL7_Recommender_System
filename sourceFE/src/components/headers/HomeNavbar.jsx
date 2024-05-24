import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./css/HomeNavbar.css";
import { Transition } from "@headlessui/react";

import {
  CodeIcon,
  HamburgetMenuClose,
  HamburgetMenuOpen,
  BrowseIcon,
} from "./icon";
import { ModalHeader } from "./ModalHeader";

function HomeNavbar() {
  const [isModalGenresOpen, setIsModalGenresOpen] = useState(false);
  const [isModalRankingOpen, setIsModalRankingOpen] = useState(false);

  const [login, setLogin] = useState(false);

  const [clickProfile, setClickProfile] = useState(false);
  const modalRef = useRef(null);

  const handleClickProfile = () => {
    setClickProfile(!clickProfile);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setClickProfile(false);
    }
  };
  useEffect(() => {
    if (clickProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickProfile]);
  const genres = {
    Novels: {
      data: [
        [
          "Urban",
          "Fantasy",
          "Sci-fi",
          "Mystery",
          "Adventure",
          "Action",
          "Horror",
          "Slice of Life",
          "School Life",
          "Historical",
          "Martial Arts",
          "Sports",
        ],
        ["Urban", "Fantasy", "History", "Teen", "LGBT+", "Sci-fi", "General"],
      ],
    },
    Fan_fic: {
      data: [
        [
          "Anime & Comics",
          "Video Games",
          "Celebrities",
          "Music & Bands",
          "Movies",
          "TV",
          "Book & Literature",
          "Theater",
          "Orther",
        ],
      ],
    },
  };
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="flex flex-row">
            <a href="/" className="nav-logo mr-10">
              <span></span>
              {/* <i className="fas fa-code"></i> */}
              <span className="icon">
                <CodeIcon />
              </span>
            </a>

            <ul className="nav-menu">
              <li className="nav-item">
                <a
                  href="/genres/novels/all"
                  className="nav-links flex flex-row"
                  onMouseEnter={() => setIsModalGenresOpen(true)}
                  onMouseLeave={() => setIsModalGenresOpen(false)}
                  style={{ position: "relative" }}
                >
                  <span
                    className="mr-2 mt-2"
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    <BrowseIcon />
                  </span>
                  <strong>Browse</strong>{" "}
                  {isModalGenresOpen && <ModalHeader dataModal={genres} />}
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/ranking/"
                  className="nav-links flex flex-row"
                  onMouseEnter={() => setIsModalRankingOpen(true)}
                  onMouseLeave={() => setIsModalRankingOpen(false)}
                  style={{ position: "relative" }}
                >
                  <strong>Rankings</strong>
                  {isModalRankingOpen && (
                    <div className="absolute top-full left-0 hover:cursor-auto	">
                      <div className=" flex flex-col text-white  pt-2 text-[18px] font-semibold  bg-black h-max-[120px] h-fit  w-max rounded-tl-lg	rounded-bl-lg ">
                        {Object.keys(genres)?.map((genre, index) => (
                          <NavLink
                            to={
                              "/ranking/" +
                              genre
                                .toLowerCase()
                                .replace("_", "-")
                                .replace(" ", "-")
                            }
                            key={index}
                            className="pl-2 py-2 pr-6 hover:bg-blue-700 -lg hover:cursor-pointer  "
                          >
                            {genre.replace("_", "-") + " Ranking"}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-row items-center gap-4">
            <a className="  " href="/search" rel="nofollow" title="Search">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="fill-slate-400 border-1 rounded border-blue-400 hover:border-slate-500 hover:fill-slate-500 transition-all duration-300"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.745 16.442a8 8 0 111.697-1.697L21 19.303 19.303 21l-4.558-4.558zM15.6 10a5.6 5.6 0 11-11.2 0 5.6 5.6 0 0111.2 0z"
                ></path>
              </svg>
            </a>
            <a
              title="Library"
              className="text-[17px] font-medium text-gray-500"
              href="/library"
              rel="nofollow"
            >
              <strong>Library</strong>
            </a>
            <div className=" relative">
              <i className="absolute dot dn pa t-0 r-0 rounded-full z-10"></i>
              {login ? (
                <a
                  className="block"
                  href="###"
                  title="My Profile"
                  rel="nofollow"
                  onClick={() => {
                    handleClickProfile();
                  }}
                >
                  <img
                    id="headerAvatar"
                    width="40"
                    height="40"
                    className="rounded-full overflow-hidden transition-all duration-300 w-10 h-10"
                    src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
                    alt="DaoistpNlawl"
                  />
                </a>
              ) : (
                <a
                  className="block uppercase text-[15px] text-white bg-blue-500 px-4 py-1 rounded-2xl hover:bg-blue-600 transition-all duration-300"
                  href="/login"
                  title="My Profile"
                  rel="nofollow"
                >
                  Sign in
                </a>
              )}
              {clickProfile && (
                <div
                  ref={modalRef}
                  className="modalProfile absolute right-0 mt-2 w-56 bg-gray-800 text-white border rounded shadow-lg z-20"
                >
                  <div className="flex p-3 border-b">
                    <a
                      href="/profile/4327849712"
                      title="My Profile"
                      className="flex-shrink-0"
                    >
                      <img
                        width="56"
                        height="56"
                        className="mr-2"
                        src="//user-pic.webnovel.com/userheadimg/4327849712-10/200.jpg?uut=1716548842206&imageMogr2/quality/80"
                        alt="DaoistpNlawl"
                      />
                    </a>
                    <div>
                      <div className="flex items-center mb-1">
                        <a
                          href="/profile/4327849712"
                          title="My Profile"
                          className="font-bold text-lg truncate"
                        >
                          DaoistpNlawl
                        </a>
                        <a
                          href="/level"
                          title="My level"
                          className="ml-1 text-sm font-medium"
                        >
                          Lv 1
                        </a>
                      </div>
                      <div className="flex">
                        <a
                          className="flex items-center mr-4"
                          href="/bill/fastpass"
                          title="Fast pass"
                        >
                          <img
                            className="w-5 h-5"
                            src="//www.yueimg.com/en/images/fastpass.deb1e01a.png"
                            alt="fastpass"
                          />
                          <em className="ml-1 font-bold">0</em>
                        </a>
                        <a
                          className="flex items-center"
                          href="/bill/power"
                          title="Power Stones"
                        >
                          <img
                            className="w-5 h-5"
                            src="//www.yueimg.com/en/images/power.dfd3f629.png"
                            alt="power"
                          />
                          <em className="ml-1 font-bold">1</em>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b">
                    <a
                      className="flex items-center mr-4"
                      href="/bill/coin"
                      title="Coins"
                      data-report-eid="qi_A13"
                    >
                      <img
                        className="w-6 h-6 mr-1"
                        src="//www.yueimg.com/en/images/coin.2d25dfa5.png"
                        alt="coin"
                      />
                      <em className="font-bold">0</em>
                    </a>
                    <a
                      href="###"
                      className="text-sm font-medium"
                      data-report-eid="qi_A14"
                    >
                      Get More
                    </a>
                  </div>
                  <div className="p-2 border-b">
                    <section className="relative p-3 border rounded-md bg-warning-gradient">
                      <h5 className="font-bold text-lg mb-1">Get Membership</h5>
                      <p className="text-xs mb-2">Get Extra 60% Bonus</p>
                      <span className="btn btn-xs btn-warning">Go</span>
                      <a
                        href="###"
                        className="absolute inset-0"
                        data-report-eid="qi_A_membership"
                        title="Get Membership"
                      >
                        <span className="sr-only">more</span>
                      </a>
                    </section>
                  </div>
                  <ul>
                    <li>
                      <a
                        href="###"
                        title="show task panel"
                        className="block p-3 hover:bg-gray-600"
                        data-active-type="1"
                      >
                        <strong className="block">Earn Rewards</strong>
                        <small className="text-xs">by check-in and more</small>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/giftcard"
                        title="Redeem"
                        className="block p-3 hover:bg-gray-600"
                      >
                        Redeem
                      </a>
                    </li>
                    <li>
                      <a
                        href="/transactions"
                        title="Purchase History"
                        className="block p-3 hover:bg-gray-600"
                      >
                        Purchase History
                      </a>
                    </li>
                    <li>
                      <a
                        href="/events"
                        title="Inbox"
                        className="block p-3 hover:bg-gray-600"
                      >
                        Inbox
                      </a>
                    </li>
                    <li>
                      <a
                        href="###"
                        title="Sign Out"
                        className="block p-3 hover:bg-gray-600"
                      >
                        Sign Out
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          {/* <div className="nav-icon" onClick={handleClick}>

            {click ? (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuOpen />
              </span>
            )}
          </div> */}
        </div>
      </nav>
    </>
  );
}

export default HomeNavbar;
