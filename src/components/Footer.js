const Footer = () => {
  return (
    <div className='footer text-muted'>
      <a href='https://github.com/jasont01/todo-list'>
        <i className='fas fa-code'>
          <span> created by Jason Thompson</span>
        </i>
        <i className='fab fa-github'></i>
      </a>
      <br />
      <a href='https://unsplash.com/photos/3ym6i13Y9LU'>
        <i className='fab fa-unsplash'>
          <span> background by Mike Tinnion on Unsplash</span>
        </i>
      </a>
    </div>
  );
};

export default Footer;
