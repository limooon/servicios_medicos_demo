import React from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import MedicalCalendar from "../components/consultas/MedicalCalendar";
import MonthlyIncomeChart from "../components/multas/GraficoMultasMenu";
import MedicalStatistics from "../components/consultas/GraficoConsultasMain";

const Main = () => {
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Full Name",
      selector: (row) => row.fullName,
    },
    {
      name: "Height",
      selector: (row) => row.height,
    },
    {
      name: "Weight",
      selector: (row) => row.weight,
    },
  ];
  const rows = [
    {
      id: 1,
      fullName: "John Doe",
      height: "1.75m",
      weight: "89kg",
    },
    {
      id: 2,
      fullName: "Jane Doe",
      height: "1.64m",
      weight: "55kg",
    },
    {
      id: 3,
      fullName: "Sheera Maine",
      height: "1.69m",
      weight: "74kg",
    },
  ];
  return (
    <main className="app-main">
      {/* App Content Header */}

      <div className="app-content-header">
        {/* Container */}
        <div className="container-fluid">
          {/* Row */}
          <div className="row">
            <div className="col-sm-6">
              <h3 className="mb-0">Dashboard v3</h3>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-end">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Dashboard v3
                </li>
              </ol>
            </div>
          </div>
          {/* End Row */}
        </div>
        {/* End Container */}
      </div>

      <div className="app-content">
        {/* Container */}
        <div className="container-fluid">
          {/* Row */}
          <div className="row">
            <div className="col-lg-6">
              {/* Card: Online Store Visitors */}
              <div className="card mb-4">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h3 className="card-title">Online Store Visitors</h3>
                    <a
                      href="javascript:void(0);"
                      className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                    >
                      View Report
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    {/* Card 1 */}
                    <div className="col-lg-4 col-6">
                      <div className="small-box bg-info">
                        <div className="inner">
                          <Link to="/multas" className="small-box-footer">
                          <h3>Multas</h3>
                          <p>multas 2024:</p>
                          </Link>
                        </div>
                        <div className="icon">
                          <i className="ion ion-bag"></i>
                        </div>
                        <a href="#" className="small-box-footer">
                          Más información{" "}
                          <i className="fas fa-arrow-circle-right"></i>
                        </a>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="col-lg-4 col-6">
                      <div className="small-box bg-success">
                        <div className="inner">
                          <Link to="/consulta" className="small-box-footer">
                            <h3>Consultas</h3>
                            <p>2024</p>
                          </Link>
                        </div>
                        <div className="icon">
                          <i className="ion ion-stats-bars"></i>
                        </div>
                        <a href="#" className="small-box-footer">
                          Más información{" "}
                          <i className="fas fa-arrow-circle-right"></i>
                        </a>
                      </div>
                    </div>

                    {/* Card 3 */}
                    <div className="col-lg-4 col-6">
                      <div className="small-box bg-warning">
                        <div className="inner">
                          <Link to="/logistica" className="small-box-footer">
                            <h3>Logistica</h3>
                            <p>2024</p>
                          </Link>
                        </div>
                        <div className="icon">
                          <i className="ion ion-person-add"></i>
                        </div>
                        <a href="#" className="small-box-footer">
                          Más información{" "}
                          <i className="fas fa-arrow-circle-right"></i>
                        </a>
                      </div>
                    </div>

                    {/* Example of Online Store Visitors Card */}
                    <div className="col-lg-12 col-12 mb-4">
                      <div className="card">
                        <MonthlyIncomeChart />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.card */}

              {/* Card: Products */}
              <div className="card mb-4">
                <MedicalStatistics />
              </div>
              {/* /.card */}
            </div>
            {/* /.col-md-6 */}

            <div className="col-lg-6">
              {/* Card: Sales */}
              <div className="card mb-4">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h3 className="card-title">Citas Medicas</h3>
                    <a
                      href="javascript:void(0);"
                      className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                    >
                      
                    </a>
                  </div>
                </div>
                <div className="card-body">
                   <MedicalCalendar />
                </div>
              </div>
              {/* /.card */}

              {/* Card: Online Store Overview */}
              <div className="card">
                <div className="container my-5">
                 
                   
                    <DataTable
                      columns={columns}
                      data={rows}
                      fixedHeader
                      title="Consulta rapida de multas"
                      pagination
                      selectableRows
                    />
                  
                </div>
              </div>
              {/* /.card */}
            </div>
            {/* /.col-md-6 */}
          </div>
          {/* End Row */}
        </div>
        {/* End Container */}
      </div>
    </main>
  );
};

export default Main;
