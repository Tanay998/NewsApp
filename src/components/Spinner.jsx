import React from 'react';

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center my-5">
      <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="ms-3 align-self-center">
        <h5>Loading News...</h5>
        <p className="text-muted mb-0">Please wait while we fetch the latest updates</p>
      </div>
    </div>
  );
};

export default Spinner;