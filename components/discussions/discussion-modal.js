import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  FormGroup,
  FormLabel,
  Modal,
  Row,
} from "react-bootstrap";
import { axiosInstance } from "../../lib/axios";
import * as Yup from "yup";
import moment from "moment";

export default function DiscussionModal({ discussionId }) {
  const [show, setShow] = useState(false);
  const [discussion, setDiscussion] = useState(null);
  const [discussionReplies, setDiscussionReplies] = useState([]);

  const handleClose = () => {
    setShow(false);
  };

  const loadDiscussion = async () => {
    const {
      data: { data: fetchedDiscussion },
    } = await axiosInstance.get(`discussions/${discussionId}`);

    setDiscussion(fetchedDiscussion);
  };

  const loadReplies = async () => {
    const {
      data: { data: fetchedReplies },
    } = await axiosInstance.get(`discussions-replies/${discussionId}`);

    setDiscussionReplies(fetchedReplies);
  };

  const openModal = () => {
    loadDiscussion();
    loadReplies();
    setShow(true);
  };

  const handleSubmitReply = async (values, { resetForm }) => {
    await axiosInstance.post(`discussions-reply/${discussionId}`, values);
    resetForm();
    loadReplies();
  };

  return (
    <>
      <Button onClick={openModal} size="sm" className="me-2">
        Show
      </Button>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{discussion?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {discussion?.text} <hr />
          <h3 className="mb-3">Replies</h3>
          {discussionReplies.map((discussionReply) => (
            <Card className="mb-3">
              <Card.Body>
                <small className="text-secondary">
                  {moment(discussionReply.createdAt).format(
                    "DD/MM/YYYY hh:mm:ss"
                  )}
                </small>
                <br />
                {discussionReply.text}
              </Card.Body>
            </Card>
          ))}
          {discussionReplies.length == 0 && <p>No replies yet</p>}
          <hr />
          <Formik
            initialValues={{
              text: "",
            }}
            validationSchema={Yup.object().shape({
              text: Yup.string().required("Required"),
            })}
            onSubmit={handleSubmitReply}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <FormGroup className="mb-3">
                  <FormLabel>Your reply</FormLabel>
                  <Field
                    id="text"
                    name="text"
                    as="textarea"
                    className="form-control"
                  />
                  {errors.text && touched.text ? (
                    <div className="text-danger">{errors.text}</div>
                  ) : null}
                </FormGroup>
                <Button type="submit">Submit reply</Button>
              </Form>
            )}
          </Formik>
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
