import { createSlice } from "@reduxjs/toolkit";
import { deletter, getter, setter } from "../hooks/useLocalStorage";

const _calcTotal = (data) => {
    return data.reduce(
        (acc, currentValue) => currentValue?.count * currentValue?.price + acc,
        0,
    );
};

const initialState = {
    data: getter({ key: "shopping_card" }) ?? [],
    coupon: {
        has_coupon: false,
        discount_for: 0,
    },
    total: getter({ key: "total_price" }) ?? 0,
};

const shoppingSlice = createSlice({
    name: "shoppingSlice",
    initialState,
    reducers: {
        addDataToShopping(state, { payload }) {
            const alreadyExists = state.data.some((value) => value._id === payload._id);
            if (!alreadyExists) {
                state.data = [...state.data, { ...payload, count: 1 }];
            }
            state.total = _calcTotal(state.data);
            setter({ key: "shopping_card", setValue: state.data });
            setter({ key: "total_price", setValue: state.total });
        },
        increaseCountFromShopping(state, { payload }) {
            state.data = state.data.map((value) =>
                value._id === payload._id
                    ? { ...value, count: Number(value.count) + 1 }
                    : value,
            );
            state.total = _calcTotal(state.data);
            setter({ key: "shopping_card", setValue: state.data });
            setter({ key: "total_price", setValue: state.total });
        },
        decreaseCountFromShopping(state, { payload }) {
            state.data = state.data.map((value) =>
                value._id === payload._id
                    ? {
                        ...value,
                        count: Number(value.count) ? Number(value.count) - 1 : 1,
                    }
                    : value,
            );
            state.total = _calcTotal(state.data);
            setter({ key: "shopping_card", setValue: state.data });
            setter({ key: "total_price", setValue: state.total });
        },
        deleteFlowerFromShopping(state, { payload }) {
            state.data = state.data.filter((value) => value._id !== payload._id);
            state.total = _calcTotal(state.data);
            setter({ key: "shopping_card", setValue: state.data });
            setter({ key: "total_price", setValue: state.total });
        },
        setCoupon(state, { payload }) {
            state.coupon = { ...payload, has_coupon: true };
        },
        makeEverythingZero(state) {
            state.data = [];
            state.coupon = {
                has_coupon: false,
                discount_for: 0,
            };
            state.total = 0;
            deletter({ key: "shopping_card" });
            deletter({ key: "total_price" });
        },
        setTrackOrder(state, { payload }) {
            state.track_order = payload;
        },
    },
});
export const {
    addDataToShopping,
    increaseCountFromShopping,
    decreaseCountFromShopping,
    deleteFlowerFromShopping,
    setCoupon,
    makeEverythingZero,
    setTrackOrder,
} = shoppingSlice.actions;
export default shoppingSlice.reducer;
