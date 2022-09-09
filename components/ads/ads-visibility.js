import { Field } from "formik";
import { useState } from "react";
import { Col, FormCheck, Row } from "react-bootstrap";
import InvestorSelector from "../search/investors/investor-selector";
import StartupSelector from "../search/startups/startup-selector";
import BusinessTypeSelector from "./business-types-selector";
import GroupSelector from "./groups-selector";

export default function AdsVisibility(props) {
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
      key: "businessType",
      label: "Certain startup business types",
    },
    {
      key: "startupGroup",
      label: "Certain startup groups",
    },
  ];

  const onChange = (event, value) => {
    if (event.currentTarget.checked) {
      setSelectedVisibility(value);
    }
  };

  const onEntitySelect = (entity) => {
    props.setFieldValue(
      props.childrenName,
      entity.map((entity) => entity.id)
    );
  };

  const onSelect = (items) => {
    props.setFieldValue(
      props.childrenName,
      items.map((items) => items.value)
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
      <div className="mb-3">
        {selectedVisibility == "startupIds" && (
          <StartupSelector onSelect={onEntitySelect} />
        )}
        {selectedVisibility == "investorIds" && (
          <InvestorSelector onSelect={onEntitySelect} />
        )}

        {selectedVisibility == "businessType" && (
          <BusinessTypeSelector onChange={onSelect} errors={props.errors} />
        )}
        {selectedVisibility == "startupGroup" && (
          <GroupSelector onChange={onSelect} errors={props.errors} />
        )}
      </div>
    </>
  );
}
