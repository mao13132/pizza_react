import { FC } from 'react';
import style from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

/* Альтернативная запись типизации */
export const ButtonAlt: FC<ButtonProps> = ({ className, children, appearence='small', ...props }) => {
  return (
    <button className={cn(style['button'], style['accent'], className)} {...props}>{children}</button>
  );
}
/* Альтернативная запись типизации */

function Button({ children, className, appearence='small', ...props }: ButtonProps) {
  return (
    <button className={cn(style['button'], style['accent'], className, {
      [style['small']]: appearence=== 'small',
      [style['big']]: appearence=== 'big',
    })} {...props}>{children}</button>
  );
}

export default Button;
