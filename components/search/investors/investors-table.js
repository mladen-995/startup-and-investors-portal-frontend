import { FormCheck } from "react-bootstrap";
import DataTable from "react-data-table-component";

export default function InvestorsFilterTable(props) {
  const checkboxChanged = (event, investor) => {
    if (event.target.checked) {
      props.onSelect(investor);
    } else {
      props.onDeselect(investor);
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
      selector: (row) => row.investorProfile.tin,
      sortable: true,
    },
    {
      name: "Legal entity name",
      selector: (row) => row.investorProfile.legalEntityName,
      sortable: true,
    },
    {
      name: "Website",
      selector: (row) => row.investorProfile.website,
      sortable: true,
    },
    {
      name: "Establishment date",
      selector: (row) => row.investorProfile.establishmentDate,
      sortable: true,
    },
    {
      name: "Registration number",
      selector: (row) => row.investorProfile.registrationNumber,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.investorProfile.country,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.investorProfile.city,
      sortable: true,
    },
    {
      name: "Municipality",
      selector: (row) => row.investorProfile.municipality,
      sortable: true,
    },
    {
      name: "Street",
      selector: (row) => row.investorProfile.street,
      sortable: true,
    },
    {
      name: "Street number",
      selector: (row) => row.investorProfile.streetNumber,
      sortable: true,
    },
    {
      name: "Business type",
      selector: (row) => row.investorProfile.businessType,
      sortable: true,
    },
    {
      name: "Areas of interest",
      selector: (row) => row.investorProfile.areasOfInterestsStartups,
      sortable: true,
    },
    {
      name: "Professional skills",
      selector: (row) => row.investorProfile.profesionalSkillsStartups,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.investorProfile.phone,
      sortable: true,
    },
    {
      name: "Facebook",
      selector: (row) => row.investorProfile.facebookLink,
      sortable: true,
    },
    {
      name: "Twitter",
      selector: (row) => row.investorProfile.twitterLink,
      sortable: true,
    },
    {
      name: "LinkedIn",
      selector: (row) => row.investorProfile.linkedInLink,
      sortable: true,
    },
    {
      name: "Instagram",
      selector: (row) => row.investorProfile.instagramLink,
      sortable: true,
    },
    {
      name: "Employee number",
      selector: (row) => row.investorProfile.employeeNumber,
      sortable: true,
    },
    {
      name: "Current company phase",
      selector: (row) => row.investorProfile.currentCompanyPhase,
      sortable: true,
    },
    {
      name: "Last three year income",
      selector: (row) => row.investorProfile.lastThreeYearIncome,
      sortable: true,
    },
    {
      name: "Last three year profit",
      selector: (row) => row.investorProfile.lastThreeYearProfit,
      sortable: true,
    },
    {
      name: "Investor type",
      selector: (row) => row.investorProfile.investorType,
      sortable: true,
    },
    {
      name: "Provided service types",
      selector: (row) => row.investorProfile.providedServiceTypes,
      sortable: true,
    },
    {
      name: "Min amount of money",
      selector: (row) => row.investorProfile.minAmountOfMoney,
      sortable: true,
    },
    {
      name: "Max amount of money",
      selector: (row) => row.investorProfile.maxAmountOfMoney,
      sortable: true,
    },
  ];

  return <DataTable columns={columns} data={props.investors} />;
}
