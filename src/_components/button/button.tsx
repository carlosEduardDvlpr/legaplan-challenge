import styles from './button.module.scss';
import React, { ComponentProps } from 'react';

export default function Button({
  cancel = false,
  add = false,
  del = false,
  children,
  ...props
}: ComponentProps<'button'> & {
  cancel?: boolean;
  add?: boolean;
  del?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`${
        add
          ? styles['button-add']
          : del
          ? styles['button-del']
          : cancel
          ? styles['button-cancel']
          : ''
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
