// RequestCall.js (Component)
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from './ContactForm/ContactForm';
import { submitCallRequest, resetCallRequest } from '../../store/slice/callRequest/callRequestSlice';

const RequestCall = ({ content }) => {
  const title = content?.request_feature_form_page?.page_details?.title;
  const dispatch = useDispatch();
  
  // Fix the selector to ensure we're accessing the right part of the state tree
  const callRequestState = useSelector((state) => state.callRequest) || {};
  const { status, error, isSubmitted, data, message } = callRequestState;

  // Reset the form state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetCallRequest());
    };
  }, [dispatch]);

  // Form submission handler
  const handleSubmit = async (formData) => {
    dispatch(submitCallRequest(formData));
  };

  return (
    <ContactForm
      title={title}
      subtitle={content?.request_feature_form_page?.page_details?.content}
      button={content?.request_feature_form_page?.page_details?.button}
      select="Reason For a Call"
      option={content?.request_feature_form_page?.page_details?.reasons}
      onSubmit={handleSubmit}
      isLoading={status === "loading"}
      isSubmitted={!!isSubmitted}
      error={error}
      successData={data || {}}
      successMessage={message || ""}
      onReset={() => dispatch(resetCallRequest())}
    />
  );
};

export default RequestCall;