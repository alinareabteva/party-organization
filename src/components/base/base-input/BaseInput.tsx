import "./BaseInput.scss"
import {AllHTMLAttributes} from "react";
import classNames from "classnames";

interface BaseInputProps extends AllHTMLAttributes<HTMLInputElement> {
  value: string;
  label?: string
}

const BaseInput = ({id, label, type = "text", className = "", ...rest}: BaseInputProps) => {

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
    </div>
  );
};

export default BaseInput;
