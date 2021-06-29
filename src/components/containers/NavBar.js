import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'

const NavBar = () => {
  return (
    <div className="navbar">
      <NavLink to="/"><p id="BattleScreenRoute">Battle Sceen</p></NavLink>
      <br></br>
      <NavLink to="/Rules"><p id="RulesRoute">Rules Sceen</p></NavLink>
      <br></br>
      <NavLink to="/TypeChart"><p id="TypeRoute">Type Chart</p></NavLink>
    </div>
  );
};

export default NavBar;