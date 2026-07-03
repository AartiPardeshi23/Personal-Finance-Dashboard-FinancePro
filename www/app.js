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
        { id: 'goal-4', title: 'House', target: 2500000, current: 500000, percent: 20, icon: 'fa-house' }
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
    theme: 'light',
    sips: [
        { id: 'sip-1', title: 'HDFC Equity SIP', amount: 5000, nextDate: '5 July' },
        { id: 'sip-2', title: 'PPF Deposit', amount: 2000, nextDate: '10 July' }
    ],
    emis: [
        { id: 'emi-1', title: 'Car Loan EMI', amount: 12500, remainingMonths: 18 },
        { id: 'emi-2', title: 'Home Loan EMI', amount: 25000, remainingMonths: 240 }
    ],
    calendarEvents: [
        { id: 'cal-1', day: 1, month: 'Jul', title: 'Salary Credited', type: 'income', amount: 75000 },
        { id: 'cal-2', day: 2, month: 'Jul', title: 'Electricity Bill', type: 'expense', amount: 2100 },
        { id: 'cal-3', day: 5, month: 'Jul', title: 'SIP Investment', type: 'investment', amount: 5000 },
        { id: 'cal-4', day: 10, month: 'Jul', title: 'Car Loan EMI', type: 'expense', amount: 12500 }
    ],
    taxSection: {
        estimatedTax: 85400,
        investment80c: 150000,
        taxSaved: 45000,
        capitalGains: 12000
    }
};

if (!financeData) {
    financeData = defaultData;
    saveState();
} else {
    // Check key additions for robustness
    let stateChanged = false;
    if (!financeData.hasOwnProperty('sips')) { financeData.sips = defaultData.sips; stateChanged = true; }
    if (!financeData.hasOwnProperty('emis')) { financeData.emis = defaultData.emis; stateChanged = true; }
    if (!financeData.hasOwnProperty('calendarEvents')) { financeData.calendarEvents = defaultData.calendarEvents; stateChanged = true; }
    if (!financeData.hasOwnProperty('taxSection')) { financeData.taxSection = defaultData.taxSection; stateChanged = true; }
    if (stateChanged) saveState();
}

// Global Chart instances
let financeChartInstance = null;
let netWorthTrendChartInstance = null;
let investAllocationChartInstance = null;

// Currency Formatter (INR format)
const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(value);
};

// Date Formatter helper
const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

// Save state to localStorage
function saveState() {
    localStorage.setItem('financeData', JSON.stringify(financeData));
}

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
    
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(15px)';
        setTimeout(() => toast.remove(), 300);
    });
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(15px)';
            setTimeout(() => toast.remove(), 300);
        }
    }, 3500);
}

// Custom Modal Prompt Replacement (returns Promise)
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

/* ==========================================================================
   Navigation Tabs Controller
   ========================================================================== */
function setupTabs() {
    const tabButtons = document.querySelectorAll('.bottom-nav .nav-item[data-tab]');
    const tabContents = document.querySelectorAll('.app-content .tab-content');
    
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
            
            // Re-render subtab/charts specific elements
            if (targetTab === 'portfolio') {
                setTimeout(() => {
                    renderSips();
                    renderEmis();
                    renderInvestmentsList();
                    renderInvestPerformance();
                    // Also refresh reports and chatbot if their subtabs are active
                    updateChart();
                    updateNetWorthTrendChart();
                    updateInvestAllocationChart();
                    renderAssetAllocationGrid();
                    renderChatbotInsights();
                }, 100);
            }
            
            if (targetTab === 'income') {
                setTimeout(() => {
                    populateAccountsDropdowns();
                    renderTabIncomeList();
                }, 100);
            }
            
            if (targetTab === 'expenses') {
                setTimeout(() => {
                    populateAccountsDropdowns();
                    renderTabExpenseList();
                }, 100);
            }
            
            if (targetTab === 'budget') {
                setTimeout(() => {
                    renderCalendar();
                    renderTaxSection();
                }, 100);
            }
        });
    });
}

// Global hook to swap bottom nav tabs
window.switchTab = function(tabId) {
    const btn = document.querySelector(`.bottom-nav .nav-item[data-tab="${tabId}"]`);
    if (btn) {
        btn.click();
    }
};

// Portfolio Sub-tabs switcher (Assets, Reports, AI Assistant)
window.switchPortfolioSubTab = function(subTabId) {
    const buttons = document.querySelectorAll('.insights-tab-bar .insights-tab-btn');
    const sections = document.querySelectorAll('.portfolio-subcontent');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    sections.forEach(sec => sec.classList.remove('active'));
    
    const activeSec = document.getElementById(subTabId);
    if (activeSec) {
        activeSec.classList.add('active');
    }
    
    // Highlight correct button
    buttons.forEach(btn => {
        if (subTabId === 'portfolio-assets-subtab' && btn.textContent.includes('Assets')) {
            btn.classList.add('active');
        } else if (subTabId === 'portfolio-reports-subtab' && btn.textContent.includes('Reports')) {
            btn.classList.add('active');
        } else if (subTabId === 'portfolio-ai-subtab' && btn.textContent.includes('Assistant')) {
            btn.classList.add('active');
        }
    });
    
    // Handle specific renders
    if (subTabId === 'portfolio-reports-subtab') {
        setTimeout(() => {
            updateChart();
            updateNetWorthTrendChart();
            updateInvestAllocationChart();
            renderAssetAllocationGrid();
        }, 50);
    } else if (subTabId === 'portfolio-ai-subtab') {
        setTimeout(() => {
            renderChatbotInsights();
        }, 50);
    } else if (subTabId === 'portfolio-assets-subtab') {
        setTimeout(() => {
            renderSips();
            renderEmis();
            renderInvestmentsList();
            renderInvestPerformance();
        }, 50);
    }
};

/* ==========================================================================
   Slide-up Sheets (Drawers) Controller
   ========================================================================== */
window.openBottomSheet = function() {
    // Populate form accounts dropdowns before open
    populateAccountsDropdowns();
    
    // Reset forms and tabs
    document.getElementById('addIncomeForm').reset();
    document.getElementById('logExpenseForm').reset();
    document.getElementById('newInvestmentForm').reset();
    switchSheetTab('income');
    
    const sheet = document.getElementById('transactionBottomSheet');
    sheet.classList.add('open');
};

window.closeBottomSheet = function() {
    const sheet = document.getElementById('transactionBottomSheet');
    sheet.classList.remove('open');
};

window.switchSheetTab = function(type) {
    const tabs = document.querySelectorAll('.sheet-tab');
    const forms = document.querySelectorAll('.sheet-form');
    
    tabs.forEach(t => t.classList.remove('active'));
    forms.forEach(f => f.classList.remove('active'));
    
    if (type === 'income') {
        document.getElementById('sheetTabIncome').classList.add('active');
        document.getElementById('addIncomeForm').classList.add('active');
    } else if (type === 'expense') {
        document.getElementById('sheetTabExpense').classList.add('active');
        document.getElementById('logExpenseForm').classList.add('active');
    } else if (type === 'investment') {
        document.getElementById('sheetTabInvestment').classList.add('active');
        document.getElementById('newInvestmentForm').classList.add('active');
    }
};

// Bank account bottom sheet controllers
window.openAddBankModal = function() {
    document.getElementById('addBankForm').reset();
    document.getElementById('bankAccountSheet').classList.add('open');
};

window.closeAddBankModal = function() {
    document.getElementById('bankAccountSheet').classList.remove('open');
};

// Populate accounts dropdown choices dynamically
function populateAccountsDropdowns() {
    const incBankSelect = document.getElementById('incomeBank');
    const expBankSelect = document.getElementById('expenseBank');
    const tabIncBankSelect = document.getElementById('tabIncomeBank');
    const tabExpBankSelect = document.getElementById('tabExpenseBank');
    
    const bankOptionsHtml = financeData.bankAccounts.map(acc => 
        `<option value="${acc.id}">${acc.name} (${acc.bank} - ${formatCurrency(acc.balance)})</option>`
    ).join('');
    
    if (incBankSelect) incBankSelect.innerHTML = bankOptionsHtml;
    if (expBankSelect) expBankSelect.innerHTML = bankOptionsHtml;
    if (tabIncBankSelect) tabIncBankSelect.innerHTML = bankOptionsHtml;
    if (tabExpBankSelect) tabExpBankSelect.innerHTML = bankOptionsHtml;
}

/* ==========================================================================
   Financial Metrics Sync & Render Calculations
   ========================================================================== */
function updateMetrics() {
    // Basic Summing
    const totalIncome = financeData.income.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = financeData.expenses.reduce((sum, item) => sum + item.amount, 0);
    const totalInvestments = financeData.investments.reduce((sum, item) => sum + item.amount, 0);
    const totalSavings = financeData.bankAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    
    // Net worth including manual assets & excluding liabilities (credit cards balance)
    const manualAssetsSum = Object.values(financeData.manualAssets || {}).reduce((sum, val) => sum + val, 0);
    const bankAssetsOnly = financeData.bankAccounts
        .filter(acc => acc.type !== 'Credit Card')
        .reduce((sum, acc) => sum + acc.balance, 0);
    const creditLiabilities = financeData.bankAccounts
        .filter(acc => acc.type === 'Credit Card')
        .reduce((sum, acc) => sum + acc.balance, 0);
        
    const netWorth = bankAssetsOnly + totalInvestments + manualAssetsSum - creditLiabilities;
    
    // Monthly Savings (Current Month logs)
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
    
    // Emergency Fund (Savings type accounts balances)
    const emergencyFund = financeData.bankAccounts
        .filter(acc => acc.type === 'Savings')
        .reduce((sum, acc) => sum + acc.balance, 0);
        
    // Debt Sum
    const debtSum = financeData.bankAccounts
        .filter(acc => acc.type === 'Credit Card')
        .reduce((sum, acc) => sum + acc.balance, 0);
        
    // Investments returns
    const investmentReturns = financeData.investments.reduce((sum, inv) => {
        const pct = parseFloat(inv.returns) || 0;
        return sum + (inv.amount * (pct / 100));
    }, 0);
    
    // Update HTML metrics
    document.getElementById('netWorthHeaderVal').textContent = formatCurrency(netWorth);
    document.getElementById('totalSavingsVal').textContent = formatCurrency(totalSavings);
    
    document.getElementById('totalIncomeVal').textContent = formatCurrency(totalIncome);
    document.getElementById('totalExpensesVal').textContent = formatCurrency(totalExpenses);
    document.getElementById('totalInvestmentsVal').textContent = formatCurrency(totalInvestments);
    document.getElementById('monthlySavingsVal').textContent = formatCurrency(monthlySavings);
    document.getElementById('emergencyFundVal').textContent = formatCurrency(emergencyFund);
    document.getElementById('debtVal').textContent = formatCurrency(debtSum);
    document.getElementById('investReturnsVal').textContent = formatCurrency(investmentReturns);
    
    // Trigger dependent rendering blocks
    renderBankAccounts();
    renderDashboardRecentLedger();
    renderTabIncomeList();
    renderTabExpenseList();
    renderFullLedger();
    updateBudgetTracker();
    updateCashFlowTracker();
    renderUpcomingBills();
    renderFinancialGoals();
    renderSips();
    renderEmis();
    renderInvestmentsList();
    renderInvestPerformance();
    renderCalendar();
    renderTaxSection();
}

