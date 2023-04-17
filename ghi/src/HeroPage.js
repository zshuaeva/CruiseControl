import image from "./photos/splash.jpeg";
function HeroPage() {

    return (
        <>

            <div className="p-3 mb-2 bg-secondary text-black">
                <div class="hero-unit">
                    <div className="p-3 mb-2 .bg-secondary.bg-gradient text-black" style={{ backgroundImage: `url(${image})` }}>
                        <h1>Hello, Welcome to Cruise Control !</h1>
                        <p>With our innovative software application, you can say goodbye to the hassle of paper workorders. Our digital solution streamlines the entire process, saving you time and effort. Say hello to a more efficient and organized way of managing your workorders. Experience the convenience of our software today!
                        </p>
                        <p>
                            <a className="btn btn-warning" href="ClientSignUp" role="button">Sign Up Now!</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HeroPage;
