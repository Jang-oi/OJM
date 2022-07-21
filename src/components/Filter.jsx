import {Fragment, useState} from "react";
import {
    Box,
    Button,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";

const Filter = () => {
    const [anchorState, anchorSetState] = useState({right: false});
    const anchor = 'right';
    const categoryList = ['전체', '한식', '일식', '중식', '아시아 음식', '뷔폐', '분식', '카페', '기타'];

    /**
     * 토글 열고 닫고에 대한 함수
     * @param anchor
     * @param open
     * @returns {(function(): void)|*}
     */
    const toggleDrawer = (anchor, open) => () => {
        anchorSetState({...anchorState, [anchor]: open});
    };

    /**
     * 필터 토글안에 리스트에 대한 함수
     * @param anchor
     * @returns {JSX.Element}
     */
    const list = (anchor) => (
        <Box
            sx={{width: 300, marginTop: 15}}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem>
                    <ListItemText primary={'주소관련 API 자리'}/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem>
                    <ListItemText primary={'음식 종류'}/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Button>적용</Button>
            <Button>취소</Button>
        </Box>
    );

    return (
        <Fragment>
            <Button style={{fontSize: 40}} onClick={toggleDrawer(anchor, true)}>{'필터'}</Button>
            <Drawer
                anchor={anchor}
                open={anchorState[anchor]}
                onClose={toggleDrawer(anchor, false)}
            >
                {list(anchor)}
            </Drawer>
        </Fragment>
    );
}

export default Filter;
