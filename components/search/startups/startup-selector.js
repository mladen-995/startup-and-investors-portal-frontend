import { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useUser } from "../../../hooks/user-hook";
import { axiosInstance } from "../../../lib/axios";
import AskForPermission from "./ask-for-permission";
import StartupSearchModal from "./startups-modal";

export default function StartupSelector(props) {
  const user = useUser();
  const [canSearch, setCanSearch] = useState(null);
  const [canSearchRequested, setCanSearchRequested] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [selectedStartups, setSelectedStartups] = useState([]);

  useEffect(() => {
    props.onSelect(selectedStartups);
  }, [selectedStartups]);

  useEffect(() => {
    const loadCanSearchStartups = async () => {
      if (!user) {
        return;
      }

      if (!user.isInvestor()) {
        setCanSearch(true);
      }

      const {
        data: { data },
      } = await axiosInstance.get("investor/can-search-startups");

      setCanSearch(data.canSearchStartups);
      setCanSearchRequested(data.requestExists);
    };

    loadCanSearchStartups();
  }, [user]);

  const onSelect = (startups) => {
    setSelectedStartups((prev) => prev.concat(startups));
    setModalShow(false);
  };

  const removeStartup = (startup) => {
    setSelectedStartups((prev) =>
      prev.filter((startupObject) => startupObject.id != startup.id)
    );
  };

  return (
    <>
      {canSearch == false && (
        <AskForPermission alreadyRequested={canSearchRequested} />
      )}

      {canSearch && (
        <>
          <Button onClick={() => setModalShow(true)}>Select startups</Button>

          <ListGroup className="mt-3">
            {selectedStartups.map((startup, index) => (
              <ListGroup.Item key={index}>
                <Button
                  size="sm"
                  variant="danger"
                  className="me-2"
                  onClick={() => removeStartup(startup)}
                >
                  Remove
                </Button>{" "}
                <strong>#{index + 1}</strong> {startup.firstName}{" "}
                {startup.middleName} {startup.lastName} [{startup.id}]
              </ListGroup.Item>
            ))}
          </ListGroup>
          <StartupSearchModal
            show={modalShow}
            onClose={() => setModalShow(false)}
            onSelect={onSelect}
            selectedStartups={selectedStartups.map((startup) => startup.id)}
          />
        </>
      )}
    </>
  );
}