/* ==========================================================================
   Render Utilities: Lists, Cards and Elements
   ========================================================================== */

// 1. Bank accounts list
function renderBankAccounts() {
    const list = document.getElementById('bankAccountsList');
    if (!list) return;
    
    if (financeData.bankAccounts.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-university"></i>
                <p>No bank accounts linked.</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = financeData.bankAccounts.map(acc => {
        let typeClass = 'checking';
        if (acc.type === 'Savings') typeClass = 'savings';
        else if (acc.type === 'Salary') typeClass = 'salary';
        else if (acc.type === 'Credit Card') typeClass = 'credit';
        
        return `
            <div class="bank-card ${typeClass}">
                <div class="bank-card-top">
                    <div class="bank-name-group">
                        <span class="bank-card-title">${acc.name}</span>
                        <span class="bank-card-number">${acc.bank} • ****${acc.number}</span>
                    </div>
                    <div class="bank-card-icon-wrapper">
                        <i class="fa-solid ${acc.type === 'Credit Card' ? 'fa-credit-card' : 'fa-building-columns'}"></i>
                    </div>
                </div>
                <div class="bank-card-bal-group">
                    <span class="bank-bal-label">${acc.type === 'Credit Card' ? 'Outstanding' : 'Available Balance'}</span>
                    <span class="bank-card-balance">${formatCurrency(acc.balance)}</span>
                </div>
                <div class="bank-card-actions">
                    <button class="bank-card-btn" onclick="showBankAccountHistory('${acc.id}')">Statement</button>
                    <button class="bank-card-btn" onclick="adjustBankBalance('${acc.id}')">Adjust</button>
                    <button class="bank-card-btn" onclick="deleteBankAccount('${acc.id}')" style="background: rgba(239,68,68,0.06); color: var(--color-expense);"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
    }).join('');
}

// Adjust account balance manually
window.adjustBankBalance = async function(bankId) {
    const acc = financeData.bankAccounts.find(a => a.id === bankId);
    if (!acc) return;
    
    const newValStr = await showCustomPrompt(`Enter new balance for ${acc.name}:`, acc.balance, 'Adjust Account Balance');
    if (newValStr === null || newValStr.trim() === '') return;
    
    const parsed = parseFloat(newValStr.replace(/[^0-9.-]+/g, ''));
    if (isNaN(parsed)) {
        showToast('Please enter a valid amount.', 'error');
        return;
    }
    
    acc.balance = parsed;
    saveState();
    updateMetrics();
    showToast(`Balance for "${acc.name}" adjusted to ${formatCurrency(parsed)}!`, 'success');
};

// Delete account
window.deleteBankAccount = function(bankId) {
    if (!confirm('Are you sure you want to remove this bank account? All transactions will remain but balance totals will exclude it.')) return;
    financeData.bankAccounts = financeData.bankAccounts.filter(a => a.id !== bankId);
    saveState();
    updateMetrics();
    showToast('Bank account removed.', 'success');
};

// 2. Recent activities list on Dashboard
function renderDashboardRecentLedger() {
    const list = document.getElementById('dashboardLedgerList');
    if (!list) return;
    
    const searchInput = document.getElementById('dashboardSearchText');
    const searchText = searchInput ? searchInput.value.trim().toLowerCase() : '';
    
    let combined = [
        ...financeData.income.map(item => ({ ...item, type: 'income' })),
        ...financeData.expenses.map(item => ({ ...item, type: 'expense' }))
    ];
    
    combined.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    let displayList = combined;
    if (searchText) {
        displayList = combined.filter(item => 
            item.title.toLowerCase().includes(searchText) || 
            item.category.toLowerCase().includes(searchText)
        );
    } else {
        displayList = combined.slice(0, 5);
    }
    
    if (displayList.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-receipt"></i>
                <p>No matching transactions found.</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = displayList.map(item => {
        const isInc = item.type === 'income';
        const icon = isInc ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down';
        
        return `
            <div class="list-item-app ${item.type}">
                <div class="item-left">
                    <div class="item-icon-circle">
                        <i class="fa-solid ${icon}"></i>
                    </div>
                    <div class="item-details-app">
                        <h5>${item.title}</h5>
                        <span>${item.category} • ${formatDate(item.date)}</span>
                    </div>
                </div>
                <div class="item-right">
                    <span class="item-amount-app">${isInc ? '+' : '-'}${formatCurrency(item.amount)}</span>
                </div>
            </div>
        `;
    }).join('');
}

// 3. Complete Universal Ledger list on Tab 2
function renderFullLedger() {
    const list = document.getElementById('ledgerList');
    if (!list) return;
    
    const searchText = document.getElementById('ledgerSearchText').value.trim();
    const startDate = document.getElementById('ledgerStartDate').value;
    const endDate = document.getElementById('ledgerEndDate').value;
    const typeFilter = document.getElementById('ledgerType').value;
    
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
    
    if (filtered.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-folder-open"></i>
                <p>No matching transactions found.</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = filtered.map(item => {
        const isInc = item.type === 'income';
        const icon = isInc ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down';
        const deleteFnName = isInc ? 'deleteIncome' : 'deleteExpense';
        
        return `
            <div class="list-item-app ${item.type}">
                <div class="item-left">
                    <div class="item-icon-circle">
                        <i class="fa-solid ${icon}"></i>
                    </div>
                    <div class="item-details-app">
                        <h5>${item.title}</h5>
                        <span>${item.category} • ${formatDate(item.date)}</span>
                    </div>
                </div>
                <div class="item-right">
                    <span class="item-amount-app">${isInc ? '+' : '-'}${formatCurrency(item.amount)}</span>
                    <button class="item-delete-btn" onclick="${deleteFnName}('${item.id}')" title="Delete Log">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Render Income History on Tab
function renderTabIncomeList() {
    const list = document.getElementById('tabIncomeList');
    if (!list) return;
    
    const searchInput = document.getElementById('tabIncomeSearchText');
    const searchText = searchInput ? searchInput.value.trim().toLowerCase() : '';
    
    let filtered = financeData.income;
    if (searchText) {
        filtered = financeData.income.filter(item => 
            item.title.toLowerCase().includes(searchText) || 
            item.category.toLowerCase().includes(searchText)
        );
    }
    
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (filtered.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-folder-open"></i>
                <p>No income logs found.</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = filtered.map(item => `
        <div class="list-item-app income">
            <div class="item-left">
                <div class="item-icon-circle">
                    <i class="fa-solid fa-arrow-trend-up"></i>
                </div>
                <div class="item-details-app">
                    <h5>${item.title}</h5>
                    <span>${item.category} • ${formatDate(item.date)}</span>
                </div>
            </div>
            <div class="item-right">
                <span class="item-amount-app">+${formatCurrency(item.amount)}</span>
                <button class="item-delete-btn" onclick="deleteIncome('${item.id}')" title="Delete Log">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Render Expense History on Tab
function renderTabExpenseList() {
    const list = document.getElementById('tabExpenseList');
    if (!list) return;
    
    const searchInput = document.getElementById('tabExpenseSearchText');
    const searchText = searchInput ? searchInput.value.trim().toLowerCase() : '';
    
    let filtered = financeData.expenses;
    if (searchText) {
        filtered = financeData.expenses.filter(item => 
            item.title.toLowerCase().includes(searchText) || 
            item.category.toLowerCase().includes(searchText)
        );
    }
    
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (filtered.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-folder-open"></i>
                <p>No expense logs found.</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = filtered.map(item => `
        <div class="list-item-app expense">
            <div class="item-left">
                <div class="item-icon-circle">
                    <i class="fa-solid fa-arrow-trend-down"></i>
                </div>
                <div class="item-details-app">
                    <h5>${item.title}</h5>
                    <span>${item.category} • ${formatDate(item.date)}</span>
                </div>
            </div>
            <div class="item-right">
                <span class="item-amount-app">-${formatCurrency(item.amount)}</span>
                <button class="item-delete-btn" onclick="deleteExpense('${item.id}')" title="Delete Log">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Delete Log handlers
window.deleteIncome = function(id) {
    if (!confirm('Are you sure you want to delete this income log?')) return;
    const item = financeData.income.find(i => i.id === id);
    if (item && item.bankId) {
        const acc = financeData.bankAccounts.find(a => a.id === item.bankId);
        if (acc) {
            acc.balance -= item.amount; // reverse income addition
        }
    }
    financeData.income = financeData.income.filter(i => i.id !== id);
    saveState();
    updateMetrics();
    showToast('Income log removed.', 'success');
};

window.deleteExpense = function(id) {
    if (!confirm('Are you sure you want to delete this expense log?')) return;
    const item = financeData.expenses.find(e => e.id === id);
    if (item && item.bankId) {
        const acc = financeData.bankAccounts.find(a => a.id === item.bankId);
        if (acc) {
            if (acc.type === 'Credit Card') {
                acc.balance -= item.amount; // reverse credit expense liability
            } else {
                acc.balance += item.amount; // refund balance
            }
        }
    }
    financeData.expenses = financeData.expenses.filter(e => e.id !== id);
    saveState();
    updateMetrics();
    showToast('Expense log removed.', 'success');
};

// 4. Budgets limit calculations
function updateBudgetTracker() {
    const budgetLimitText = document.getElementById('budgetLimitText');
    const monthlySpentText = document.getElementById('monthlySpentText');
    const budgetPctText = document.getElementById('budgetPctText');
    const budgetProgressBar = document.getElementById('budgetProgressBar');
    const budgetStatusMsg = document.getElementById('budgetStatusMsg');
    
    if (!budgetLimitText || !monthlySpentText) return;
    
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const monthlySpent = financeData.expenses.filter(exp => {
        const expDate = new Date(exp.date);
        return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
    }).reduce((sum, item) => sum + item.amount, 0);
    
    budgetLimitText.textContent = formatCurrency(financeData.monthlyBudget);
    monthlySpentText.textContent = formatCurrency(monthlySpent);
    
    let pct = 0;
    if (financeData.monthlyBudget > 0) {
        pct = Math.round((monthlySpent / financeData.monthlyBudget) * 100);
    }
    
    budgetPctText.textContent = `${pct}%`;
    
    const barPct = Math.min(pct, 100);
    budgetProgressBar.style.width = `${barPct}%`;
    
    // Reset classes
    budgetProgressBar.className = 'progress-bar-fill';
    budgetStatusMsg.className = 'budget-status-msg';
    
    if (pct >= 100) {
        budgetProgressBar.classList.add('danger');
        budgetStatusMsg.classList.add('over');
        budgetStatusMsg.textContent = `Over budget by ${formatCurrency(monthlySpent - financeData.monthlyBudget)}!`;
    } else if (pct >= 80) {
        budgetProgressBar.classList.add('warning');
        budgetStatusMsg.classList.add('warn');
        budgetStatusMsg.textContent = `Warning: Spent ${pct}%. ${formatCurrency(financeData.monthlyBudget - monthlySpent)} remaining.`;
    } else {
        budgetStatusMsg.classList.add('ok');
        budgetStatusMsg.textContent = `Good standing: ${formatCurrency(financeData.monthlyBudget - monthlySpent)} remaining.`;
    }
}

// Cash Flow Meter (Current Month)
function updateCashFlowTracker() {
    const incValEl = document.getElementById('cashflowIncVal');
    const expValEl = document.getElementById('cashflowExpVal');
    const savValEl = document.getElementById('cashflowSavVal');
    
    const incBar = document.getElementById('cashflowIncBar');
    const expBar = document.getElementById('cashflowExpBar');
    const savBar = document.getElementById('cashflowSavBar');
    
    if (!incValEl || !expValEl) return;
    
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
    
    incValEl.textContent = formatCurrency(monthlyIncome);
    expValEl.textContent = formatCurrency(monthlyExpenses);
    savValEl.textContent = formatCurrency(Math.max(0, monthlySavings));
    
    if (monthlyIncome > 0) {
        const expPct = Math.min(100, Math.round((monthlyExpenses / monthlyIncome) * 100));
        const savPct = Math.max(0, Math.min(100, Math.round((monthlySavings / monthlyIncome) * 100)));
        
        incBar.style.width = '100%';
        expBar.style.width = `${expPct}%`;
        savBar.style.width = `${savPct}%`;
    } else {
        incBar.style.width = '0%';
        if (monthlyExpenses > 0) {
            expBar.style.width = '100%';
        } else {
            expBar.style.width = '0%';
        }
        savBar.style.width = '0%';
    }
}

// 5. Monthly Finance Calendar (July 2026)
function renderCalendar() {
    const grid = document.getElementById('calendarDaysGrid');
    if (!grid) return;
    
    // July 2026 starts on Wednesday = index 2 (if M=0, T=1, W=2, T=3, F=4, S=5, S=6)
    // Let's use Monday-first index bounds: Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6
    const startOffset = 2; 
    const totalDays = 31;
    
    let html = '';
    
    // Empty slots before day 1
    for (let i = 0; i < startOffset; i++) {
        html += `<div class="calendar-day empty"></div>`;
    }
    
    const events = financeData.calendarEvents || [];
    for (let d = 1; d <= totalDays; d++) {
        const dayEvents = events.filter(e => e.day === d && e.month === 'Jul');
        const hasEvents = dayEvents.length > 0;
        
        let dotsHtml = '';
        if (hasEvents) {
            dotsHtml = '<div class="calendar-dots">';
            dayEvents.forEach(e => {
                let dotClass = 'expense';
                if (e.type === 'income') dotClass = 'income';
                if (e.type === 'investment') dotClass = 'investment';
                dotsHtml += `<span class="cal-dot ${dotClass}"></span>`;
            });
            dotsHtml += '</div>';
        }
        
        html += `
            <div class="calendar-day ${hasEvents ? 'active-payday' : ''}" onclick="showCalendarDayInfo(${d})">
                <span>${d}</span>
                ${dotsHtml}
            </div>
        `;
    }
    grid.innerHTML = html;
}

// Show/Add calendar events popup
window.showCalendarDayInfo = async function(day) {
    const events = (financeData.calendarEvents || []).filter(e => e.day === day && e.month === 'Jul');
    let message = `July ${day}, 2026 Events:`;
    if (events.length === 0) {
        message += '\nNo logs scheduled.';
    } else {
        events.forEach((e, idx) => {
            message += `\n${idx + 1}. ${e.title} (${e.type.toUpperCase()}) - ${formatCurrency(e.amount)}`;
        });
    }
    
    message += '\n\nDo you want to: \n1. Add new event \n2. Delete an event \n3. Close';
    const choice = await showCustomPrompt(message, "3", `Calendar Day ${day}`);
    if (choice === '1') {
        window.addCalendarEventForDay(day);
    } else if (choice === '2' && events.length > 0) {
        let delMsg = 'Select index to delete (1-' + events.length + '):';
        const delIdxStr = await showCustomPrompt(delMsg, "1", 'Delete Event');
        const delIdx = parseInt(delIdxStr) - 1;
        if (!isNaN(delIdx) && delIdx >= 0 && delIdx < events.length) {
            const evId = events[delIdx].id;
            financeData.calendarEvents = financeData.calendarEvents.filter(e => e.id !== evId);
            saveState();
            renderCalendar();
            showToast('Event removed.', 'success');
        } else {
            showToast('Invalid selection.', 'error');
        }
    }
};

window.addCalendarEventForDay = async function(day) {
    const title = await showCustomPrompt('Enter Event Title:', '', 'Event Name');
    if (!title) return;
    
    const amtStr = await showCustomPrompt('Enter Event Amount (₹):', '', 'Event Amount');
    if (!amtStr) return;
    const amount = parseFloat(amtStr.replace(/[^0-9.-]+/g, ''));
    if (isNaN(amount) || amount <= 0) return;
    
    const type = await showCustomPrompt('Enter Event Type (income, expense, or investment):', 'expense', 'Event Type');
    if (type !== 'income' && type !== 'expense' && type !== 'investment') {
        showToast('Invalid type. Must be income, expense, or investment.', 'error');
        return;
    }
    
    const newEvent = {
        id: 'cal-' + Date.now(),
        day: day,
        month: 'Jul',
        title: title,
        type: type,
        amount: amount
    };
    
    if (!financeData.calendarEvents) financeData.calendarEvents = [];
    financeData.calendarEvents.push(newEvent);
    saveState();
    renderCalendar();
    showToast(`Added "${title}" to July ${day}!`, 'success');
};

// 6. Upcoming Bills Pay checklist rendering
function renderUpcomingBills() {
    const container = document.getElementById('upcomingBillsList');
    if (!container) return;
    
    const totalPending = (financeData.upcomingBills || []).reduce((sum, b) => sum + b.amount, 0);
    const countPending = (financeData.upcomingBills || []).length;
    
    document.getElementById('pendingBillsVal').textContent = formatCurrency(totalPending);
    document.getElementById('pendingBillsCount').textContent = countPending;
    
    if (!financeData.upcomingBills || financeData.upcomingBills.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-square-check" style="color: var(--color-income);"></i>
                <p>All upcoming bills paid!</p>
            </div>
        `;
    } else {
        container.innerHTML = financeData.upcomingBills.map(bill => `
            <div class="bill-item">
                <div class="bill-details">
                    <h5>${bill.title}</h5>
                    <span>Due: ${bill.dueDate}</span>
                </div>
                <div class="bill-action-side">
                    <span class="bill-price">${formatCurrency(bill.amount)}</span>
                    <button class="bill-pay-btn" onclick="payUpcomingBill('${bill.id}')">Pay</button>
                </div>
            </div>
        `).join('');
    }
    
    // Render Paid Bills History
    const historyContainer = document.getElementById('paidBillsHistoryList');
    if (historyContainer) {
        const paidBills = financeData.expenses.filter(exp => exp.category === 'Bills');
        paidBills.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        if (paidBills.length === 0) {
            historyContainer.innerHTML = '<div style="color: var(--text-muted); font-size: 0.75rem; text-align: center; padding: 1rem;">No paid bills history.</div>';
        } else {
            historyContainer.innerHTML = paidBills.slice(0, 5).map(exp => `
                <div class="list-item-app expense" style="padding: 0.65rem 0.85rem;">
                    <div class="item-left">
                        <i class="fa-solid fa-circle-check" style="color: var(--color-income); font-size: 0.95rem;"></i>
                        <div class="item-details-app">
                            <h5 style="text-decoration: line-through; opacity: 0.75;">${exp.title.replace('Paid: ', '')}</h5>
                            <span>Paid on ${formatDate(exp.date)}</span>
                        </div>
                    </div>
                    <span class="item-amount-app" style="color: var(--color-income);">${formatCurrency(exp.amount)}</span>
                </div>
            `).join('');
        }
    }
}

// Pay Upcoming Bill
window.payUpcomingBill = async function(id) {
    const bill = financeData.upcomingBills.find(b => b.id === id);
    if (!bill) return;
    
    if (financeData.bankAccounts.length === 0) {
        showToast('Please link a bank account first.', 'error');
        return;
    }
    
    let message = `Pay Bill: ${bill.title} (${formatCurrency(bill.amount)})\n\nSelect Account Index to pay from:`;
    financeData.bankAccounts.forEach((acc, index) => {
        message += `\n${index + 1}. ${acc.name} (${formatCurrency(acc.balance)})`;
    });
    
    const choice = await showCustomPrompt(message, "1", 'Pay Pending Bill');
    if (choice === null) return;
    
    const idx = parseInt(choice) - 1;
    if (isNaN(idx) || idx < 0 || idx >= financeData.bankAccounts.length) {
        showToast('Invalid selection.', 'error');
        return;
    }
    
    const account = financeData.bankAccounts[idx];
    if (account.balance < bill.amount && account.type !== 'Credit Card') {
        showToast('Insufficient balance in selected account.', 'error');
        return;
    }
    
    // Deduct/Increase outstanding
    if (account.type === 'Credit Card') {
        account.balance += bill.amount;
    } else {
        account.balance -= bill.amount;
    }
    
    // Save to expenses log
    const todayStr = new Date().toISOString().split('T')[0];
    const newExpense = {
        id: 'exp-' + Date.now(),
        amount: bill.amount,
        category: 'Bills',
        title: 'Paid: ' + bill.title,
        date: todayStr,
        bankId: account.id
    };
    financeData.expenses.push(newExpense);
    
    // Remove from upcoming list
    financeData.upcomingBills = financeData.upcomingBills.filter(b => b.id !== id);
    
    saveState();
    updateMetrics();
    showToast(`Paid bill "${bill.title}" successfully!`, 'success');
};

// Add new bill
window.addUpcomingBill = async function() {
    const title = await showCustomPrompt('Enter bill title/description:', '', 'Add Bill');
    if (!title || title.trim() === '') return;
    
    const amtStr = await showCustomPrompt('Enter bill amount (₹):', '', 'Bill Amount');
    if (!amtStr) return;
    const amount = parseFloat(amtStr.replace(/[^0-9.-]+/g, ''));
    if (isNaN(amount) || amount <= 0) {
        showToast('Invalid amount entered.', 'error');
        return;
    }
    
    const dueDate = await showCustomPrompt('Enter due date (e.g. "12 July" or "Tomorrow"):', 'Tomorrow', 'Due Date');
    if (!dueDate) return;
    
    const newBill = {
        id: 'bill-' + Date.now(),
        title,
        dueDate,
        amount
    };
    
    if (!financeData.upcomingBills) financeData.upcomingBills = [];
    financeData.upcomingBills.push(newBill);
    saveState();
    updateMetrics();
    showToast(`Added upcoming bill "${title}"!`, 'success');
};

// 7. Financial Goals tracking
function renderFinancialGoals() {
    const container = document.getElementById('financialGoalsList');
    if (!container) return;
    
    if (!financeData.goals || financeData.goals.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-bullseye"></i>
                <p>No financial goals set.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = financeData.goals.map(goal => {
        const percent = goal.target > 0 ? Math.min(100, Math.round((goal.current / goal.target) * 100)) : 0;
        return `
            <div class="goal-card">
                <div class="goal-card-top">
                    <h5>${goal.title}</h5>
                    <i class="fa-solid ${goal.icon || 'fa-star'}"></i>
                </div>
                <div class="goal-card-middle">
                    <div class="goal-card-amounts">
                        <span>${formatCurrency(goal.current)}</span>
                        <span>${formatCurrency(goal.target)}</span>
                    </div>
                    <div class="goal-bar-track">
                        <div class="goal-bar-fill" style="width: ${percent}%;"></div>
                    </div>
                </div>
                <div class="goal-card-bottom">
                    <span class="goal-pct-lbl">${percent}%</span>
                    <div style="display: flex; gap: 0.35rem; align-items: center;">
                        <button class="goal-contribute-btn" onclick="contributeToGoal('${goal.id}')">Add</button>
                        <button onclick="deleteFinancialGoal('${goal.id}')" style="background:transparent; border:none; color: var(--text-muted); cursor:pointer;"><i class="fa-solid fa-trash-can" style="font-size:0.75rem;"></i></button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

window.contributeToGoal = async function(id) {
    const goal = financeData.goals.find(g => g.id === id);
    if (!goal) return;
    
    if (financeData.bankAccounts.length === 0) {
        showToast('Please link a bank account first.', 'error');
        return;
    }
    
    const remaining = Math.max(0, goal.target - goal.current);
    const amtStr = await showCustomPrompt(`Contribute to "${goal.title}" (Remaining: ${formatCurrency(remaining)}):`, '5000', 'Goal Contribution');
    if (amtStr === null || amtStr.trim() === '') return;
    
    const amount = parseFloat(amtStr.replace(/[^0-9.-]+/g, ''));
    if (isNaN(amount) || amount <= 0) {
        showToast('Invalid contribution amount.', 'error');
        return;
    }
    
    // Choose bank account
    let bankMessage = `Select Bank account to pay from:`;
    financeData.bankAccounts.forEach((acc, index) => {
        bankMessage += `\n${index + 1}. ${acc.name} (${formatCurrency(acc.balance)})`;
    });
    
    const choiceStr = await showCustomPrompt(bankMessage, "1", 'Select Account');
    const idx = parseInt(choiceStr) - 1;
    if (isNaN(idx) || idx < 0 || idx >= financeData.bankAccounts.length) {
        showToast('Invalid selection.', 'error');
        return;
    }
    
    const account = financeData.bankAccounts[idx];
    if (account.balance < amount && account.type !== 'Credit Card') {
        showToast('Insufficient balance in selected account.', 'error');
        return;
    }
    
    // Process balances
    if (account.type === 'Credit Card') {
        account.balance += amount;
    } else {
        account.balance -= amount;
    }
    
    // Log as expense
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
    
    goal.current += amount;
    saveState();
    updateMetrics();
    showToast(`Contributed ${formatCurrency(amount)} to "${goal.title}"!`, 'success');
};

window.deleteFinancialGoal = function(id) {
    if (!confirm('Are you sure you want to remove this financial goal?')) return;
    financeData.goals = financeData.goals.filter(g => g.id !== id);
    saveState();
    updateMetrics();
    showToast('Goal removed.', 'success');
};

window.addFinancialGoal = async function() {
    const title = await showCustomPrompt('Enter Goal Name (e.g. Buy Bike, Wedding):', '', 'Add Goal');
    if (!title || title.trim() === '') return;
    
    const targetStr = await showCustomPrompt('Enter Target Amount (₹):', '', 'Goal Target');
    if (!targetStr) return;
    const target = parseFloat(targetStr.replace(/[^0-9.-]+/g, ''));
    if (isNaN(target) || target <= 0) return;
    
    const icon = await showCustomPrompt('Enter Icon Class (e.g. fa-car, fa-umbrella-beach, fa-house, fa-heart):', 'fa-star', 'Goal Icon');
    
    const newGoal = {
        id: 'goal-' + Date.now(),
        title,
        target,
        current: 0,
        percent: 0,
        icon: icon || 'fa-star'
    };
    
    if (!financeData.goals) financeData.goals = [];
    financeData.goals.push(newGoal);
    saveState();
    updateMetrics();
    showToast(`Created Goal "${title}"!`, 'success');
};

// 8. Portfolio assets rendering
function renderInvestmentsList() {
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
        let typeClass = 'other';
        const type = (inv.type || '').toLowerCase();
        if (type.includes('mutual') || type.includes('sip')) typeClass = 'mutual-fund';
        else if (type.includes('stock') || type.includes('trade')) typeClass = 'stocks';
        else if (type.includes('gold')) typeClass = 'gold';
        else if (type.includes('fd')) typeClass = 'fd';
        else if (type.includes('cash')) typeClass = 'cash';
        else if (type.includes('crypto')) typeClass = 'crypto';
        
        return `
            <div class="asset-bar-card ${typeClass}">
                <div class="asset-main-info">
                    <h5>${inv.title}</h5>
                    <span>${inv.type} • ${formatDate(inv.date)}</span>
                </div>
                <div class="asset-val-pct">
                    <span class="asset-value-lbl">${formatCurrency(inv.amount)}</span>
                    <span class="asset-return-badge">+${inv.returns}%</span>
                    <div class="asset-actions">
                        <button onclick="triggerEditInvestment('${inv.id}')" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button onclick="deleteInvestment('${inv.id}')" title="Delete" style="color:var(--color-expense);"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

window.deleteInvestment = function(id) {
    if (!confirm('Are you sure you want to delete this portfolio asset?')) return;
    financeData.investments = financeData.investments.filter(inv => inv.id !== id);
    saveState();
    updateMetrics();
    showToast('Investment removed.', 'success');
};

// Edit portfolio modals
window.triggerEditInvestment = function(id) {
    const inv = financeData.investments.find(i => i.id === id);
    if (!inv) return;
    
    document.getElementById('editInvestId').value = inv.id;
    document.getElementById('editInvestName').value = inv.title;
    document.getElementById('editInvestType').value = ['Mutual Fund','Stocks','SIP','Trading','Gold','FD','Cash','Crypto'].includes(inv.type) ? inv.type : 'Other';
    document.getElementById('editInvestAmount').value = inv.amount;
    document.getElementById('editInvestReturns').value = inv.returns;
    document.getElementById('editInvestDate').value = inv.date || '';
    
    const customWrapper = document.getElementById('editInvestTypeOtherWrapper');
    if (inv.type !== 'Other' && !['Mutual Fund','Stocks','SIP','Trading','Gold','FD','Cash','Crypto'].includes(inv.type)) {
        document.getElementById('editInvestType').value = 'Other';
        document.getElementById('editInvestTypeOther').value = inv.type;
        if (customWrapper) customWrapper.style.display = 'flex';
    } else {
        if (customWrapper) customWrapper.style.display = 'none';
    }
    
    document.getElementById('editInvestModalOverlay').classList.add('open');
};

// 9. SIP Tracker rendering
function renderSips() {
    const container = document.getElementById('sipTrackerList');
    if (!container) return;
    
    if (!financeData.sips || financeData.sips.length === 0) {
        container.innerHTML = '<div style="color:var(--text-muted); font-size:0.75rem; text-align:center; padding:1rem;">No active SIPs linked.</div>';
        return;
    }
    
    container.innerHTML = financeData.sips.map(sip => `
        <div class="sip-emi-card">
            <div class="se-info">
                <h5>${sip.title}</h5>
                <p>Next Due: ${sip.nextDate}</p>
            </div>
            <div class="se-action-group">
                <span class="se-amount-lbl">${formatCurrency(sip.amount)}/mo</span>
                <button class="se-pay-btn" onclick="paySip('${sip.id}')">Pay</button>
                <button onclick="deleteSip('${sip.id}')" style="background:transparent; border:none; color:var(--text-muted); cursor:pointer;"><i class="fa-solid fa-trash-can" style="font-size:0.8rem;"></i></button>
            </div>
        </div>
    `).join('');
}

window.paySip = async function(id) {
    const sip = financeData.sips.find(s => s.id === id);
    if (!sip) return;
    
    if (financeData.bankAccounts.length === 0) {
        showToast('Please link a bank account first.', 'error');
        return;
    }
    
    let message = `Pay SIP contribution: ${sip.title} (${formatCurrency(sip.amount)})\n\nSelect Account Index to pay from:`;
    financeData.bankAccounts.forEach((acc, index) => {
        message += `\n${index + 1}. ${acc.name} (${formatCurrency(acc.balance)})`;
    });
    
    const choiceStr = await showCustomPrompt(message, "1", 'Process SIP Payment');
    const idx = parseInt(choiceStr) - 1;
    if (isNaN(idx) || idx < 0 || idx >= financeData.bankAccounts.length) {
        showToast('Invalid selection.', 'error');
        return;
    }
    
    const account = financeData.bankAccounts[idx];
    if (account.balance < sip.amount && account.type !== 'Credit Card') {
        showToast('Insufficient balance in selected account.', 'error');
        return;
    }
    
    // Deduct account balance
    if (account.type === 'Credit Card') {
        account.balance += sip.amount;
    } else {
        account.balance -= sip.amount;
    }
    
    // Add to portfolio
    const todayStr = new Date().toISOString().split('T')[0];
    const newInvestment = {
        id: 'inv-' + Date.now(),
        title: sip.title + ' (SIP)',
        type: sip.title.toLowerCase().includes('ppf') ? 'FD' : 'Mutual Fund',
        amount: sip.amount,
        returns: 12.0,
        date: todayStr
    };
    financeData.investments.push(newInvestment);
    
    // Increment month in next date
    let nextParts = sip.nextDate.split(' ');
    if (nextParts.length >= 2) {
        let day = nextParts[0];
        let month = nextParts[1];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let mIdx = months.indexOf(month);
        if (mIdx !== -1) {
            sip.nextDate = `${day} ${months[(mIdx + 1) % 12]}`;
        }
    }
    
    saveState();
    updateMetrics();
    showToast(`SIP processed. Created portfolio asset for ${sip.title}!`, 'success');
};

window.deleteSip = function(id) {
    if (!confirm('Remove this SIP contribution tracker?')) return;
    financeData.sips = financeData.sips.filter(s => s.id !== id);
    saveState();
    updateMetrics();
    showToast('SIP tracker removed.', 'success');
};

window.addSipTracker = async function() {
    const title = await showCustomPrompt('Enter SIP Name (e.g. Axis Bluechip, PPF):', '', 'Add SIP Name');
    if (!title || title.trim() === '') return;
    
    const amtStr = await showCustomPrompt('Enter Monthly SIP Amount (₹):', '', 'SIP Amount');
    if (!amtStr) return;
    const amount = parseFloat(amtStr.replace(/[^0-9.-]+/g, ''));
    if (isNaN(amount) || amount <= 0) return;
    
    const nextDate = await showCustomPrompt('Enter Next Payment Day (e.g. "5 July"):', '5 July', 'Next Payment');
    if (!nextDate) return;
    
    const newSip = {
        id: 'sip-' + Date.now(),
        title,
        amount,
        nextDate
    };
    
    if (!financeData.sips) financeData.sips = [];
    financeData.sips.push(newSip);
    saveState();
    updateMetrics();
    showToast(`Created SIP tracker for "${title}"!`, 'success');
};

// 10. EMI Tracker rendering
function renderEmis() {
    const container = document.getElementById('emiTrackerList');
    if (!container) return;
    
    if (!financeData.emis || financeData.emis.length === 0) {
        container.innerHTML = '<div style="color:var(--text-muted); font-size:0.75rem; text-align:center; padding:1rem;">No active EMIs linked.</div>';
        return;
    }
    
    container.innerHTML = financeData.emis.map(emi => `
        <div class="sip-emi-card">
            <div class="se-info">
                <h5>${emi.title}</h5>
                <p style="color:#ef4444; font-weight:700;">Remaining: ${emi.remainingMonths} mos</p>
            </div>
            <div class="se-action-group">
                <span class="se-amount-lbl">${formatCurrency(emi.amount)}/mo</span>
                <button class="se-pay-btn" onclick="payEmi('${emi.id}')">Pay</button>
                <button onclick="deleteEmi('${emi.id}')" style="background:transparent; border:none; color:var(--text-muted); cursor:pointer;"><i class="fa-solid fa-trash-can" style="font-size:0.8rem;"></i></button>
            </div>
        </div>
    `).join('');
}

window.payEmi = async function(id) {
    const emi = financeData.emis.find(e => e.id === id);
    if (!emi) return;
    
    if (financeData.bankAccounts.length === 0) {
        showToast('Please link a bank account first.', 'error');
        return;
    }
    
    let message = `Pay Loan EMI: ${emi.title} (${formatCurrency(emi.amount)})\n\nSelect Account Index to pay from:`;
    financeData.bankAccounts.forEach((acc, index) => {
        message += `\n${index + 1}. ${acc.name} (${formatCurrency(acc.balance)})`;
    });
    
    const choiceStr = await showCustomPrompt(message, "1", 'Select EMI Payment Account');
    const idx = parseInt(choiceStr) - 1;
    if (isNaN(idx) || idx < 0 || idx >= financeData.bankAccounts.length) {
        showToast('Invalid selection.', 'error');
        return;
    }
    
    const account = financeData.bankAccounts[idx];
    if (account.balance < emi.amount && account.type !== 'Credit Card') {
        showToast('Insufficient balance in selected account.', 'error');
        return;
    }
    
    // Deduct bank balance
    if (account.type === 'Credit Card') {
        account.balance += emi.amount;
    } else {
        account.balance -= emi.amount;
    }
    
    // Save to expenses log
    const todayStr = new Date().toISOString().split('T')[0];
    const newExpense = {
        id: 'exp-' + Date.now(),
        amount: emi.amount,
        category: 'Bills',
        title: 'EMI Paid: ' + emi.title,
        date: todayStr,
        bankId: account.id
    };
    financeData.expenses.push(newExpense);
    
    // Decrement months remaining
    emi.remainingMonths = Math.max(0, emi.remainingMonths - 1);
    
    // Check payoff
    if (emi.remainingMonths === 0) {
        showToast(`Congratulations! "${emi.title}" is fully paid off!`, 'success');
        financeData.emis = financeData.emis.filter(e => e.id !== id);
    } else {
        showToast(`EMI processed. Remaining duration: ${emi.remainingMonths} months!`, 'success');
    }
    
    saveState();
    updateMetrics();
};

window.deleteEmi = function(id) {
    if (!confirm('Remove this EMI tracker?')) return;
    financeData.emis = financeData.emis.filter(e => e.id !== id);
    saveState();
    updateMetrics();
    showToast('EMI tracker removed.', 'success');
};

window.addEmiTracker = async function() {
    const title = await showCustomPrompt('Enter EMI Name (e.g. Home Loan, Car Loan):', '', 'Add EMI');
    if (!title || title.trim() === '') return;
    
    const amtStr = await showCustomPrompt('Enter Monthly Installment (₹):', '', 'EMI Installment');
    if (!amtStr) return;
    const amount = parseFloat(amtStr.replace(/[^0-9.-]+/g, ''));
    if (isNaN(amount) || amount <= 0) return;
    
    const durStr = await showCustomPrompt('Enter remaining duration in months:', '36', 'Duration');
    if (!durStr) return;
    const remainingMonths = parseInt(durStr);
    if (isNaN(remainingMonths) || remainingMonths <= 0) return;
    
    const newEmi = {
        id: 'emi-' + Date.now(),
        title,
        amount,
        remainingMonths
    };
    
    if (!financeData.emis) financeData.emis = [];
    financeData.emis.push(newEmi);
    saveState();
    updateMetrics();
    showToast(`Created EMI tracker for "${title}"!`, 'success');
};

// 11. Investment Performance metrics card rendering
function renderInvestPerformance() {
    const perf = financeData.investPerformance || { todayGain: 0, monthGain: 0, yearGain: 0, overallReturn: 0 };
    
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
        overallEl.className = 'badge-roi ' + (perf.overallReturn >= 0 ? 'success' : 'danger');
        overallEl.style.background = perf.overallReturn >= 0 ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)';
        overallEl.style.color = perf.overallReturn >= 0 ? 'var(--color-income)' : 'var(--color-expense)';
    }
}

window.editPerformanceMetric = async function(key, label) {
    const perf = financeData.investPerformance || { todayGain: 0, monthGain: 0, yearGain: 0, overallReturn: 0 };
    const currentVal = perf[key];
    const input = await showCustomPrompt(`Enter new value for ${label}:`, currentVal, `Edit ${label}`);
    if (input === null || input.trim() === '') return;
    
    const parsed = parseFloat(input.replace(/[^0-9.-]+/g, ''));
    if (isNaN(parsed)) {
        showToast('Please enter a valid number.', 'error');
        return;
    }
    
    perf[key] = parsed;
    financeData.investPerformance = perf;
    saveState();
    renderInvestPerformance();
    showToast(`Updated ${label}!`, 'success');
};

// 12. Tax planning cards rendering
function renderTaxSection() {
    const tax = financeData.taxSection || { estimatedTax: 0, investment80c: 0, taxSaved: 0, capitalGains: 0 };
    
    document.getElementById('taxEstVal').textContent = formatCurrency(tax.estimatedTax);
    document.getElementById('tax80cVal').textContent = formatCurrency(tax.investment80c);
    document.getElementById('taxSavedVal').textContent = formatCurrency(tax.taxSaved);
    document.getElementById('taxCapGainsVal').textContent = formatCurrency(tax.capitalGains);
}

window.editTaxMetric = async function(key, label) {
    const tax = financeData.taxSection || { estimatedTax: 0, investment80c: 0, taxSaved: 0, capitalGains: 0 };
    const input = await showCustomPrompt(`Set value for ${label} (₹):`, tax[key], `Edit ${label}`);
    if (input === null || input.trim() === '') return;
    
    const parsed = parseFloat(input.replace(/[^0-9.-]+/g, ''));
    if (isNaN(parsed) || parsed < 0) {
        showToast('Please enter a valid amount.', 'error');
        return;
    }
    
    tax[key] = parsed;
    financeData.taxSection = tax;
    saveState();
    renderTaxSection();
    showToast(`Updated ${label}!`, 'success');
};

window.downloadTaxReport = function() {
    const tax = financeData.taxSection || { estimatedTax: 0, investment80c: 0, taxSaved: 0, capitalGains: 0 };
    const content = `
==================================================
           FINANCEPRO MOBILE - TAX REPORT
==================================================
Generated on: ${new Date().toLocaleDateString()}

TAX METRICS ESTIMATIONS:
--------------------------------------------------
Estimated Tax Liability :  ${formatCurrency(tax.estimatedTax)}
80C Deductible Inv.     :  ${formatCurrency(tax.investment80c)}
Tax Saved (from inv)    :  ${formatCurrency(tax.taxSaved)}
Capital Gains Taxable   :  ${formatCurrency(tax.capitalGains)}
--------------------------------------------------
Net Estimated Payable   :  ${formatCurrency(Math.max(0, tax.estimatedTax - tax.taxSaved))}

Disclaimer: Auto-calculated forecast. Review with an auditor.
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
    showToast('Tax Report downloaded successfully!', 'success');
};

// 13. Asset Allocation Breakdown (11 Classes) grid render
function renderAssetAllocationGrid() {
    const container = document.getElementById('assetAllocationGrid');
    if (!container) return;
    
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
        
    const houseVal = financeData.manualAssets.House || 0;
    const carVal = financeData.manualAssets.Car || 0;
    const epfVal = financeData.manualAssets.EPF || 0;
    const ppfVal = financeData.manualAssets.PPF || 0;
    const npsVal = financeData.manualAssets.NPS || 0;
    const bondsVal = financeData.manualAssets.Bonds || 0;
    
    const assets = [
        { key: 'House', name: 'House', amount: houseVal, isManual: true },
        { key: 'Car', name: 'Car', amount: carVal, isManual: true },
        { key: 'Mutual Funds', name: 'Mutual Funds', amount: mutualFundsVal, isManual: false },
        { key: 'Stocks', name: 'Stocks', amount: stocksVal, isManual: false },
        { key: 'Gold', name: 'Gold', amount: goldVal, isManual: false },
        { key: 'Cash', name: 'Cash', amount: cashVal, isManual: false },
        { key: 'Bank', name: 'Bank Balance', amount: bankVal, isManual: false },
        { key: 'EPF', name: 'EPF', amount: epfVal, isManual: true },
        { key: 'PPF', name: 'PPF', amount: ppfVal, isManual: true },
        { key: 'NPS', name: 'NPS', amount: npsVal, isManual: true },
        { key: 'Bonds', name: 'Bonds', amount: bondsVal, isManual: true }
    ];
    
    container.innerHTML = assets.map(asset => `
        <div class="asset-grid-item">
            <div class="asset-grid-item-info">
                <span class="asset-grid-title">${asset.name}</span>
                <span class="asset-grid-value">${formatCurrency(asset.amount)}</span>
            </div>
            ${asset.isManual ? `
                <button onclick="editAssetValue('${asset.key}', ${asset.amount})"><i class="fa-solid fa-pen-to-square"></i></button>
            ` : `
                <span style="font-size:0.65rem; color:#10b981; font-weight:800;">SYNC</span>
            `}
        </div>
    `).join('');
}

window.editAssetValue = async function(key, currentVal) {
    const input = await showCustomPrompt(`Set balance for ${key}:`, currentVal, 'Edit Asset Value');
    if (input === null || input.trim() === '') return;
    
    const parsed = parseFloat(input.replace(/[^0-9.-]+/g, ''));
    if (isNaN(parsed) || parsed < 0) {
        showToast('Please enter a valid amount.', 'error');
        return;
    }
    
    financeData.manualAssets[key] = parsed;
    saveState();
    updateMetrics();
    renderAssetAllocationGrid();
    showToast(`Updated ${key} value!`, 'success');
};

/* ==========================================================================
   Form Submission Interceptors
   ========================================================================== */
function setupFormSubmissions() {
    // 1. Add Income Submission
    const incForm = document.getElementById('addIncomeForm');
    if (incForm) {
        incForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const source = document.getElementById('incomeSource').value.trim();
            const amount = parseFloat(document.getElementById('incomeAmount').value);
            let category = document.getElementById('incomeCategory').value;
            const bankId = document.getElementById('incomeBank').value;
            const date = document.getElementById('incomeDate').value || new Date().toISOString().split('T')[0];
            
            if (category === 'Other') {
                category = document.getElementById('incomeCategoryOther').value.trim();
                if (!category) {
                    showToast('Please enter a custom category.', 'error');
                    return;
                }
            }
            
            if (isNaN(amount) || amount <= 0 || !bankId) {
                showToast('Please check form fields.', 'error');
                return;
            }
            
            // Adjust balance
            const bankAcc = financeData.bankAccounts.find(acc => acc.id === bankId);
            if (bankAcc) {
                bankAcc.balance += amount;
            }
            
            const newIncome = {
                id: 'inc-' + Date.now(),
                amount,
                title: source,
                category,
                date,
                bankId
            };
            
            financeData.income.push(newIncome);
            saveState();
            updateMetrics();
            
            closeBottomSheet();
            showToast(`Income of ${formatCurrency(amount)} added!`, 'success');
        });
    }
    
    // 2. Track Expense Submission
    const expForm = document.getElementById('logExpenseForm');
    if (expForm) {
        expForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('expenseTitle').value.trim();
            const amount = parseFloat(document.getElementById('expenseAmount').value);
            let category = document.getElementById('expenseCategory').value;
            const bankId = document.getElementById('expenseBank').value;
            const date = document.getElementById('expenseDate').value || new Date().toISOString().split('T')[0];
            
            if (category === 'Other') {
                category = document.getElementById('expenseCategoryOther').value.trim();
                if (!category) {
                    showToast('Please enter a custom category.', 'error');
                    return;
                }
            }
            
            if (isNaN(amount) || amount <= 0 || !bankId) {
                showToast('Please check form fields.', 'error');
                return;
            }
            
            // Deduct balance
            const bankAcc = financeData.bankAccounts.find(acc => acc.id === bankId);
            if (bankAcc) {
                if (bankAcc.balance < amount && bankAcc.type !== 'Credit Card') {
                    showToast('Insufficient account balance!', 'error');
                    return;
                }
                if (bankAcc.type === 'Credit Card') {
                    bankAcc.balance += amount; // increases liability
                } else {
                    bankAcc.balance -= amount;
                }
            }
            
            const newExpense = {
                id: 'exp-' + Date.now(),
                amount,
                category,
                title,
                date,
                bankId
            };
            
            financeData.expenses.push(newExpense);
            saveState();
            updateMetrics();
            
            closeBottomSheet();
            showToast(`Expense of ${formatCurrency(amount)} tracked!`, 'success');
        });
    }
    
    // 3. New Investment Submission
    const invForm = document.getElementById('newInvestmentForm');
    if (invForm) {
        invForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('investName').value.trim();
            let type = document.getElementById('investType').value;
            const amount = parseFloat(document.getElementById('investAmount').value);
            const returns = parseFloat(document.getElementById('investReturns').value) || 0;
            const date = document.getElementById('investDate').value || new Date().toISOString().split('T')[0];
            
            if (type === 'Other') {
                type = document.getElementById('investTypeOther').value.trim();
                if (!type) {
                    showToast('Please specify custom investment type.', 'error');
                    return;
                }
            }
            
            if (isNaN(amount) || amount <= 0) {
                showToast('Please enter valid amount.', 'error');
                return;
            }
            
            const newInvestment = {
                id: 'inv-' + Date.now(),
                title,
                type,
                amount,
                returns,
                date
            };
            
            financeData.investments.push(newInvestment);
            saveState();
            updateMetrics();
            
            closeBottomSheet();
            showToast(`Asset "${title}" successfully tracked!`, 'success');
        });
    }
    
    // 4. Add Bank Account Form
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
                    showToast('Please enter account type.', 'error');
                    return;
                }
            }
            
            if (!name || !bankName || isNaN(balance)) {
                showToast('Please check account fields.', 'error');
                return;
            }
            
            const cleanNumber = number.slice(-4);
            const newBank = {
                id: 'bank-' + Date.now(),
                name,
                bank: bankName,
                number: cleanNumber,
                balance,
                type
            };
            
            financeData.bankAccounts.push(newBank);
            saveState();
            updateMetrics();
            
            closeAddBankModal();
            showToast(`Bank account "${name}" successfully linked!`, 'success');
        });
    }
    
    // 5. Edit Portfolio Asset Modal Save
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
                    showToast('Please check custom type.', 'error');
                    return;
                }
            }
            
            if (isNaN(amount) || amount <= 0) return;
            
            inv.title = title;
            inv.type = type;
            inv.amount = amount;
            inv.returns = returns;
            inv.date = date;
            
            saveState();
            updateMetrics();
            
            document.getElementById('editInvestModalOverlay').classList.remove('open');
            showToast('Asset changes saved successfully!', 'success');
        });
    }
    
    // Modal Cancelers
    const editInvestCancel = document.getElementById('editInvestCancel');
    if (editInvestCancel) {
        editInvestCancel.addEventListener('click', () => {
            document.getElementById('editInvestModalOverlay').classList.remove('open');
        });
    }

    // 6. Tab Add Income Submission
    const tabIncForm = document.getElementById('tabAddIncomeForm');
    if (tabIncForm) {
        tabIncForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const source = document.getElementById('tabIncomeSource').value.trim();
            const amount = parseFloat(document.getElementById('tabIncomeAmount').value);
            let category = document.getElementById('tabIncomeCategory').value;
            const bankId = document.getElementById('tabIncomeBank').value;
            const date = document.getElementById('tabIncomeDate').value || new Date().toISOString().split('T')[0];
            
            if (category === 'Other') {
                category = document.getElementById('tabIncomeCategoryOther').value.trim();
                if (!category) {
                    showToast('Please enter a custom category.', 'error');
                    return;
                }
            }
            
            if (isNaN(amount) || amount <= 0 || !bankId) {
                showToast('Please check form fields.', 'error');
                return;
            }
            
            const bankAcc = financeData.bankAccounts.find(acc => acc.id === bankId);
            if (bankAcc) {
                bankAcc.balance += amount;
            }
            
            const newIncome = {
                id: 'inc-' + Date.now(),
                amount,
                title: source,
                category,
                date,
                bankId
            };
            
            financeData.income.push(newIncome);
            saveState();
            updateMetrics();
            
            tabIncForm.reset();
            const wrapper = document.getElementById('tabIncomeCategoryOtherWrapper');
            if (wrapper) wrapper.style.display = 'none';
            showToast(`Income of ${formatCurrency(amount)} successfully added!`, 'success');
        });
    }

    // 7. Tab Log Expense Submission
    const tabExpForm = document.getElementById('tabLogExpenseForm');
    if (tabExpForm) {
        tabExpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('tabExpenseTitle').value.trim();
            const amount = parseFloat(document.getElementById('tabExpenseAmount').value);
            let category = document.getElementById('tabExpenseCategory').value;
            const bankId = document.getElementById('tabExpenseBank').value;
            const date = document.getElementById('tabExpenseDate').value || new Date().toISOString().split('T')[0];
            
            if (category === 'Other') {
                category = document.getElementById('tabExpenseCategoryOther').value.trim();
                if (!category) {
                    showToast('Please enter a custom category.', 'error');
                    return;
                }
            }
            
            if (isNaN(amount) || amount <= 0 || !bankId) {
                showToast('Please check form fields.', 'error');
                return;
            }
            
            const bankAcc = financeData.bankAccounts.find(acc => acc.id === bankId);
            if (bankAcc) {
                if (bankAcc.balance < amount && bankAcc.type !== 'Credit Card') {
                    showToast('Insufficient account balance!', 'error');
                    return;
                }
                if (bankAcc.type === 'Credit Card') {
                    bankAcc.balance += amount;
                } else {
                    bankAcc.balance -= amount;
                }
            }
            
            const newExpense = {
                id: 'exp-' + Date.now(),
                amount,
                category,
                title,
                date,
                bankId
            };
            
            financeData.expenses.push(newExpense);
            saveState();
            updateMetrics();
            
            tabExpForm.reset();
            const wrapper = document.getElementById('tabExpenseCategoryOtherWrapper');
            if (wrapper) wrapper.style.display = 'none';
            showToast(`Expense of ${formatCurrency(amount)} successfully tracked!`, 'success');
        });
    }
}

