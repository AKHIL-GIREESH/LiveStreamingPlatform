import Search from "./Search"

const Navbar = () => {
    return(
        <nav className="fixed top-0 w-full h-20 px-2 lg:px-4 bg-[#000] flex justify-between items-center shadow-sm">
            <Search/>
        </nav>
    )
}

export default Navbar