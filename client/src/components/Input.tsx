import React from 'react';

type InputProps = React.ComponentProps<'input'> & {
  label: string;
};

const Input = ({ label, type = 'text', ...props }: InputProps) => {
  return (
    <div>
      <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        {...props}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default Input;