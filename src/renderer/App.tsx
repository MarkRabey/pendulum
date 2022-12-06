import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Provider from './Provider';
import Home from './screens/Home';

export default function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
}
