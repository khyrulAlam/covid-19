import React from 'react';

interface IProps {
  errorMessage: string;
  clearErrorMessage: Function;
}

function ErrorNotification(props: IProps) {
  return (
    <React.Fragment>
      <div className="notification is-danger">
        <button
          className="delete"
          onClick={() => props.clearErrorMessage()}
        ></button>
        {props.errorMessage}
      </div>
    </React.Fragment>
  );
}

export default ErrorNotification;
