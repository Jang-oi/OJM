import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import StorePage from './pages/StorePage';
import StoreDetailPage from './pages/StoreDetailPage';
import { CoordsProvider } from './contexts/coordsContext';
import { StoreProvider } from './contexts/storeContext';
import { FilterProvider } from './contexts/filterContext';

const App = () => {
    // axios.defaults.baseURL = process.env.REACT_APP_BACK_URL;

    return (
        <CoordsProvider>
            <StoreProvider>
                <FilterProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/store" element={<StorePage />} />
                            <Route path="/store/:id" element={<StoreDetailPage />} />
                        </Routes>
                    </BrowserRouter>
                </FilterProvider>
            </StoreProvider>
        </CoordsProvider>
    );
};

export default App;
