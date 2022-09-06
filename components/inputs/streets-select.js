import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import Select from "react-select";

export default function StreetSelect(props) {
  const [streets, setStreets] = useState([]);

  useEffect(() => {
    const loadStreets = async () => {
      if (!props.municipalityId) {
        setStreets([]);
        return;
      }

      const response = await axiosInstance.get(
        `streets/${props.municipalityId}`
      );

      setStreets(
        response.data.data.map((street) => {
          return { value: street.id, label: street.name };
        })
      );
    };

    loadStreets();
  }, [props]);

  return (
    <Select
      name={props.name}
      options={streets}
      onChange={props.onChange}
    ></Select>
  );
}
