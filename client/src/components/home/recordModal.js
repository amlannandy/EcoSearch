import React, { useRef, useCallback } from "react";
import { Badge } from "antd-mobile";
import { Link } from "react-router-dom";

import "./css/recordModal.css";

function RecordModal({ active, closeModal, record }) {
  const modalRef = useRef(null);

  const handleDismiss = useCallback(
    e => {
      e.preventDefault();
      const modalNode = modalRef.current;
      if (e.target === modalNode) {
        closeModal();
      }
    },
    [closeModal]
  );

  if (!active || !record) {
    return null;
  }

  return (
    <div className='modalContainer' ref={modalRef} onClick={handleDismiss}>
      <div className='recordModal'>
        <img
          src={record.imageUrl}
          alt='Record Display'
          className='recordImage'
        />
        <div className='content'>
          <h1>
            {record.title}
            <Badge
              text={record.label || "Unknown"}
              style={{ marginLeft: 12 }}
            />
          </h1>
          <Link className='recordButton' to={`/records/${record.id}`}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecordModal;
