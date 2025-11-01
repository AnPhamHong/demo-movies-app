import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <h2>Movie</h2>
          <p>Discover your favorite movies & shows</p>
        </div>
        <div className="footer__links">
          <div className="footer__section">
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="footer__section">
            <h4>Support</h4>
            <ul>
              <li>Help Center</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="footer__social">
          <h4>Follow Us</h4>
          <div className="footer__icons">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          © An Pham Hong - {new Date().getFullYear()} MovieZone. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
