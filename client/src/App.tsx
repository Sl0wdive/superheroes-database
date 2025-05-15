import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SuperheroListPage } from "./pages/SuperheroListPage";
import { SuperheroDetailPage } from "./pages/SuperheroDetailPage";
import { Header } from "./components/Header";
import { SuperheroCreatePage } from "./pages/CreateSuperhero";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SuperheroListPage />} />
        <Route path="/superheroes/:id" element={<SuperheroDetailPage />} />
        <Route path="/create" element={<SuperheroCreatePage />} />
        <Route path="/edit/:id" element={<SuperheroCreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
