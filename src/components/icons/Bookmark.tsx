interface IconProps {
  className?: string;
}

const BookMarkIcon = ({ className }: IconProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14.2861 3.08545C14.5132 3.08555 14.7025 3.16416 14.8867 3.36475C15.049 3.54163 15.1401 3.74205 15.1602 3.99072L15.1641 4.10107V16.5327L10.6992 14.4497L10.417 14.3169L10.1338 14.4497L5.66895 16.5327V4.10205C5.66895 3.80003 5.76175 3.56641 5.94727 3.36475C6.10871 3.18926 6.27392 3.10735 6.46484 3.08936L6.54883 3.08545H14.2861Z"
        stroke="#EC4C24"
        strokeWidth="1.33782"
      />
    </svg>
  );
};

export default BookMarkIcon;
