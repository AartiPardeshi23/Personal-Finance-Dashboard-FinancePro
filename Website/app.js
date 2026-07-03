// State management - Load from LocalStorage or initialize with defaults
let financeData = JSON.parse(localStorage.getItem('financeData'));

const defaultData = {
    income: [
        { id: 'inc-1', amount: 75000, title: 'Monthly Salary', category: 'Salary', date: '2026-07-01' },
        { id: 'inc-2', amount: 25000, title: 'Freelance Project', category: 'Freelance', date: '2026-06-29' }
    ],
    expenses: [
        { id: 'exp-1', amount: 12450, category: 'Food', title: 'Groceries & Dining', date: '2026-07-01' },
        { id: 'exp-2', amount: 8200, category: 'Transport', title: 'Fuel & Cab rides', date: '2026-06-30' },
        { id: 'exp-3', amount: 15300, category: 'Shopping', title: 'Summer Clothes', date: '2026-06-28' },
        { id: 'exp-4', amount: 22100, category: 'Bills', title: 'Rent & Electricity', date: '2026-06-25' }
    ],
    investments: [
        { id: 'inv-1', amount: 250000, title: 'HDFC Midcap Fund', type: 'Mutual Fund', returns: 12.5, date: '2026-07-01' },
        { id: 'inv-2', amount: 180000, title: 'Reliance Stock', type: 'Stocks', returns: 18.2, date: '2026-06-25' }
    ],
    bankAccounts: [
        { id: 'bank-1', name: 'Personal Savings', bank: 'HDFC Bank', number: '1234', balance: 525000, type: 'Savings' },
        { id: 'bank-2', name: 'Salary Account', bank: 'SBI Bank', number: '5678', balance: 185000, type: 'Salary' }
    ],
    monthlyBudget: 50000,
    manualAssets: {
        House: 5000000,
        Car: 600000,
        EPF: 300000,
        PPF: 150000,
        NPS: 120000,
        Bonds: 50000
    },
    upcomingBills: [
        { id: 'bill-1', title: 'Electricity', dueDate: 'Tomorrow', amount: 2100 },
        { id: 'bill-2', title: 'Credit Card', dueDate: '5 July', amount: 15000 },
        { id: 'bill-3', title: 'Internet', dueDate: '7 July', amount: 999 },
        { id: 'bill-4', title: 'Rent', dueDate: '10 July', amount: 18000 }
    ],
    goals: [
        { id: 'goal-1', title: 'Buy Car', target: 520000, current: 338000, percent: 65, icon: 'fa-car' },
        { id: 'goal-2', title: 'Vacation', target: 80000, current: 32000, percent: 40, icon: 'fa-umbrella-beach' },
        { id: 'goal-3', title: 'Emergency Fund', target: 200000, current: 180000, percent: 90, icon: 'fa-shield-halved' },
        { id: 'goal-4', title: 'House', target: 2500000, current: 500000, percent: 20, icon: 'fa-house-chimney' }
    ],
    investPerformance: {
        todayGain: 1200,
        monthGain: 12400,
        yearGain: 108000,
        overallReturn: 18
    },
    aiInsights: [
        { text: "You spent 22% more on Food this month.", type: "warning" },
        { text: "You saved ₹18,000 more than last month.", type: "success" },
        { text: "Your emergency fund is sufficient for 6 months.", type: "info" },
        { text: "You should invest ₹8,000 more to reach your yearly goal.", type: "magic" },
        { text: "Entertainment expenses increased by 40%.", type: "warning" },
        { text: "Your portfolio is highly concentrated in equities.", type: "info" }
    ],
    theme: 'light'
};

if (!financeData) {
    financeData = defaultData;
    saveState();
} else {
    let stateChanged = false;
    if (!financeData.hasOwnProperty('monthlyBudget')) {
        financeData.monthlyBudget = 50000;
        stateChanged = true;
    }
    if (!financeData.hasOwnProperty('manualAssets')) {
        financeData.manualAssets = {
            House: 5000000,
            Car: 600000,
            EPF: 300000,
            PPF: 150000,
            NPS: 120000,
            Bonds: 50000
        };
        stateChanged = true;
    }
    if (!financeData.hasOwnProperty('upcomingBills')) {
        financeData.upcomingBills = [
            { id: 'bill-1', title: 'Electricity', dueDate: 'Tomorrow', amount: 2100 },
            { id: 'bill-2', title: 'Credit Card', dueDate: '5 July', amount: 15000 },
            { id: 'bill-3', title: 'Internet', dueDate: '7 July', amount: 999 },
            { id: 'bill-4', title: 'Rent', dueDate: '10 July', amount: 18000 }
        ];
        stateChanged = true;
    }
    if (!financeData.hasOwnProperty('goals')) {
        financeData.goals = [
            { id: 'goal-1', title: 'Buy Car', target: 520000, current: 338000, percent: 65, icon: 'fa-car' },
            { id: 'goal-2', title: 'Vacation', target: 80000, current: 32000, percent: 40, icon: 'fa-umbrella-beach' },
            { id: 'goal-3', title: 'Emergency Fund', target: 200000, current: 180000, percent: 90, icon: 'fa-shield-halved' },
            { id: 'goal-4', title: 'House', target: 2500000, current: 500000, percent: 20, icon: 'fa-house-chimney' }
        ];
        stateChanged = true;
    }
    if (!financeData.hasOwnProperty('investPerformance')) {
        financeData.investPerformance = {
            todayGain: 1200,
            monthGain: 12400,
            yearGain: 108000,
            overallReturn: 18
        };
        stateChanged = true;
    }
    if (!financeData.hasOwnProperty('aiInsights')) {
        financeData.aiInsights = [
            { text: "You spent 22% more on Food this month.", type: "warning" },
            { text: "You saved ₹18,000 more than last month.", type: "success" },
            { text: "Your emergency fund is sufficient for 6 months.", type: "info" },
            { text: "You should invest ₹8,000 more to reach your yearly goal.", type: "magic" },
            { text: "Entertainment expenses increased by 40%.", type: "warning" },
            { text: "Your portfolio is highly concentrated in equities.", type: "info" }
        ];
        stateChanged = true;
    }
    if (!financeData.hasOwnProperty('theme')) {
        financeData.theme = 'light';
        stateChanged = true;
    }
    // Set dates on existing investments in localStorage if they don't have them
    if (financeData.investments) {
        financeData.investments.forEach((inv, index) => {
            if (!inv.date) {
                inv.date = index === 0 ? '2026-07-01' : '2026-06-25';
                stateChanged = true;
            }
        });
    }
    if (stateChanged) {
        saveState();
    }
}

// Save state to localStorage
function saveState() {
    localStorage.setItem('financeData', JSON.stringify(financeData));
}
// Custom Prompts modal function
window.showCustomPrompt = function(message, defaultValue = '', title = 'Update Value') {
    return new Promise((resolve) => {
        const overlay = document.getElementById('customModalOverlay');
        const titleEl = document.getElementById('customModalTitle');
        const msgEl = document.getElementById('customModalMessage');
        const inputEl = document.getElementById('customModalInput');
        const cancelBtn = document.getElementById('customModalCancel');
        const okBtn = document.getElementById('customModalOk');
        
        if (!overlay || !titleEl || !msgEl || !inputEl || !cancelBtn || !okBtn) {
            resolve(prompt(message, defaultValue));
            return;
        }
        
        titleEl.textContent = title;
        msgEl.textContent = message;
        inputEl.value = defaultValue;
        
        overlay.classList.add('open');
        inputEl.focus();
        inputEl.select();
        
        function cleanup() {
            overlay.classList.remove('open');
            okBtn.onclick = null;
            cancelBtn.onclick = null;
            inputEl.onkeydown = null;
        }
        
        okBtn.onclick = () => {
            const val = inputEl.value;
            cleanup();
            resolve(val);
        };
        
        cancelBtn.onclick = () => {
            cleanup();
            resolve(null);
        };
        
        inputEl.onkeydown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                okBtn.onclick();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                cancelBtn.onclick();
            }
        };
    });
};


// Global Chart instances
let financeChartInstance = null;
let trendChartInstance = null;
let netWorthTrendChartInstance = null;
let investAllocationChartInstance = null;
let assetAllocationChartInstance = null;

// Currency Formatter (INR format)
const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(value);
};

// Toast notification system
function showToast(message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
    
    toast.innerHTML = `
        <i class="fa-solid ${iconClass}"></i>
        <div class="toast-message">${message}</div>
        <button class="toast-close"><i class="fa-solid fa-xmark"></i></button>
    `;
    
    container.appendChild(toast);
    
    // Add close listener
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    });
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }
    }, 4000);
}

// Tab navigation handler
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const currentBtn = e.currentTarget;
            const targetTab = currentBtn.getAttribute('data-tab');
            
            // Deactivate all
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Activate current
            currentBtn.classList.add('active');
            const activeContent = document.getElementById(targetTab);
            if (activeContent) {
                activeContent.classList.add('active');
            }
            
            // Re-render chart if switching to reports tab
            if (targetTab === 'reports') {
                setTimeout(() => {
                    updateChart();
                    updateNetWorthTrendChart();
                    updateInvestAllocationChart();
                    updateAssetAllocation();
                }, 100);
            }
            
            // Re-render calendar/tax if switching to budget tab
            if (targetTab === 'budget') {
                setTimeout(() => {
                    renderCalendar();
                    renderTaxSection();
                }, 100);
            }
            
            // Re-render SIPs/EMIs if switching to investments tab
            if (targetTab === 'investments') {
                setTimeout(() => {
                    renderSips();
                    renderEmis();
                }, 100);
            }
            
            // Re-render bills lists if switching to bills tab
            if (targetTab === 'bills') {
                setTimeout(() => {
                    renderUpcomingBills();
                    renderFinancialGoals();
                }, 100);
            }
        });
    });
}

// Tab navigation from Quick Actions on Dashboard
function showTab(tabId) {
    const btn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    if (btn) {
        btn.click();
    }
}

// Update dashboard cards metrics
function updateMetrics() {
    const totalIncome = financeData.income.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = financeData.expenses.reduce((sum, item) => sum + item.amount, 0);
    const totalInvestments = financeData.investments.reduce((sum, item) => sum + item.amount, 0);
    const totalSavings = financeData.bankAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    
    // Calculate comprehensive Net Worth including manual assets
    const manualAssetsSum = Object.values(financeData.manualAssets || {}).reduce((sum, val) => sum + val, 0);
    const bankVal = financeData.bankAccounts
        .filter(acc => acc.type !== 'Credit Card')
        .reduce((sum, acc) => sum + acc.balance, 0);
    const totalLiabilities = financeData.bankAccounts
        .filter(acc => acc.type === 'Credit Card')
        .reduce((sum, acc) => sum + acc.balance, 0);
        
    const netWorth = bankVal + totalInvestments + manualAssetsSum - totalLiabilities;

    // Monthly Savings calculations
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const monthlyIncome = financeData.income
        .filter(item => {
            const d = new Date(item.date);
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        })
        .reduce((sum, item) => sum + item.amount, 0);
        
    const monthlyExpenses = financeData.expenses
        .filter(item => {
            const d = new Date(item.date);
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        })
        .reduce((sum, item) => sum + item.amount, 0);
        
    const monthlySavings = monthlyIncome - monthlyExpenses;

    // Emergency Fund calculation (sum of all 'Savings' type accounts)
    const emergencyFund = financeData.bankAccounts
        .filter(acc => acc.type === 'Savings')
        .reduce((sum, acc) => sum + acc.balance, 0);

    // Debt calculation (sum of credit card balances)
    const debt = financeData.bankAccounts
        .filter(acc => acc.type === 'Credit Card')
        .reduce((sum, acc) => sum + acc.balance, 0);

    // Investment Returns calculation (sum of invested amount * return pct / 100)
    const investmentReturns = financeData.investments.reduce((sum, inv) => {
        const pct = parseFloat(inv.returns) || 0;
        return sum + (inv.amount * (pct / 100));
    }, 0);

    // Header savings
    document.getElementById('totalSavings').textContent = formatCurrency(totalSavings);
    
    // Stats cards
    document.getElementById('totalIncomeVal').textContent = formatCurrency(totalIncome);
    document.getElementById('totalExpensesVal').textContent = formatCurrency(totalExpenses);
    document.getElementById('totalInvestmentsVal').textContent = formatCurrency(totalInvestments);
    document.getElementById('netWorthVal').textContent = formatCurrency(netWorth);
    
    // New KPI Stats cards
    const monthlySavingsEl = document.getElementById('monthlySavingsVal');
    const emergencyFundEl = document.getElementById('emergencyFundVal');
    const debtEl = document.getElementById('debtVal');
    const investReturnsEl = document.getElementById('investReturnsVal');

    if (monthlySavingsEl) monthlySavingsEl.textContent = formatCurrency(monthlySavings);
    if (emergencyFundEl) emergencyFundEl.textContent = formatCurrency(emergencyFund);
    if (debtEl) debtEl.textContent = formatCurrency(debt);
    if (investReturnsEl) investReturnsEl.textContent = formatCurrency(investmentReturns);
    
    // Reports YTD values
    const repIncome = document.getElementById('repIncomeYTD');
    const repExpense = document.getElementById('repExpenseYTD');
    const repNetWorth = document.getElementById('repNetWorth');
    
    if (repIncome) repIncome.textContent = formatCurrency(totalIncome);
    if (repExpense) repExpense.textContent = formatCurrency(totalExpenses);
    if (repNetWorth) repNetWorth.textContent = formatCurrency(netWorth);
    
    updateCashFlowTracker();
    renderLedgerList();
    updateInvestAllocationChart();
    updateAssetAllocation();
    renderUpcomingBills();
    renderFinancialGoals();
    renderSips();
    renderEmis();
    renderInvestPerformance();
    renderCalendar();
    renderTaxSection();
}

