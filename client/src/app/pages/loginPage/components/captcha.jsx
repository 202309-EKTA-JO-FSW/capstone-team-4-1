"use client"
import React, { useCallback } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Captcha = ({ onChange }) => {
  const onCaptchaChange = useCallback((value) => {
    onChange(value);
  }, [onChange]);

  return (
    <div className="flex justify-center transform
    xl:scale-75 xl:-my-2
    md:scale-65 md:-my-3
    2xs:scale-50 2xs:-my-3
    ">
      <ReCAPTCHA
        sitekey="6LeTP5wpAAAAAIeWp3xY_LD9GE4C8BlCq3mHvUmi"
        onChange={onCaptchaChange}
        theme="light"
        size="normal"
        className="flex justify-center"
      />
    </div>
  );
};

export default Captcha;