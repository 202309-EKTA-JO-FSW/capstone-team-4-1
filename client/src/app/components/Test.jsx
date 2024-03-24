"use client";
import React, { useEffect, useState } from "react";
import urlService from "../services/appConfig";

const Hello = () => {
  const [testResult, setTestResult] = useState("");

  useEffect(() => {
    fetch(`${urlService.serverUrl}/test`)
      .then((res) => res.json())
      .then((data) => {
        setTestResult(data);
      });
  }, []);

  return <div>{testResult}</div>;
};

export default Hello;