// Update Monthly Budget Tracker
function updateBudgetTracker() {
    const budgetLimitText = document.getElementById('budgetLimitText');
    const monthlySpentText = document.getElementById('monthlySpentText');
    const budgetPctText = document.getElementById('budgetPctText');
    const budgetProgressBar = document.getElementById('budgetProgressBar');
    const budgetStatusMsg = document.getElementById('budgetStatusMsg');
    
    if (!budgetLimitText || !monthlySpentText) return;
    
    // Get calendar month bounds
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const monthlySpent = financeData.expenses.filter(exp => {
        const expDate = new Date(exp.date);
        return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
    }).reduce((sum, item) => sum + item.amount, 0);
    
    budgetLimitText.textContent = formatCurrency(financeData.monthlyBudget);
    monthlySpentText.textContent = formatCurrency(monthlySpent);
    
    // Compute percentage
    let pct = 0;
    if (financeData.monthlyBudget > 0) {
        pct = Math.round((monthlySpent / financeData.monthlyBudget) * 100);
    }
    
    budgetPctText.textContent = `${pct}%`;
    
    const barPct = Math.min(pct, 100);
    budgetProgressBar.style.width = `${barPct}%`;
    
    // Reset styles
    budgetProgressBar.className = 'budget-progress-bar-fill';
    budgetStatusMsg.className = 'budget-status-msg';
    
    if (pct >= 100) {
        budgetProgressBar.classList.add('danger');
        budgetStatusMsg.classList.add('over');
        budgetStatusMsg.textContent = `Over budget by ${formatCurrency(monthlySpent - financeData.monthlyBudget)}!`;
    } else if (pct >= 80) {
        budgetProgressBar.classList.add('warning');
        budgetStatusMsg.classList.add('warn');
        budgetStatusMsg.textContent = `Warning: Spent ${pct}% of budget. ${formatCurrency(financeData.monthlyBudget - monthlySpent)} remaining.`;
    } else {
        budgetStatusMsg.classList.add('ok');
        budgetStatusMsg.textContent = `Good standing: ${formatCurrency(financeData.monthlyBudget - monthlySpent)} remaining.`;
    }
}

// Edit monthly budget limit
function setupBudgetEdit() {
    const editBtn = document.getElementById('editBudgetBtn');
    if (editBtn) {
        editBtn.addEventListener('click', async () => {
            const currentLimit = financeData.monthlyBudget || 50000;
            const newLimitStr = await showCustomPrompt('Enter monthly budget limit (₹):', currentLimit, 'Edit Budget Limit');
            if (newLimitStr === null || newLimitStr.trim() === '') return;
            
            const newLimit = parseFloat(newLimitStr);
            if (isNaN(newLimit) || newLimit <= 0) {
                showToast('Please enter a valid positive amount.', 'error');
                return;
            }
            
            financeData.monthlyBudget = newLimit;
            saveState();
            updateBudgetTracker();
            showToast(`Monthly budget limit updated to ${formatCurrency(newLimit)}!`, 'success');
        });
    }
}

// Render dynamic lists
function renderIncomeList(filterQuery = '') {
    const container = document.getElementById('incomeList');
    if (!container) return;
    
    const filtered = financeData.income.filter(item => 
        item.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(filterQuery.toLowerCase())
    );
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-wallet"></i>
                <p>No income transactions logged yet.</p>
            </div>
        `;
        return;
    }
    
    // Sort by date descending
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = filtered.map(item => `
        <div class="list-item income-item" data-id="${item.id}">
            <div class="item-info">
                <div class="item-icon-wrapper">
                    <i class="fa-solid fa-arrow-trend-up"></i>
                </div>
                <div class="item-details">
                    <h5>${item.title}</h5>
                    <p>${item.category} • ${formatDate(item.date)}</p>
                </div>
            </div>
            <div class="item-amount-wrapper">
                <div class="item-amount">+ ${formatCurrency(item.amount)}</div>
                <button class="delete-btn" onclick="deleteIncome('${item.id}')" title="Delete entry">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function renderExpenseList(filterQuery = '') {
    const container = document.getElementById('expenseList');
    if (!container) return;
    
    const filtered = financeData.expenses.filter(item => 
        item.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(filterQuery.toLowerCase())
    );
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-cart-shopping"></i>
                <p>No expense transactions logged yet.</p>
            </div>
        `;
        return;
    }
    
    // Sort by date descending
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = filtered.map(item => `
        <div class="list-item expense-item" data-id="${item.id}">
            <div class="item-info">
                <div class="item-icon-wrapper">
                    <i class="fa-solid fa-arrow-trend-down"></i>
                </div>
                <div class="item-details">
                    <h5>${item.title}</h5>
                    <p>${item.category} • ${formatDate(item.date)}</p>
                </div>
            </div>
            <div class="item-amount-wrapper">
                <div class="item-amount">- ${formatCurrency(item.amount)}</div>
                <button class="delete-btn" onclick="deleteExpense('${item.id}')" title="Delete entry">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function renderCategorySummaries() {
    const container = document.getElementById('categorySummaryGrid');
    if (!container) return;
    
    // Initialize sums for all standard categories plus any others present in data
    const sums = {
        'Food': 0,
        'Rent': 0,
        'Shopping': 0,
        'Transport': 0,
        'Bills': 0,
        'Travel': 0,
        'Entertainment': 0,
        'Insurance': 0,
        'Medical': 0,
        'Other': 0
    };
    
    financeData.expenses.forEach(exp => {
        const cat = exp.category;
        if (sums.hasOwnProperty(cat)) {
            sums[cat] += exp.amount;
        } else {
            if (!sums[cat]) {
                sums[cat] = 0;
            }
            sums[cat] += exp.amount;
        }
    });
    
    const categoryConfigs = {
        'Food': { icon: 'fa-utensils', color: '#f97316' },
        'Rent': { icon: 'fa-house-chimney', color: '#6366f1' },
        'Shopping': { icon: 'fa-bag-shopping', color: '#ec4899' },
        'Transport': { icon: 'fa-car', color: '#3b82f6' },
        'Bills': { icon: 'fa-file-invoice-dollar', color: '#f43f5e' },
        'Travel': { icon: 'fa-plane', color: '#06b6d4' },
        'Entertainment': { icon: 'fa-gamepad', color: '#a855f7' },
        'Insurance': { icon: 'fa-shield-heart', color: '#14b8a6' },
        'Medical': { icon: 'fa-heart-pulse', color: '#10b981' },
        'Other': { icon: 'fa-receipt', color: '#64748b' }
    };
    
    // Show standard categories plus any other category that has spending > 0
    const standardToShow = ['Food', 'Rent', 'Shopping', 'Transport', 'Bills'];
    
    let html = '';
    Object.keys(sums).forEach(cat => {
        const amount = sums[cat];
        if (amount > 0 || standardToShow.includes(cat)) {
            const config = categoryConfigs[cat] || { icon: 'fa-receipt', color: '#64748b' };
            html += `
                <div class="cat-summary-card" style="border-left: 5px solid ${config.color};">
                    <span class="cat-name" style="font-weight: 700; display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary);">
                        <i class="fas ${config.icon}" style="color: ${config.color}; font-size: 1.1rem;"></i> ${cat}
                    </span>
                    <span class="cat-val" style="font-size: 1.5rem; font-weight: 900; color: var(--text-primary); margin-top: 0.5rem;">${formatCurrency(amount)}</span>
                </div>
            `;
        }
    });
    
    container.innerHTML = html;
}

function renderInvestments() {
    const container = document.getElementById('investmentsList');
    if (!container) return;
    
    if (financeData.investments.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-chart-line"></i>
                <p>No investments tracked yet.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = financeData.investments.map(inv => {
        let cardClass = 'stock';
        if (inv.type === 'Mutual Fund' || inv.type === 'SIP') cardClass = 'mutual-fund';
        else if (inv.type === 'Gold') cardClass = 'gold-inv';
        else if (inv.type === 'FD') cardClass = 'fd-inv';
        else if (inv.type === 'Cash') cardClass = 'cash-inv';
        else if (inv.type === 'Stocks' || inv.type === 'Trading') cardClass = 'stock';
        else cardClass = 'other-inv';
        return `
            <div class="investment-card ${cardClass}">
                <div class="inv-header" style="display: flex; flex-direction: column; align-items: flex-start; gap: 0.4rem;">
                    <div class="inv-name" style="padding-right: 4.5rem; word-break: break-word;">${inv.title}</div>
                    <span class="inv-type-badge">${inv.type}</span>
                </div>
                <div class="inv-footer">
                    <div>
                        <div class="bal-lbl">Invested Value</div>
                        <div class="inv-amt">${formatCurrency(inv.amount)}</div>
                    </div>
                    <div class="inv-returns">
                        <div class="inv-returns-pct">
                            <i class="fa-solid fa-circle-arrow-up"></i>
                            ${inv.returns}%
                        </div>
                        <div class="inv-returns-lbl">Returns</div>
                    </div>
                </div>
                <div class="inv-actions">
                    <button class="inv-edit-btn" onclick="editInvestment('${inv.id}')" title="Edit investment">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="inv-delete-btn" onclick="deleteInvestment('${inv.id}')" title="Delete investment">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function renderBankAccounts() {
    const container = document.getElementById('bankAccountsList');
    if (!container) return;
    
    if (financeData.bankAccounts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-university"></i>
                <p>No bank accounts linked yet.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = financeData.bankAccounts.map(acc => {
        let borderClass = 'savings-acc';
        if (acc.type === 'Salary') borderClass = 'salary-acc';
        if (acc.type === 'Credit Card') borderClass = 'credit-acc';
        
        return `
            <div class="bank-card ${borderClass}" onclick="showBankAccountHistory('${acc.id}')" style="cursor: pointer;">
                <div class="bank-card-header">
                    <div>
                        <div class="bank-name-label">${acc.name}</div>
                        <div class="bank-num">${acc.bank} • ****-****-${acc.number}</div>
                    </div>
                    <span class="bank-type-badge">${acc.type}</span>
                </div>
                <div class="bank-card-balance">
                    <div class="bal-lbl">Available Balance</div>
                    <div class="bal-val">${formatCurrency(acc.balance)}</div>
                </div>
                <div class="bank-card-actions">
                    <div class="bank-action-btns">
                        <button class="bank-card-btn" onclick="event.stopPropagation(); depositMoney('${acc.id}')">
                            <i class="fa-solid fa-circle-plus"></i> Deposit
                        </button>
                        <button class="bank-card-btn" onclick="event.stopPropagation(); withdrawMoney('${acc.id}')">
                            <i class="fa-solid fa-circle-minus"></i> Withdraw
                        </button>
                    </div>
                    <button class="bank-delete-btn" onclick="event.stopPropagation(); deleteBankAccount('${acc.id}')" title="Delete account">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    // Also update bank selectors in income/expense logging forms
    updateBankSelectors();
}

function updateBankSelectors() {
    const incomeBankSelect = document.getElementById('incomeBank');
    const expenseBankSelect = document.getElementById('expenseBank');
    
    const options = financeData.bankAccounts.map(acc => 
        `<option value="${acc.id}">${acc.name} (${acc.bank})</option>`
    ).join('');
    
    if (incomeBankSelect) {
        incomeBankSelect.innerHTML = options;
    }
    if (expenseBankSelect) {
        expenseBankSelect.innerHTML = options;
    }
}

// Helpers
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

// Delete functionality
window.deleteIncome = function(id) {
    if (confirm('Are you sure you want to delete this income entry?')) {
        const item = financeData.income.find(i => i.id === id);
        financeData.income = financeData.income.filter(i => i.id !== id);
        saveState();
        updateMetrics();
        renderIncomeList();
        showToast('Income entry deleted successfully!', 'success');
    }
};

window.deleteExpense = function(id) {
    if (confirm('Are you sure you want to delete this expense entry?')) {
        financeData.expenses = financeData.expenses.filter(i => i.id !== id);
        saveState();
        updateMetrics();
        renderExpenseList();
        renderCategorySummaries();
        updateBudgetTracker();
        showToast('Expense tracker deleted successfully!', 'success');
    }
};

window.deleteInvestment = function(id) {
    if (confirm('Are you sure you want to delete this investment?')) {
        financeData.investments = financeData.investments.filter(i => i.id !== id);
        saveState();
        updateMetrics();
        renderInvestments();
        showToast('Investment removed from tracker!', 'success');
    }
};

window.editInvestment = function(id) {
    const inv = financeData.investments.find(i => i.id === id);
    if (!inv) return;
    
    document.getElementById('editInvestId').value = inv.id;
    document.getElementById('editInvestName').value = inv.title;
    document.getElementById('editInvestAmount').value = inv.amount;
    document.getElementById('editInvestReturns').value = inv.returns;
    document.getElementById('editInvestDate').value = inv.date || new Date().toISOString().split('T')[0];
    
    const typeSelect = document.getElementById('editInvestType');
    const otherWrapper = document.getElementById('editInvestTypeOtherWrapper');
    const otherInput = document.getElementById('editInvestTypeOther');
    
    const standardTypes = ['Mutual Fund', 'Stocks', 'SIP', 'Trading', 'Gold', 'FD', 'Cash', 'Crypto'];
    if (standardTypes.includes(inv.type)) {
        typeSelect.value = inv.type;
        otherWrapper.style.display = 'none';
        otherInput.value = '';
    } else {
        typeSelect.value = 'Other';
        otherWrapper.style.display = 'flex';
        otherInput.value = inv.type;
    }
    
    document.getElementById('editInvestModalOverlay').classList.add('open');
};

window.deleteBankAccount = function(id) {
    if (confirm('Are you sure you want to delete this bank account? This will affect your calculated Savings and Net Worth.')) {
        financeData.bankAccounts = financeData.bankAccounts.filter(i => i.id !== id);
        saveState();
        updateMetrics();
        renderBankAccounts();
        showToast('Bank account removed!', 'success');
    }
};

// Deposit & Withdraw direct actions
window.depositMoney = async function(bankId) {
    const acc = financeData.bankAccounts.find(a => a.id === bankId);
    if (!acc) return;
    
    const amountStr = await showCustomPrompt(`Enter deposit amount for ${acc.name}:`, '', 'Deposit Money');
    if (amountStr === null || amountStr.trim() === '') return;
    
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) {
        showToast('Please enter a valid positive amount.', 'error');
        return;
    }
    
    acc.balance += amount;
    
    // Automatically log this as income
    const newIncome = {
        id: 'inc-' + Date.now(),
        amount: amount,
        title: `Deposit to ${acc.name}`,
        category: 'Salary', // default category
        date: new Date().toISOString().split('T')[0],
        bankId: bankId
    };
    financeData.income.push(newIncome);
    
    saveState();
    updateMetrics();
    renderBankAccounts();
    renderIncomeList();
    showToast(`Successfully deposited ${formatCurrency(amount)} into ${acc.name}!`, 'success');
};

window.withdrawMoney = async function(bankId) {
    const acc = financeData.bankAccounts.find(a => a.id === bankId);
    if (!acc) return;
    
    const amountStr = await showCustomPrompt(`Enter withdrawal amount from ${acc.name}:`, '', 'Withdraw Money');
    if (amountStr === null || amountStr.trim() === '') return;
    
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) {
        showToast('Please enter a valid positive amount.', 'error');
        return;
    }
    
    if (acc.balance < amount) {
        showToast('Insufficient funds in account!', 'error');
        return;
    }
    
    acc.balance -= amount;
    
    // Automatically log this as expense
    const newExpense = {
        id: 'exp-' + Date.now(),
        amount: amount,
        title: `Withdrawal from ${acc.name}`,
        category: 'Bills', // default category
        date: new Date().toISOString().split('T')[0]
    };
    financeData.expenses.push(newExpense);
    
    saveState();
    updateMetrics();
    renderBankAccounts();
    renderExpenseList();
    renderCategorySummaries();
    updateBudgetTracker();
    showToast(`Successfully withdrew ${formatCurrency(amount)} from ${acc.name}!`, 'success');
};

// Form submissions
function setupFormSubmissions() {
    // Add Income Form
    const incomeForm = document.getElementById('addIncomeForm');
    if (incomeForm) {
        incomeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const source = document.getElementById('incomeSource').value.trim();
            const amount = parseFloat(document.getElementById('incomeAmount').value);
            let category = document.getElementById('incomeCategory').value;
            const date = document.getElementById('incomeDate').value || new Date().toISOString().split('T')[0];
            const bankId = document.getElementById('incomeBank').value;
            
            if (category === 'Other') {
                category = document.getElementById('incomeCategoryOther').value.trim();
                if (!category) {
                    showToast('Please enter a custom category name.', 'error');
                    return;
                }
            }
            
            if (!source || isNaN(amount) || amount <= 0) {
                showToast('Please enter valid source details and amount.', 'error');
                return;
            }
            
            const newIncome = {
                id: 'inc-' + Date.now(),
                amount: amount,
                title: source,
                category: category,
                date: date,
                bankId: bankId
            };
            
            financeData.income.push(newIncome);
            
            // Adjust bank balance if linked
            if (bankId) {
                const acc = financeData.bankAccounts.find(a => a.id === bankId);
                if (acc) {
                    acc.balance += amount;
                }
            }
            
            saveState();
            updateMetrics();
            renderIncomeList();
            renderBankAccounts();
            incomeForm.reset();
            const wrapper = document.getElementById('incomeCategoryOtherWrapper');
            if (wrapper) wrapper.style.display = 'none';
            showToast(`Income of ${formatCurrency(amount)} added successfully!`, 'success');
        });
    }
    
    // Log Expense Form
    const expenseForm = document.getElementById('logExpenseForm');
    if (expenseForm) {
        expenseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('expenseTitle').value.trim();
            const amount = parseFloat(document.getElementById('expenseAmount').value);
            let category = document.getElementById('expenseCategory').value;
            const date = document.getElementById('expenseDate').value || new Date().toISOString().split('T')[0];
            const bankId = document.getElementById('expenseBank').value;
            
            if (category === 'Other') {
                category = document.getElementById('expenseCategoryOther').value.trim();
                if (!category) {
                    showToast('Please enter a custom category name.', 'error');
                    return;
                }
            }
            
            if (!title || isNaN(amount) || amount <= 0) {
                showToast('Please enter valid item details and amount.', 'error');
                return;
            }
            
            // Verify bank account has sufficient balance
            if (bankId) {
                const acc = financeData.bankAccounts.find(a => a.id === bankId);
                if (acc && acc.balance < amount) {
                    showToast(`Insufficient balance in ${acc.name}!`, 'error');
                    return;
                }
                if (acc) {
                    acc.balance -= amount;
                }
            }
            
            const newExpense = {
                id: 'exp-' + Date.now(),
                amount: amount,
                title: title,
                category: category,
                date: date,
                bankId: bankId
            };
            
            financeData.expenses.push(newExpense);
            
            saveState();
            updateMetrics();
            renderExpenseList();
            renderCategorySummaries();
            renderBankAccounts();
            expenseForm.reset();
            const wrapper = document.getElementById('expenseCategoryOtherWrapper');
            if (wrapper) wrapper.style.display = 'none';
            updateBudgetTracker();
            showToast(`Expense of ${formatCurrency(amount)} logged!`, 'success');
        });
    }
    
    // New Investment Form
    const investmentForm = document.getElementById('newInvestmentForm');
    if (investmentForm) {
        investmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('investName').value.trim();
            let type = document.getElementById('investType').value;
            const amount = parseFloat(document.getElementById('investAmount').value);
            const returns = parseFloat(document.getElementById('investReturns').value) || 0;
            
            if (type === 'Other') {
                type = document.getElementById('investTypeOther').value.trim();
                if (!type) {
                    showToast('Please enter a custom investment type.', 'error');
                    return;
                }
            }
            
            if (!name || isNaN(amount) || amount <= 0) {
                showToast('Please enter valid fund/stock name and amount.', 'error');
                return;
            }
            
            const date = document.getElementById('investDate').value || new Date().toISOString().split('T')[0];
            const newInv = {
                id: 'inv-' + Date.now(),
                title: name,
                type: type,
                amount: amount,
                returns: returns,
                date: date
            };
            
            financeData.investments.push(newInv);
            saveState();
            updateMetrics();
            renderInvestments();
            investmentForm.reset();
            const wrapper = document.getElementById('investTypeOtherWrapper');
            if (wrapper) wrapper.style.display = 'none';
            showToast(`Investment of ${formatCurrency(amount)} successfully tracked!`, 'success');
        });
    }
    
    // Add Bank Account Form
    const bankForm = document.getElementById('addBankForm');
    if (bankForm) {
        bankForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('bankAccName').value.trim();
            const bankName = document.getElementById('bankNameInput').value.trim();
            const number = document.getElementById('bankNumber').value.trim();
            const balance = parseFloat(document.getElementById('bankBalance').value);
            let type = document.getElementById('bankType').value;
            
            if (type === 'Other') {
                type = document.getElementById('bankTypeOther').value.trim();
                if (!type) {
                    showToast('Please enter a custom account type.', 'error');
                    return;
                }
            }
            
            if (!name || !bankName || !number || isNaN(balance)) {
                showToast('Please fill out all bank account form details.', 'error');
                return;
            }
            
            const cleanNumber = number.slice(-4); // just get last 4 digits
            
            const newBank = {
                id: 'bank-' + Date.now(),
                name: name,
                bank: bankName,
                number: cleanNumber,
                balance: balance,
                type: type
            };
            
            financeData.bankAccounts.push(newBank);
            saveState();
            updateMetrics();
            renderBankAccounts();
            bankForm.reset();
            const wrapper = document.getElementById('bankTypeOtherWrapper');
            if (wrapper) wrapper.style.display = 'none';
            showToast(`Bank account "${name}" successfully linked!`, 'success');
        });
    }
}

