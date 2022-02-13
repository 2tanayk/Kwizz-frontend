import React from "react";
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <NavContainer>
      <Nav>
        <Bars />
        <NavMenu>
          <WebsiteLogo to="/" activeStyle>
            Kwizz
          </WebsiteLogo>
          <NavLink to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/scores" activeStyle>
            Your Scores
          </NavLink>
          <NavLink to="/your-quizes" activeStyle>
            Your Quizes
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/signin">Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
      </NavContainer>
  );
};

export const Nav = styled.nav`
  background: #0f52ba;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 10px;
  z-index: 12;
  /* Third Nav */
  /* justify-content: flex-start; */
`;

const WebsiteLogo = styled(Link)`
  color: #ffd700;
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: 100px;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-size: 25px;
`;

const NavLink = styled(Link)`
  color: #ffffff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-size: 15px;
  &.active {
    color: #000000;
  }
`;

const Bars = styled(FaBars)`
  display: none;
  color: #808080;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #ffffff;
  padding: 10px 10px;
  color: #000000;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;

const NavContainer=styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  position: fixed;
  top: 0;
  width: 100%;
  z-index:2;
`;

export default Navbar;
