import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { axiosInstance } from "../../lib/axios";
import { formatDateTime } from "../../lib/format-date";

export default function NotificationDetailsModal({ notificationId }) {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState(null);

  const loadNotification = async () => {
    const {
      data: { data },
    } = await axiosInstance.get(`notifications/${notificationId}`);

    setNotification(data);
  };

  const handleShow = () => {
    setShow(true);
    loadNotification();
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
          <Modal.Title>Notification details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <small class="text-secondary">Title</small>
            <br />
            {notification?.title}
          </p>
          <p>
            <small class="text-secondary">Text</small>
            <br />
            {notification?.text}
          </p>
          <p>
            <small class="text-secondary">Created at</small>
            <br />
            {notification?.createdAt
              ? formatDateTime(notification.createdAt)
              : ""}
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
