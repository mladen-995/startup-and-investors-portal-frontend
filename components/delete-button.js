import { useState } from "react";
import { Button } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { axiosInstance } from "../lib/axios";

export default function DeleteButton({
  itemId,
  itemTitle,
  deleteUrlPath,
  onDelete,
}) {
  const [promptShow, setPromptShow] = useState(false);

  const onConfirm = async () => {
    await axiosInstance.delete(`${deleteUrlPath}/${itemId}`);
    setPromptShow(false);
    onDelete();
  };

  return (
    <>
      <Button
        variant="danger"
        size="sm"
        onClick={() => {
          setPromptShow(true);
        }}
      >
        Delete
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
        confirmBtnText="Delete"
      >
        Are you sure you want to delete {itemTitle}?
      </SweetAlert>
    </>
  );
}
