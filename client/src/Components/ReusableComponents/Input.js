import React from "react";
import classNames from "classnames";

const Input = ({ className, ...rest }) => {
  const finalClass = classNames(
    className,
    "font-roboto font-[400] text-xl rounded-[15px]"
  );
  return <input className={finalClass} {...rest} />;
};

export default Input;
