import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, SiginPage, SigupPage } from './pages';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SiginPage />} />
            <Route path="/signup" element={<SigupPage />} />
        </Routes>
    </BrowserRouter>
);

export default App;
