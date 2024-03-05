import { useState } from "react";
import WeatherApp from "./component/WeatherApp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <h1 className="text-center text-4xl font-bold pt-4">Weather App</h1> */}
      <WeatherApp />
    </>
  );
}

export default App;
