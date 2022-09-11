import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { axiosInstance } from "../../lib/axios";
import { formatDateTime } from "../../lib/format-date";

export default function AdDetailsModal({ adId }) {
  const [show, setShow] = useState(false);
  const [ad, setAd] = useState(null);

  const loadAd = async () => {
    const {
      data: { data },
    } = await axiosInstance.get(`ads/${adId}`);

    setAd(data);
  };

  const handleShow = () => {
    setShow(true);
    loadAd();
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Button variant="info" size="sm" className="me-2" onClick={handleShow}>
        Show
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ad details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <small class="text-secondary">Title</small>
            <br />
            {ad?.title}
          </p>
          <p>
            <small class="text-secondary">Text</small>
            <br />
            {ad?.text}
          </p>
          <p>
            <small class="text-secondary">Category</small>
            <br />
            {ad?.category}
          </p>
          <p>
            <small class="text-secondary">Created at</small>
            <br />
            {ad?.createdAt ? formatDateTime(ad.createdAt) : ""}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
