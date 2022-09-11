import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import Select from "react-select";

export default function CountrySelect(props) {
  const [countries, setCountries] = useState([]);
  const [defff, setDeff] = useState([]);

  useEffect(() => {
    const loadCountries = async () => {
      const response = await axiosInstance.get("countries");

      setCountries(
        response.data.data.map((country) => {
          return { value: country.id, label: country.name };
        })
      );
      setDeff(
        response.data.data.map((country) => {
          return { value: country.id, label: country.name };
        })[0]
      );
    };

    loadCountries();
  }, []);

  return (
    <Select
      name={props.name}
      options={countries}
      onChange={props.onChange}
      defaultValue={defff}
    ></Select>
  );
}