// Edit custom inputs dropdown toggles
function setupOtherDropdowns() {
    const dropdownConfigs = [
        { select: 'incomeCategory', wrapper: 'incomeCategoryOtherWrapper' },
        { select: 'expenseCategory', wrapper: 'expenseCategoryOtherWrapper' },
        { select: 'tabIncomeCategory', wrapper: 'tabIncomeCategoryOtherWrapper' },
        { select: 'tabExpenseCategory', wrapper: 'tabExpenseCategoryOtherWrapper' },
        { select: 'investType', wrapper: 'investTypeOtherWrapper' },
        { select: 'bankType', wrapper: 'bankTypeOtherWrapper' },
        { select: 'editInvestType', wrapper: 'editInvestTypeOtherWrapper' }
    ];
    
    dropdownConfigs.forEach(conf => {
        const select = document.getElementById(conf.select);
        const wrap = document.getElementById(conf.wrapper);
        if (select && wrap) {
            select.addEventListener('change', () => {
                wrap.style.display = select.value === 'Other' ? 'flex' : 'none';
            });
        }
    });
}

// Setup search ledger events
function setupLedgerFilters() {
    const search = document.getElementById('ledgerSearchText');
    const start = document.getElementById('ledgerStartDate');
    const end = document.getElementById('ledgerEndDate');
    const type = document.getElementById('ledgerType');
    const reset = document.getElementById('clearLedgerFiltersBtn');
    
    if (search && start && end && type) {
        const trigger = () => renderFullLedger();
        search.addEventListener('input', trigger);
        start.addEventListener('change', trigger);
        end.addEventListener('change', trigger);
        type.addEventListener('change', trigger);
        
        if (reset) {
            reset.addEventListener('click', () => {
                search.value = '';
                start.value = '';
                end.value = '';
                type.value = 'all';
                renderFullLedger();
            });
        }
    }
    
    // Dashboard Search Input
    const dashSearch = document.getElementById('dashboardSearchText');
    if (dashSearch) {
        dashSearch.addEventListener('input', () => renderDashboardRecentLedger());
    }
    
    // Tab Income Search Input
    const tabIncSearch = document.getElementById('tabIncomeSearchText');
    if (tabIncSearch) {
        tabIncSearch.addEventListener('input', () => renderTabIncomeList());
    }
    
    // Tab Expense Search Input
    const tabExpSearch = document.getElementById('tabExpenseSearchText');
    if (tabExpSearch) {
        tabExpSearch.addEventListener('input', () => renderTabExpenseList());
    }
}

