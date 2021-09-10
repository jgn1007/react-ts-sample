export const SET_TEXT = "SET_TEXT";

const setText = (text: string) => ({
    type: SET_TEXT,
    payload: text
});

export type setText = ReturnType<typeof setText>;

export default setText;
