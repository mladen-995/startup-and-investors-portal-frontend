import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { axiosInstance } from "../../../lib/axios";
import StartupSearchForm from "./startups-form";
import StartupsFilterTable from "./startups-table";

export default function StartupSearchModal(props) {
  const [startups, setStartups] = useState([]);
  const [selectedStartups, setSelectedStartups] = useState([]);

  const onShow = () => {
    setStartups([]);
    setSelectedStartups([]);
  };

  const loadStartups = async (query) => {
    const response = await axiosInstance.get(`startups/?${query}`);

    setStartups(
      response.data.data.filter(
        (startup) => !props.selectedStartups.includes(startup.id)
      )
    );
  };

  const selectedStartup = (startup) => {
    setSelectedStartups((prev) => [...prev, startup]);
  };

  const deselectStartup = (startup) => {
    setSelectedStartups((prev) =>
      prev.filter((startupObject) => startupObject.id != startup.id)
    );
  };

  const chooseStartups = () => {
    props.onSelect(selectedStartups);
  };

  return (
    <Modal show={props.show} onShow={onShow} size="lg">
      <Modal.Header>
        <Modal.Title>Search startups</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <StartupSearchForm onSubmit={loadStartups} />
        <hr />
        <StartupsFilterTable
          startups={startups}
          onSelect={selectedStartup}
          onDeselect={deselectStartup}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        {selectedStartups.length > 0 && (
          <Button variant="primary" onClick={chooseStartups}>
            Choose selected startups
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
