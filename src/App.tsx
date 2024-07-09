import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import NewHome from "./home/newHome/Home";
import Search from "./pages/search/Search";
import WebSocketProvider from "./context/WebSocketProvider";
import InvoiceList from './pages/new-ui/InvoiceList'; 


function App() {
  return (
    <WebSocketProvider>
      <Router>
        <Routes>åå
          <Route path="/old" element={<Home />} />
          <Route path="/" element={<NewHome />} />
          <Route path="/Search" element={<Search />} />
          <Route path = "/Invoice" element ={<InvoiceList />} />
        </Routes>
      </Router>
    </WebSocketProvider>
  );
}

export default App;
