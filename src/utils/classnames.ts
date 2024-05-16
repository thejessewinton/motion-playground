import clsx from 'clsx';
import { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const classNames = (...inputs: Array<ClassValue>) => {
  return twMerge(clsx(...inputs));
};
