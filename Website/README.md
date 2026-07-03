# FinancePro - Premium Personal Finance Dashboard

FinancePro is a premium, client-side, white glassmorphic web application built to simplify personal wealth management, cash flow tracking, tax estimations, systematic debt/investment logs, and asset allocations.

---

## 🚀 Getting Started

FinancePro is entirely self-contained and client-side. There are no databases to set up or server dependencies to run.

1. **Download/Clone** the project directory.
2. Locate the [money.html](file:///c:/Users/hp/Downloads/personal%20finance%20dashboard/money.html) file.
3. **Double-click** the file (or right-click and choose "Open with...") to launch it in any modern web browser (Chrome, Safari, Edge, Firefox).
4. All data is saved automatically in your browser's secure **HTML5 LocalStorage**, meaning your financial data remains completely private, local, and offline-first on your machine.

---

## 💎 Premium Features Breakdown

### 1. Unified Dashboard
- **8 KPI Summary Cards**: Real-time metrics for Total Income, Total Expenses, Investments, Net Worth, Monthly Savings, Emergency Fund, Debt (Credit Card liabilities), and Investment Returns.
- **AI Chatbot Assistant Drawer**: Activated via the **AI Insights** navbar button. Opens a frosted glass slide-out sidebar panel on the right side of the screen, pre-populated with diagnostic insights and supporting interactive conversational queries (e.g. food bills, portfolio allocation answers derived directly from live state values).
- **Quick Actions (Horizontal Layout)**: Reinstalled as a full-width grid card directly below the KPI metrics on the Dashboard tab, providing easy click shortcuts.
- **Universal Transaction Ledger**: A full-width ledger search table supporting text filter queries (description/category), type filters (All, Income, Expense), date range selections (From/To), and instant filter clear actions.

### 2. Multi-Tab Financial Trackers
- **Income Tab**: Add income values, custom categories (Salary, Freelance, Business, Bonus, Interest, Custom other), select deposit bank accounts, and view recent logs with description searches.
- **Expenses Tab**: Dynamic summaries cards representing category spending (Food, Rent, Shopping, Transport, Bills, Travel, Entertainment, Insurance, Medical, Other) with softer color contrasts.
- **Investments Tab**:
  - **Investment Performance**: Editable metrics showing Today's Gain, Month, Year, and Overall Return percent. Includes pencil triggers.
  - **Themed Gradient Cards**: Portfolio assets display with themed gradients representing types (FD: Teal, Gold: Yellow-Orange, Cash: Royal Blue, Crypto: Rose Red, Mutual Funds/Stocks: Purple/Green).
  - **SIP & EMI Tracker Panels**: Grouped on the right sidebar. Includes **Pay** triggers that deduct payments from chosen bank balances, log transaction ledger entries, increment next pay dates, and decrement loan remaining durations.
- **Bank Accounts Tab**: Frosted glass card displays with left-accent borders representing account types (Savings: Cyan, Salary: Green, Credit: Red, Checking: Blue) and buttons for deposit/withdrawal adjustments.
- **Budget Tab**:
  - **Cash Flow Progress**: Emerald green income bars (100% baseline) compared to proportional rose red expense bars and cyan savings ratios.
  - **Monthly Budget Limit**: Set a monthly budget goal limit and view warnings when current month expenses exceed the limit.
  - **Monthly Finance Calendar**: An interactive July 2026 grid highlighting payment days with type dots (Green for Income, Red for Expense, Purple for Investments) and supporting event add/deletes.
  - **Tax Planning Section**: View and edit Estimated Tax, 80C Investment, Tax Saved, and Capital Gains. Includes a **Tax Reports** button that compiles and downloads a calculated invoice text file (`tax_report_<year>.txt`) locally.
- **Bills Tab**: Renders active pending counters, upcoming bills (Electricity, Rent, Credit Card, Internet) pay actions, Paid History checks, and interactive **Financial Goals** contribute sliders.
- **Reports Tab**: Symmetrical layouts presenting an Allocation Breakdown Pie Chart, Net Worth Growth Trend (12 Months) Line Chart, Investment Allocation Pie Chart, and the 11 Asset Tracker classes.

### 3. Theme Toggle
- **Day/Night Modes**: Toggle button placed next to the savings value in the top header bar. Switches variables overrides immediately, adjusts form inputs backgrounds, and redraws active chart labels for high-contrast visibility.

---

## 📁 Project Structure

- 📄 [money.html](file:///c:/Users/hp/Downloads/personal%20finance%20dashboard/money.html): Main HTML structural elements, modal forms markup, navigation buttons, and charts canvases.
- 📄 [style.css](file:///c:/Users/hp/Downloads/personal%20finance%20dashboard/style.css): Custom stylesheet variables tokens, frosted glass animations, layout grids, and dark theme overrides.
- 📄 [app.js](file:///c:/Users/hp/Downloads/personal%20finance%20dashboard/app.js): Core logic, state data loaders, localStorage CRUD sync triggers, dynamic renders, search filters, and Chart.js instantiation configs.
- 📄 [walkthrough.md](file:///c:/Users/hp/Downloads/personal%20finance%20dashboard/walkthrough.md): Visual updates and developer verification logs.

---

## 🛠️ Data Resetting & Backup

If you want to clear your data or reset default demo balances:
1. Open your browser's Developer Tools (`F12` or right-click -> "Inspect").
2. Go to the **Application** or **Storage** tab.
3. Locate **Local Storage** under the domain (usually `file://` or `localhost`).
4. Select `financeData` and hit **Delete** (or run `localStorage.clear()` in the Console tab).
5. Reload the page to load initial default values.
