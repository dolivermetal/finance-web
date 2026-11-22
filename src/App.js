import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}