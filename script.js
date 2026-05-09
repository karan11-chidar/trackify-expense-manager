// fill date input
let today = new Date().toISOString().split("T");
let date = new Date(today[0]);
document.getElementById("exp-date-filter").value = today[0];
document.getElementById("exp-date").value = today[0];
let editIndex = null;

// Expenses List
const expenseList = JSON.parse(localStorage.getItem("expenses")) || [];

// inputs
let form = document.getElementById('expense-form');
let newCategory = document.getElementById("new-cat-input");
let expenseGrid = document.getElementById("expense-list");

// stats inputs
let totalExpense = document.getElementById('total-expense');
let monthExpense = document.getElementById('month-expense');
let weeklyExpense = document.getElementById('weekly-expense');
let todayExpnese = document.getElementById('today-expense');

 // filters inputs
  let expSearch = document.getElementById("expense-search");
  let refreshBtn = document.getElementById("btn-refresh-data");
  let dateFilter = document.getElementById("exp-date-filter");
  let dropdownFilter = document.getElementById("filter-category");
  
// buttons
let openModal = document.getElementById('btn-add-expense');
let closeModal = document.getElementById('close-expense-modal');
let expenseModal = document.getElementById('expense-modal');
let saveBtn = document.getElementById('save-btn');

// add category
let categoryDropdown = document.getElementById("exp-category");

// Add Manual Categroy
categoryDropdown.addEventListener('change', function () {
  console.log("click add category.");
  if (categoryDropdown.value === "Other") {
      newCategory.style.display = "block"; // Input box dikhne lagega
  } else {
    newCategory.style.display = "none"; // Wapas chup jayega
    }
})

// opne expense modal
openModal.addEventListener('click', function () {
  document.getElementById("exp-date-filter").value = today[0];
  document.getElementById("exp-date").value = today[0];
    expenseModal.classList.add('active');
});

// close expense modal
closeModal.addEventListener('click', function () {
    expenseModal.classList.remove('active');
});
// refersh ui cards
function refreshUI(listToRender = expenseList) {
  expenseGrid.innerHTML = ""; // Pehle screen se saare purane cards saaf karo

  // Phir array ke har item ko wapas draw karo
  listToRender.forEach(function (expense, index) {
    console.log(expense);
    renderExpense(expense, index);
  });
  localStorage.setItem("expenses", JSON.stringify(expenseList));
}

// page refresh 
refreshBtn.addEventListener('click', function () {
  refreshUI();
  updateStats();
})

// Triger Events Delegaiton
expenseGrid.addEventListener('click', function (event) {
  if (!event.target.closest) return;

  let expenseCard = event.target.closest('.expense-card');
  if (!expenseCard) return;

  let expenseCardNumber = expenseCard.dataset.index;
  console.log(expenseCardNumber);
  let currentExpense = expenseList[expenseCardNumber];

  if (event.target.closest(".delete-btn")) {
    expenseCard.remove(); // UI se hataya
    expenseList.splice(expenseCardNumber, 1);// Array se bhi hata diya!
    refreshUI();
    console.log("Expense deleted", expenseList);
  } else if (event.target.closest(".edit-btn")) {
    console.log("edit button click ");
    // Form mein purani details bharo
    document.getElementById("exp-amount").value = currentExpense.amount;
    document.getElementById("exp-note").value = currentExpense.description;
    document.getElementById("exp-date").value = currentExpense.date;
    document.getElementById("exp-mode").value = currentExpense.payMode;
    document.getElementById("exp-category").value = currentExpense.category;
    editIndex = expenseCardNumber;
    // Modal open kar do
    expenseModal.classList.add("active");
  }
    console.log(event.target);
})

// Create Dom Elements
function renderExpense(expense, cardNumber) {
  let noExpense = document.getElementById('expense');
  noExpense.style.display = 'none';
  let newElement = document.createElement('div');
   let iconName = "receipt"; // Default icon (agar custom category ho)

   if (expense.category === "Raw Material") {
     iconName = "shopping-bag";
   } else if (expense.category === "Fuel") {
     iconName = "fuel"; // ya 'car'
   } else if (expense.category === "Salary") {
     iconName = "users";
   } else if (expense.category === "Maintenance") {
     iconName = "wrench";
   }
  newElement.classList.add('expense-card');
  newElement.dataset.index = cardNumber;
  newElement.innerHTML = ` <div class="expense-top">
                <div class="expense-category food">
                    <i data-lucide=${iconName}></i>
                </div>

                <div class="expense-price">
                    ₹${expense.amount}
                </div>
            </div>

            <div class="expense-body">
                <h3>${expense.category}</h3>
                <p>${expense.description}</p>
            </div>

            <div class="expense-footer">
                <span>${expense.date}</span>
                <span class="payment online">${expense.payMode}</span>
            </div>
            <div class="expense-actions">
    <button class="action-btn edit-btn">
        <i data-lucide="square-pen"></i>
        Edit
    </button>

    <button class="action-btn delete-btn">
        <i data-lucide="trash-2"></i>
        Delete
    </button>
</div>`;
  // console.log(newElement);
  expenseGrid.appendChild(newElement);
  lucide.createIcons();
}

