import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "../store/slice/menu/headerSlice";
import generalSettingsReducer from "../store/slice/settings/generalSettingsSlice";
import globalSlice from "../store/globalSlice";
import navbarSlice from "../store/navbar/navbarSlice";
import footerReducer from "../store/slice/footerMenu/footerMenuItem";
import eventFilterSliceReducer from "../store/slice/eventFilter/eventFilterSlice";
import dynamicPageReducer from "../store/slice/homePage/homePageSlice";
import areaReducer from "../store/slice/area/areaSlice";
import eventsReducer from "../store/slice/event/eventSlice";
import ticketTypesReducer from "../store/slice/ticketType/ticketTypeSlice";
import eventFilterReducer from "../store/slice/eventFilterSlice";
import callRequestReducer from "../store/slice/callRequest/callRequestSlice";
import consultationReducer from "../store/slice/consultation/consultationSlice";
import partnerWithUsReducer from "../store/slice/partnerWithUs/partnerWithUsSlice";
import eventDetailsReducer from "../store/slice/eventDetails/eventDetailsSlice ";
import eventEnquiryReducer from "../store/slice/eventEnquiry/eventEnquirySlice";
import eventReviewReducer from "../store/slice/eventReview/eventReviewSlice ";
import formRequestReducer from "../store/slice/SupportForm/SupportFormSlice";

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
    callRequest: callRequestReducer,
    consultation: consultationReducer,
    partnerWithUs: partnerWithUsReducer,
    eventDetails: eventDetailsReducer,
    eventEnquiry: eventEnquiryReducer,
    eventReview: eventReviewReducer,
    formRequest: formRequestReducer,
  },
});
