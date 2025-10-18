const Footer = ({length}) => {
    return (
    <footer>
        <p>יש לך {length} משימ{(length !== 1) ? "ות" : "ה"} לא גמור{(length !== 1) ? "ות" : "ה"}</p>
    </footer>
    )
}

export default Footer;