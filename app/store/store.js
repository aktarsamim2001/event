import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "../store/slice/menu/headerSlice";
import generalSettingsReducer from "../store/slice/settings/generalSettingsSlice";
import globalSlice from "../store/globalSlice";
import navbarSlice from '../store/navbar/navbarSlice';
import footerReducer from '../store/slice/footerMenu/footerMenuItem';
import eventFilterSliceReducer from '../store/slice/eventFilter/eventFilterSlice';
import dynamicPageReducer from '../store/slice/homePage/homePageSlice';
import areaReducer from "../store/slice/area/areaSlice";
import eventsReducer from "../store/slice/event/eventSlice";
import ticketTypesReducer from "../store/slice/ticketType/ticketTypeSlice";
import eventFilterReducer from "../store/slice/eventFilterSlice";

export const store = configureStore({
  reducer: {
    globalSlice,
    navbarSlice,
    header: headerReducer,
    footer: footerReducer,
    generalSettings: generalSettingsReducer,
    eventFilterSlice: eventFilterSliceReducer,
    dynamicPage: dynamicPageReducer,
    areas: areaReducer,
    events: eventsReducer,
    ticketTypes: ticketTypesReducer,
    eventFilter: eventFilterReducer,
  },
});