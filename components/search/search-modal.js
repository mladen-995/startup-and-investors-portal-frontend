export default function SearchModal() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const onShow = () => {
    setStartups([]);
    setSelectedStartups([]);
  };

  const loadItems = async (query) => {
    const {
      data: { data },
    } = await axiosInstance.get(`${props.url}/?${query}`);

    setItems(data.filter((item) => !props.selectedItems.includes(item.id)));
  };

  const selectedItem = (item) => {
    setSelectedItems((prev) => [...prev, item]);
  };

  const deselectItem = (item) => {
    setSelectedItems((prev) =>
      prev.filter((itemObject) => itemObject.id != item.id)
    );
  };

  const chooseItem = () => {
    props.onSelect(selectedItems);
  };

  return (
    <Modal show={props.show} onShow={onShow} size="lg">
      <Modal.Header>
        <Modal.Title>Search startups</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children}
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
