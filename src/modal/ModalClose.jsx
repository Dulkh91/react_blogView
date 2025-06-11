import "./ModalClose.css";
import { useNavigate } from "react-router-dom";
const ModalClose = ({ title, isModalOpen }) => {
  const navi = useNavigate();

  return (
    <>
      <div className=" fixed top-0 left-0 w-full h-full flex items-center justify-center modal-bg-color ">
        <div className=" w-64 h-32 bg-white shadow-lg rounded-sm relative">
          <div className="p-2 ">
            <p className="mx-3 text-gray-400">
              Are you sure to exit the page {title}?
            </p>
            <div className="absolute bottom-3 right-0 w-full px-4">
              <div className="flex justify-between mx-3">
                <button
                  className="bg-blue-300 p-1 px-2 rounded-sm text-white font-light text-sm"
                  onClick={isModalOpen}
                >
                  No
                </button>
                <button
                  className=" bg-amber-400 p-1 px-2 rounded-sm text-white font-light text-sm"
                  onClick={() => navi("/")}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalClose;
