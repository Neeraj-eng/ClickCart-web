import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaCode
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";


export default function Footer() {
  return (

    <footer className="bg-[#0f172a] text-gray-300 text-center py-4 border-t border-gray-700">
        <div className="w-full h-px bg-gray-400 my-6">___________________________________________________________</div>

      <p className="text-sm">
        © {new Date().getFullYear()} Developed and maintained by{" "}
        <span className="text-blue-400 font-semibold hover:underline">
          Neeraj Nagar
        </span>
      </p>
   <div className="flex justify-center">
  <a
    href="mailto:nirajnagar8085@gmail.com"
    className="p-4 hover:text-white transition-colors mr-4"
  >
    <FaEnvelope />
  </a>
  <a
    href="tel:7440369385"
    className="hover:text-white transition-colors"
  >
    <FaPhone />
  </a>
  <a
    href="https://linkedin.com/in/neeraj-nagar-a83ab02a4"
    target="_blank"
            rel="noopener noreferrer"
            className=" p-4 hover:text-white transition-colors"
          >
            <FaLinkedin />
          </a>
       <a
            href="https://github.com/neeraj-eng"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaGithub />
        </a>

        <a
            href="https://codolio.com/profile/neeraj_nagar"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 hover:text-white transition-colors"
          >
            <FaCode />
        </a>
</div>

    </footer>
  );
}


