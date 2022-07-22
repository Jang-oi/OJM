import {Fragment, useState} from "react";
import {useTheme} from '@mui/material/styles';
import {
    Box,
    Button, Chip,
    Divider,
    Drawer, FormControl, InputLabel,
    List,
    ListItem,
    ListItemText, MenuItem, OutlinedInput, Select,
} from "@mui/material";

const Filter = () => {

    const [anchorState, setAnchorState] = useState({right: false});
    const anchor = 'right';
    const categoryList = ['전체', '한식', '일식', '중식', '아시아 음식', '뷔폐', '분식', '카페', '기타'];

    /**
     * 토글 열고 닫고에 대한 함수
     * @param anchor
     * @param open
     * @returns {(function(): void)|*}
     */
    const toggleDrawer = (anchor, open) => () => {
        setAnchorState({...anchorState, [anchor]: open});
    };

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


    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const MultiSelect = () => {
        const theme = useTheme();
        const [personName, setPersonName] = useState([]);

        const handleChange = (event) => {
            const {target: {value}} = event;
            setPersonName(typeof value === 'string' ? value.split(',') : value);
        };

        return (
            <div>
                <FormControl sx={{m: 1, width: 350}}>
                    <InputLabel>음식 종류</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput label="음식 종류"/>}
                        renderValue={(selected) => (
                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value}/>
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {categoryList.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, personName, theme)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        );
    }

    /**
     * 필터 토글안에 리스트에 대한 함수
     * @param anchor
     * @returns {JSX.Element}
     */
    const list = (anchor) => (
        <Box
            sx={{width: 400, marginTop: 15}}
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
                    {MultiSelect()}
                </ListItem>
{/*                <ListItem>
                    {MultiSelect()}
                </ListItem>*/}
            </List>

            <Button>적용</Button>
            <Button>취소</Button>
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
                {list(anchor)}
            </Drawer>
        </Fragment>
    );
}

export default Filter;
