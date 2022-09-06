import { useState } from "react";
import { Button } from "react-bootstrap";
import { axiosInstance } from "../../../lib/axios";

export default function AskForPermission({ alreadyRequested }) {
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState(false);

  const handleRequestPermission = async () => {
    setLoading(true);
    await axiosInstance.post("investor-search-requests");
    setLoading(false);
    setRequested(true);
  };

  return (
    <>
      <p>You don't have permission to search startups.</p>
      {!requested && !alreadyRequested && (
        <Button
          variant="danger"
          onClick={handleRequestPermission}
          disabled={loading}
        >
          Request permission
        </Button>
      )}
      {(requested || alreadyRequested) && (
        <Button variant="danger" disabled={true}>
          Permission requested
        </Button>
      )}
    </>
  );
}
