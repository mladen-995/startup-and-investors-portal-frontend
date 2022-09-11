import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { axiosInstance } from "../../lib/axios";
import { formatDateTime } from "../../lib/format-date";

export default function NewsDetails({ newsId }) {
  const [show, setShow] = useState(false);
  const [news, setNews] = useState(null);

  const loadNews = async () => {
    const {
      data: { data },
    } = await axiosInstance.get(`news/${newsId}`);

    setNews(data);
  };

  const handleShow = () => {
    setShow(true);
    loadNews();
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
          <Modal.Title>News details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <small class="text-secondary">Title</small>
            <br />
            {news?.title}
          </p>
          <p>
            <small class="text-secondary">Text</small>
            <br />
            {news?.text}
          </p>
          <p>
            <small class="text-secondary">Category</small>
            <br />
            {news?.category}
          </p>
          <p>
            <small class="text-secondary">Created at</small>
            <br />
            {news?.createdAt ? formatDateTime(news.createdAt) : ""}
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
