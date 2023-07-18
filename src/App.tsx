import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000/sse", {
      withCredentials: true,
    });
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "message") {
        window.alert(data.message);
      } else if (data.type === "close") {
        window.alert("연결이 종료되었습니다.");
        eventSource.close();
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <button>SSE 끄기</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
