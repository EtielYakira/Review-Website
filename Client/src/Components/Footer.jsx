import React from "react";
import {
  IoLogoFacebook,
  IoLogoWhatsapp,
  IoLogoTwitter,
  IoLogoYoutube,
} from "react-icons/io";


function Footer() {
  return (
          <div className="justify-content-center justify-content-evenly bg-dark text-center" style={{minHeight:'5vh'}}>
            <a  href='#1'>
                <IoLogoFacebook className='m-1 Footer-social text-primary' />
            </a>
            <a  href='#1'>
                <IoLogoYoutube  className='m-1 Footer-social text-danger'/>
            </a>
            <a  href='#1'>
                <IoLogoTwitter  className='m-1 Footer-social text-info'/>
            </a>
            <a  href='#1'>
                <IoLogoWhatsapp className='m-1 Footer-social text-green' />
            </a>
          </div>
  );
}

export default Footer;
