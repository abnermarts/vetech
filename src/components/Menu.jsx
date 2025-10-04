import { NavLink } from "react-router";

const Menu = ({children, to}) => {
    return(
        <NavLink to={to} className={`text-[0.8rem] font-medium cursor-pointer hover:opacity-75 transition ease-linear duration-300`}>{children}</NavLink>
    )
}

export default Menu;