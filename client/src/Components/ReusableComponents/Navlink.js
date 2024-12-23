import React from "react";
import classNames from "classnames";

const Navlink = ({ children, className, ...rest }) => {
  const finalClass = classNames(
    className,
    "font-roboto font-bold text-[#A5B0F3] text-2xl mx-3 hover:text-white px-3 py-2 rounded-md"
  );
  return (
    <p className={finalClass} {...rest}>
      {children}
    </p>
  );
};

export default Navlink;