// Toggle filters drawer on transactions list
window.toggleFilterDrawer = function() {
    const drawer = document.getElementById('filterDrawer');
    const btn = document.getElementById('filterDrawerBtn');
    if (drawer) {
        const isOpen = drawer.classList.contains('open');
        if (isOpen) {
            drawer.classList.remove('open');
            btn.classList.remove('active');
        } else {
            drawer.classList.add('open');
            btn.classList.add('active');
        }
    }
};

// Edit monthly budget limit edit trigger
function setupBudgetEdit() {
    const edit = document.getElementById('editBudgetBtn');
    if (edit) {
        edit.addEventListener('click', async () => {
            const current = financeData.monthlyBudget || 50000;
            const input = await showCustomPrompt('Enter new monthly budget limit (₹):', current, 'Set Budget Limit');
            if (input === null || input.trim() === '') return;
            
            const parsed = parseFloat(input.replace(/[^0-9.-]+/g, ''));
            if (isNaN(parsed) || parsed <= 0) {
                showToast('Please enter positive budget figure.', 'error');
                return;
            }
            
            financeData.monthlyBudget = parsed;
            saveState();
            updateBudgetTracker();
            showToast(`Monthly budget updated to ${formatCurrency(parsed)}!`, 'success');
        });
    }
}

