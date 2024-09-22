import {CloseIcon} from "./icons/CloseIcon.tsx";
import classNames from "classnames";
import "./BaseIcon.scss"

export enum IconNames {
  Close = "close"
}
export const IconSizes = {
  small: "1em",
  badgeIcon: "2em",
  medium: "3em",
  large: "5em",
  huge: "8em",
  presentation: "50%"
}

const IconByName = {
  [IconNames.Close]: CloseIcon,
}

export interface BaseIconProps {
  name: IconNames;
  className?: string;
  size?: keyof typeof IconSizes;
  onClick?: () => void;
  disabled?: boolean;
}

const BaseIcon = ({name, className = "", size = 'small', onClick, disabled = false, ...rest}: BaseIconProps) => {

    const classes = classNames({
      'icon-wrapper': true,
      [className]: !className,
      disabled,
      action: !!onClick
    });

    const IconToRender = IconByName[name];
    if (!IconToRender) {
      return null;
    }

    return (
      <span
        style={{width: IconSizes[size]}}
        className={classes}
        onClick={disabled ? undefined : onClick}
      >
          <IconToRender {...rest}/>
      </span>
    );
  }
;

export default BaseIcon;