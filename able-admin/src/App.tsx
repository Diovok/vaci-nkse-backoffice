import { Routes, Route } from 'react-router-dom';
import Login2 from 'pages/LoginPage'; // ahogy nevezed

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login2 />} />
    </Routes>
  );
}

export default App;
