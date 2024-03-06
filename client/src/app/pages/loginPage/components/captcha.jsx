"use client"
import React, { useCallback } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Captcha = ({ onChange }) => {
  const onCaptchaChange = useCallback((value) => {
    onChange(value);
  }, [onChange]);

  return (
    <div className="w-full flex justify-center transform scale-75">
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


