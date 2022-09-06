import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import Select from "react-select";

export default function CitySelect(props) {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const loadCities = async () => {
      if (!props.countryId) {
        setCities([]);
        return;
      }

      const response = await axiosInstance.get(`cities/${props.countryId}`);

      setCities(
        response.data.data.map((city) => {
          return { value: city.id, label: city.name };
        })
      );
    };

    loadCities();
  }, [props]);

  return (
    <Select
      name={props.name}
      options={cities}
      onChange={props.onChange}
    ></Select>
  );
}
