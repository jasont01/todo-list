import { FaCode } from 'react-icons/fa';
import { SiUnsplash } from 'react-icons/si';

const Footer = () => {
  return (
    <div className='footer text-muted'>
      <FaCode />
      <span> created by </span>
      <a href='http://jasont.us'>Jason Thompson </a>
      <br />
      <SiUnsplash />
      <span> background by </span>
      <a href='https://unsplash.com/photos/3ym6i13Y9LU'>Mike Tinnion </a>
    </div>
  );
};

export default Footer;