// Bank Account Transactions Statement Modal
window.showBankAccountHistory = function(bankId) {
    const acc = financeData.bankAccounts.find(a => a.id === bankId);
    if (!acc) return;
    
    document.getElementById('bankHistoryTitle').textContent = `${acc.name} History`;
    document.getElementById('bankHistoryMeta').innerHTML = `${acc.bank} • ****${acc.number}<br><strong>Balance:</strong> ${formatCurrency(acc.balance)}`;
    
    // Filter transactions referencing account bankId
    const deposits = financeData.income.filter(item => item.bankId === bankId || (bankId === 'bank-1' && item.id === 'inc-2') || (bankId === 'bank-2' && item.id === 'inc-1'));
    const withdrawals = financeData.expenses.filter(item => item.bankId === bankId || (bankId === 'bank-1' && ['exp-1', 'exp-2', 'exp-3'].includes(item.id)) || (bankId === 'bank-2' && item.id === 'exp-4'));
    
    const combined = [
        ...deposits.map(d => ({ ...d, isInc: true })),
        ...withdrawals.map(w => ({ ...w, isInc: false }))
    ];
    combined.sort((a,b) => new Date(b.date) - new Date(a.date));
    
    const list = document.getElementById('bankHistoryContent');
    if (combined.length === 0) {
        list.innerHTML = `
            <div style="text-align: center; padding: 1.5rem; color: var(--text-muted);">
                <i class="fa-solid fa-folder-open" style="font-size: 2rem; opacity: 0.5; margin-bottom: 0.5rem;"></i>
                <p>No account activity logged.</p>
            </div>
        `;
    } else {
        list.innerHTML = combined.map(tx => `
            <div class="list-item-app ${tx.isInc ? 'income' : 'expense'}" style="padding: 0.65rem 0.5rem; margin-bottom: 0.5rem; border-radius: var(--radius-md);">
                <div class="item-left">
                    <i class="fa-solid ${tx.isInc ? 'fa-arrow-down' : 'fa-arrow-up'}" style="font-size:0.85rem;"></i>
                    <div class="item-details-app">
                        <h5 style="font-size:0.85rem;">${tx.title}</h5>
                        <span style="font-size:0.7rem;">${formatDate(tx.date)}</span>
                    </div>
                </div>
                <span class="item-amount-app" style="font-size:0.85rem;">${tx.isInc ? '+' : '-'}${formatCurrency(tx.amount)}</span>
            </div>
        `).join('');
    }
    
    document.getElementById('bankHistoryModalOverlay').classList.add('open');
};

