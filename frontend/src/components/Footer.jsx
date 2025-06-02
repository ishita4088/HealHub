import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            HEALHUB makes healthcare simple and stress-free. From finding the
            right doctor to booking appointments instantly, we're here to
            connect you with quality care anytime, anywhere.
          </p>
        </div>

        <div >
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-2 text-gray-600" >
                <li>Home</li>
                <li>About us</li>
                <li>Contact</li>
            </ul>
        </div>

        <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-2 text-gray-600">
                <li>+91 9711343503</li>
                <li>healhub760@gmail.com</li>
            </ul>
        </div>
      </div>
      
      <div>
            <hr />
            <p className="py-5 text-sm text-center">Copyright 2025@ HEALHUB - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
