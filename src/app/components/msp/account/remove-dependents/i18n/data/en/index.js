module.exports = {
  sectionTitle: [
    '', //0 indice is for the Applicant, but it doesn't make sense to have an applicant field here as it's about modifying dependents on on the plan.
    'Remove Spouse',
    '', //children under 19
    '', //children 19-24
    'Remove Children', //children under 24 - catch-all.
  ],


  sectionBody: [
    '',
    'A spouse is a resident of B.C. who is married to or is living and cohabiting in a marriage-like relationship with the applicant.','','','If you are removing a child, you do not need to upload supporting documentation. However, a child 0-18 years of age must have coverage under another account. (A child 19 years of age or over will be automatically set up on their own account.)'
  ],
  clearButton: [
    '',
    'Clear Spouse',
    '',
    '',
    'Clear Child',
  ],
  cancellationDate: "Cancellation Date",
  reason: "Reason for Cancellation",
  reasonDetailed: "Please enter Reason for Cancellation",
  reasonDetailedRequired: "Reason for cancellation is required.",

  cancellationReasonsChild: [
    // "Please select",
    "No longer in full time studies",
    "Deceased",
    "Out of Province / Out of Country",
    "Armed Forces",
    "Incarcerated"

  ],
    cancellationReasonsSpouse: [
        // "Please select",
        "Separated / Divorced",
        "Remove from account but still married/common-law",
        "Deceased",
        "Out of Province / Out of Country",
        "Armed Forces",
        "Incarcerated"
    ],
  pleaseSelect: "Please select",
  knowSpouseCurrentMailing: [
    '',
    "Do you know your Spouse's current mailing address?",
    '',
    '',
    "Do you know your Child's current mailing address?",
  ],
  mailingAddr: "Mailing Address",
}
