import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { axiosInstance } from "../../../lib/axios";
import InvestorSearchForm from "./investors-form";
import InvestorsFilterTable from "./investors-table";

export default function InvestorSearchModal(props) {
  const [investors, setInvestors] = useState([]);
  const [selectedInvestors, setSelectedInvestors] = useState([]);

  const onShow = () => {
    setInvestors([]);
    setSelectedInvestors([]);
  };

  const loadInvestors = async (query) => {
    const response = await axiosInstance.get(`investors/?${query}`);

    setInvestors(
      response.data.data.filter(
        (investor) => !props.selectedInvestors.includes(investor.id)
      )
    );
  };

  const selectedInvestor = (investor) => {
    setSelectedInvestors((prev) => [...prev, investor]);
  };

  const deselectInvestor = (investor) => {
    setSelectedInvestors((prev) =>
      prev.filter((investorObject) => investorObject.id != investor.id)
    );
  };

  const chooseInvestors = () => {
    props.onSelect(selectedInvestors);
  };

  return (
    <Modal show={props.show} onShow={onShow} size="lg">
      <Modal.Header>
        <Modal.Title>Search investors</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InvestorSearchForm onSubmit={loadInvestors} />
        <hr />
        <InvestorsFilterTable
          investors={investors}
          onSelect={selectedInvestor}
          onDeselect={deselectInvestor}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        {selectedInvestors.length > 0 && (
          <Button variant="primary" onClick={chooseInvestors}>
            Choose selected investors
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
