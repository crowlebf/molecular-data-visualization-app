## Technologies:

Next.js with SWR

React/Typescript

Scss modules

Docker

## Libraries:

RDKit

D3

Recharts

## UI and Usage:

Enter a chEMBL ID (eg. 260 or chEMBL260) into the search bar and click submit. If the submission returns valid data, the following will render:

- A table with the mean, median, and standard deviation of the IC50 values
- A histogram of the IC50 values
- A scatterplot with ability to choose different fields against the IC50 values
- SVG renders of the first 6 compounds based on the SMILES notation

## Design Decisions:

- Next.js
  - An easy framework to get a node app up and running. There are a lot of built in flexibility and performance, and it has the added benefit that it would scale beyond a prototype.
- Rechart
  - Popular, stable, and customizable with a quick setup. I’ll outline my difficulties with it below, but I think it helped get charts on the page quickly that were interactive and responsive.
- Sass modules
  - Styling per component keeps the markdown uncluttered and readable in a small applications, but there are better choices for scaling.
- Heroku
  - Very easy to push a branch for deployment. It plays really well with next and docker, too.

## Challenges:

- Understanding the data enough to display it in the most accurate way.
  - For example, some results come back with null for the pchembl_value, which skews the plots. Ideally this would be discussed with stakeholders to discuss whether those results should be omitted or not.
- Choosing a charting library that had acceptable features and customization for a rapid prototype.
  - In a real world scenario where this was a rapid prototype, Recharts was easy enough to feed data to use it. However, some sacrifices in its ability to chart histograms would lead me to just use D3 if the component was going to be fully functional and extensible
- RDKit
  - The method for loading the script and using the provided MoleculeStructure.jsx some issues with trying to access the document window before it loaded. I added a check to see if the page was mounted, but there is a lot of room for refactoring there
- Performance
  - I tested the request with 50,000 records and performance really suffered, especially with rendering and redrawing the charts. As outlined in the prompt, good caching strategies would help, but there is definitely room for improving efficiency with transforming and mutating the data.
- Types
  - Given more time, I would have liked to clean up my types and interfaces to reduce some one offs and redundancies.
