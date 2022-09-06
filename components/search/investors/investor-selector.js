import { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import InvestorSearchModal from "./investors-modal";

export default function InvestorSelector(props) {
  const [modalShow, setModalShow] = useState(false);
  const [selectedInvestors, setSelectedInvestors] = useState([]);

  useEffect(() => {
    props.onSelect(selectedInvestors);
  }, [selectedInvestors]);

  const onSelect = (investors) => {
    setSelectedInvestors((prev) => prev.concat(investors));
    setModalShow(false);
  };

  const removeInvestor = (investor) => {
    setSelectedInvestors((prev) =>
      prev.filter((InvestorObject) => InvestorObject.id != investor.id)
    );
  };

  return (
    <>
      <Button onClick={() => setModalShow(true)}>Select investors</Button>

      <ListGroup className="mt-3">
        {selectedInvestors.map((investor, index) => (
          <ListGroup.Item key={index}>
            <Button
              size="sm"
              variant="danger"
              className="me-2"
              onClick={() => removeInvestor(investor)}
            >
              Remove
            </Button>{" "}
            <strong>#{index + 1}</strong> {investor.firstName}{" "}
            {investor.middleName} {investor.lastName} [{investor.id}]
          </ListGroup.Item>
        ))}
      </ListGroup>
      <InvestorSearchModal
        show={modalShow}
        onClose={() => setModalShow(false)}
        onSelect={onSelect}
        selectedInvestors={selectedInvestors.map((investor) => investor.id)}
      />
    </>
  );
}
