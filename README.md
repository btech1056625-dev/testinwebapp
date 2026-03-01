# Developer Portfolio Web App

A very first fully deployed frontend portfolio of mine on Amazon Web Services (AWS) Elastic Beanstalk. This mini-project serves as a modern, responsive personal developer profile page built with a Node.js Express backend.

## Features

- **Modern UI:** A sleek, dark-themed interface utilizing glassmorphism, CSS gradients, flexbox, and CSS grid.
- **Personal Details:** Displays personal information including Name (Bhavya Varshney), Branch (CSE), and College (BIT Mesra).
- **Social Connect:** Direct, stylish links to professional profiles:
  - [GitHub](https://github.com/btech1056625-dev)
  - [Codeforces](https://codeforces.com/profile/10566.25)
  - [LeetCode](https://leetcode.com/btech1056625/)
  - [HackerRank](https://www.hackerrank.com/btech10566_25)
- **Production-Ready:** Configured natively for AWS Elastic Beanstalk (Amazon Linux 2023) using a custom `Procfile` and `0.0.0.0` port bindings to avoid IPv6 issues under Nginx.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, pure CSS3 (no external styling frameworks required)
- **Deployment:** AWS Elastic Beanstalk
- **Proxy Server:** Nginx

## Local Development

To run this application on your local machine:

1. Clone this repository:
   ```bash
   git clone https://github.com/btech1056625-dev/testinwebapp.git
   ```
2. Navigate into the application directory:
   ```bash
   cd "testinwebapp/my-eb-node-app"
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Open your browser and navigate to `http://localhost:3000`

## Deployment to AWS Elastic Beanstalk

This project is configured specifically to deploy seamlessly to AWS Elastic Beanstalk.

1. Navigate to the `my-eb-node-app` folder.
2. Select the **contents** of the folder (do not zip the parent folder itself) - ensure you include `app.js`, `index.html`, `package.json`, `package-lock.json`, and `Procfile`.
3. Compress these files into a `.zip` archive.
4. Open the AWS Console and navigate to **Elastic Beanstalk**.
5. Create a new environment using the **Node.js** platform.
6. Choose "Upload your code" and select the `.zip` file you created.
7. Click **Deploy**.

**Note:** The application uses `app.listen(port, "0.0.0.0")` to ensure the Nginx reverse proxy connects properly using IPv4. Ensure the `Procfile` is included in your ZIP so EB successfully executes the `npm start` command.
