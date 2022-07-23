import {Fragment, useState} from "react";
import {
    Box,
    Button, Chip,
    Divider,
    Drawer, FormControl, InputLabel,
    List,
    ListItem,
    ListItemText, MenuItem, OutlinedInput, Select,
} from "@mui/material";
import {storeCategoryList} from "../utils/Setting";

const Filter = () => {

    // anchor 값 top, bottom, left, right 로 위치 조정 가능
    const anchor = 'right';
    const [anchorState, setAnchorState] = useState({[anchor]: false});
    const [filterCategory, setFilterCategory] = useState([]);

    /**
     * 토글 열고 닫고에 대한 함수
     * @param anchor
     * @param open
     * @returns {(function(): void)|*}
     */
    const toggleDrawer = (anchor, open) => () => {
        setAnchorState({...anchorState, [anchor]: open});
    };

    /**
     * MultiSelect 하는 부분의 컴포넌트
     * @returns {JSX.Element}
     * @constructor
     */
    const MultiSelect = () => {
        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width    : 300,
                },
            },
        };

        const handleChange = (event) => {
            const {value} = event.target;
            setFilterCategory(value);
        };

        return (
            <div>
                <FormControl sx={{m: 1, width: 350}}>
                    <InputLabel>음식 종류</InputLabel>
                    <Select
                        multiple
                        value={filterCategory}
                        name={'category'}
                        onChange={handleChange}
                        input={<OutlinedInput label="음식 종류"/>}
                        renderValue={(selected) => (
                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                {selected.map((selObj) => (
                                    <Chip key={selObj.code} label={selObj.name}/>
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {storeCategoryList.map((listObj) => (
                            <MenuItem
                                key={listObj.code}
                                value={listObj}
                            >
                                {listObj.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        );
    }

    const onApply = () => {
        console.log(filterCategory);
    };

    /**
     * 필터 토글안에 리스트에 대한 함수
     * @returns {JSX.Element}
     */
    const list = () => (
        <Box
            sx={{width: 400, marginTop: 15}}
            role="presentation"
        >
            <List>
                <ListItem>
                    <ListItemText primary={'주소관련 API 자리'}/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem>
                    {MultiSelect()}
                </ListItem>
            </List>
            <Button onClick={onApply}>적용</Button>
            <Button onClick={toggleDrawer(anchor, false)}>취소</Button>
        </Box>
    );

    return (
        <Fragment>
            <Button style={{fontSize: 40, width: 200}} onClick={toggleDrawer(anchor, true)}>{'필터'}</Button>
            <Drawer
                anchor={anchor}
                open={anchorState[anchor]}
                onClose={toggleDrawer(anchor, false)}
            >
                {list()}
            </Drawer>
        </Fragment>
    );
}

export default Filter;
