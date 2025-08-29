import React from 'react';

type ButtonProps = React.ComponentProps<'button'> & {
  isLoading?: boolean;
};

const Button = ({ children, isLoading = false, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={isLoading}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;