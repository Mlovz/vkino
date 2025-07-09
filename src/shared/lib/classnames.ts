export const clsx = (...args: (string | undefined)[]): string => {
  return args.filter(Boolean).join(' ');
};
