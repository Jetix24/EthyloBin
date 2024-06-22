import React from 'react';
import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
  icon: IconType,
  tag: string,
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
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