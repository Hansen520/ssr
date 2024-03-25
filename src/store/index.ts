/*
 * @Date: 2024-01-22 11:26:31
 * @Description: store
 */
import { configureStore } from "@reduxjs/toolkit";
import { demoReducer } from "@/pages/Demo/store";

const clientStore = configureStore({
  reducer: { demo: demoReducer.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

const serverStore = configureStore({
  reducer: { demo: demoReducer.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export { clientStore, serverStore };
