# Spendometer - Personalized Expense tracker

Spendometer is a comprehensive personal finance tracker that simplifies money management. With powerful budgeting tools and insightful analytics, it empowers users to take control of their finances and achieve their financial goals. User Dashboard gives insights about the spending trend so they are better informed about their daily, weekly, montly expenses.

## Demo Screenshots/Video

[DEMO](https://drive.google.com/file/d/1WKMynFp388SH4qOKwDQvRNEoWu3vwhm-/view?usp=sharing) 

Try it out at https://spend-o-meter-main.onrender.com/

View the Figma Design [here](https://www.figma.com/file/7VIQvMboevTR3oG2uBrOyT/Spend-o-Meter?type=design&node-id=0%3A1&mode=design&t=jaUgqyDcZQlOHLgy-1)

## Features
- **Dashboard Page**: Add, delete, and edit expenses to track your spending and categorize your expenses for better organization. The dashboard provides an overview of your expenses, bills and savings, allowing you to get a snapshot of your financial situation. Filter the expense wrt the tags and time of expense.
- **Collaboration Feature**: Enable collaboration between users, allowing them to share and collaborate on expense tracking. Users can invite others to join their financial group, share expenses, and view real-time updates. This feature promotes financial transparency and facilitates joint expense management, such as shared household expenses or group trips.
- **Savings Page**: Define financial goals, such as saving for a vacation or a down payment on a house. The system helps you calculate the required savings amount based on your goal and desired timeframe. Track your progress towards your savings goals and allocate funds from your income accordingly.
- **Subscriptions and Recurrent Bills Page**: Manage your subscriptions and recurring bills in one place. Add, view, and update your subscriptions and bills, including payment amounts, due dates, and payment methods.

## Architectural Flow
![flow](https://github.com/Fastest-Coder-First/Dracarys/assets/91118866/5bf5cec1-0c7f-4523-a46a-e18d3cb3ef0f)

## Additional Features (Future Scopes)

- **Real-Time Price Comparison**: Implement a real-time price comparison feature that allows users to compare the prices of products or services with market prices. Users can search for a specific item or scan a barcode, and the application will provide real-time price comparisons from various online retailers or local stores. This feature empowers users to make informed purchasing decisions and find the best deals available.
- **Lens/Scan Feature**: Implement a lens/scan feature that allows users to capture and extract expense information directly from bills or receipts. This feature can utilize optical character recognition (OCR) technology to extract relevant data such as vendor name, date, and amount, making expense tracking more convenient and efficient.

## Getting Started
To get started with the Personal Finance Tracker, follow these steps:

1. Clone the repository.
2. Install the required dependencies both in the root and frontend folder: `npm install`
3. Create a .env file in the root directory and make sure you do these changes:<br>
   ```
    NODE_ENV = development
    PORT = 5000
    MONGO_URI = 
    JWT_SECRET =
   ```
5. Run the application: `npm run dev` from the root directory
6. Access the application in your web browser at `http://localhost:3000`

## Technologies Used

- Front-end: React, TailwindCSS, Redux Toolkit
- Back-end: Node.js, Express.js, JWT
- Database: MongoDB





