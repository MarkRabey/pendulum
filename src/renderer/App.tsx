import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Provider from './Provider';
import Home from './screens/Home';
import Settings from './screens/Settings';

export default function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </Provider>
  );
}
