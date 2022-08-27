import React, { useCallback } from 'react';
import {
    Box,
    Button,
    Chip,
    Container,
    Drawer,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    List,
    ListItem,
    MenuItem,
    OutlinedInput,
    Select,
    Slider,
    Tooltip,
    Typography,
} from '@mui/material';

import { filterDistanceMarks, filterInitialState, storeCategoryList } from '../../utils/setting';
import { useFilterDispatch, useFilterState } from '../../contexts/filterContext';
import { useStoreDispatch, useStoreState } from '../../contexts/storeContext';
import { filterApply } from '../../utils/common';
import { MdDirectionsRun } from 'react-icons/md';
// import { FaFilter } from 'react-icons/fa';
// import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';

const FilterTemplate = () => {
    const {
        anchorState,
        filterCategory: { food, distance },
    } = useFilterState();
    const filterDispatch = useFilterDispatch();

    const storeState = useStoreState();
    const storeDispatch = useStoreDispatch();

    const anchor = Object.keys(anchorState)[0];
    /**
     * 음식 카테고리 고르는 MultiSelect 하는 부분의 컴포넌트
     * @returns {JSX.Element}
     * @constructor
     */
    const FoodMultiSelect = useCallback(() => {
        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 300,
                },
            },
        };

        const onMultiSelectChange = (e) => {
            const currentFoodCategory = e.target.value;
            filterDispatch({
                type: 'SET_FILTER_FOOD_CATEGORY',
                food: currentFoodCategory,
            });
        };

        return (
            <div>
                <FormControl sx={{ m: 1, width: 350 }}>
                    <InputLabel>음식 종류</InputLabel>
                    <Select
                        multiple
                        value={food}
                        onChange={onMultiSelectChange}
                        input={<OutlinedInput label="음식 종류" />}
                        renderValue={(selected) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 0.5,
                                    minHeight: 67,
                                }}
                            >
                                {selected.map((selObj) => (
                                    <Chip key={selObj.code} label={selObj.name} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {storeCategoryList.map((listObj) => (
                            <MenuItem key={listObj.code} value={listObj}>
                                {listObj.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        );
    }, [filterDispatch, food]);

    /**
     * 거리를 설정하는 컴포넌트
     * @returns {JSX.Element}
     * @constructor
     */
    const DistanceSlider = useCallback(() => {
        const onSliderChange = (e) => {
            const currentDistance = e.target.value * 10;
            filterDispatch({
                type: 'SET_FILTER_DISTANCE',
                distance: currentDistance,
            });
        };

        return (
            <Box sx={{ m: 1, width: 250 }}>
                <Typography id="input-slider">거리 {distance}m </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <MdDirectionsRun style={{ fontSize: 30 }} />
                    </Grid>
                    <Grid item xs={6}>
                        <Slider
                            defaultValue={filterInitialState.distance / 10}
                            value={distance / 10}
                            aria-labelledby="input-slider"
                            style={{ width: 250 }}
                            step={10}
                            marks={filterDistanceMarks}
                            onChange={onSliderChange}
                        />
                    </Grid>
                </Grid>
            </Box>
        );
    }, [distance, filterDispatch]);
    /**
     * 토글 열고 닫고에 대한 함수
     * @param anchor
     * @param open
     * @returns {(function(): void)|*}
     */
    const toggleDrawer = useCallback(
        (anchor, open) => () => {
            filterDispatch({
                type: 'SET_ANCHOR_STATE',
                anchorState: {
                    [anchor]: open,
                },
            });
        },
        [filterDispatch],
    );

    /**
     * 필터 적용 클릭 시 이벤트
     * @type {(function(): void)|*}
     */
    const onApply = useCallback(() => {
        const { totalStore } = storeState;
        const filterApplyStore = filterApply({ food, distance }, totalStore);
        storeDispatch({ type: 'SET_STORE', data: filterApplyStore, isStoreDialog: true });
        toggleDrawer(anchor, false)();
    }, [distance, anchor, food, storeDispatch, storeState, toggleDrawer]);

    return (
        <Container>
            <Tooltip title="필터" placement="left">
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="menu"
                    style={{ top: '30%' }}
                    onClick={toggleDrawer(anchor, true)}
                >
                    {/*<FaFilter />*/}
                    {/*<AiOutlineMenuUnfold />*/}
                    <BiCategory />
                    음식점 카테고리 (디자인 고민 ... )
                </IconButton>
            </Tooltip>
            <Drawer anchor={anchor} open={anchorState[anchor]} onClose={toggleDrawer(anchor, false)}>
                <Box sx={{ width: 400, marginTop: 30 }} role="presentation">
                    <List>
                        <ListItem>{FoodMultiSelect()}</ListItem>
                        <ListItem>{DistanceSlider()}</ListItem>
                    </List>
                    <div style={{ textAlign: 'center' }}>
                        <Button onClick={onApply}>적용</Button>
                        <Button onClick={toggleDrawer(anchor, false)}>취소</Button>
                    </div>
                </Box>
            </Drawer>
        </Container>
    );
};

export default FilterTemplate;
