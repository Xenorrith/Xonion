import Sidebar from "./components/Sidebar";
import Page from "./components/Page";
import ContextMenu from "./components/ContextMenu";

const Home = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <Page />
      </div>
      <ContextMenu />
    </>
  );
};

export default Home;
