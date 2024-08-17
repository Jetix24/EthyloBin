import React from 'react';

const AuthSocialButton = ({
  icon: Icon,
  tag,
  onClick
}) => {
  return ( 
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        w-full
        items-center
        justify-center
        rounded-md
        bg-white
        px-4
        py-2
        text-gray-500
        shadow-sm
        ring-1
        ring-inset
        ring-gray-300
        hover:bg-gray-50
        focus:outline-offset-0
      "
    >
      <Icon />
      <span
        className="
          ml-2
          text-sm
        "
        >
          {tag}
        </span>
    </button>
   );
}
 
export default AuthSocialButton;
