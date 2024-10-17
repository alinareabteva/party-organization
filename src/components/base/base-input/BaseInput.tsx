import "./BaseInput.scss"
import {AllHTMLAttributes} from "react";
import classNames from "classnames";

interface BaseInputProps extends AllHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  value: string;
  label?: string
}

const BaseInput = ({id, errorMessage = "", label, type = "text", className = "", ...rest}: BaseInputProps) => {

  return (
    <div className="base-input-wrapper">
      {label && <label htmlFor={id} className="label">{label} </label>}
      <input
        id={id}
        type={type}
        className={classNames({
          'base-input': true,
          [className]: !!className,
        })}
        {...rest}
      />
      {errorMessage && <span className="error">{errorMessage}</span>}
    </div>
  );
};

export default BaseInput;
