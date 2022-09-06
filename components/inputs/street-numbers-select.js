import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import Select from "react-select";

export default function StreetNumberSelect(props) {
  const [streetNumbers, setStreetNumbers] = useState([]);

  useEffect(() => {
    const loadStreetNumbers = async () => {
      if (!props.streetId) {
        setStreetNumbers([]);
        return;
      }

      const response = await axiosInstance.get(
        `street-numbers/${props.streetId}`
      );

      setStreetNumbers(
        response.data.data.map((streetNumber) => {
          return { value: streetNumber.id, label: streetNumber.name };
        })
      );
    };

    loadStreetNumbers();
  }, [props]);

  return (
    <Select
      name={props.name}
      options={streetNumbers}
      onChange={props.onChange}
    ></Select>
  );
}
