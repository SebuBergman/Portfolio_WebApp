import "./cover.scss";

const CoverImage = () => {
    return (
        <div className="coverImage">
            <div className="wrapper">
                <div className="textContainer">
                    <h2>Sebastian Bergman</h2>
                    <h1>Web developer and UI/UX Designer</h1>
                    <div className="buttons">
                        <button>See my latest work</button>
                        <button>Contact me</button>
                    </div>
                </div>
                <div className="imageContainer">
                    <img src="/PictureSebu_Ilmantaustaa.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default CoverImage;