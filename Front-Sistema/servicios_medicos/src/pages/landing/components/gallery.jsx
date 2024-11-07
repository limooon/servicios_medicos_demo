import { Image } from "./imagen";

export const Gallery = (props) => {
  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Gallery</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p>
        </div>

        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
              <div
                key={`${d.title}-${i}`}
                className="col-sm-6 col-md-4 col-lg-4 mb-4" // Agrega margen inferior para separación
              >
                <Image
                  title={d.title}
                  largeImage={d.largeImage}
                  smallImage={d.smallImage}
                />
              </div>
            ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};