window.closeBankHistory = function() {
    document.getElementById('bankHistoryModalOverlay').classList.remove('open');
};

/* ==========================================================================
   ChartJS Data Implementations
   ========================================================================== */

// 1. Spending breakdown doughnut chart
function updateChart() {
    const canvas = document.getElementById('financeChart');
    if (!canvas) return;
    
    const totalIncome = financeData.income.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = financeData.expenses.reduce((sum, item) => sum + item.amount, 0);
    const totalInvestments = financeData.investments.reduce((sum, item) => sum + item.amount, 0);
    const totalSavings = financeData.bankAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    
    const ctx = canvas.getContext('2d');
    const textCol = getComputedStyle(document.body).getPropertyValue('--text-primary').trim() || '#0f172a';
    const borderCol = getComputedStyle(document.body).getPropertyValue('--border-color').trim() || 'rgba(15,23,42,0.06)';
    
    if (financeChartInstance) {
        financeChartInstance.destroy();
    }
    
    financeChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Income', 'Expenses', 'Savings', 'Investments'],
            datasets: [{
                data: [totalIncome, totalExpenses, totalSavings, totalInvestments],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(6, 182, 212, 0.8)',
                    'rgba(139, 92, 246, 0.8)'
                ],
                borderWidth: 1,
                borderColor: borderCol
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: textCol,
                        padding: 10,
                        usePointStyle: true,
                        font: { family: 'Outfit', size: 10, weight: '700' }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => ` ${context.label}: ${formatCurrency(context.raw)}`
                    }
                }
            },
            cutout: '70%'
        }
    });
}

