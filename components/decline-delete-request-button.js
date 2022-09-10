import { useState } from "react";
import { Button } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { axiosInstance } from "../lib/axios";

export default function DeclineDeleteRequestButton({
  itemId,
  itemTitle,
  declineUrlPath,
  onDecline,
}) {
  const [promptShow, setPromptShow] = useState(false);

  const onConfirm = async () => {
    await axiosInstance.post(`${declineUrlPath}/${itemId}`);
    setPromptShow(false);
    onDecline();
  };

  return (
    <>
      <Button
        className="me-2"
        variant="secondary"
        size="sm"
        onClick={() => {
          setPromptShow(true);
        }}
      >
        Decline delete request
      </Button>

      <SweetAlert
        title="Are you sure?"
        type="warning"
        show={promptShow}
        onConfirm={onConfirm}
        showCancel
        onCancel={() => {
          setPromptShow(false);
        }}
        confirmBtnText="Decline"
      >
        Are you sure you want to decline delete request for {itemTitle}?
      </SweetAlert>
    </>
  );
}
