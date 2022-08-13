import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import StorePage from './pages/StorePage';
import { CoordsProvider } from './contexts/coordsContext';
import { StoreProvider } from './contexts/storeContext';
import { FilterProvider } from './contexts/filterContext';

const App = () => {
    axios.defaults.baseURL = process.env.REACT_APP_BACK_URL;

    return (
        <CoordsProvider>
            <StoreProvider>
                <FilterProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/store" element={<StorePage />} />
                        </Routes>
                    </BrowserRouter>
                </FilterProvider>
            </StoreProvider>
        </CoordsProvider>
    );
};

export default App;
