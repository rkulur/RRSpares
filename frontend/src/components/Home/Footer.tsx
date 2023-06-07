import React from "react";
import logo from "../../assets/images/footer-logo-1_x36@2x.webp";
import { HomeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebook,
  faPinterest,
  faInstagram,
  faLinkedinIn,
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcPaypal,
  faCcDinersClub,
  faCcDiscover,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="flex flex-col h-[31rem] items-center bg-footer bg-cover text-white">
      <div className="h-full defWidth flex items-center">
        <div className=" h-fit grid grid-rows-1 grid-cols-[auto_15%_15%_auto] items-start grids">
          <div className="flex flex-col items-start gap-4">
            <img className="w-[12.8rem] " src={logo} />
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore veniam aliquid minima molestias, placeat
              aliquam, distinctio eos.
            </p>
            <div className=" flex justify-around p-2 w-3/4 ">
              <FontAwesomeIcon className="hover:text-orange-400 transition-all" icon={faGoogle} size="xl" />
              <FontAwesomeIcon className="hover:text-orange-400 transition-all" icon={faFacebook} size="xl" />
              <FontAwesomeIcon className="hover:text-orange-400 transition-all" icon={faPinterest} size="xl" />
              <FontAwesomeIcon className="hover:text-orange-400 transition-all" icon={faInstagram} size="xl" />
              <FontAwesomeIcon className="hover:text-orange-400 transition-all" icon={faLinkedinIn} size="xl" />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-lg">Useful Links</h1>
            <ul className="list">
              <li>
                <Link to={"/"}>Privacy Policy</Link>
              </li>
              <li>
                <Link to={"/"}>Returns</Link>
              </li>
              <li>
                <Link to={"/"}>Terms and Condition</Link>
              </li>
              <li>
                <Link to={"/"}>Contact Us</Link>
              </li>
              <li>
                <Link to={"/"}>Lastest News</Link>
              </li>
              <li>
                <Link to={"/"}>Our Sitemap</Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="font-bold text-lg">Our Stores</h1>
            <ul className="list">
              <li>
                <Link to={"/"}>Order</Link>
              </li>
              <li>
                <Link to={"/"}>Deliveries</Link>
              </li>
              <li>
                <Link to={"/"}>Shipping</Link>
              </li>
              <li>
                <Link to={"/"}>Affiliates</Link>
              </li>
              <li>
                <Link to={"/"}>Manufactuer</Link>
              </li>
              <li>
                <Link to={"/"}>Search</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-lg">About the spares</h1>
            <p>STORE - Worldwide fashion store since 1970. We sell over 1000+ branded products on our website.</p>
            <div className="flex gap-2">
              <HomeIcon className="h-6 w-6" />
              <span>No: 58 A, East Madison Street, Baltimore, MD, USA 4508</span>
            </div>
            <div className="flex gap-2">
              <PhoneIcon className="h-6 w-6" />
              <span>Phone: 0000 - 123 - 456789</span>
            </div>
            <div className="flex justify-evenly p-2 w-3/4 ">
              <FontAwesomeIcon className="hover:text-orange-400 transition-all scale-x-110" size="xl" icon={faCcVisa} />
              <FontAwesomeIcon
                className="hover:text-orange-400 transition-all scale-x-110"
                size="xl"
                icon={faCcMastercard}
              />
              <FontAwesomeIcon className="hover:text-orange-400 transition-all scale-x-110" size="xl" icon={faCcAmex} />
              <FontAwesomeIcon
                className="hover:text-orange-400 transition-all scale-x-110"
                size="xl"
                icon={faCcPaypal}
              />
              <FontAwesomeIcon
                className="hover:text-orange-400 transition-all scale-x-110"
                size="xl"
                icon={faCcDinersClub}
              />
              <FontAwesomeIcon
                className="hover:text-orange-400 transition-all scale-x-110"
                size="xl"
                icon={faCcDiscover}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
