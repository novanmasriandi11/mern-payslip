const Card_ = ({ children }) => {
  return (
    <div className="w-full py-4 bg-white border border-white-900 rounded-lg shadow-sm my-2 flex flex-col">
      {children}
    </div>
  );
};

const Header = ({ image, name }) => {
  return (
    <a href="#">
      <img
        src={image}
        alt={name}
        className="p-5 rounded-t-lg h-80 w-full object-contain "
      />
    </a>
  );
};

const Body = ({ content, title }) => {
  return (
    <div className="px-5 pb-5 h-full">
      <h5 className="text-xl font-semibold tracking-tight text-gray-700 truncate">
        {title}
      </h5>
      {content}
    </div>
  );
};

const Footer = ({ children }) => {
  return (
    <div className="flex items-center justify-between px-5 pb-5">
      <span className="text-xl font-bold text-black">{children}</span>
    </div>
  );
};

Card_.Header = Header;
Card_.Body = Body;
Card_.Footer = Footer;
export default Card_;
