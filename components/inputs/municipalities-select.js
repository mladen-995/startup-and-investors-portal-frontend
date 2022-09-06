import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import Select from "react-select";

export default function MunicipalitySelect(props) {
  const [municipalities, setMunicipalities] = useState([]);

  useEffect(() => {
    const loadMunicipalities = async () => {
      if (!props.cityId) {
        setMunicipalities([]);
        return;
      }

      const response = await axiosInstance.get(
        `municipalities/${props.cityId}`
      );

      setMunicipalities(
        response.data.data.map((municipality) => {
          return { value: municipality.id, label: municipality.name };
        })
      );
    };

    loadMunicipalities();
  }, [props]);

  return (
    <Select
      name={props.name}
      options={municipalities}
      onChange={props.onChange}
    ></Select>
  );
}
