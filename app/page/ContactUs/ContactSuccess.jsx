import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/ui/Button";
import { useDispatch } from "react-redux";
import { resetCallRequest } from "../../store/slice/SupportFormSlice";

const ContactSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const message = location.state?.message;

  const onReset = () => {
    dispatch(resetCallRequest());
    navigate("/support", { replace: true });
  };

  return (
    <div className="bg-black __responsive_gapY">
      <div className="__container md:p-8 p-3 rounded-2xl __gradient">
        <div className="text-center py-10 flex flex-col items-center justify-center">
          <div className="bg-[#22F106] bg-opacity-20 border border-[#22F106] rounded-full p-4 mb-6">
            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 __heading">
            {message}
          </h2>
          <Button
            variant={"fill"}
            onClick={onReset}
            className="inline-flex items-center gap-2"
          >
            Submit Another Form
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactSuccess;
