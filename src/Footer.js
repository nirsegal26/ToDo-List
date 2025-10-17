const Footer = ({length}) => {
    return (
    <footer>
        <p>You have {length} unfinished {(length!=1) ? "missions" : "mission"}</p>
    </footer>
    )
}

export default Footer;