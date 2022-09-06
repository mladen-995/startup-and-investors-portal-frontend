import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import Select from "react-select";

export default function CipherSelect(props) {
  const [cipher, setCipher] = useState([]);

  useEffect(() => {
    const loadCipher = async () => {
      const response = await axiosInstance.get(`ciphers/${props.cipherType}`);

      setCipher(
        response.data.data.map((item) => {
          return { value: item.id, label: item.name };
        })
      );
    };

    loadCipher();
  }, []);

  return (
    <Select
      name={props.name}
      options={cipher}
      onChange={props.onChange}
    ></Select>
  );
}