// Chart.js implementation with real data
function updateChart() {
    const ctx = document.getElementById('financeChart');
    if (!ctx) return;
    
    const totalIncome = financeData.income.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = financeData.expenses.reduce((sum, item) => sum + item.amount, 0);
    const totalInvestments = financeData.investments.reduce((sum, item) => sum + item.amount, 0);
    const totalSavings = financeData.bankAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    
    const context = ctx.getContext('2d');
    
    // Get theme colors dynamically
    const textColor = getComputedStyle(document.body).getPropertyValue('--text-primary').trim() || '#0f172a';
    const borderColor = getComputedStyle(document.body).getPropertyValue('--border-color').trim() || 'rgba(15, 23, 42, 0.06)';
    
    // Destroy existing instance to prevent visual glitch/overlap on redraw
    if (financeChartInstance) {
        financeChartInstance.destroy();
    }
    
    financeChartInstance = new Chart(context, {
        type: 'doughnut',
        data: {
            labels: ['Income', 'Expenses', 'Savings', 'Investments'],
            datasets: [{
                data: [totalIncome, totalExpenses, totalSavings, totalInvestments],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',  // Income (Emerald)
                    'rgba(244, 63, 94, 0.8)',   // Expenses (Rose)
                    'rgba(6, 182, 212, 0.8)',   // Savings (Cyan)
                    'rgba(168, 85, 247, 0.8)'   // Investments (Purple)
                ],
                hoverBackgroundColor: [
                    '#10b981',
                    '#f43f5e',
                    '#06b6d4',
                    '#a855f7'
                ],
                borderWidth: 1,
                borderColor: borderColor
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: textColor,
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            family: 'Outfit',
                            size: 14,
                            weight: '600'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            return ` ${context.label}: ${formatCurrency(value)}`;
                        }
                    }
                }
            },
            cutout: '65%'
        }
    });
}

