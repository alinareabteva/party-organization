import "./BaseInput.scss"
import TextField, {TextFieldProps} from '@mui/material/TextField';
import classNames from "classnames";

interface BaseInputProps extends Omit<TextFieldProps, "variant"> {
  errorMessage?: string;
  value: string;
  label?: string
}

const BaseInput = ({id, errorMessage = "", label, type = "text", className = "", ...rest}: BaseInputProps) => {

  return (
    <TextField id={id}
               label={label}
               type={type}
               className={classNames({'base-input-wrapper': true, [className]: !!className})}
               helperText={errorMessage}
               error={!!errorMessage} {...rest}/>
  );
};

export default BaseInput;
