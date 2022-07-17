import './App.css';
import {useState} from "react";
import axios from "axios";

import {Route, Routes} from "react-router-dom";
// MUI
import {Container} from "@mui/material";
// 컴포넌트
import Loading from "./components/Loading";
// 페이지
import Main from "./pages/Main";

const App = () => {
  const [loading, setLoading] = useState(false);

  axios.defaults.baseURL = `http://${window.location.hostname}:8080`;
  /**
   * axios then 이나 catch 처리되기 전의 요청 응답의 공통 기능 처리
   */
  axios.interceptors.request.use(
      config => {
        setLoading(true);
        return config;
      },
      error => {
        setLoading(true);
        return Promise.reject(error);
      }
  )
  axios.interceptors.response.use(
      config => {
        setLoading(false);
        return config;
      },
      error => {
        setLoading(false);
        return Promise.reject(error);
      }
  )

  return (
      <Container>
        {loading && <Loading/>}
        <Routes>
          <Route path="/" element={<Main/>}/>
        </Routes>
      </Container>
  );
}

export default App;
