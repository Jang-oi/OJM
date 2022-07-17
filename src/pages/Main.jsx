import {useEffect, useState} from "react";
import axios from "axios";
// MUI
import {Container} from "@mui/material";
// 컴포넌트
import StoreList from "../components/StoreList";

const Main = () => {
    const [store, setStore] = useState([]);

    /**
     * Geolocation API 에서 값을 받아 API 호출하여 리스트 가져옴.
     * @param position
     */
    const setLocation = (position) => {
        const getStoreListUrl = `/test/ojm/store?searchCoord=${position.coords.longitude};${position.coords.latitude}`;
        axios.get(getStoreListUrl).then((response) => {
            setStore(response.data.data);
        })
    }

    /**
     * Geolocation API 가 정상적으로 동작 하지 않은 경우 콜백 함수
     * @param error
     */
        // TODO 에러 코드에 따른 alert 수정...
    const geoErrCallBack = (error) => {
        switch (error.code) {
            case 1 :
                alert('허용 거부');
                break;
            case 2 :
                alert('위치정보 찾을 수 없는 곳');
                break;
            default :
                break;
        }
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setLocation, geoErrCallBack);
        } else {
            alert("사용자의 웹 브라우저가 Geolocation API를 지원하지 않습니다.");
        }
    }, []);

    return (
        <Container>
            <StoreList store={store}/>
        </Container>
    )
}

export default Main;