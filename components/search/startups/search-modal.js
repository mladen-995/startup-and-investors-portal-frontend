import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { axiosInstance } from "../../../lib/axios";
import StartupSearchForm from "./startups-form";
import StartupsFilterTable from "./startups-table";

export default function SearchModal(props) {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const onShow = () => {
    setItems([]);
    setSelectedItems([]);
  };

  const loadItems = async (query) => {
    const response = await axiosInstance.get(`${props.url}/?${query}`);

    setItems(
      response.data.data.filter(
        (startup) => !props.selectedStartups.includes(startup.id)
      )
    );
  };

  const onSelectItem = (item) => {
    setSelectedItems((prev) => [...prev, item]);
  };

  const onDeselectItem = (item) => {
    setSelectedItems((prev) =>
      prev.filter((itemObject) => itemObject.id != item.id)
    );
  };

  const chooseItems = () => {
    props.onSelect(selectedItems);
  };

  return (
    <Modal show={props.show} onShow={onShow} size="lg">
      <Modal.Header>
        <Modal.Title>${props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <StartupSearchForm onSubmit={loadItems} />
        <hr />
        <StartupsFilterTable
          startups={items}
          onSelect={onSelectItem}
          onDeselect={onDeselectItem}
        /> */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        {selectedItems.length > 0 && (
          <Button variant="primary" onClick={chooseItems}>
            Choose selected startups
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
