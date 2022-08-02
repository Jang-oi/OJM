/**
 * 적용할 필터, 적용할 가게 리스트를 받아서
 * 필터 적용 후 가게 리스트 리턴
 * @param filterObj food - 한식, 일식, 중식, 양식 체크한 것
 *                  distance - 거리
 *
 * @param store
 * @returns {*}
 */
export const filterApply = (filterObj, store) => {
    const foodCode = filterObj.food.map(({ code }) => {
        return code;
    });
    const distanceApply = store.filter(({ storeDistance }) => {
        return storeDistance <= filterObj.distance;
    });

    return distanceApply.filter(({ storeCategoryCode }) => {
        return foodCode.includes(storeCategoryCode);
    });
};

/**
 * 오브젝트의 키 값이 존재하더라도 value 값이 0, null, '', undefined 일 경우
 * 비어 있다고 판단하는 함수
 * @param Obj
 * @returns {boolean}
 */
export const isEmptyObj = (Obj) => {
    let bool = true;
    for (const key in Obj) {
        if (Obj[key]) {
            bool = false;
            break;
        }
    }
    return bool;
};
