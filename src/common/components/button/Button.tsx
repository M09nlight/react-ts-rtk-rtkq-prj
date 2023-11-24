import clsx from "clsx";
import { ComponentProps, FC, PropsWithChildren } from "react";

export enum ButtonStyleEnum {
  DARK = "DARK",
  LIGHT = "LIGHT",
  GREEN = "GREEN",
  DANGER = "DANGER",
}
export enum ButtonSizeEnum {
  BASE = "BASE",
  LG = "LG",
}
export enum ButtonVariantEnum {
  BASE = "BASE",
  OUTLINE = "OUTLINE",
}

interface ButtonProps {
  btnStyle?: keyof typeof ButtonStyleEnum;
  size?: keyof typeof ButtonSizeEnum;
  variant?: keyof typeof ButtonVariantEnum;
  type?: ComponentProps<"button">["type"];
  disabled?: ComponentProps<"button">["disabled"];
  onClick?: ComponentProps<"button">["onClick"];
}
const Button: FC<PropsWithChildren<ButtonProps>> = ({
  btnStyle = ButtonStyleEnum.DARK,
  size = ButtonSizeEnum.BASE,
  variant = ButtonVariantEnum.BASE,
  children,
  ...buttonProps
}) => {
  const btnClasses = clsx(
    "text-center align-middle cursor-pointer select-none border active:bg-theme-gray-650 disabled:opacity-70 flex items-center",
    {
      "border-theme-gray-700 text-theme-gray-700 hover:bg-theme-gray-400 focus:bg-theme-gray-400":
        btnStyle === ButtonStyleEnum.DARK,
      "border-theme-gray-400 text-theme-gray-400 hover:bg-theme-gray-400 hover:text-white":
        btnStyle === ButtonStyleEnum.LIGHT,
      "border-theme-green active:bg-theme-darkGreen":
        btnStyle === ButtonStyleEnum.GREEN,
      "bg-theme-green text-white hover:bg-theme-darkGreen hover:border-theme-darkGreen hover:text-white":
        btnStyle === ButtonStyleEnum.GREEN &&
        variant === ButtonVariantEnum.BASE,
      "bg-white text-theme-green hover:bg-theme-green hover:text-white disabled:bg-theme-darkGreen disabled:text-white":
        btnStyle === ButtonStyleEnum.GREEN &&
        variant === ButtonVariantEnum.OUTLINE,
      "border-theme-red text-theme-red hover:bg-theme-red focus:bg-theme-red hover:text-white disabled:bg-theme-red disabled:text-white disabled:cursor-not-allowed":
        btnStyle === ButtonStyleEnum.DANGER,
      "py-1 px-2 text-sm rounded-buttonSm": size === ButtonSizeEnum.BASE,
      "py-3 px-6 text-xl rounded": size === ButtonSizeEnum.LG,
    }
  );
  return (
    <button className={btnClasses} {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;
