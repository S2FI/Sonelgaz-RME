const image = require("../images/page_accueil.jpg");
function PageDaccueil() {
  console.log(window.innerHeight, window.innerWidth);
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",

        width: "100%",
        height: "625px",
      }}
    ></div>
  );
}

export default PageDaccueil;
