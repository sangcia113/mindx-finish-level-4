import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import {
    HomePage,
    ProjectPage,
    ProjectDetailPage,
    SiginPage,
    SigupPage,
    TaskPage,
    TaskDetailPage,
} from './pages';
import { FooterComponent, HeaderComponent } from './components/';

const App = () => (
    <BrowserRouter>
        <ConfigProvider
            theme={{
                token: {
                    colorBgLayout: '#ebdfd7',
                    controlHeight: 40,
                    fontSize: 18,
                    fontFamily: "'Roboto', sans-serif",
                },
                components: {
                    Table: {
                        colorBgContainer: '#f2eae5',
                        headerBg: '#f2eae5',
                    },
                },
            }}
        >
            <Routes>
                <Route path="/signin" element={<SiginPage />} />
                <Route path="/signup" element={<SigupPage />} />
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
                <Route
                    path="/project"
                    element={
                        <>
                            <HeaderComponent />
                            <ProjectPage />
                            <FooterComponent />
                        </>
                    }
                />
                <Route
                    path="/project/detail/:projectId"
                    element={
                        <>
                            <HeaderComponent />
                            <ProjectDetailPage />
                            <FooterComponent />
                        </>
                    }
                />
                <Route
                    path="/task"
                    element={
                        <>
                            <HeaderComponent />
                            <TaskPage />
                            <FooterComponent />
                        </>
                    }
                />
                <Route
                    path="/task/:stageId"
                    element={
                        <>
                            <HeaderComponent />
                            <TaskPage />
                            <FooterComponent />
                        </>
                    }
                />
                <Route
                    path="/task/detail/:taskId"
                    element={
                        <>
                            <HeaderComponent />
                            <TaskDetailPage />
                            <FooterComponent />
                        </>
                    }
                />
            </Routes>
        </ConfigProvider>
    </BrowserRouter>
);

export default App;
