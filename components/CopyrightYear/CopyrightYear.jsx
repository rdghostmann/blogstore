"use client"
import React, { useState, useEffect } from "react";
// ...rest of your imports...

export default function CopyrightYear() {
  const [year, setYear] = useState(null);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  if (!year) return null;
  return <span>&copy; {year} BlogStore. Write. Share. Inspire.</span>;
}