import React from 'react'
import { NavLink } from 'react-router-dom'
import "../App.css"
const Sidebar = ({children}) => {
      const menuItems = [
        {
          path: "/home",
          name: "Home"
        },
        {
          path: "/students",
          name: "Students"
        },
        {
          path: "/events",
          name: "Events"
        },
        {
          path: "/contactinfo",
          name: "Contact Info"
        },
        {
          path: "/Logout",
          name: "Logout"
        }
      ]

  return (
    <div className="container">
      <div class ="sidebar" >
        {
          menuItems.map((item, index) =>(
            <NavLink to={item.path} key={index} className="link" activeclassName="active">
              <div className="link_text">{item.name}</div>
            </NavLink>
          ))
        }
      </div>
      <main>{children}</main>
    </div>
  )
}
export default Sidebar

