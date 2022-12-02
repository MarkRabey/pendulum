import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Timer from './components/Timer';

export default function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Timer />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
