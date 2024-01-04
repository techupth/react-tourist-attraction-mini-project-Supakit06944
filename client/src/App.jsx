import "./App.css";
import SearchBar from "./component/searchBar";

function App() {
  return (
    <div className="App">
      <div className="header ">
        <h1 className="topic font-extrabold text-[#63B4E4] flex justify-center text-5xl mt-[50px] mb-[40px]">
          เที่ยวไหนดี
        </h1>
      </div>
      <SearchBar />
    </div>
  );
}

export default App;