// Chart.js implementation for trends (Day, Week, Month)
function updateTrendChart() {
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;
    
    const timeframe = document.getElementById('trendTimeframe').value;
    const trackingCategory = document.getElementById('trendData').value;
    
    const context = ctx.getContext('2d');
    
    // Get colors dynamically
    const textColor = getComputedStyle(document.body).getPropertyValue('--text-primary').trim() || '#0f172a';
    const gridColor = 'rgba(15, 23, 42, 0.06)';
    
    let labels = [];
    let incomeData = [];
    let expenseData = [];
    let investmentData = [];
    
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0-indexed
    
    if (timeframe === 'day') {
        // Day-wise for current calendar month
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            labels.push(`${i}`);
            incomeData.push(0);
            expenseData.push(0);
            investmentData.push(0);
        }
        
        // Sum by day
        financeData.income.forEach(item => {
            const date = new Date(item.date);
            if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
                const day = date.getDate();
                incomeData[day - 1] += item.amount;
            }
        });
        
        financeData.expenses.forEach(item => {
            const date = new Date(item.date);
            if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
                const day = date.getDate();
                expenseData[day - 1] += item.amount;
            }
        });
        
        financeData.investments.forEach(item => {
            if (item.date) {
                const date = new Date(item.date);
                if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
                    const day = date.getDate();
                    investmentData[day - 1] += item.amount;
                }
            }
        });
        
    } else if (timeframe === 'week') {
        // Week-wise for current calendar month (5 weeks)
        labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
        incomeData = [0, 0, 0, 0, 0];
        expenseData = [0, 0, 0, 0, 0];
        investmentData = [0, 0, 0, 0, 0];
        
        const getWeekIdx = (date) => {
            const day = date.getDate();
            if (day <= 7) return 0;
            if (day <= 14) return 1;
            if (day <= 21) return 2;
            if (day <= 28) return 3;
            return 4;
        };
        
        financeData.income.forEach(item => {
            const date = new Date(item.date);
            if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
                const idx = getWeekIdx(date);
                incomeData[idx] += item.amount;
            }
        });
        
        financeData.expenses.forEach(item => {
            const date = new Date(item.date);
            if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
                const idx = getWeekIdx(date);
                expenseData[idx] += item.amount;
            }
        });
        
        financeData.investments.forEach(item => {
            if (item.date) {
                const date = new Date(item.date);
                if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
                    const idx = getWeekIdx(date);
                    investmentData[idx] += item.amount;
                }
            }
        });
        
    } else {
        // Month-wise for current calendar year (12 months)
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        incomeData = Array(12).fill(0);
        expenseData = Array(12).fill(0);
        investmentData = Array(12).fill(0);
        
        financeData.income.forEach(item => {
            const date = new Date(item.date);
            if (date.getFullYear() === currentYear) {
                const month = date.getMonth();
                incomeData[month] += item.amount;
            }
        });
        
        financeData.expenses.forEach(item => {
            const date = new Date(item.date);
            if (date.getFullYear() === currentYear) {
                const month = date.getMonth();
                expenseData[month] += item.amount;
            }
        });
        
        financeData.investments.forEach(item => {
            if (item.date) {
                const date = new Date(item.date);
                if (date.getFullYear() === currentYear) {
                    const month = date.getMonth();
                    investmentData[month] += item.amount;
                }
            }
        });
    }
    
    // Build datasets based on active tracking category
    const datasets = [];
    
    if (trackingCategory === 'all' || trackingCategory === 'income') {
        datasets.push({
            label: 'Income',
            data: incomeData,
            borderColor: 'rgba(16, 185, 129, 1)',
            backgroundColor: 'rgba(16, 185, 129, 0.05)',
            borderWidth: 3,
            tension: 0.3,
            fill: true
        });
    }
    
    if (trackingCategory === 'all' || trackingCategory === 'expenses') {
        datasets.push({
            label: 'Expenses',
            data: expenseData,
            borderColor: 'rgba(244, 63, 94, 1)',
            backgroundColor: 'rgba(244, 63, 94, 0.05)',
            borderWidth: 3,
            tension: 0.3,
            fill: true
        });
    }
    
    if (trackingCategory === 'all' || trackingCategory === 'investments') {
        datasets.push({
            label: 'Investments',
            data: investmentData,
            borderColor: 'rgba(168, 85, 247, 1)',
            backgroundColor: 'rgba(168, 85, 247, 0.05)',
            borderWidth: 3,
            tension: 0.3,
            fill: true
        });
    }
    
    if (trendChartInstance) {
        trendChartInstance.destroy();
    }
    
    trendChartInstance = new Chart(context, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        font: {
                            family: 'Outfit',
                            size: 13,
                            weight: '600'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            return ` ${context.dataset.label}: ${formatCurrency(value)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: gridColor },
                    ticks: { color: textColor, font: { family: 'Outfit', weight: '600', size: 11 } }
                },
                y: {
                    grid: { color: gridColor },
                    ticks: { color: textColor, font: { family: 'Outfit', weight: '600', size: 11 } }
                }
            }
        }
    });
}

// Setup listeners for trend filters
function setupTrendFilters() {
    const timeframeSelect = document.getElementById('trendTimeframe');
    const dataSelect = document.getElementById('trendData');
    
    if (timeframeSelect && dataSelect) {
        timeframeSelect.addEventListener('change', updateTrendChart);
        dataSelect.addEventListener('change', updateTrendChart);
    }
}

function setupEditInvestModalListeners() {
    const editInvestForm = document.getElementById('editInvestForm');
    if (editInvestForm) {
        editInvestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('editInvestId').value;
            const inv = financeData.investments.find(i => i.id === id);
            if (!inv) return;
            
            const title = document.getElementById('editInvestName').value.trim();
            let type = document.getElementById('editInvestType').value;
            const amount = parseFloat(document.getElementById('editInvestAmount').value);
            const returns = parseFloat(document.getElementById('editInvestReturns').value) || 0;
            const date = document.getElementById('editInvestDate').value;
            
            if (type === 'Other') {
                type = document.getElementById('editInvestTypeOther').value.trim();
                if (!type) {
                    showToast('Please enter a custom investment type.', 'error');
                    return;
                }
            }
            
            if (!title || isNaN(amount) || amount <= 0) {
                showToast('Please enter valid details.', 'error');
                return;
            }
            
            inv.title = title;
            inv.type = type;
            inv.amount = amount;
            inv.returns = returns;
            inv.date = date;
            
            saveState();
            updateMetrics();
            renderInvestments();
            
            document.getElementById('editInvestModalOverlay').classList.remove('open');
            showToast('Asset updated successfully!', 'success');
        });
    }
    
    const editInvestCancel = document.getElementById('editInvestCancel');
    if (editInvestCancel) {
        editInvestCancel.addEventListener('click', () => {
            document.getElementById('editInvestModalOverlay').classList.remove('open');
        });
    }
    
    const editInvestTypeSelect = document.getElementById('editInvestType');
    if (editInvestTypeSelect) {
        editInvestTypeSelect.addEventListener('change', (e) => {
            const wrapper = document.getElementById('editInvestTypeOtherWrapper');
            if (wrapper) {
                wrapper.style.display = e.target.value === 'Other' ? 'flex' : 'none';
            }
        });
    }
}

// Net Worth 12-Month Growth Trend
function updateNetWorthTrendChart() {
    const ctx = document.getElementById('netWorthTrendChart');
    if (!ctx) return;
    
    const context = ctx.getContext('2d');
    
    // Get colors dynamically
    const textColor = getComputedStyle(document.body).getPropertyValue('--text-primary').trim() || '#0f172a';
    const gridColor = 'rgba(15, 23, 42, 0.06)';
    
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const netWorthData = [];
    
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0-indexed
    
    // Calculate current net worth
    const totalSavings = financeData.bankAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    const totalInvestments = financeData.investments.reduce((sum, item) => sum + item.amount, 0);
    const creditCardDebt = financeData.bankAccounts.filter(acc => acc.type === 'Credit Card').reduce((sum, acc) => sum + acc.balance, 0);
    const currentNetWorth = totalSavings + totalInvestments - creditCardDebt;
    
    for (let m = 0; m < 12; m++) {
        // Plot historical data up to current calendar month, future is null (invisible)
        if (m > currentMonth) {
            netWorthData.push(null);
        } else {
            // Cutoff: last second of month m
            const cutoffDate = new Date(currentYear, m + 1, 0, 23, 59, 59);
            
            // Reconstruct transactions that occurred AFTER cutoffDate
            const incomeAfter = financeData.income
                .filter(item => new Date(item.date) > cutoffDate)
                .reduce((sum, item) => sum + item.amount, 0);
                
            const expensesAfter = financeData.expenses
                .filter(item => new Date(item.date) > cutoffDate)
                .reduce((sum, item) => sum + item.amount, 0);
                
            const investmentsAfter = financeData.investments
                .filter(item => item.date && new Date(item.date) > cutoffDate)
                .reduce((sum, item) => sum + item.amount, 0);
                
            // Net worth history formula:
            const netWorthAtMonth = currentNetWorth - incomeAfter + expensesAfter - investmentsAfter;
            netWorthData.push(netWorthAtMonth);
        }
    }
    
    if (netWorthTrendChartInstance) {
        netWorthTrendChartInstance.destroy();
    }
    
    // Create soft gradient for background fill
    const fillGradient = context.createLinearGradient(0, 0, 0, 300);
    fillGradient.addColorStop(0, 'rgba(99, 102, 241, 0.2)');
    fillGradient.addColorStop(1, 'rgba(99, 102, 241, 0.00)');
    
    netWorthTrendChartInstance = new Chart(context, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Net Worth Growth',
                data: netWorthData,
                borderColor: 'rgba(99, 102, 241, 1)', // Indigo color
                backgroundColor: fillGradient,
                borderWidth: 4,
                pointBackgroundColor: 'rgba(99, 102, 241, 1)',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            return ` Net Worth: ${formatCurrency(value)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: gridColor },
                    ticks: { color: textColor, font: { family: 'Outfit', weight: '600', size: 11 } }
                },
                y: {
                    grid: { color: gridColor },
                    ticks: { color: textColor, font: { family: 'Outfit', weight: '600', size: 11 } }
                }
            }
        }
    });
}

// Setup toggles for "Other" custom option inputs
function setupOtherDropdowns() {
    const toggles = [
        { selectId: 'incomeCategory', wrapperId: 'incomeCategoryOtherWrapper', inputId: 'incomeCategoryOther' },
        { selectId: 'expenseCategory', wrapperId: 'expenseCategoryOtherWrapper', inputId: 'expenseCategoryOther' },
        { selectId: 'investType', wrapperId: 'investTypeOtherWrapper', inputId: 'investTypeOther' },
        { selectId: 'bankType', wrapperId: 'bankTypeOtherWrapper', inputId: 'bankTypeOther' }
    ];
    
    toggles.forEach(({ selectId, wrapperId, inputId }) => {
        const selectEl = document.getElementById(selectId);
        const wrapperEl = document.getElementById(wrapperId);
        const inputEl = document.getElementById(inputId);
        
        if (selectEl && wrapperEl) {
            selectEl.addEventListener('change', () => {
                if (selectEl.value === 'Other') {
                    wrapperEl.style.display = 'flex';
                    if (inputEl) inputEl.required = true;
                } else {
                    wrapperEl.style.display = 'none';
                    if (inputEl) {
                        inputEl.required = false;
                        inputEl.value = '';
                    }
                }
            });
        }
    });
}

// Budget page Cash Flow Meter tracking
function updateCashFlowTracker() {
    const cashIncomeVal = document.getElementById('cashflowIncomeVal');
    const cashExpensesVal = document.getElementById('cashflowExpensesVal');
    const cashSavingsVal = document.getElementById('cashflowSavingsVal');
    
    const cashIncomeBar = document.getElementById('cashflowIncomeBar');
    const cashExpensesBar = document.getElementById('cashflowExpensesBar');
    const cashSavingsBar = document.getElementById('cashflowSavingsBar');
    
    const cashExpensesPct = document.getElementById('cashflowExpensesPct');
    const cashSavingsPct = document.getElementById('cashflowSavingsPct');
    
    if (!cashIncomeVal || !cashExpensesVal) return;
    
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const monthlyIncome = financeData.income
        .filter(item => {
            const d = new Date(item.date);
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        })
        .reduce((sum, item) => sum + item.amount, 0);
        
    const monthlyExpenses = financeData.expenses
        .filter(item => {
            const d = new Date(item.date);
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        })
        .reduce((sum, item) => sum + item.amount, 0);
        
    const monthlySavings = monthlyIncome - monthlyExpenses;
    
    cashIncomeVal.textContent = formatCurrency(monthlyIncome);
    cashExpensesVal.textContent = formatCurrency(monthlyExpenses);
    cashSavingsVal.textContent = formatCurrency(Math.max(0, monthlySavings));
    
    if (monthlyIncome > 0) {
        const expPct = Math.min(100, Math.round((monthlyExpenses / monthlyIncome) * 100));
        const savPct = Math.max(0, Math.min(100, Math.round((monthlySavings / monthlyIncome) * 100)));
        
        cashIncomeBar.style.width = '100%';
        cashExpensesBar.style.width = `${expPct}%`;
        cashSavingsBar.style.width = `${savPct}%`;
        
        if (cashExpensesPct) cashExpensesPct.textContent = `${expPct}%`;
        if (cashSavingsPct) cashSavingsPct.textContent = `${savPct}%`;
    } else {
        cashIncomeBar.style.width = '0%';
        if (monthlyExpenses > 0) {
            cashExpensesBar.style.width = '100%';
            if (cashExpensesPct) cashExpensesPct.textContent = '100% (No Income)';
        } else {
            cashExpensesBar.style.width = '0%';
            if (cashExpensesPct) cashExpensesPct.textContent = '0%';
        }
        cashSavingsBar.style.width = '0%';
        if (cashSavingsPct) cashSavingsPct.textContent = '0%';
    }
}

// Universal Transaction Ledger History
function renderLedgerList(searchText = '', startDate = '', endDate = '', typeFilter = 'all') {
    const container = document.getElementById('ledgerList');
    if (!container) return;
    
    let combined = [
        ...financeData.income.map(item => ({ ...item, type: 'income' })),
        ...financeData.expenses.map(item => ({ ...item, type: 'expense' }))
    ];
    
    let filtered = combined.filter(item => {
        const matchesText = !searchText || 
            item.title.toLowerCase().includes(searchText.toLowerCase()) || 
            item.category.toLowerCase().includes(searchText.toLowerCase());
            
        let matchesStart = true;
        if (startDate) {
            matchesStart = new Date(item.date) >= new Date(startDate);
        }
        let matchesEnd = true;
        if (endDate) {
            const endCutoff = new Date(endDate);
            endCutoff.setHours(23, 59, 59, 999);
            matchesEnd = new Date(item.date) <= endCutoff;
        }
        
        const matchesType = typeFilter === 'all' || item.type === typeFilter;
        
        return matchesText && matchesStart && matchesEnd && matchesType;
    });
    
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    let html = '';
    if (filtered.length === 0) {
        html = '<div class="no-data" style="text-align: center; padding: 2rem; color: var(--text-muted); font-weight: 600;">No transactions found matching search criteria.</div>';
    } else {
        html = `
            <table class="ledger-table" style="width: 100%; border-collapse: collapse; text-align: left;">
                <thead>
                    <tr style="border-bottom: 2px solid var(--border-color); padding-bottom: 0.75rem;">
                        <th style="padding: 0.75rem 0.5rem; font-weight: 700; color: var(--text-secondary); font-size: 0.85rem; text-transform: uppercase;">Date</th>
                        <th style="padding: 0.75rem 0.5rem; font-weight: 700; color: var(--text-secondary); font-size: 0.85rem; text-transform: uppercase;">Description</th>
                        <th style="padding: 0.75rem 0.5rem; font-weight: 700; color: var(--text-secondary); font-size: 0.85rem; text-transform: uppercase;">Category</th>
                        <th style="padding: 0.75rem 0.5rem; font-weight: 700; color: var(--text-secondary); font-size: 0.85rem; text-transform: uppercase;">Type</th>
                        <th style="padding: 0.75rem 0.5rem; font-weight: 700; color: var(--text-secondary); font-size: 0.85rem; text-transform: uppercase; text-align: right;">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${filtered.map(item => `
                        <tr style="border-bottom: 1px solid rgba(15, 23, 42, 0.05);">
                            <td style="padding: 0.85rem 0.5rem; font-weight: 600; font-size: 0.9rem; color: var(--text-secondary);">${item.date}</td>
                            <td style="padding: 0.85rem 0.5rem; font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">${item.title}</td>
                            <td style="padding: 0.85rem 0.5rem;"><span style="background: rgba(15,23,42,0.04); padding: 0.25rem 0.6rem; border-radius: var(--radius-md); font-size: 0.8rem; font-weight: 700; color: var(--text-secondary);">${item.category}</span></td>
                            <td style="padding: 0.85rem 0.5rem;"><span style="padding: 0.25rem 0.6rem; border-radius: var(--radius-md); font-size: 0.8rem; font-weight: 700; color: ${item.type === 'income' ? 'var(--color-income)' : 'var(--color-expense)'}; background: ${item.type === 'income' ? 'rgba(16,185,129,0.08)' : 'rgba(244,63,94,0.08)'};">${item.type.toUpperCase()}</span></td>
                            <td style="padding: 0.85rem 0.5rem; font-weight: 800; font-size: 0.95rem; text-align: right; color: ${item.type === 'income' ? 'var(--color-income)' : 'var(--color-expense)'};">${item.type === 'income' ? '+' : '-'}${formatCurrency(item.amount)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
    container.innerHTML = html;
}

// Setup listeners for ledger filters
function setupLedgerFilters() {
    const searchInput = document.getElementById('ledgerSearchText');
    const startDateInput = document.getElementById('ledgerStartDate');
    const endDateInput = document.getElementById('ledgerEndDate');
    const typeSelect = document.getElementById('ledgerType');
    const clearBtn = document.getElementById('clearLedgerFiltersBtn');
    
    if (searchInput && startDateInput && endDateInput && typeSelect) {
        const triggerFilter = () => {
            renderLedgerList(
                searchInput.value.trim(),
                startDateInput.value,
                endDateInput.value,
                typeSelect.value
            );
        };
        
        searchInput.addEventListener('input', triggerFilter);
        startDateInput.addEventListener('change', triggerFilter);
        endDateInput.addEventListener('change', triggerFilter);
        typeSelect.addEventListener('change', triggerFilter);
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                startDateInput.value = '';
                endDateInput.value = '';
                typeSelect.value = 'all';
                renderLedgerList();
            });
        }
    }
}

