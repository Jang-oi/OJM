export const filterInitialState = {
    food: [
        {
            code: 1,
            name: '한식',
        },
        {
            code: 2,
            name: '일식',
        },
        {
            code: 3,
            name: '중식',
        },
    ],
    distance: 500,
};

export const filterDistanceMarks = [
    {
        value: 0,
        label: '0m',
    },
    {
        value: 50,
        label: '500m',
    },
    {
        value: 100,
        label: '1000m',
    },
];
export const storeCategoryList = [
    ...filterInitialState.food,
    {
        code: 4,
        name: '양식',
    },
    {
        code: 5,
        name: '아시아 음식',
    },
    {
        code: 6,
        name: '뷔폐',
    },
    {
        code: 7,
        name: '분식',
    },
    {
        code: 8,
        name: '카페',
    },
    {
        code: 9,
        name: '기타',
    },
];
