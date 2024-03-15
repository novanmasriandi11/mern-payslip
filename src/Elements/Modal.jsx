const Modal = ({ open, onClose, title, IconTitle, children }) => {
  return (
    //backdrop
    <div
      onClick={onClose}
      className={`capitalize fixed z-[80] top-0 start-0 overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center transition-colors 
      ${open ? "visible bg-black/20" : "invisible"}`}
    >
      {/* Main Modal */}
      <div className=" overflow-y-auto p-4 w-full max-w-4xl max-h-full bg-zinc-100 border-b rounded-xl shadow p-6 transition-all ">
        <div
          onClick={(e) => e.stopPropagation()}
          className={`flex items-center p-2 border-b border-gray-200 rounded-b transition-all 
        ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
        >
          {IconTitle}
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const Body = ({ content }) => {
  return (
    <div
      className="p-2 md:p-2 space-y-4 text-left"
      onClick={(e) => e.stopPropagation()}
    >
      {content}
    </div>
  );
};

const Footer = ({ btnYes, onClick }) => {
  return (
    <div
      className="flex justify-center p-4 md:p-5 border-t border-gray-200 rounded-b"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="submit"
        onClick={onClick}
        className=" w-1/2 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {btnYes}
      </button>
    </div>
  );
};

Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