// Investment Allocation breakdown (Pie Chart + Legend)
function updateInvestAllocationChart() {
    const canvas = document.getElementById('investAllocationChart');
    if (!canvas) return;
    
    // We group investments: Mutual Fund (incl SIP), Stocks (incl Trading), Gold, FD, Crypto, Cash, Other
    const groups = {
        'Mutual Funds': 0,
        'Stocks': 0,
        'Gold': 0,
        'FD': 0,
        'Crypto': 0,
        'Cash': 0,
        'Other': 0
    };
    
    let totalVal = 0;
    
    financeData.investments.forEach(inv => {
        const amt = inv.amount;
        totalVal += amt;
        
        if (inv.type === 'Mutual Fund' || inv.type === 'SIP') {
            groups['Mutual Funds'] += amt;
        } else if (inv.type === 'Stocks' || inv.type === 'Trading') {
            groups['Stocks'] += amt;
        } else if (inv.type === 'Gold') {
            groups['Gold'] += amt;
        } else if (inv.type === 'FD') {
            groups['FD'] += amt;
        } else if (inv.type === 'Crypto') {
            groups['Crypto'] += amt;
        } else if (inv.type === 'Cash') {
            groups['Cash'] += amt;
        } else {
            groups['Other'] += amt;
        }
    });
    
    // Calculate legend HTML
    const legendContainer = document.getElementById('investAllocationLegend');
    if (legendContainer) {
        if (totalVal === 0) {
            legendContainer.innerHTML = '<div style="grid-column: span 2; text-align: center; color: var(--text-secondary); font-weight: 600;">No investments loaded yet.</div>';
        } else {
            legendContainer.innerHTML = Object.keys(groups).map(key => {
                const val = groups[key];
                const pct = totalVal > 0 ? Math.round((val / totalVal) * 100) : 0;
                let colorDot = '#64748b';
                if (key === 'Mutual Funds') colorDot = '#a855f7';
                else if (key === 'Stocks') colorDot = '#10b981';
                else if (key === 'Gold') colorDot = '#f59e0b';
                else if (key === 'FD') colorDot = '#0f766e';
                else if (key === 'Crypto') colorDot = '#f43f5e';
                else if (key === 'Cash') colorDot = '#2563eb';
                
                return `
                    <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem;">
                        <span style="width: 10px; height: 10px; border-radius: 50%; background: ${colorDot}; flex-shrink: 0;"></span>
                        <span style="font-weight: 700; color: var(--text-primary);">${key}:</span>
                        <span style="color: var(--text-secondary);">${pct}% (${formatCurrency(val)})</span>
                    </div>
                `;
            }).join('');
        }
    }
    
    // Render Pie Chart
    const context = canvas.getContext('2d');
    if (investAllocationChartInstance) {
        investAllocationChartInstance.destroy();
    }
    
    if (totalVal === 0) {
        investAllocationChartInstance = new Chart(context, {
            type: 'pie',
            data: {
                labels: ['No Data'],
                datasets: [{
                    data: [1],
                    backgroundColor: ['rgba(15, 23, 42, 0.05)']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
            }
        });
        return;
    }
    
    const chartLabels = [];
    const chartData = [];
    const chartColors = [];
    
    Object.keys(groups).forEach(key => {
        const val = groups[key];
        if (val > 0) {
            chartLabels.push(key);
            chartData.push(val);
            
            let colorDot = '#64748b';
            if (key === 'Mutual Funds') colorDot = '#a855f7';
            else if (key === 'Stocks') colorDot = '#10b981';
            else if (key === 'Gold') colorDot = '#f59e0b';
            else if (key === 'FD') colorDot = '#0f766e';
            else if (key === 'Crypto') colorDot = '#f43f5e';
            else if (key === 'Cash') colorDot = '#2563eb';
            chartColors.push(colorDot);
        }
    });
    
    investAllocationChartInstance = new Chart(context, {
        type: 'pie',
        data: {
            labels: chartLabels,
            datasets: [{
                data: chartData,
                backgroundColor: chartColors,
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const val = context.raw;
                            const pct = Math.round((val / totalVal) * 100);
                            return ` ${context.label}: ${pct}% (${formatCurrency(val)})`;
                        }
                    }
                }
            }
        }
    });
}

// Asset Tracker list rendering
function updateAssetAllocation() {
    const listContainer = document.getElementById('assetTrackerList');
    if (!listContainer) return;
    
    // Auto-derived asset values
    const bankVal = financeData.bankAccounts
        .filter(acc => acc.type !== 'Credit Card')
        .reduce((sum, acc) => sum + acc.balance, 0);
        
    const mutualFundsVal = financeData.investments
        .filter(inv => inv.type === 'Mutual Fund' || inv.type === 'SIP')
        .reduce((sum, inv) => sum + inv.amount, 0);
        
    const stocksVal = financeData.investments
        .filter(inv => inv.type === 'Stocks' || inv.type === 'Trading')
        .reduce((sum, inv) => sum + inv.amount, 0);
        
    const goldVal = financeData.investments
        .filter(inv => inv.type === 'Gold')
        .reduce((sum, inv) => sum + inv.amount, 0);
        
    const cashVal = financeData.investments
        .filter(inv => inv.type === 'Cash')
        .reduce((sum, inv) => sum + inv.amount, 0);
        
    // Manual assets from state
    const houseVal = financeData.manualAssets.House || 0;
    const carVal = financeData.manualAssets.Car || 0;
    const epfVal = financeData.manualAssets.EPF || 0;
    const ppfVal = financeData.manualAssets.PPF || 0;
    const npsVal = financeData.manualAssets.NPS || 0;
    const bondsVal = financeData.manualAssets.Bonds || 0;
    
    // Combine all 11 assets
    const assetsList = [
        { key: 'House', name: 'House', amount: houseVal, isManual: true, icon: 'fa-house-user', color: '#f59e0b' },
        { key: 'Car', name: 'Car', amount: carVal, isManual: true, icon: 'fa-car-side', color: '#6366f1' },
        { key: 'Mutual Funds', name: 'Mutual Funds', amount: mutualFundsVal, isManual: false, icon: 'fa-money-bill-trend-up', color: '#a855f7' },
        { key: 'Stocks', name: 'Stocks', amount: stocksVal, isManual: false, icon: 'fa-chart-line', color: '#10b981' },
        { key: 'Gold', name: 'Gold', amount: goldVal, isManual: false, icon: 'fa-coins', color: '#ca8a04' },
        { key: 'Cash', name: 'Cash', amount: cashVal, isManual: false, icon: 'fa-wallet', color: '#2563eb' },
        { key: 'Bank', name: 'Bank Balance', amount: bankVal, isManual: false, icon: 'fa-building-columns', color: '#0d9488' },
        { key: 'EPF', name: 'EPF', amount: epfVal, isManual: true, icon: 'fa-shield-halved', color: '#06b6d4' },
        { key: 'PPF', name: 'PPF', amount: ppfVal, isManual: true, icon: 'fa-piggy-bank', color: '#ec4899' },
        { key: 'NPS', name: 'NPS', amount: npsVal, isManual: true, icon: 'fa-landmark', color: '#8b5cf6' },
        { key: 'Bonds', name: 'Bonds', amount: bondsVal, isManual: true, icon: 'fa-file-contract', color: '#14b8a6' }
    ];
    
    // Render list
    listContainer.innerHTML = assetsList.map(asset => {
        return `
            <div class="asset-item">
                <div class="asset-meta">
                    <i class="fa-solid ${asset.icon}" style="color: ${asset.color};"></i>
                    <div>
                        <div class="asset-name">${asset.name}</div>
                        <div class="asset-source">${asset.isManual ? 'Manual Entry' : 'Auto-synced from Ledger'}</div>
                    </div>
                </div>
                <div class="asset-value-action">
                    <span class="asset-value">${formatCurrency(asset.amount)}</span>
                    ${asset.isManual ? `
                        <button class="asset-edit-btn" onclick="editAssetValue('${asset.key}', ${asset.amount})" title="Edit Balance">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    ` : `
                        <span style="font-size: 0.7rem; padding: 0.15rem 0.4rem; border-radius: var(--radius-sm); background: rgba(16,185,129,0.08); color: var(--color-income); font-weight: 700;">SYNC</span>
                    `}
                </div>
            </div>
        `;
    }).join('');
}

// Edit Asset Value function (global for onclick)
window.editAssetValue = async function(key, currentVal) {
    const newVal = await showCustomPrompt(`Set balance for ${key}:`, currentVal, 'Edit Asset Value');
    if (newVal === null) return;
    
    const parsed = parseFloat(newVal.replace(/[^0-9.-]+/g, ''));
    if (isNaN(parsed) || parsed < 0) {
        alert('Please enter a valid positive number.');
        return;
    }
    
    financeData.manualAssets[key] = parsed;
    saveState();
    updateMetrics(); 
};

// Upcoming Bills list rendering
function renderUpcomingBills() {
    const container = document.getElementById('upcomingBillsList');
    if (!container) return;
    
    // Calculate side stats
    const totalPending = (financeData.upcomingBills || []).reduce((sum, b) => sum + b.amount, 0);
    const countPending = (financeData.upcomingBills || []).length;
    
    const pendingValEl = document.getElementById('pendingBillsVal');
    const pendingCountEl = document.getElementById('pendingBillsCount');
    
    if (pendingValEl) pendingValEl.textContent = formatCurrency(totalPending);
    if (pendingCountEl) pendingCountEl.textContent = countPending;
    
    if (!financeData.upcomingBills || financeData.upcomingBills.length === 0) {
        container.innerHTML = '<div class="empty-state" style="padding: 2.5rem; text-align: center; color: var(--text-secondary); font-size: 0.85rem;"><i class="fa-solid fa-square-check" style="font-size: 2rem; margin-bottom: 0.5rem; color: var(--color-income);"></i><p>All bills paid!</p></div>';
    } else {
        container.innerHTML = financeData.upcomingBills.map(bill => {
            const isUrgent = bill.dueDate.toLowerCase().includes('tomorrow') || bill.dueDate.toLowerCase().includes('today');
            const dateStyle = isUrgent ? 'color: #ea580c; font-weight: 700;' : 'color: var(--text-secondary); font-weight: 600;';
            
            return `
                <div class="bill-item" style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background: rgba(15,23,42,0.02); border: 1px solid var(--border-color); border-radius: var(--radius-md); margin-bottom: 0.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <i class="fa-solid fa-file-invoice" style="color: var(--color-expense); font-size: 1.25rem;"></i>
                        <div>
                            <div style="font-weight: 700; color: var(--text-primary); font-size: 0.95rem;">${bill.title}</div>
                            <span style="font-size: 0.75rem; ${dateStyle}">${bill.dueDate}</span>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <span style="font-weight: 800; color: var(--text-primary); font-size: 0.95rem; margin-right: 0.5rem;">${formatCurrency(bill.amount)}</span>
                        <button class="bank-card-btn" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; margin-top: 0; display: inline-flex; align-items: center;" onclick="payUpcomingBill('${bill.id}')">Pay</button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // Render paid bills history list
    const paidHistoryContainer = document.getElementById('paidBillsHistoryList');
    if (paidHistoryContainer) {
        const paidBills = financeData.expenses.filter(exp => exp.category === 'Bills');
        paidBills.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        if (paidBills.length === 0) {
            paidHistoryContainer.innerHTML = '<div style="color: var(--text-secondary); font-size: 0.8rem; text-align: center; padding: 1.5rem;">No bills paid this session.</div>';
        } else {
            paidHistoryContainer.innerHTML = paidBills.map(exp => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0.75rem; background: rgba(16, 185, 129, 0.04); border: 1px solid rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fa-solid fa-circle-check" style="color: var(--color-income);"></i>
                        <div>
                            <div style="font-weight: 700; font-size: 0.85rem; color: var(--text-primary); text-decoration: line-through;">${exp.title.replace('Paid: ', '')}</div>
                            <span style="font-size: 0.7rem; color: var(--text-secondary);">${exp.date}</span>
                        </div>
                    </div>
                    <span style="font-weight: 700; font-size: 0.85rem; color: var(--color-income);">${formatCurrency(exp.amount)}</span>
                </div>
            `).join('');
        }
    }
}

