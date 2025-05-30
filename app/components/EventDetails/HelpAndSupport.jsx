'use client'; // Mark as a Client Component since it uses client-side interactivity (useState, useDispatch, useSelector)

import { useState } from 'react';
import Button from '../ui/Button';
import { GoChevronDown } from 'react-icons/go';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Link from 'next/link'; // Use Next.js Link instead of react-router-dom Link
import { FaPhone } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { submitEventEnquiry, resetEventEnquiry } from '../../store/slice/eventEnquiry/eventEnquirySlice';

function HelpAndSupport({ eventId }) {
  // State for the form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();
  const { isSubmitted, message: submissionMessage, error, status } = useSelector(
    (state) => state.eventEnquiry
  );

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!query) {
      errors.query = 'Please select your query type';
    }
    if (!message.trim()) {
      errors.message = 'Message is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const eventIdValue = eventId || '1';
    const formData = {
      event_id: eventIdValue,
      name: name.trim(),
      email: email.trim(),
      reason: query,
      message: message.trim(),
    };

    dispatch(submitEventEnquiry(formData));
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setQuery('');
    setMessage('');
    setFormErrors({});
    dispatch(resetEventEnquiry());
  };

  return (
    <div>
      <div className="py-10">
        <div className="flex flex-col md:flex-row items-start justify-start gap-10 pb-5">
          <div className="flex items-start space-x-3 md:space-x-3">
            <Link href="tel:+1310259121563" className="border-2 border-[#FFFFFF26] hover:bg-[#FFFFFF26] p-3 rounded-full cursor-pointer">
              <FaPhone size={18} className=" __accent_color" />
            </Link>
            <div>
              <h3 className="font-semibold mb-1 text-white _heading __heading">
                Phone Number
              </h3>
              <p className="text-white __text">
                <a
                  href="tel:+1310259121563"
                  className="hover:underline duration-200 transition-all"
                >
                  +(310) 2591 21563
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 md:space-x-3">
            <Link href="mailto:sudeepp@notebrains.com" className="border-2 border-[#FFFFFF26] hover:bg-[#FFFFFF26] p-3 rounded-full cursor-pointer">
              <MdEmail size={18} className=" __accent_color" />
            </Link>
            <div>
              <h3 className="font-semibold mb-1 text-white __heading">Email</h3>
              <p className="text-white __text">
                <a
                  href="mailto:sudeepp@notebrains.com"
                  className="hover:underline duration-200 transition-all"
                >
                  sudeepp@notebrains.com
                </a>
              </p>
            </div>
          </div>
        </div>
        <p className="text-white mb-4 __text">
          For any further query, write to us
        </p>

        {!isSubmitted ? (
          <form className="space-y-4 pt-3" id="contact-form" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  className={`!rounded-xl w-full ${formErrors.name ? 'border-red-500' : ''}`}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setFormErrors({ ...formErrors, name: '' });
                  }}
                />
                {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  className={`!rounded-xl w-full ${formErrors.email ? 'border-red-500' : ''}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFormErrors({ ...formErrors, email: '' });
                  }}
                />
                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
              </div>
              <div className="relative md:col-span-2">
                <Select
                  className={`!rounded-xl w-full cursor-pointer ${formErrors.query ? 'border-red-500' : ''}`}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setFormErrors({ ...formErrors, query: '' });
                  }}
                >
                  <option className="text-black" value="">Select Your Query</option>
                  <option className="text-black" value="Event Venue">Event Venue</option>
                  <option className="text-black" value="Dates & Tickets">Dates & Tickets</option>
                  <option className="text-black" value="Sponsorship">Sponsorship</option>
                  <option className="text-black" value="General Enquiry">General Enquiry</option>
                </Select>
                {formErrors.query && <p className="text-red-500 text-sm mt-1">{formErrors.query}</p>}
                <span className="absolute right-5 top-5 text-white"><GoChevronDown /></span>
              </div>
            </div>

            <div>
              <textarea
                placeholder="Type Your Message"
                rows={4}
                className={`px-3 py-[14px] rounded-xl w-full block outline-none bg-[#ffffff1b] text-white pl-[25px] border custom_input_component ${formErrors.message ? 'border-red-500' : ''}`}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setFormErrors({ ...formErrors, message: '' });
                }}
              ></textarea>
              {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
            </div>

            <div className="flex justify-center pt-7">
              <Button 
                variant="fill" // Note: Changed `varient` to `variant` (typo fix, assuming this is the intended prop name)
                type="submit" 
                disabled={status === 'loading'}
                className="min-w-[150px]"
              >
                {status === 'loading' ? 'Submitting...' : 'Submit Message'}
              </Button>
            </div>
          </form>
        ) : (
          <div className="bg-black __responsive_gapY">
            <div className="__container md:p-8 p-3 rounded-2xl __gradient">
              <div className="text-center py-10 flex flex-col items-center justify-center">
                <div className="bg-[#22F106] bg-opacity-20 border border-[#22F106] rounded-full p-4 mb-6">
                  <svg
                    className="w-10 h-10 text-black"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 __heading">
                  Successfully Submitted
                </h2>
                <Button
                  variant="fill" // Note: Changed `varient` to `variant`
                  onClick={handleReset}
                  className="inline-flex items-center gap-2"
                >
                  Submit Another Form
                </Button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center mt-4">
            {error.message || 'An error occurred. Please try again.'}
          </div>
        )}
      </div>
    </div>
  );
}

export default HelpAndSupport;