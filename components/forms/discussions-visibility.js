import { Field } from "formik";
import { useState } from "react";
import { Col, FormCheck, Row } from "react-bootstrap";
import InvestorSelector from "../search/investors/investor-selector";
import StartupSelector from "../search/startups/startup-selector";

export default function DiscussionVisibility(props) {
  const [selectedVisibility, setSelectedVisibility] = useState("");

  const options = [
    {
      key: "all",
      label: "All",
    },
    {
      key: "startupsOnly",
      label: "All startups",
    },
    {
      key: "startupIds",
      label: "Certain startups",
    },
    {
      key: "investorIds",
      label: "Certain investors",
    },
  ];

  const onChange = (event, value) => {
    if (event.currentTarget.checked) {
      setSelectedVisibility(value);
    }
  };

  const onStartupSelect = (startups) => {
    props.setFieldValue(
      props.childrenName,
      startups.map((startup) => startup.id)
    );
  };

  const onInvestorSelect = (investors) => {
    props.setFieldValue(
      props.childrenName,
      investors.map((investor) => investor.id)
    );
  };

  return (
    <>
      <Row className="mb-3">
        <Col>
          {options.map((option) => (
            <Field
              type="radio"
              name={props.name}
              id={option.key}
              value={option.key}
              key={option.key}
            >
              {({ field, form: { setFieldValue } }) => (
                <FormCheck
                  inline
                  name={props.name}
                  label={option.label}
                  type="radio"
                  id={option.key}
                  value={option.key}
                  onChange={(event) => {
                    setFieldValue(field.name, option.key);
                    onChange(event, option.key);
                  }}
                />
              )}
            </Field>
          ))}
          {props.errors[props.name] && props.touched[props.name] ? (
            <div className="text-danger">{props.errors[props.name]}</div>
          ) : null}
        </Col>
      </Row>
      {selectedVisibility == "startupIds" && (
        <StartupSelector onSelect={onStartupSelect} />
      )}
      {selectedVisibility == "investorIds" && (
        <InvestorSelector onSelect={onInvestorSelect} />
      )}
    </>
  );
}
