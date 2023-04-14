import * as yup from "yup";

const hackathonValidationSchema = yup.object({
  hackathonTitle: yup.string().required("Please fill Hackathon Title"),
  hackathonSummary: yup.string().required("Please fill Hackathon Summary"),
  hackathonDescription: yup
    .string()
    .required("Please fill Hackathon Description"),
  hackathonIcon: yup.string().required("Please add Hackathon Icon"),
  hackathonName: yup.string().required("Please fill Hackathon Name"),
  hackathonStartDate: yup
    .date("must be a valid Date")
    .required("Hackathon Start Date is required"),
  hackathonEndDate: yup
    .date("must be a valid Date")
    .required("Hackathon End Date is required")
    .when(
      "hackathonStartDate",
      ([startDate], schema) =>
        startDate &&
        schema.min(startDate, "End date has to be after Start date")
    ),
  hackathonGithubRepo: yup
    .string()
    .url("Invalid url")
    .required("Please fill link to Github Repo"),
  hackathonOtherLinks: yup
    .string()
    .url("Invalid url")
    .required("Please fill Other Links"),
});

export default hackathonValidationSchema;
