import "./App.css";
import Login from "./components/Login";
import Sign from "./components/Sign";

function App() {
  let getusers = async () => {
    let rawData = await fetch("http://localhost:2222/userslist");
    let convertedData = await rawData.json();
    console.log(convertedData);
  };
  return (
    <div className="App">
      <Sign></Sign>
      <Login></Login>
      <div>
        <button
          onClick={() => {
            getusers();
          }}
        >
          get users
        </button>
      </div>
    </div>
  );
}

export default App;
