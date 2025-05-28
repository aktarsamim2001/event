"use client";
import { useEffect, useState } from "react";
import { FaGooglePlay, FaApple } from "react-icons/fa6";
import { IoChevronForwardSharp } from "react-icons/io5";
import Input from "../ui/Input";
import Link from "next/link";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { getFooterMenuList } from "../../store/slice/footerMenu/footerMenuItem";
import { fetchGeneralSettings } from "../../store/slice/settings/generalSettingsSlice";
import { toast } from "react-hot-toast"; 

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [error, setError] = useState("");
  const [subscriptionError, setSubscriptionError] = useState("");
 const rootUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const dispatch = useDispatch();
  const footerLinks = useSelector((state) => state.footer.data);
  const featureStatus = useSelector((state) => state.generalSettings.data);

  useEffect(() => {
    dispatch(getFooterMenuList());
    dispatch(fetchGeneralSettings());
  }, [dispatch]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateSubscriptionForm = () => {
    let error = "";
    if (!email.trim()) error = "Email is required";
    setSubscriptionError(error);
    return !error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Validate email using new function
    if (!validateSubscriptionForm()) {
      setIsValidEmail(false);
      setIsSubmitting(false);
      return;
    }
    setIsValidEmail(true);

    try {
      const response = await fetch(`${rootUrl}api/web/subscription/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to subscribe.");
      }

      // Show success toast notification instead of inline message
      toast.success("You have successfully subscribed to our newsletter!");
      setEmail("");
      // Assume backend sends a confirmation email with unsubscribe link
    } catch (err) {
      setError(err.message || "Subscription failed.");
      toast.error(err.message || "Subscription failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-black text-white">
      <div className="bg-black pt-[90px]">
        {/* Top feature section */}
        <div className="bg-[#1e1e1e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <h3 className="text-lg font-semibold __heading">
                {featureStatus?.flash_data?.section_title}
              </h3>
              <p className="text-sm lg:text-base __text">
                {featureStatus?.flash_data?.section_content}
              </p>
              <Button
                varient="fill"
                className="!px-5 !py-2 text-sm w-fit whitespace-nowrap"
                onClick={() => {
                  if (featureStatus?.flash_data?.section_button_url) {
                    window.location.href = featureStatus.flash_data.section_button_url;
                  }
                }}
              >
                {featureStatus?.flash_data?.section_button}
              </Button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-[#181818] py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featureStatus?.application_features?.map((item, index) => (
                <div className="flex items-center gap-4" key={index}>
                  <div className="rounded-full __primary_bg p-3 flex-shrink-0">
                    <div
                      className="w-6 h-6"
                      style={{
                        WebkitMaskImage: `url(${item?.icon})`,
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        WebkitMaskSize: "contain",
                        backgroundColor: "black",
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold __heading">{item.title}</h3>
                    <p className="text-sm text-gray-400 __text">{item.sub_title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative __gradient">
        <div className="w-[95%] mx-auto py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Logo and Socials */}
            <div className="space-y-6">
              <img src={featureStatus?.logo} alt="RallyUp Logo" className="h-14 md:h-24 w-auto" />
              <div
                className="text-gray-300 ml-2 __text"
                dangerouslySetInnerHTML={{
                  __html: featureStatus?.footer_content || "",
                }}
              />
              <div className="flex gap-4 ml-1.5">
                {featureStatus?.social_icons?.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="__primary_bg p-3.5 rounded-full text-black"
                    aria-label="Visit our social media"
                  >
                    <div
                      className="w-6 h-6"
                      style={{
                        WebkitMaskImage: `url(${social?.icon})`,
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        WebkitMaskSize: "contain",
                        backgroundColor: "black",
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="space-y-6 md:ml-28">
              <h3 className="footer_heading">Company</h3>
              <ul className="space-y-2"> {/* This adds vertical spacing between list items */}
                {footerLinks.map((item) => (
                  <li className="footer_li" key={item.id}>
                    <Link
                      href={
                        item.slugData?.slug
                          ? `/${item.slugData.slug}`
                          : item.slug || "#"
                      }
                      className="footer_hov_effect"
                    >
                      <span className="flex items-center gap-x-1">
                        <IoChevronForwardSharp />
                        {item.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscription */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold __heading">
                  Stay Updated on Latest Events
                </h3>
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="relative w-full">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        // Live validation on change
                        let error = "";
                        if (!e.target.value.trim()) error = "Email is required";
                        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) error = "Email is invalid";
                        setSubscriptionError(error);
                        setIsValidEmail(!error);
                      }}
                      onBlur={() => {
                        // Validate on blur as well
                        let error = "";
                        if (!email.trim()) error = "Email is required";
                        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) error = "Email is invalid";
                        setSubscriptionError(error);
                        setIsValidEmail(!error);
                      }}
                      placeholder="Enter your email"
                      className={`bg-[#FFFFFF26] pr-32 ${!isValidEmail ? "border border-red-500" : ""}`}
                      required
                    />
                    <Button
                      type="submit"
                      varient="fill"
                      disabled={isSubmitting}
                      className="absolute right-1 top-1/2 -translate-y-1/2 !py-2.5 !px-5"
                    >
                      {isSubmitting ? "Submitting..." : "Subscribe"}
                    </Button>
                  </div>
                  {subscriptionError && (
                    <p className="text-red-500 text-xs mt-1">{subscriptionError}</p>
                  )}
                </form>

                {/* Unsubscribe info */}
                <div className="mt-2 flex items-center">
                  <span className="text-sm text-gray-400">
                    To unsubscribe, use the link in our emails
                  </span>
                </div>
              </div>

              {(featureStatus?.ios_store_link || featureStatus?.android_store_link) && (
                <div className="mt-6">
                  <p className="__heading text-white text-sm mb-3">
                    Explore & Book Events
                  </p>
                  <div className="flex flex-row gap-3">
                    {featureStatus?.ios_store_link && (
                      <Link
                        href={featureStatus?.ios_store_link}
                        className="inline-flex items-center justify-center space-x-3 __primary_bg text-black px-6 py-2 rounded-lg"
                      >
                        <FaApple size={30} />
                        <div>
                          <div className="text-sm leading-tight __text">
                            Download on the
                          </div>
                          <div className="text-sm __heading">App Store</div>
                        </div>
                      </Link>
                    )}
                    {featureStatus?.android_store_link && (
                      <Link
                        href={featureStatus?.android_store_link}
                        className="inline-flex items-center justify-center space-x-3 __primary_bg text-black px-6 py-2 rounded-lg"
                      >
                        <FaGooglePlay size={30} />
                        <div>
                          <div className="text-sm __text leading-tight">Get It on</div>
                          <div className="text-sm __heading">Google Play</div>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#807878ad]">
          <div className="w-[95%] mx-auto py-8 flex md:flex-row flex-col justify-between items-center">
            <p className="text-center md:ml-[180px] text-white __text flex-1">
              {featureStatus?.copyright}
            </p>
            <div className="text-end __text">
              Developed by{" "}
              <a
                href="https://notebrains.com/"
                target="_blank"
                rel="noreferrer"
                className="underline __accent_color"
              >
                Notebrains
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;