// 2. 12-Month Net Worth Trend line chart
function updateNetWorthTrendChart() {
    const canvas = document.getElementById('netWorthTrendChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const textCol = getComputedStyle(document.body).getPropertyValue('--text-primary').trim() || '#0f172a';
    const gridCol = 'rgba(15, 23, 42, 0.05)';
    
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const trendData = [];
    
    const today = new Date();
    const curYear = today.getFullYear();
    const curMonth = today.getMonth();
    
    const totalSavings = financeData.bankAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    const totalInvestments = financeData.investments.reduce((sum, item) => sum + item.amount, 0);
    const debt = financeData.bankAccounts.filter(acc => acc.type === 'Credit Card').reduce((sum, acc) => sum + acc.balance, 0);
    const curNetWorth = totalSavings + totalInvestments - debt;
    
    for (let m = 0; m < 12; m++) {
        if (m > curMonth) {
            trendData.push(null);
        } else {
            const cutoff = new Date(curYear, m + 1, 0, 23, 59, 59);
            
            const incAfter = financeData.income
                .filter(item => new Date(item.date) > cutoff)
                .reduce((sum, item) => sum + item.amount, 0);
            const expAfter = financeData.expenses
                .filter(item => new Date(item.date) > cutoff)
                .reduce((sum, item) => sum + item.amount, 0);
            const invAfter = financeData.investments
                .filter(item => item.date && new Date(item.date) > cutoff)
                .reduce((sum, item) => sum + item.amount, 0);
                
            const nwHistorical = curNetWorth - incAfter + expAfter - invAfter;
            trendData.push(nwHistorical);
        }
    }
    
    if (netWorthTrendChartInstance) {
        netWorthTrendChartInstance.destroy();
    }
    
    const grad = ctx.createLinearGradient(0, 0, 0, 160);
    grad.addColorStop(0, 'rgba(99, 102, 241, 0.2)');
    grad.addColorStop(1, 'rgba(99, 102, 241, 0.0)');
    
    netWorthTrendChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Net Worth',
                data: trendData,
                borderColor: 'rgba(99, 102, 241, 1)',
                backgroundColor: grad,
                borderWidth: 3,
                tension: 0.3,
                pointRadius: 3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: textCol, font: { family: 'Outfit', size: 9, weight: '600' } }
                },
                y: {
                    grid: { color: gridCol },
                    ticks: { color: textCol, font: { family: 'Outfit', size: 9, weight: '600' } }
                }
            }
        }
    });
}

