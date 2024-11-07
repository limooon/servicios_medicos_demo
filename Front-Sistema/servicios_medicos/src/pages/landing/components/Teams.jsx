export const Team = (props) => {
    return (
      <div id="team" className="text-center">
        <div className="container">
          <div className="col-md-8 mx-auto section-title"> {/* Usando mx-auto para centrar */}
            <h2>Meet the Team</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
              dapibus leonec.
            </p>
          </div>

          <div className="row"> {/* Clase correcta para organizar columnas */}
            {props.data
              ? props.data.map((d, i) => (
                  <div key={`${d.name}-${i}`} className="col-md-3 col-sm-6 mb-4"> {/* Margen inferior para espacio */}
                    <div className="thumbnail">
                      <img src={d.img} alt={d.name} className="team-img img-fluid" /> {/* img-fluid para responsividad */}
                      <div className="caption">
                        <h4>{d.name}</h4>
                        <p>{d.job}</p>
                      </div>
                    </div>
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    );
};