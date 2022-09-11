import { useState } from "react";
import { Button } from "react-bootstrap";
import { axiosInstance } from "../lib/axios";
import SweetAlert from "react-bootstrap-sweetalert";

export default function RequestDeleteButton({
  itemId,
  itemTitle,
  requestDeleteUrlPath,
  onDeleteRequest,
}) {
  const [promptShow, setPromptShow] = useState(false);

  const onConfirm = async () => {
    await axiosInstance.post(`${requestDeleteUrlPath}/${itemId}`);
    setPromptShow(false);
    onDeleteRequest();
  };

  return (
    <>
      <Button
        className="me-2"
        variant="danger"
        size="sm"
        onClick={() => {
          setPromptShow(true);
        }}
      >
        Request delete
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
        confirmBtnText="Send delete request"
      >
        Are you sure you want to send delete request for {itemTitle}?
      </SweetAlert>
    </>
  );
}
