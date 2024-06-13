project-folder/
|-- backend/
|   |-- app.py

|-- frontend/
|   |-- public/
|   |   |-- index.html
|   |-- src/
|   |   |-- App.js
|   |   |-- index.js
|   |-- package.json
|-- README.md
## What I Learned

Through this project, I learned the following:

1. **Flask and SQLAlchemy**: I gained experience in building a RESTful API using Flask and SQLAlchemy for connecting to a PostgreSQL database. I implemented CRUD operations to manage the trade data.

2. **React and Axios**: I worked with React and the Axios library to consume the Flask API from the frontend. I learned how to handle HTTP requests, manage state, and update the UI based on data fetched from the backend.

3. **Data Visualization with Recharts**: I explored the Recharts library for creating data visualizations in React. I learned how to create a line chart for close prices and a bar chart for volume data, and how to combine them into a multi-axis chart.

4. **Filtering and Interactivity**: I implemented a dropdown menu to filter the data by trade code, which dynamically updates the visualizations and table based on the selected option.

5. **Deployment and Version Control**: I practiced deploying the application to GitHub, managing the codebase using version control, and documenting the project in a README file.

## Challenges Faced

During the development of this project, I encountered the following challenges:

1. **CORS Configuration**: Initially, I faced issues with CORS (Cross-Origin Resource Sharing) when making requests from the React frontend to the Flask backend. I had to configure CORS properly in the Flask app to allow cross-origin requests.

2. **Integrating Recharts**: While Recharts is a powerful library, it took some time to understand the documentation and properly configure the components to create the desired visualizations.

3. **State Management**: Managing the state across different components and ensuring proper data flow between the frontend and backend was a challenge, especially when handling updates and deletions.

4. **Deployment and Hosting**: Deploying the full-stack application with both the Flask backend and React frontend required additional setup and configuration, which involved understanding deployment platforms and hosting options.

Overall, this project provided a valuable learning experience in building a full-stack application, integrating various technologies, and tackling common challenges faced during development.
