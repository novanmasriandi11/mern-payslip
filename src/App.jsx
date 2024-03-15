import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLayout from "./pages/PageLayout";
import PageSignIn from "./pages/PageSignIn";
import PageUsers from "./pages/PageUsers";
import PageEmployee from "./pages/PageEmployee";
import PageSalaries from "./pages/PageSalaries";
import PageEmpSalaryCheck from "./pages/PageEmpSalaryCheck";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<PageSignIn />} />
          <Route path="/users" element={<PageUsers />} />
          <Route path="/employee" element={<PageEmployee />} />
          <Route path="/salaries" element={<PageSalaries />} />
          <Route path="/cek-slip" element={<PageEmpSalaryCheck />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
