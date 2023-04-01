import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Button, FormGroup, FormLabel, Modal } from "react-bootstrap";
import { axiosInstance } from "../../lib/axios";
import Select from "react-select";
import * as Yup from "yup";
import { useUser } from "../../hooks/user-hook";

export default function MuteInvestor({ onMute }) {
  const user = useUser();
  const [show, setShow] = useState(false);
  const [availableInvestors, setAvailableInvestors] = useState([]);

  const handleOpen = async () => {
    setShow(true);
    const {
      data: { data: allInvestors },
    } = await axiosInstance.get("/investors");

    const {
      data: { data: alreadyMuted },
    } = await axiosInstance.get("/muted-investors");

    const alreadyMutedIds = alreadyMuted.map((investor) => investor.user.id);

    setAvailableInvestors(
      allInvestors
        .filter(
          (investor) =>
            !alreadyMutedIds.includes(investor.id) &&
            investor.id != user.user.id
        )
        .map((item) => {
          return {
            value: item.id,
            label: item.investorProfile.legalEntityName,
          };
        })
    );
  };

  const handleSubmit = async (values) => {
    await axiosInstance.post(`mute-investor/${values.investorId}`);
    setShow(false);
    onMute();
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Mute investor</Button>

      <Modal show={show}>
        <Formik
          initialValues={{
            investorId: "",
          }}
          validationSchema={Yup.object().shape({
            investorId: Yup.string().required("Field is required."),
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>Mute investor</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Field id="investorId" name="investorId">
                  {({ field, form: { setFieldValue } }) => (
                    <FormGroup className="mb-3">
                      <FormLabel>
                        Investor <span className="text-danger">*</span>
                      </FormLabel>
                      <Select
                        options={availableInvestors}
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
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
