import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import LinksList from './links';
import classes from './Navbar.module.css';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (link: (typeof LinksList)[number]) => link.link === location.pathname;

  const links = LinksList.map((item) => (
    <a
      className={classes.link}
      data-active={isActive(item) ? true : undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>
    </nav>
  );
};

export default Navbar;
