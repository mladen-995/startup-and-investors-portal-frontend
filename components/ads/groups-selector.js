import { useEffect, useState } from "react";
import { FormGroup, FormLabel } from "react-bootstrap";
import Select from "react-select";
import { axiosInstance } from "../../lib/axios";

export default function GroupSelector(props) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const loadGroups = async () => {
      const {
        data: { data },
      } = await axiosInstance.get(`startup-groups`);

      setGroups(
        data.map((item) => {
          return { value: item.id, label: item.name };
        })
      );
    };

    loadGroups();
  }, []);

  return (
    <FormGroup className="mb-3">
      <FormLabel>
        Startup groups <span className="text-danger">*</span>
      </FormLabel>
      <Select
        options={groups}
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
