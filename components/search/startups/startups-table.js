import { FormCheck } from "react-bootstrap";
import DataTable from "react-data-table-component";

export default function StartupsFilterTable(props) {
  const checkboxChanged = (event, startup) => {
    if (event.target.checked) {
      props.onSelect(startup);
    } else {
      props.onDeselect(startup);
    }
  };

  const columns = [
    {
      name: "",
      button: true,
      cell: (row) => (
        <FormCheck
          type="checkbox"
          id={`check-${row.id}`}
          onChange={(e) => checkboxChanged(e, row)}
        />
      ),
    },
    {
      name: "First name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Middle name",
      selector: (row) => row.middleName,
      sortable: true,
    },
    {
      name: "Last name",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Tin",
      selector: (row) => row.startupProfile.tin,
      sortable: true,
    },
    {
      name: "Legal entity name",
      selector: (row) => row.startupProfile.legalEntityName,
      sortable: true,
    },
    {
      name: "Website",
      selector: (row) => row.startupProfile.website,
      sortable: true,
    },
    {
      name: "Establishment date",
      selector: (row) => row.startupProfile.establishmentDate,
      sortable: true,
    },
    {
      name: "Registration number",
      selector: (row) => row.startupProfile.registrationNumber,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.startupProfile.country,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.startupProfile.city,
      sortable: true,
    },
    {
      name: "Municipality",
      selector: (row) => row.startupProfile.municipality,
      sortable: true,
    },
    {
      name: "Street",
      selector: (row) => row.startupProfile.street,
      sortable: true,
    },
    {
      name: "Street number",
      selector: (row) => row.startupProfile.streetNumber,
      sortable: true,
    },
    {
      name: "Business type",
      selector: (row) => row.startupProfile.businessType,
      sortable: true,
    },
    {
      name: "Areas of interest",
      selector: (row) => row.startupProfile.areasOfInterestsStartups,
      sortable: true,
    },
    {
      name: "Professional skills",
      selector: (row) => row.startupProfile.profesionalSkillsStartups,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.startupProfile.phone,
      sortable: true,
    },
    {
      name: "Facebook",
      selector: (row) => row.startupProfile.facebookLink,
      sortable: true,
    },
    {
      name: "Twitter",
      selector: (row) => row.startupProfile.twitterLink,
      sortable: true,
    },
    {
      name: "LinkedIn",
      selector: (row) => row.startupProfile.linkedInLink,
      sortable: true,
    },
    {
      name: "Instagram",
      selector: (row) => row.startupProfile.instagramLink,
      sortable: true,
    },
    {
      name: "Employee number",
      selector: (row) => row.startupProfile.employeeNumber,
      sortable: true,
    },
    {
      name: "Current company phase",
      selector: (row) => row.startupProfile.currentCompanyPhase,
      sortable: true,
    },
    {
      name: "Last three year income",
      selector: (row) => row.startupProfile.lastThreeYearIncome,
      sortable: true,
    },
    {
      name: "Last three year profit",
      selector: (row) => row.startupProfile.lastThreeYearProfit,
      sortable: true,
    },
    {
      name: "Project proposal",
      selector: (row) => row.startupProfile.projectProposal,
      sortable: true,
    },
    {
      name: "Required amount of money",
      selector: (row) => row.startupProfile.requiredAmountOfMoney,
      sortable: true,
    },
    {
      name: "Intellectual property status",
      selector: (row) => row.startupProfile.intellectualPropertyStatus,
      sortable: true,
    },
  ];

  return <DataTable columns={columns} data={props.startups} />;
}
