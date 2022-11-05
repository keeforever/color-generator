import { useState, useEffect } from "react";
import ColorPlates from "./components/ColorPlates";
import Values from "values.js";

function App() {
  const [color, setColor] = useState("");
  const [isError, setIsError] = useState(false);
  const [colorValue, setColorValue] = useState("");

  // input handler
  const inputHandler = (e) => {
    setColorValue(e.target.value);
  };

  // color submission
  const colorSubmit = (e) => {
    e.preventDefault();
    if (colorValue === "") {
      setIsError(!isError);
      return;
    }
    colorConversion();
  };
  
  // color error catch
  const colorConversion = () => {
    try {
      const hexColor = new Values(colorValue === "" ? "red" : colorValue);
      setColor(hexColor.all(10));
    } catch (error) {
      console.log(error);
      setIsError(!isError);
      setColorValue("");
    }
  };
  
  useEffect(() => {
    colorConversion();
    const time = setTimeout(() => {
      setIsError(false);
    }, 2000);
    return () => {
      clearTimeout(time);
    };
  }, [isError]);

  return (
    <main>
      <section className="container">
        <header className="head">
          <h1>Color Generator</h1>
          <form className="form-control" onSubmit={colorSubmit}>
            <input
              type="text"
              placeholder="red"
              className={`form-color-input ${isError ? "error-alert" : ""}`}
              value={colorValue === "" ? "" : colorValue}
              onChange={inputHandler}
            />
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </form>
        </header>
        {color !== "" && <ColorPlates color={color} />}
      </section>
    </main>
  );
}

export default App;
