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
        sitekey="6LfG1YspAAAAAOqk5dBqT4T7x42tIxBwLKnu56xn"
        onChange={onCaptchaChange}
        theme="light"
        size="normal"
        className="flex justify-center"
      />
    </div>
  );
};

export default Captcha;