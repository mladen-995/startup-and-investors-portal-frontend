import { useState } from "react";

export default function Selector() {
  const [modalShow, setModalShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    props.onSelect(selectedItems);
  }, [selectedItems]);

  const onSelect = (items) => {
    setSelectedItems((prev) => prev.concat(items));
    setModalShow(false);
  };

  const removeItem = (item) => {
    setSelectedItems((prev) =>
      prev.filter((itemObject) => itemObject.id != item.id)
    );
  };

  return (
    <>
      <Button onClick={() => setModalShow(true)}>Select startups</Button>

      <ListGroup className="mt-3">
        {selectedItems.map((item, index) => (
          <ListGroup.Item key={index}>
            <Button
              size="sm"
              variant="danger"
              className="me-2"
              onClick={() => removeItem(item)}
            >
              Remove
            </Button>{" "}
            <strong>#{index + 1}</strong> {item.firstName} {item.middleName}{" "}
            {item.lastName} [{item.id}]
          </ListGroup.Item>
        ))}
      </ListGroup>
      <StartupSearchModal
        show={modalShow}
        onClose={() => setModalShow(false)}
        onSelect={onSelect}
        selectedStartups={selectedItems.map((item) => item.id)}
      />
    </>
  );
}
