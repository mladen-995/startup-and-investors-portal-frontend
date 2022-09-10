import React, { useState } from "react";
import { Button } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { axiosInstance } from "../lib/axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export default function ResolveDeleteRequest({
  itemId,
  deleteUrlPath,
  declineUrlPath,
  onResolve,
}) {
  const [promptShow, setPromptShow] = useState(false);

  const acceptAndDelete = async () => {
    await axiosInstance.delete(`${deleteUrlPath}/${itemId}`);
    NotificationManager.success("Delete request is successfully accepted.");
    onResolve();
  };

  const reject = async () => {
    await axiosInstance.post(`${declineUrlPath}/${itemId}`);
    NotificationManager.success("Delete request is successfully declined.");
    onResolve();
  };

  return (
    <>
      <Button
        variant="danger"
        size="sm"
        onClick={() => {
          setResolveDeleteRequestPromptShow(true);
        }}
      >
        Resolve delete request
      </Button>
      <SweetAlert
        title="Resolve delete request"
        type="warning"
        show={promptShow}
        customButtons={
          <React.Fragment>
            <Button
              variant="secondary"
              className="me-3"
              onClick={() => {
                setPromptShow(false);
              }}
            >
              Close
            </Button>
            <Button variant="warning" className="me-3" onClick={reject}>
              Reject delete request
            </Button>
            <Button variant="danger" onClick={acceptAndDelete}>
              Accept and delete
            </Button>
            <hr />
          </React.Fragment>
        }
      ></SweetAlert>
      <NotificationContainer />
    </>
  );
}