// Pay Upcoming Bill flow (global)
window.payUpcomingBill = async function(id) {
    const bill = financeData.upcomingBills.find(b => b.id === id);
    if (!bill) return;
    
    if (financeData.bankAccounts.length === 0) {
        alert('Please link a bank account first.');
        return;
    }
    
    let message = `Pay bill: ${bill.title} - ${formatCurrency(bill.amount)}\n\nSelect bank account to pay from:`;
    financeData.bankAccounts.forEach((acc, index) => {
        message += `\n${index + 1}. ${acc.name} (${formatCurrency(acc.balance)})`;
    });
    
    const choice = await showCustomPrompt(message, "1", 'Pay Upcoming Bill');
    if (choice === null) return;
    
    const idx = parseInt(choice) - 1;
    if (isNaN(idx) || idx < 0 || idx >= financeData.bankAccounts.length) {
        alert('Invalid choice.');
        return;
    }
    
    const account = financeData.bankAccounts[idx];
    if (account.balance < bill.amount && account.type !== 'Credit Card') {
        alert('Insufficient balance in selected account.');
        return;
    }
    
    // Deduct balance
    if (account.type === 'Credit Card') {
        account.balance += bill.amount; // credit card balance increases liability
    } else {
        account.balance -= bill.amount;
    }
    
    // Log as expense
    const todayStr = new Date().toISOString().split('T')[0];
    const expenseItem = {
        id: 'exp-' + Date.now(),
        amount: bill.amount,
        category: 'Bills',
        title: 'Paid: ' + bill.title,
        date: todayStr,
        bankId: account.id
    };
    
    financeData.expenses.push(expenseItem);
    
    // Remove from upcoming bills
    financeData.upcomingBills = financeData.upcomingBills.filter(b => b.id !== id);
    
    saveState();
    
    // Re-render
    updateMetrics();
    renderExpenseList();
    renderBankAccounts();
    renderCategorySummaries();
    
    alert(`Successfully paid ${bill.title} using ${account.name}!`);
};

// Add Upcoming Bill prompt flow (global)
window.addUpcomingBill = async function() {
    const title = await showCustomPrompt('Enter bill name/title:', '', 'Add Bill Name');
    if (!title) return;
    const amtInput = await showCustomPrompt('Enter bill amount (₹):', '', 'Add Bill Amount');
    if (!amtInput) return;
    const amount = parseFloat(amtInput.replace(/[^0-9.-]+/g, ''));
    if (isNaN(amount) || amount <= 0) {
        alert('Invalid amount.');
        return;
    }
    const dueDate = await showCustomPrompt('Enter due date (e.g., "15 July" or "Tomorrow"):', '', 'Add Bill Due Date');
    if (!dueDate) return;
    
    const newBill = {
        id: 'bill-' + Date.now(),
        title,
        dueDate,
        amount
    };
    
    if (!financeData.upcomingBills) {
        financeData.upcomingBills = [];
    }
    financeData.upcomingBills.push(newBill);
    saveState();
    
    updateMetrics();
};

