export const AppView = {
    LOADING: "LOADING",
    ADD_LOCATION: "ADD_LOCATION",
    DASHBOARD: "DASHBOARD",
    SAVED_INSTALLATIONS: "SAVED_INSTALLATIONS",
} as const; export type AppView = (typeof AppView)[keyof typeof AppView];