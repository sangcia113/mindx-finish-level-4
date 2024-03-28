import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { HomePage, SiginPage, SigupPage } from './pages';
import { FooterComponent, HeaderComponent } from './components/';

const App = () => (
    <BrowserRouter>
        <ConfigProvider
            theme={{
                token: {
                    colorBgLayout: '#ebdfd7',
                    controlHeight: 40,
                    fontSize: 20,
                    fontFamily: "'Roboto', sans-serif",
                },
            }}
        >
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <HeaderComponent />
                            <HomePage />
                            <FooterComponent />
                        </>
                    }
                />
                <Route path="/signin" element={<SiginPage />} />
                <Route path="/signup" element={<SigupPage />} />
            </Routes>
        </ConfigProvider>
    </BrowserRouter>
);

export default App;