// Financial Goals list rendering
function renderFinancialGoals() {
    const container = document.getElementById('financialGoalsList');
    if (!container) return;
    
    if (!financeData.goals || financeData.goals.length === 0) {
        container.innerHTML = '<div class="empty-state" style="padding: 1.5rem; text-align: center; color: var(--text-secondary); font-size: 0.85rem;"><i class="fa-solid fa-bullseye" style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--text-muted);"></i><p>No financial goals set yet.</p></div>';
        return;
    }
    
    container.innerHTML = financeData.goals.map(goal => {
        const percent = goal.target > 0 ? Math.min(100, Math.round((goal.current / goal.target) * 100)) : goal.percent;
        return `
            <div class="goal-progress-container">
                <div class="goal-label-row">
                    <span class="goal-title">
                        <i class="fa-solid ${goal.icon || 'fa-star'}" style="color: var(--color-bank); font-size: 1.1rem;"></i>
                        ${goal.title}
                    </span>
                    <span class="goal-numbers" style="font-weight: 700;">
                        ${formatCurrency(goal.current)} / ${formatCurrency(goal.target)}
                    </span>
                </div>
                <div class="goal-progress-bar-bg">
                    <div class="goal-progress-bar-fill" style="width: ${percent}%;"></div>
                </div>
                <div class="goal-item-footer">
                    <span style="font-weight: 700; color: var(--text-secondary);">Goal Progress: <span class="goal-percent-badge">${percent}%</span></span>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <button class="bank-card-btn" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; margin-top: 0; display: inline-flex; align-items: center;" onclick="contributeToGoal('${goal.id}')">Contribute</button>
                        <button class="delete-btn" style="color: var(--text-muted); font-size: 0.8rem; border: none; background: transparent; cursor: pointer; transition: color 0.2s;" onclick="deleteFinancialGoal('${goal.id}')" title="Delete Goal"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Contribute funds to a specific financial goal (global)
window.contributeToGoal = async function(id) {
    const goal = financeData.goals.find(g => g.id === id);
    if (!goal) return;
    
    if (financeData.bankAccounts.length === 0) {
        alert('Please link a bank account first.');
        return;
    }
    
    let message = `Contribute to Goal: ${goal.title}\nTarget Remaining: ${formatCurrency(Math.max(0, goal.target - goal.current))}\n\nEnter contribution amount (₹):`;
    const amtInput = await showCustomPrompt(message, "5000", 'Goal Contribution Amount');
    if (amtInput === null) return;
    
    const amount = parseFloat(amtInput.replace(/[^0-9.-]+/g, ''));
    if (isNaN(amount) || amount <= 0) {
        alert('Invalid contribution amount.');
        return;
    }
    
    // Select bank account to deduct from
    let bankMessage = `Select bank account to contribute from:`;
    financeData.bankAccounts.forEach((acc, index) => {
        bankMessage += `\n${index + 1}. ${acc.name} (${formatCurrency(acc.balance)})`;
    });
    
    const choice = await showCustomPrompt(bankMessage, "1", 'Select Bank Account');
    if (choice === null) return;
    
    const idx = parseInt(choice) - 1;
    if (isNaN(idx) || idx < 0 || idx >= financeData.bankAccounts.length) {
        alert('Invalid choice.');
        return;
    }
    
    const account = financeData.bankAccounts[idx];
    if (account.balance < amount && account.type !== 'Credit Card') {
        alert('Insufficient balance in selected account.');
        return;
    }
    
    // Deduct account balance
    if (account.type === 'Credit Card') {
        account.balance += amount;
    } else {
        account.balance -= amount;
    }
    
    // Add amount to goal progress
    goal.current += amount;
    goal.percent = Math.min(100, Math.round((goal.current / goal.target) * 100));
    
    // Log as contribution transaction in expenses
    const todayStr = new Date().toISOString().split('T')[0];
    const expenseItem = {
        id: 'exp-' + Date.now(),
        amount: amount,
        category: 'Other',
        title: 'Goal Contribution: ' + goal.title,
        date: todayStr,
        bankId: account.id
    };
    
    financeData.expenses.push(expenseItem);
    saveState();
    
    // Re-render components
    updateMetrics();
    renderExpenseList();
    renderBankAccounts();
    renderCategorySummaries();
    
    alert(`Successfully contributed ${formatCurrency(amount)} from ${account.name} to ${goal.title}!`);
};

// Delete a goal (global)
window.deleteFinancialGoal = function(id) {
    if (!confirm('Are you sure you want to delete this financial goal?')) return;
    financeData.goals = financeData.goals.filter(g => g.id !== id);
    saveState();
    updateMetrics();
};

// Add financial goal flow (global)
window.addFinancialGoal = async function() {
    const title = await showCustomPrompt('Enter Goal Name (e.g. Buy Bike, Wedding):', '', 'Add Goal Name');
    if (!title) return;
    
    const targetInput = await showCustomPrompt('Enter Target Amount (₹):', '', 'Add Goal Target Amount');
    if (!targetInput) return;
    const target = parseFloat(targetInput.replace(/[^0-9.-]+/g, ''));
    if (isNaN(target) || target <= 0) {
        alert('Invalid target amount.');
        return;
    }
    
    const startInput = await showCustomPrompt('Enter Initial Contribution (₹):', "0", 'Add Goal Initial Fund');
    if (startInput === null) return;
    const current = parseFloat(startInput.replace(/[^0-9.-]+/g, ''));
    if (isNaN(current) || current < 0) {
        alert('Invalid contribution amount.');
        return;
    }
    
    // Select Icon
    const icons = {
        '1': 'fa-car',
        '2': 'fa-umbrella-beach',
        '3': 'fa-shield-halved',
        '4': 'fa-house-chimney',
        '5': 'fa-laptop',
        '6': 'fa-graduation-cap',
        '7': 'fa-heart'
    };
    
    const iconChoice = await showCustomPrompt('Select Goal Icon:\n1. Car 🚗\n2. Vacation 🏖️\n3. Shield 🛡️\n4. House 🏠\n5. Tech/Laptop 💻\n6. Education 🎓\n7. Heart 💖', "1", 'Select Goal Icon (1-7)');
    const icon = icons[iconChoice] || 'fa-star';
    
    const newGoal = {
        id: 'goal-' + Date.now(),
        title,
        target,
        current,
        percent: Math.min(100, Math.round((current / target) * 100)),
        icon
    };
    
    if (!financeData.goals) {
        financeData.goals = [];
    }
    financeData.goals.push(newGoal);
    saveState();
    updateMetrics();
};

// SIP Tracker rendering
function renderSips() {
    const container = document.getElementById('sipTrackerList');
    if (!container) return;
    
    if (!financeData.sips || financeData.sips.length === 0) {
        container.innerHTML = '<div style="color: var(--text-secondary); text-align: center; padding: 1rem; font-size: 0.85rem;">No active SIPs configured.</div>';
        return;
    }
    
    container.innerHTML = financeData.sips.map(sip => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.65rem 0.85rem; background: rgba(15,23,42,0.02); border: 1px solid var(--border-color); border-radius: var(--radius-md); margin-bottom: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i class="fa-solid fa-arrows-spin" style="color: var(--color-income); font-size: 1.1rem;"></i>
                <div>
                    <div style="font-weight: 700; color: var(--text-primary); font-size: 0.9rem;">${sip.title}</div>
                    <span style="font-size: 0.75rem; color: var(--text-secondary); font-weight: 600;">Next Date: ${sip.nextDate}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-weight: 800; color: var(--text-primary); font-size: 0.9rem; margin-right: 0.25rem;">${formatCurrency(sip.amount)}/mo</span>
                <button class="bank-card-btn" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; margin-top: 0;" onclick="paySip('${sip.id}')">Pay</button>
                <button class="delete-btn" style="color: var(--text-muted); font-size: 0.8rem; border: none; background: transparent; cursor: pointer;" onclick="deleteSip('${sip.id}')" title="Remove SIP"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>
    `).join('');
}

// Pay SIP and convert to investment asset (global)
window.paySip = async function(id) {
    const sip = financeData.sips.find(s => s.id === id);
    if (!sip) return;
    
    if (financeData.bankAccounts.length === 0) {
        alert('Please link a bank account first.');
        return;
    }
    
    let message = `Pay SIP: ${sip.title} - ${formatCurrency(sip.amount)}\n\nSelect funding bank account:`;
    financeData.bankAccounts.forEach((acc, index) => {
        message += `\n${index + 1}. ${acc.name} (${formatCurrency(acc.balance)})`;
    });
    
    const choice = await showCustomPrompt(message, "1", 'Select SIP Funding Account');
    if (choice === null) return;
    
    const idx = parseInt(choice) - 1;
    if (isNaN(idx) || idx < 0 || idx >= financeData.bankAccounts.length) {
        alert('Invalid choice.');
        return;
    }
    
    const account = financeData.bankAccounts[idx];
    if (account.balance < sip.amount && account.type !== 'Credit Card') {
        alert('Insufficient balance in selected account.');
        return;
    }
    
    // Deduct account balance
    if (account.type === 'Credit Card') {
        account.balance += sip.amount;
    } else {
        account.balance -= sip.amount;
    }
    
    // Add to investments list
    const todayStr = new Date().toISOString().split('T')[0];
    const newInvestment = {
        id: 'inv-' + Date.now(),
        title: sip.title + ' (SIP)',
        type: sip.title.toLowerCase().includes('ppf') ? 'FD' : 'Mutual Fund',
        amount: sip.amount,
        returns: 12.0, // default return projection
        date: todayStr
    };
    financeData.investments.push(newInvestment);
    
    // Update next date (advance by 1 month or set placeholder)
    let nextParts = sip.nextDate.split(' ');
    if (nextParts.length >= 2) {
        let day = nextParts[0];
        let month = nextParts[1];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthsFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        let monthIdx = months.indexOf(month);
        if (monthIdx === -1) monthIdx = monthsFull.indexOf(month);
        if (monthIdx === -1) monthIdx = months.findIndex(m => month.startsWith(m));
        
        if (monthIdx !== -1) {
            let nextMonthIdx = (monthIdx + 1) % 12;
            let nextMonth = months[nextMonthIdx];
            sip.nextDate = `${day} ${nextMonth}`;
        } else {
            sip.nextDate = "Next Month";
        }
    } else {
        sip.nextDate = "Next Month";
    }
    
    saveState();
    
    // Re-render
    updateMetrics();
    renderInvestments();
    renderBankAccounts();
    
    alert(`Successfully processed SIP investment for ${sip.title}!`);
};

// Add new SIP (global)
window.addSipTracker = async function() {
    const title = await showCustomPrompt('Enter Fund / SIP Name (e.g. Axis Bluechip, PPF):', '', 'Add SIP Name');
    if (!title) return;
    
    const amtInput = await showCustomPrompt('Enter Monthly Contribution (₹):', '', 'Add SIP Amount');
    if (!amtInput) return;
    const amount = parseFloat(amtInput.replace(/[^0-9.-]+/g, ''));
    if (isNaN(amount) || amount <= 0) {
        alert('Invalid amount.');
        return;
    }
    
    const nextDate = await showCustomPrompt('Enter Next Payment Day (e.g. "5 July" or "10th"):', "5 July", 'Add SIP Payment Day');
    if (!nextDate) return;
    
    const newSip = {
        id: 'sip-' + Date.now(),
        title,
        amount,
        nextDate
    };
    
    if (!financeData.sips) {
        financeData.sips = [];
    }
    financeData.sips.push(newSip);
    saveState();
    updateMetrics();
};

// Delete SIP (global)
window.deleteSip = function(id) {
    if (!confirm('Are you sure you want to remove this SIP tracker?')) return;
    financeData.sips = financeData.sips.filter(s => s.id !== id);
    saveState();
    updateMetrics();
};

// EMI Tracker rendering
function renderEmis() {
    const container = document.getElementById('emiTrackerList');
    if (!container) return;
    
    if (!financeData.emis || financeData.emis.length === 0) {
        container.innerHTML = '<div style="color: var(--text-secondary); text-align: center; padding: 1rem; font-size: 0.85rem;">No active EMIs configured.</div>';
        return;
    }
    
    container.innerHTML = financeData.emis.map(emi => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.65rem 0.85rem; background: rgba(15,23,42,0.02); border: 1px solid var(--border-color); border-radius: var(--radius-md); margin-bottom: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i class="fa-solid fa-receipt" style="color: var(--color-expense); font-size: 1.1rem;"></i>
                <div>
                    <div style="font-weight: 700; color: var(--text-primary); font-size: 0.9rem;">${emi.title}</div>
                    <span style="font-size: 0.75rem; color: #f43f5e; font-weight: 700;">Remaining: ${emi.remainingMonths} Months</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-weight: 800; color: var(--text-primary); font-size: 0.9rem; margin-right: 0.25rem;">${formatCurrency(emi.amount)}/mo</span>
                <button class="bank-card-btn" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; margin-top: 0;" onclick="payEmi('${emi.id}')">Pay</button>
                <button class="delete-btn" style="color: var(--text-muted); font-size: 0.8rem; border: none; background: transparent; cursor: pointer;" onclick="deleteEmi('${emi.id}')" title="Remove EMI"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>
    `).join('');
}

// Pay EMI and log as expense (global)
window.payEmi = async function(id) {
    const emi = financeData.emis.find(e => e.id === id);
    if (!emi) return;
    
    if (financeData.bankAccounts.length === 0) {
        alert('Please link a bank account first.');
        return;
    }
    
    let message = `Pay EMI installment: ${emi.title} - ${formatCurrency(emi.amount)}\n\nSelect bank account to pay from:`;
    financeData.bankAccounts.forEach((acc, index) => {
        message += `\n${index + 1}. ${acc.name} (${formatCurrency(acc.balance)})`;
    });
    
    const choice = await showCustomPrompt(message, "1", 'Select EMI Payment Account');
    if (choice === null) return;
    
    const idx = parseInt(choice) - 1;
    if (isNaN(idx) || idx < 0 || idx >= financeData.bankAccounts.length) {
        alert('Invalid choice.');
        return;
    }
    
    const account = financeData.bankAccounts[idx];
    if (account.balance < emi.amount && account.type !== 'Credit Card') {
        alert('Insufficient balance in selected account.');
        return;
    }
    
    // Deduct account balance
    if (account.type === 'Credit Card') {
        account.balance += emi.amount;
    } else {
        account.balance -= emi.amount;
    }
    
    // Log as expense
    const todayStr = new Date().toISOString().split('T')[0];
    const expenseItem = {
        id: 'exp-' + Date.now(),
        amount: emi.amount,
        category: 'Bills',
        title: 'EMI Paid: ' + emi.title,
        date: todayStr,
        bankId: account.id
    };
    financeData.expenses.push(expenseItem);
    
    // Decrement months remaining
    emi.remainingMonths = Math.max(0, emi.remainingMonths - 1);
    
    // If EMI is fully paid off, remove it
    if (emi.remainingMonths === 0) {
        alert(`Congratulations! Your ${emi.title} is now fully paid off!`);
        financeData.emis = financeData.emis.filter(e => e.id !== id);
    }
    
    saveState();
    
    // Re-render
    updateMetrics();
    renderExpenseList();
    renderBankAccounts();
    renderCategorySummaries();
    
    alert(`Successfully paid monthly installment for ${emi.title}!`);
};

// Add new EMI (global)
window.addEmiTracker = async function() {
    const title = await showCustomPrompt('Enter Loan / Asset Name (e.g. Home Loan, Car Loan):', '', 'Add EMI Name');
    if (!title) return;
    
    const amtInput = await showCustomPrompt('Enter Monthly Installment (₹):', '', 'Add EMI Installment Amount');
    if (!amtInput) return;
    const amount = parseFloat(amtInput.replace(/[^0-9.-]+/g, ''));
    if (isNaN(amount) || amount <= 0) {
        alert('Invalid amount.');
        return;
    }
    
    const durationInput = await showCustomPrompt('Enter Remaining Duration (Months):', "43", 'Add EMI Remaining Duration');
    if (!durationInput) return;
    const remainingMonths = parseInt(durationInput);
    if (isNaN(remainingMonths) || remainingMonths <= 0) {
        alert('Invalid duration.');
        return;
    }
    
    const newEmi = {
        id: 'emi-' + Date.now(),
        title,
        amount,
        remainingMonths
    };
    
    if (!financeData.emis) {
        financeData.emis = [];
    }
    financeData.emis.push(newEmi);
    saveState();
    updateMetrics();
};

// Delete EMI (global)
window.deleteEmi = function(id) {
    if (!confirm('Are you sure you want to remove this EMI tracker?')) return;
    financeData.emis = financeData.emis.filter(e => e.id !== id);
    saveState();
    updateMetrics();
};

// Setup search functionalities
function setupSearch() {
    const searchIncome = document.getElementById('searchIncome');
    const searchExpense = document.getElementById('searchExpense');
    
    if (searchIncome) {
        searchIncome.addEventListener('input', (e) => {
            renderIncomeList(e.target.value);
        });
    }
    
    if (searchExpense) {
        searchExpense.addEventListener('input', (e) => {
            renderExpenseList(e.target.value);
        });
    }
}

// Initialize application on DOM load
document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
    updateMetrics();
    renderIncomeList();
    renderExpenseList();
    renderCategorySummaries();
    renderInvestments();
    renderBankAccounts();
    setupFormSubmissions();
    setupEditInvestModalListeners();
    setupOtherDropdowns();
    updateBudgetTracker();
    setupBudgetEdit();
    setupTrendFilters();
    setupLedgerFilters();
    setupSearch();
    applyTheme();
    renderAiInsights();
    
    // Initial chart load
    setTimeout(() => {
        updateChart();
        updateTrendChart();
        updateNetWorthTrendChart();
        renderCalendar();
        renderTaxSection();
        renderInvestPerformance();
    }, 100);
});

// Investment Performance
function renderInvestPerformance() {
    const perf = financeData.investPerformance || { todayGain: 1200, monthGain: 12400, yearGain: 108000, overallReturn: 18 };
    
    const todayEl = document.getElementById('perfTodayGain');
    const monthEl = document.getElementById('perfMonthGain');
    const yearEl = document.getElementById('perfYearGain');
    const overallEl = document.getElementById('perfOverallReturn');
    
    if (todayEl) {
        todayEl.textContent = (perf.todayGain >= 0 ? '+' : '') + formatCurrency(perf.todayGain);
        todayEl.style.color = perf.todayGain >= 0 ? 'var(--color-income)' : 'var(--color-expense)';
    }
    if (monthEl) {
        monthEl.textContent = (perf.monthGain >= 0 ? '+' : '') + formatCurrency(perf.monthGain);
        monthEl.style.color = perf.monthGain >= 0 ? 'var(--color-income)' : 'var(--color-expense)';
    }
    if (yearEl) {
        yearEl.textContent = (perf.yearGain >= 0 ? '+' : '') + formatCurrency(perf.yearGain);
        yearEl.style.color = perf.yearGain >= 0 ? 'var(--color-income)' : 'var(--color-expense)';
    }
    if (overallEl) {
        overallEl.textContent = (perf.overallReturn >= 0 ? '+' : '') + perf.overallReturn + '%';
        overallEl.style.background = perf.overallReturn >= 0 ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)';
        overallEl.style.color = perf.overallReturn >= 0 ? 'var(--color-income)' : 'var(--color-expense)';
    }
}

window.editPerformanceMetric = async function(key, label) {
    const perf = financeData.investPerformance || { todayGain: 0, monthGain: 0, yearGain: 0, overallReturn: 0 };
    const currentVal = perf[key];
    const input = await showCustomPrompt(`Set value for ${label}:`, currentVal, `Edit ${label}`);
    if (input === null) return;
    
    const parsed = parseFloat(input.replace(/[^0-9.-]+/g, ''));
    if (isNaN(parsed)) {
        alert('Please enter a valid number.');
        return;
    }
    
    perf[key] = parsed;
    financeData.investPerformance = perf;
    saveState();
    renderInvestPerformance();
    showToast(`Updated ${label}!`);
};

// Monthly Budget Calendar View
function renderCalendar() {
    const gridContainer = document.getElementById('calendarGridMonth');
    const listContainer = document.getElementById('calendarEventsList');
    if (!gridContainer || !listContainer) return;
    
    // 1. Draw visual month grid (July 2026)
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    let gridHtml = daysOfWeek.map(day => `<div style="text-align: center; font-weight: 700; font-size: 0.75rem; color: var(--text-muted); padding: 0.25rem 0;">${day}</div>`).join('');
    
    // July 2026 starts on Wednesday (offset = 3 empty slots)
    const startOffset = 3;
    const totalDays = 31;
    
    for (let i = 0; i < startOffset; i++) {
        gridHtml += `<div style="padding: 0.35rem 0;"></div>`;
    }
    
    const events = financeData.calendarEvents || [];
    for (let day = 1; day <= totalDays; day++) {
        const dayEvents = events.filter(e => e.day === day && e.month === 'Jul');
        const hasEvent = dayEvents.length > 0;
        
        let dotStyle = '';
        let borderStyle = '';
        let backgroundStyle = '';
        let titleAttr = '';
        
        if (hasEvent) {
            const type = dayEvents[0].type;
            let color = 'var(--color-expense)';
            if (type === 'income') color = 'var(--color-income)';
            if (type === 'investment') color = '#a855f7';
            
            dotStyle = `background: ${color}; width: 5px; height: 5px; border-radius: 50%; display: inline-block; margin-top: 1px;`;
            backgroundStyle = `background: rgba(99,102,241,0.06); font-weight: 800;`;
            borderStyle = `border: 1px solid rgba(99,102,241,0.2);`;
            titleAttr = `title="${dayEvents.map(e => `${e.title}: ${formatCurrency(e.amount)}`).join('\n')}"`;
        }
        
        gridHtml += `
            <div ${titleAttr} style="text-align: center; font-size: 0.8rem; font-weight: 600; padding: 0.35rem 0; border-radius: var(--radius-sm); display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; ${backgroundStyle} ${borderStyle}">
                <span>${day}</span>
                ${hasEvent ? `<span style="${dotStyle}"></span>` : ''}
            </div>
        `;
    }
    gridContainer.innerHTML = gridHtml;
    
    // 2. Draw events list below/beside calendar
    const sortedEvents = [...events].sort((a, b) => a.day - b.day);
    listContainer.innerHTML = sortedEvents.map(e => {
        let icon = 'fa-arrow-trend-down';
        let color = 'var(--color-expense)';
        let bg = 'rgba(244,63,94,0.08)';
        
        if (e.type === 'income') {
            icon = 'fa-arrow-trend-up';
            color = 'var(--color-income)';
            bg = 'rgba(16,185,129,0.08)';
        } else if (e.type === 'investment') {
            icon = 'fa-rocket';
            color = '#a855f7';
            bg = 'rgba(168,85,247,0.08)';
        }
        
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(15,23,42,0.02); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0.6rem 0.85rem; box-sizing: border-box;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="width: 2.25rem; height: 2.25rem; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; background: ${bg}; color: ${color}; font-weight: 800; font-size: 0.8rem; flex-shrink: 0;">
                        ${e.day}
                    </div>
                    <div>
                        <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">${e.title}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">${e.day} ${e.month}</div>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-weight: 800; font-size: 0.95rem; color: ${e.type === 'income' ? 'var(--color-income)' : 'var(--text-primary)'};">${e.type === 'income' ? '+' : '-'}${formatCurrency(e.amount)}</span>
                    <button onclick="deleteCalendarEvent('${e.id}')" class="asset-edit-btn" title="Delete Event" style="color: var(--color-expense); padding: 0.15rem; background: transparent; font-size: 0.8rem; height: auto;">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

window.addCalendarEvent = async function() {
    const title = await showCustomPrompt('Enter Event Title (e.g. Salary, Rent, Bill payment):', '', 'Add Event Title');
    if (!title) return;
    
    const dayInput = await showCustomPrompt('Enter Day of the Month (1-31):', '', 'Add Event Day');
    if (!dayInput) return;
    const day = parseInt(dayInput);
    if (isNaN(day) || day < 1 || day > 31) {
        alert('Invalid day input.');
        return;
    }
    
    const amountInput = await showCustomPrompt('Enter Amount (₹):', '', 'Add Event Amount');
    if (!amountInput) return;
    const amount = parseFloat(amountInput.replace(/[^0-9.-]+/g, ''));
    if (isNaN(amount) || amount <= 0) {
        alert('Invalid amount input.');
        return;
    }
    
    const type = await showCustomPrompt('Enter Event Type (income, expense, or investment):', 'expense', 'Add Event Type');
    if (type !== 'income' && type !== 'expense' && type !== 'investment') {
        alert('Type must be "income", "expense", or "investment".');
        return;
    }
    
    const newEvent = {
        id: 'cal-' + Date.now(),
        day,
        month: 'Jul',
        title,
        type,
        amount
    };
    
    if (!financeData.calendarEvents) {
        financeData.calendarEvents = [];
    }
    financeData.calendarEvents.push(newEvent);
    saveState();
    renderCalendar();
    showToast(`Added "${title}" to monthly calendar!`);
};

window.deleteCalendarEvent = function(id) {
    if (!confirm('Are you sure you want to delete this calendar event?')) return;
    financeData.calendarEvents = financeData.calendarEvents.filter(e => e.id !== id);
    saveState();
    renderCalendar();
};

// Tax Planning Section
function renderTaxSection() {
    const tax = financeData.taxSection || { estimatedTax: 85400, investment80c: 150000, taxSaved: 45000, capitalGains: 12000 };
    
    const estEl = document.getElementById('taxEstVal');
    const investEl = document.getElementById('tax80cVal');
    const savedEl = document.getElementById('taxSavedVal');
    const gainsEl = document.getElementById('taxCapGainsVal');
    
    if (estEl) estEl.textContent = formatCurrency(tax.estimatedTax);
    if (investEl) investEl.textContent = formatCurrency(tax.investment80c);
    if (savedEl) savedEl.textContent = formatCurrency(tax.taxSaved);
    if (gainsEl) gainsEl.textContent = formatCurrency(tax.capitalGains);
}

window.editTaxMetric = async function(key, label) {
    const tax = financeData.taxSection || { estimatedTax: 85400, investment80c: 150000, taxSaved: 45000, capitalGains: 12000 };
    const input = await showCustomPrompt(`Enter new value for ${label} (₹):`, tax[key], `Edit ${label}`);
    if (input === null) return;
    
    const parsed = parseFloat(input.replace(/[^0-9.-]+/g, ''));
    if (isNaN(parsed) || parsed < 0) {
        alert('Invalid numeric value.');
        return;
    }
    
    tax[key] = parsed;
    financeData.taxSection = tax;
    saveState();
    renderTaxSection();
    showToast(`Updated ${label}!`);
};

window.downloadTaxReport = function() {
    const tax = financeData.taxSection || { estimatedTax: 85400, investment80c: 150000, taxSaved: 45000, capitalGains: 12000 };
    const content = `
==================================================
           FINANCE DASHBOARD - TAX REPORT
==================================================
Generated on: ${new Date().toLocaleDateString()}

TAX METRICS BREAKDOWN:
--------------------------------------------------
Estimated Tax Liability :  ${formatCurrency(tax.estimatedTax)}
80C Deductible Inv.     :  ${formatCurrency(tax.investment80c)}
Tax Saved (from inv)    :  ${formatCurrency(tax.taxSaved)}
Capital Gains Taxable   :  ${formatCurrency(tax.capitalGains)}
--------------------------------------------------
Net Estimated Payable   :  ${formatCurrency(Math.max(0, tax.estimatedTax - tax.taxSaved))}

Note: This is an automatically generated estimate based 
on active ledger allocations. Consult a tax professional.
==================================================
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tax_report_${new Date().getFullYear()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Tax Report downloaded successfully as text file!');
};

// AI Insights Renderer
function renderAiInsights() {
    const container = document.getElementById('aiInsightsList');
    if (!container) return;
    
    const insights = financeData.aiInsights || [];
    container.innerHTML = insights.map(item => {
        let icon = 'fa-lightbulb';
        let iconClass = 'info';
        if (item.type === 'warning') {
            icon = 'fa-triangle-exclamation';
            iconClass = 'warning';
        } else if (item.type === 'success') {
            icon = 'fa-circle-check';
            iconClass = 'success';
        } else if (item.type === 'magic') {
            icon = 'fa-wand-magic-sparkles';
            iconClass = 'magic';
        }
        
        return `
            <div class="ai-insight-item">
                <i class="fa-solid ${icon} ai-insight-icon ${iconClass}"></i>
                <span>${item.text}</span>
            </div>
        `;
    }).join('');
}

// Day/Night Theme toggler
window.toggleTheme = function() {
    const currentTheme = financeData.theme || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    financeData.theme = nextTheme;
    saveState();
    applyTheme();
    showToast(`Switched to ${nextTheme === 'dark' ? 'Night' : 'Day'} Mode!`);
};

function applyTheme() {
    const theme = financeData.theme || 'light';
    const body = document.body;
    const btn = document.getElementById('themeToggleBtn');
    
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        if (btn) {
            btn.innerHTML = `<i class="fa-solid fa-sun" style="color: #ca8a04;"></i> <span id="themeToggleLabel" style="color: #ca8a04;">Day Mode</span>`;
            btn.style.borderColor = 'rgba(202, 138, 4, 0.3)';
            btn.style.background = 'rgba(202, 138, 4, 0.08)';
        }
    } else {
        body.classList.remove('dark-theme');
        if (btn) {
            btn.innerHTML = `<i class="fa-solid fa-moon"></i> <span id="themeToggleLabel">Night Mode</span>`;
            btn.style.borderColor = 'rgba(15,23,42,0.06)';
            btn.style.background = 'rgba(99, 102, 241, 0.08)';
        }
    }
    
    // Redraw charts with new contrast text colors
    setTimeout(() => {
        updateChart();
        updateNetWorthTrendChart();
        updateInvestAllocationChart();
    }, 50);
}

// AI Chatbot Sidebar Panel Functions
window.toggleAiChatbot = function() {
    const sidebar = document.getElementById('aiChatbotSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (!sidebar || !overlay) return;
    
    const isOpen = sidebar.classList.contains('open');
    if (isOpen) {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    } else {
        overlay.style.display = 'block';
        // Force reflow
        overlay.offsetHeight;
        sidebar.classList.add('open');
        overlay.classList.add('open');
        renderChatbotInsights();
    }
};

function renderChatbotInsights() {
    const container = document.getElementById('chatbotMessages');
    if (!container) return;
    
    const insights = financeData.aiInsights || [];
    const insightsHtml = insights.map(item => {
        let emoji = '💡';
        if (item.type === 'warning') emoji = '⚠️';
        if (item.type === 'success') emoji = '✅';
        if (item.type === 'magic') emoji = '✨';
        return `<div style="margin: 0.5rem 0; line-height: 1.4; display: flex; align-items: flex-start; gap: 0.5rem;"><span>${emoji}</span><span>${item.text}</span></div>`;
    }).join('');
    
    container.innerHTML = `
        <div class="chat-message bot">
            Hi! I'm your FinancePro AI Assistant. Here are my current insights on your financial health:
        </div>
        <div class="chat-message bot" style="width: 90%; max-width: 90%; background: rgba(168, 85, 247, 0.04); border-color: rgba(168, 85, 247, 0.15);">
            ${insightsHtml}
        </div>
    `;
    container.scrollTop = container.scrollHeight;
}

window.sendChatbotMessage = function() {
    const input = document.getElementById('chatbotInputText');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    
    input.value = '';
    
    const container = document.getElementById('chatbotMessages');
    if (!container) return;
    
    // 1. User message bubble
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.textContent = text;
    container.appendChild(userMsg);
    container.scrollTop = container.scrollHeight;
    
    // 2. Mock AI calculations response
    setTimeout(() => {
        const reply = document.createElement('div');
        reply.className = 'chat-message bot';
        
        const query = text.toLowerCase();
        let responseText = "I see. Let me help you analyze your portfolio. To optimize savings, keep your expenses within limit and maintain a robust asset allocation tracker under the Reports tab!";
        
        if (query.includes('food') || query.includes('spend') || query.includes('expense')) {
            const foodExpenses = financeData.expenses
                .filter(e => e.category.toLowerCase() === 'food')
                .reduce((sum, e) => sum + e.amount, 0);
            responseText = `Your total registered food expenses this month is ${formatCurrency(foodExpenses)}. AI Insight: You spent 22% more on Food compared to last month. Consider setting a daily budget limit in the Budget tab!`;
        } else if (query.includes('savings') || query.includes('saved')) {
            const bankVal = financeData.bankAccounts
                .filter(acc => acc.type !== 'Credit Card')
                .reduce((sum, acc) => sum + acc.balance, 0);
            responseText = `Your total savings balance across all accounts is ${formatCurrency(bankVal)}. You saved ₹18,000 more than last month. Great job keeping your reserves strong!`;
        } else if (query.includes('emergency') || query.includes('fund')) {
            responseText = "Your emergency fund is currently sufficient for 6 months of basic living expenses. It is safely placed in high-yield savings accounts.";
        } else if (query.includes('portfolio') || query.includes('stock') || query.includes('invest')) {
            responseText = "Your portfolio is highly concentrated in equities (approx 58% in Mutual Funds and 42% in Stocks). Consider investing ₹8,000 more to reach your yearly goal and diversify in Gold or FDs.";
        } else if (query.includes('tax') || query.includes('estimat')) {
            responseText = `Based on your active records, your estimated tax is ${formatCurrency(financeData.taxSection.estimatedTax)}, and you saved ${formatCurrency(financeData.taxSection.taxSaved)} through 80C deductions.`;
        }
        
        reply.textContent = responseText;
        container.appendChild(reply);
        container.scrollTop = container.scrollHeight;
    }, 600);
};


// Bank Account statement/history viewer
window.showBankAccountHistory = function(bankId) {
    const acc = financeData.bankAccounts.find(a => a.id === bankId);
    if (!acc) return;
    
    document.getElementById('bankHistoryTitle').textContent = `${acc.name} History`;
    document.getElementById('bankHistoryMeta').innerHTML = `${acc.bank} • ****-****-${acc.number}<br><strong>Current Balance:</strong> ${formatCurrency(acc.balance)}`;
    
    // Find all income and expenses linked to this bankId
    // Fallback: inc-2 (Freelance, bank-1), inc-1 (Salary, bank-2)
    // Fallback: exp-1, exp-2, exp-3 (bank-1), exp-4 (bank-2)
    const deposits = financeData.income.filter(item => item.bankId === bankId || (bankId === 'bank-1' && item.id === 'inc-2') || (bankId === 'bank-2' && item.id === 'inc-1'));
    const withdrawals = financeData.expenses.filter(item => item.bankId === bankId || (bankId === 'bank-1' && ['exp-1', 'exp-2', 'exp-3'].includes(item.id)) || (bankId === 'bank-2' && item.id === 'exp-4'));
    
    const allTx = [
        ...deposits.map(d => ({ ...d, isIncome: true })),
        ...withdrawals.map(w => ({ ...w, isIncome: false }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date) || b.id.localeCompare(a.id));
    
    const contentContainer = document.getElementById('bankHistoryContent');
    if (allTx.length === 0) {
        contentContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
                <i class="fa-solid fa-receipt" style="font-size: 2.5rem; margin-bottom: 0.75rem; opacity: 0.5;"></i>
                <p>No transaction history found for this account.</p>
            </div>
        `;
    } else {
        contentContainer.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                ${allTx.map(item => {
                    const isIncome = item.isIncome;
                    return `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background: rgba(15, 23, 42, 0.01); border: 1px solid var(--border-color); border-radius: var(--radius-lg); font-size: 0.9rem;">
                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                <div style="width: 2rem; height: 2rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: ${isIncome ? 'rgba(16,185,129,0.08)' : 'rgba(244,63,94,0.08)'}; color: ${isIncome ? 'var(--color-income)' : 'var(--color-expense)'};">
                                    <i class="fa-solid ${isIncome ? 'fa-arrow-down' : 'fa-arrow-up'}"></i>
                                </div>
                                <div>
                                    <div style="font-weight: 700; color: var(--text-primary);">${item.title}</div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">${formatDate(item.date)}</div>
                                </div>
                            </div>
                            <div style="font-weight: 800; color: ${isIncome ? 'var(--color-income)' : 'var(--color-expense)'};">
                                ${isIncome ? '+' : '-'}${formatCurrency(item.amount)}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
    
    document.getElementById('bankHistoryModalOverlay').classList.add('open');
};

window.closeBankHistory = function() {
    document.getElementById('bankHistoryModalOverlay').classList.remove('open');
};
