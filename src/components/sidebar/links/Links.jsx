const Links = () => {
    const items = ["About", "Tech", "Projects", "Contact"];
    return (
        <div className="links">{items.map(item=>(
            <a href={`#${item}`} key={item}>{item}</a>
        ))}</div>
    );
}

export default Links