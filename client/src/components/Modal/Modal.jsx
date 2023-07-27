import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ children }) => {
  const modalRoot = document.getElementById('modal-root');
  const elRef = useRef(document.createElement('div'));

  useEffect(() => {
    // Mount the portal element to the modalRoot when the component mounts
    modalRoot.appendChild(elRef.current);

     // Create a stable reference to elRef.current using useRef inside the effect
     const modalRef = elRef.current;


    // Clean up the portal element when the component unmounts
    return () => {
      modalRoot.removeChild(modalRef);
    };
  }, [modalRoot]);

  // Render the children into the portal element
  return ReactDOM.createPortal(children, elRef.current);
};

export default Modal;
