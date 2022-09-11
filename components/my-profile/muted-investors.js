import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { axiosInstance } from "../../lib/axios";
import MuteInvestor from "./mute-investor";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Button } from "react-bootstrap";

export default function MutedInvestors() {
  const [mutedInvestors, setMutedInvestors] = useState([]);

  const loadInvestors = async () => {
    const {
      data: { data },
    } = await axiosInstance.get("muted-investors");
    setMutedInvestors(data);
  };

  useEffect(() => {
    loadInvestors();
  }, []);

  const handleUnmute = async (investorId) => {
    await axiosInstance.post(`unmute-investor/${investorId}`);
    NotificationManager.success("You successfully unmuted an investor.");
    loadInvestors();
  };

  const renderUnmuteButton = (row) => {
    return (
      <Button size="sm" onClick={() => handleUnmute(row.user.id)}>
        Unmute
      </Button>
    );
  };

  const columns = [
    {
      name: "Entity name",
      selector: (row) => row.user.investorProfile.legalEntityName,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => <div>{renderUnmuteButton(row)}</div>,
    },
  ];

  return (
    <>
      <MuteInvestor
        onMute={() => {
          NotificationManager.success("You successfully muted an investor.");
          loadInvestors();
        }}
      />
      <DataTable columns={columns} data={mutedInvestors} />
      <NotificationContainer />
    </>
  );
}
