import { Field } from "formik";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

export default function CustomInput(props) {
  return (
    <Field id={props.name} name={props.name}>
      {({ field }) => (
        <div>
          <FormGroup className="mb-3">
            <FormLabel>
              {props.label}{" "}
              {props.required ? <span className="text-danger">*</span> : ""}
            </FormLabel>
            <FormControl
              id={props.name}
              type={props.type ? props.type : "text"}
              value={field.value}
              onChange={field.onChange}
              className={props.errors[props.name] ? "is-invalid" : null}
            />
            {props.errors[props.name] ? (
              <div className="invalid-feedback">{props.errors[props.name]}</div>
            ) : null}
          </FormGroup>
        </div>
      )}
    </Field>
  );
}
