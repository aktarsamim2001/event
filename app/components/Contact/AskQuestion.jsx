// AskQuestion.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from './ContactForm/ContactForm';
import { submitPartnerRequest, resetPartnerRequest } from '../../store/slice/partnerWithUs/partnerWithUsSlice';

// const options = [
//   { value: 'event_creation', label: 'Event Creation' },
//   { value: 'event_host', label: 'Event Host' },
// ];

const AskQuestion = ({ content }) => {
  const dispatch = useDispatch();

  const partnerRequestState = useSelector((state) => state.partnerWithUs) || {};
  const { status, error, isSubmitted, data, message } = partnerRequestState;

  useEffect(() => {
    return () => {
      dispatch(resetPartnerRequest());
    };
  }, [dispatch]);

  const handleSubmit = async (formData) => {
    dispatch(submitPartnerRequest(formData));
  };

  return (
    <ContactForm
      title={content?.partner_form_page?.page_details?.title}
      subtitle={content?.partner_form_page?.page_details?.content}
      button={content?.partner_form_page?.page_details?.button}
      select="Choose Your Reason"
      option={content?.partner_form_page?.page_details?.reasons}
      onSubmit={handleSubmit}
      isLoading={status === "loading"}
      isSubmitted={!!isSubmitted}
      error={error}
      successData={data || {}}
      successMessage={message || ""}
      onReset={() => dispatch(resetPartnerRequest())}
    />
  );
};

export default AskQuestion;
