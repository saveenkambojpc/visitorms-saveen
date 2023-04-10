import React from "react";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
    const navigate = useNavigate();


    React.useEffect(() => {
      const data = false;
      if (data) {
        return navigate("/create_visit");
      } else {
        return navigate("/login");
      }
    }, []);


};

export default Authentication;
