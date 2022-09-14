import { Field } from "formik";
import { useEffect, useState } from "react";
import { FormGroup, FormLabel } from "react-bootstrap";
import Select from "react-select";
import { CategoryType } from "../../enums/category";
import { axiosInstance } from "../../lib/axios";

export default function DiscussionCategorySelect(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const {
        data: { data },
      } = await axiosInstance.get(
        `categories?entityName=${CategoryType.DISCUSSION}&activeOnly=true`
      );

      setCategories(
        [{ value: "", label: "Select..." }].concat(
          data.map((category) => {
            return { value: category.id, label: category.name };
          })
        )
      );
    };

    loadCategories();
  }, []);

  return (
    <Field id={props.name} name={props.name}>
      {({ field, form: { setFieldValue } }) => (
        <FormGroup className="mb-3">
          <FormLabel>Category</FormLabel>
          <Select
            name={props.name}
            options={categories}
            onChange={(option) => {
              setFieldValue(field.name, option.value);
            }}
          ></Select>
          {props.errors[props.name] ? (
            <div className="text-danger">{props.errors[props.name]}</div>
          ) : null}
        </FormGroup>
      )}
    </Field>
  );
}
