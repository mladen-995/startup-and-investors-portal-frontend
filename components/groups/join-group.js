import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Button, FormGroup, FormLabel, Modal } from "react-bootstrap";
import { axiosInstance } from "../../lib/axios";
import Select from "react-select";
import * as Yup from "yup";

export default function JoinGroup({ onJoin }) {
  const [show, setShow] = useState(false);
  const [availableGroups, setAvailableGroups] = useState([]);

  const handleOpen = async () => {
    setShow(true);
    const {
      data: { data: allGroups },
    } = await axiosInstance.get("/startup-groups");

    const {
      data: { data: alreadyJoined },
    } = await axiosInstance.get("/startup-groups-for-user");

    const alreadyJoinedIds = alreadyJoined.map((group) => group.id);

    setAvailableGroups(
      allGroups
        .filter((group) => !alreadyJoinedIds.includes(group.id))
        .map((item) => {
          return { value: item.id, label: item.name };
        })
    );
  };

  const handleSubmit = async (values) => {
    await axiosInstance.post(`startup-groups/join/${values.groupId}`);
    setShow(false);
    onJoin();
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Join group</Button>

      <Modal show={show}>
        <Formik
          initialValues={{
            groupId: "",
          }}
          validationSchema={Yup.object().shape({
            groupId: Yup.string().required("Field is required."),
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>Join group</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Field id="groupId" name="groupId">
                  {({ field, form: { setFieldValue } }) => (
                    <FormGroup className="mb-3">
                      <FormLabel>
                        Group <span className="text-danger">*</span>
                      </FormLabel>
                      <Select
                        options={availableGroups}
                        isClearable={true}
                        onChange={(option) => {
                          setFieldValue(field.name, option.value);
                        }}
                      ></Select>
                      {errors[field.name] && touched[field.name] ? (
                        <div className="text-danger">{errors[field.name]}</div>
                      ) : null}
                    </FormGroup>
                  )}
                </Field>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
