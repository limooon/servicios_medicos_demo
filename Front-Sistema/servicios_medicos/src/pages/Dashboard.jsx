
import Header from "./Header";
import Sidebar from "./Siderbar";
import Main from "./Main";
import Fotter from "./Fotter";


const Dashboard = () => {

    return (
      <>
        <div className="app-wrapper">
          <Header/>
          <Sidebar/>
          <Main/>
          <Fotter/>
        </div>
      </>
    );
}
export default Dashboard;