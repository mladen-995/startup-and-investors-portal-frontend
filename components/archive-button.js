import { useState } from "react";
import { Button } from "react-bootstrap";
import { axiosInstance } from "../lib/axios";
import SweetAlert from "react-bootstrap-sweetalert";

export default function ArchiveButton({
  itemId,
  itemTitle,
  archiveUrlPath,
  onArchive,
}) {
  const [promptShow, setPromptShow] = useState(false);

  const onConfirm = async () => {
    await axiosInstance.post(`${archiveUrlPath}/${itemId}`);
    setPromptShow(false);
    onArchive();
  };

  return (
    <>
      <Button
        className="me-2"
        variant="warning"
        size="sm"
        onClick={() => {
          setPromptShow(true);
        }}
      >
        Archive
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
        confirmBtnText="Archive"
      >
        Are you sure you want to archive {itemTitle}?
      </SweetAlert>
    </>
  );
}
