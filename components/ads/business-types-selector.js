import { useEffect, useState } from "react";
import { FormGroup, FormLabel } from "react-bootstrap";
import Select from "react-select";
import { Cipher } from "../../enums/cipher";
import { axiosInstance } from "../../lib/axios";

export default function BusinessTypeSelector(props) {
  const [businessTypes, setBusinessTypes] = useState([]);

  useEffect(() => {
    const loadBusinessTypes = async () => {
      const {
        data: { data },
      } = await axiosInstance.get(`ciphers/${Cipher.BUSINESS_TYPES}`);

      setBusinessTypes(
        data.map((item) => {
          return { value: item.id, label: item.name };
        })
      );
    };

    loadBusinessTypes();
  }, []);

  return (
    <FormGroup className="mb-3">
      <FormLabel>
        Business type <span className="text-danger">*</span>
      </FormLabel>
      <Select
        options={businessTypes}
        isMulti
        isClearable={true}
        onChange={props.onChange}
      ></Select>
      {props.errors[props.name] && props.touched[props.name] ? (
        <div className="text-danger">{props.errors[props.name]}</div>
      ) : null}
    </FormGroup>
  );
}