// 3. Investment allocation pie chart
function updateInvestAllocationChart() {
    const canvas = document.getElementById('investAllocationChart');
    if (!canvas) return;
    
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
        
        if (inv.type === 'Mutual Fund' || inv.type === 'SIP') groups['Mutual Funds'] += amt;
        else if (inv.type === 'Stocks' || inv.type === 'Trading') groups['Stocks'] += amt;
        else if (inv.type === 'Gold') groups['Gold'] += amt;
        else if (inv.type === 'FD') groups['FD'] += amt;
        else if (inv.type === 'Crypto') groups['Crypto'] += amt;
        else if (inv.type === 'Cash') groups['Cash'] += amt;
        else groups['Other'] += amt;
    });
    
    const ctx = canvas.getContext('2d');
    if (investAllocationChartInstance) {
        investAllocationChartInstance.destroy();
    }
    
    if (totalVal === 0) {
        investAllocationChartInstance = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['No Data'],
                datasets: [{ data: [1], backgroundColor: ['rgba(15,23,42,0.05)'] }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
            }
        });
        return;
    }
    
    const labels = [];
    const data = [];
    const colors = [];
    
    Object.keys(groups).forEach(key => {
        if (groups[key] > 0) {
            labels.push(key);
            data.push(groups[key]);
            
            let color = '#64748b';
            if (key === 'Mutual Funds') color = '#a855f7';
            else if (key === 'Stocks') color = '#10b981';
            else if (key === 'Gold') color = '#f59e0b';
            else if (key === 'FD') color = '#06b6d4';
            else if (key === 'Crypto') color = '#ef4444';
            else if (key === 'Cash') color = '#3b82f6';
            colors.push(color);
        }
    });
    
    investAllocationChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{ data, backgroundColor: colors, borderWidth: 1 }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        font: { family: 'Outfit', size: 9, weight: '700' }
                    }
                }
            }
        }
    });
}

/* ==========================================================================
   AI Messenger Chatbot Controller
   ========================================================================== */
function renderChatbotInsights() {
    const container = document.getElementById('chatbotMessages');
    if (!container) return;
    
    const insights = financeData.aiInsights || [];
    const insightsHtml = insights.map(item => {
        let emoji = '💡';
        if (item.type === 'warning') emoji = '⚠️';
        if (item.type === 'success') emoji = '✅';
        if (item.type === 'magic') emoji = '✨';
        return `<div style="margin: 0.35rem 0; line-height: 1.4; display: flex; align-items: flex-start; gap: 0.4rem; font-size:0.75rem;"><span>${emoji}</span><span>${item.text}</span></div>`;
    }).join('');
    
    container.innerHTML = `
        <div class="chat-message bot">
            Hello! I am your AI Financial Assistant. Here are my observations on your financial logs:
        </div>
        <div class="chat-message bot" style="width:90%; max-width:90%; background:rgba(99,102,241,0.03); border: 1px dashed rgba(99,102,241,0.15);">
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
    processChatbotMessage(text);
};

window.sendQuickPrompt = function(promptText) {
    processChatbotMessage(promptText);
};

function processChatbotMessage(text) {
    const container = document.getElementById('chatbotMessages');
    if (!container) return;
    
    // User bubble
    const uBubble = document.createElement('div');
    uBubble.className = 'chat-message user';
    uBubble.textContent = text;
    container.appendChild(uBubble);
    container.scrollTop = container.scrollHeight;
    
    // Bot response calculation
    setTimeout(() => {
        const bBubble = document.createElement('div');
        bBubble.className = 'chat-message bot';
        
        const q = text.toLowerCase();
        let reply = "I see. Let's analyze your savings. Optimize your expenses limit under the Budgets tab to maximize your investing power!";
        
        if (q.includes('food') || q.includes('spend') || q.includes('expense')) {
            const food = financeData.expenses
                .filter(e => e.category.toLowerCase() === 'food')
                .reduce((sum, e) => sum + e.amount, 0);
            reply = `Food spending tracked this month: ${formatCurrency(food)}. Note: Groceries expenses are 22% higher than average. Setting category thresholds is advised!`;
        } else if (q.includes('saving') || q.includes('balance') || q.includes('bank')) {
            const savingsTotal = financeData.bankAccounts
                .filter(acc => acc.type !== 'Credit Card')
                .reduce((sum, acc) => sum + acc.balance, 0);
            reply = `Total cumulative bank balance: ${formatCurrency(savingsTotal)}. Average monthly savings grew by ₹18,000 this cycle. Outstanding job!`;
        } else if (q.includes('emergency') || q.includes('shield')) {
            const em = financeData.bankAccounts
                .filter(acc => acc.type === 'Savings')
                .reduce((sum, acc) => sum + acc.balance, 0);
            reply = `Your current emergency reserves equal ${formatCurrency(em)}. This covers roughly 6 months of basic necessities. Reserves are healthy!`;
        } else if (q.includes('invest') || q.includes('portfolio') || q.includes('return')) {
            const inv = financeData.investments.reduce((sum, i) => sum + i.amount, 0);
            reply = `Total invested capital stands at ${formatCurrency(inv)}. Portfolio breakdown indicates asset concentration in equities. Consider adding Gold or FD assets to diversify.`;
        } else if (q.includes('budget')) {
            const spent = financeData.expenses.reduce((sum, e) => sum + e.amount, 0);
            const remaining = Math.max(0, financeData.monthlyBudget - spent);
            reply = `Monthly Budget Limit: ${formatCurrency(financeData.monthlyBudget)}. Spent so far: ${formatCurrency(spent)}. Remaining allowance: ${formatCurrency(remaining)}.`;
        }
        
        bBubble.textContent = reply;
        container.appendChild(bBubble);
        container.scrollTop = container.scrollHeight;
    }, 600);
}

/* ==========================================================================
   Theme & Time Overrides
   ========================================================================== */
window.toggleTheme = function() {
    const current = financeData.theme || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    financeData.theme = next;
    saveState();
    applyTheme();
    showToast(`Switched to ${next === 'dark' ? 'Night' : 'Day'} Mode!`, 'success');
};

function applyTheme() {
    const theme = financeData.theme || 'light';
    const body = document.body;
    const btn = document.getElementById('themeToggleBtn');
    
    if (theme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-theme');
        if (btn) {
            btn.innerHTML = `<i class="fa-solid fa-sun" style="color: #fbbf24;"></i>`;
        }
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-mode');
        if (btn) {
            btn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
        }
    }
    
    // Redraw charts with theme configs
    setTimeout(() => {
        updateChart();
        updateNetWorthTrendChart();
        updateInvestAllocationChart();
    }, 100);
}

// Phone Status Bar Clock Sync
function updateClock() {
    const clock = document.getElementById('statusTime');
    if (!clock) return;
    const now = new Date();
    let hrs = now.getHours();
    let mins = now.getMinutes();
    hrs = hrs < 10 ? '0' + hrs : hrs;
    mins = mins < 10 ? '0' + mins : mins;
    clock.textContent = `${hrs}:${mins}`;
}

// Enable mouse wheel horizontal scrolling on scrollable carousels
function setupHorizontalScroll() {
    const scrollContainers = document.querySelectorAll('.metrics-scroller, .banks-carousel, .goals-carousel, .chat-suggestions');
    scrollContainers.forEach(container => {
        container.addEventListener('wheel', (evt) => {
            // Check if horizontal scroll is possible
            if (container.scrollWidth > container.clientWidth) {
                if (evt.deltaY !== 0) {
                    evt.preventDefault();
                    container.scrollLeft += evt.deltaY;
                }
            }
        }, { passive: false });
    });
}

/* ==========================================================================
   App Initialization Hook
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Initial clock run
    updateClock();
    setInterval(updateClock, 30000);
    
    // Theme setup
    applyTheme();
    
    // Actions & Handlers setups
    setupTabs();
    setupFormSubmissions();
    setupOtherDropdowns();
    setupLedgerFilters();
    setupBudgetEdit();
    setupHorizontalScroll();
    
    // Compute calculations
    updateMetrics();
});
