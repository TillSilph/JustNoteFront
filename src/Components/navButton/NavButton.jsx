const NavButton = ({ children, activeNav, id, setNav }) => {
    function setActiveMe() {
        setNav(id);
    }

    return (
        <button onClick={setActiveMe} className={activeNav == id ? 'navButton active' : 'navButton'}>
            {children}
        </button>
    );
};

export default NavButton;
