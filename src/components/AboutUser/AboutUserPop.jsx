import React, { useState } from 'react';
import './AboutUser.css'; // import the CSS file

function Component() {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlePopoverHover = () => {
    setIsMenuOpen(true);
  };

  const handlePopoverLeave = () => {
    setIsMenuOpen(false);
  };
  const isoDateString = user?.user?.createdAt;
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
const normalDate = new Date(isoDateString).toLocaleDateString('en-GB', options);
  return (
    <div className="popover" onMouseEnter={handlePopoverHover} onMouseLeave={handlePopoverLeave}>
      <img src={user.user.avatar ?user.user.avatar : "https://img.icons8.com/material-rounded/24/null/user.png" } alt="avatar" />
      {isMenuOpen && (
        <div className="menu">
          <header>
           
            <div style={{width:"fit-content"}}>
            <img src={user.user.avatar ?user.user.avatar : "https://img.icons8.com/material-rounded/24/null/user.png" } alt="avatar" /><h2>{user?.user?.firstName} {user?.user?.lastName}</h2>
              <h3>{user?.user?.email}</h3>
              <h3>تاريخ الانشاء: {normalDate}</h3>
            </div>
          </header>
        </div>
      )}
    </div>
  );
}

export default Component;
<div class="popover">
  <img src="avatar.webp" alt="avatar" />
  <div class="menu">
    <header>
      <img src="avatar.webp" alt="avatar" />
      <div>
        <h2>Jordan Hughes</h2>
        <h3>Melbourne, Australia</h3>
      </div>
    </header>
    <p>About Me:</p>
    <ul>
      <li>Age: 35</li>
      <li>Occupation: Web Developer</li>
      <li>Interests: Cooking, Hiking, Photography</li>
    </ul>
  </div>
</div>