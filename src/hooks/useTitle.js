// src/hooks/useTitle.js
import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} |Volunteer Hub`;
  }, [title]);
};

export default useTitle;