// form expnen se modal 
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // form input values
    let category = document.getElementById("new-cat-input").value || document.getElementById('exp-category').value;
    let amount = document.getElementById("exp-amount").value;
    let description = document.getElementById("exp-note").value;
    let date = document.getElementById("exp-date").value;
    let payMode = document.getElementById("exp-mode").value;
    // Vaildation Inputs
    if (category === "") {
      alert("Please Enter Category.");
      return;
    } else if (amount < 0 || isNaN(amount)) {
      alert("Please Enter Vaild Amount .");
      return;
    } else if (description ==='') {
      alert("Please Enter description Note .");
      return;
    } else if (!payMode) {
      alert("Please Select Payment Mode .");
      return;
    }
    let expense = {
        category: category,
        amount: amount,
        description: description,
        date: date,
        payMode:payMode,
    }
  if (editIndex === null) {
    // Agar naya kharcha hai toh push karo
    expenseList.push(expense);
  } else {
    // Agar edit kar rahe hain toh usi index par data update karo
    expenseList[editIndex] = expense;
    editIndex = null; // Save hone ke baad wapas null kar do
  }
    // console.table(expense);
    // console.log('category :',category)
    // console.log("amount :", amount);
    // console.log("description :", description);
    // console.log("date :", date);
    // console.log("payment mode :", payMode);
  form.reset();
  expenseModal.classList.remove('active');
   localStorage.setItem("expenses", JSON.stringify(expenseList));
   refreshUI();
})

// Calculate Stats
function updateStats() {
  let total = 0;
  let todayTotal = 0;
  let weeklyTotal = 0;
  let monthlyTotal = 0;
  expenseList.forEach(expense => {
    let amount = Number(expense.amount);
    let expDate = new Date(expense.date);
    console.log(expDate);
    // calculate total amount
    total += amount;

    // calculate today amount
    if (today[0] === expense.date) {
      todayTotal += amount;
    }

    // calculate monthly amount
    if (expDate.getFullYear() === date.getFullYear() && expDate.getMonth() === date.getMonth()) {
      monthlyTotal += amount;
    }

    // calculate weekly amount
    let dateDiff = (date - expDate) / (1000 * 60 * 60 * 24);
    if (dateDiff >= 0 && dateDiff <= 7) {
      weeklyTotal += amount;
    }
  })
  totalExpense.innerText = `₹${total}`;
  todayExpnese.innerText = `₹${todayTotal}`;
  monthExpense.innerText = `₹${monthlyTotal}`;
  weeklyExpense.innerText = `₹${weeklyTotal}`;
  refreshUI();
  console.log(todayTotal)
}
// fileters 
function applyFilters() {
  // filters inputs
   expSearch = document.getElementById("expense-search").value;
   dateFilter = document.getElementById("exp-date-filter").value;
  dropdownFilter = document.getElementById("filter-category").value;

  // input format 
  let expenseText = expSearch.toLowerCase()
  let dropDownText = dropdownFilter.toLowerCase();
  console.log(dropDownText);

  let filterResult = expenseList.filter(expense => {
    
    if (
      (dropDownText === 'all' || dropDownText === expense.category.toLowerCase())
      &&
      ((expense.description.toLowerCase()).includes(expenseText))
      &&
      ((dateFilter ==='')||(dateFilter===expense.date))
        ) {
      return expense;
    }
  })
  refreshUI(filterResult);
}
let searchTimer;
expSearch.addEventListener('input', function (event) {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(function () {
    console.log('Search timer completed')
    applyFilters();
  },2000)
})
dropdownFilter.addEventListener('change', function () {
  applyFilters();
})
dateFilter.addEventListener('change', function () {
  applyFilters();
})
applyFilters();
updateStats();
lucide.createIcons();
