const expenseForm = document.getElementById("expenseForm");
const expenseTable = document.getElementById("expenseTable");
const shrijitTotal = document.getElementById("shrijitTotal");
const nitinTotal = document.getElementById("nitinTotal");
const totalAmount = document.getElementById("total");
const equalShare = document.getElementById("equalShare");
const finalReport = document.getElementById("finalReport");

let expenses = [];

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const person = document.getElementById("person").value;
  const item = document.getElementById("item").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const date = document.getElementById("date").value;

  expenses.push({ person, item, amount, date });
  expenseForm.reset();
  renderTable();
});

document.getElementById("monthSelector").addEventListener("change", renderTable);
document.getElementById("yearSelector").addEventListener("change", renderTable);

function renderTable() {
  const selectedMonth = parseInt(document.getElementById("monthSelector").value);
  const selectedYear = parseInt(document.getElementById("yearSelector").value);

  expenseTable.innerHTML = "";
  let shrijit = 0, nitin = 0, total = 0;

  const filtered = expenses.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate.getMonth() === selectedMonth && entryDate.getFullYear() === selectedYear;
  });

  filtered.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.person === "Shrijit" ? "Mr. Shrijit" : "Mr. Nitin"}</td>
      <td>${entry.item}</td>
      <td>₹${entry.amount.toFixed(2)}</td>
      <td>${entry.date}</td>
    `;
    expenseTable.appendChild(row);

    if (entry.person === "Shrijit") {
      shrijit += entry.amount;
    } else {
      nitin += entry.amount;
    }
    total += entry.amount;
  });

  const eachPay = total / 2;
  const balance = shrijit - nitin;
  let report = "";

  if (balance > 0) {
    report = `Mr. Nitin should pay ₹${(balance / 2).toFixed(2)} to Mr. Shrijit.`;
  } else if (balance < 0) {
    report = `Mr. Shrijit should pay ₹${(-balance / 2).toFixed(2)} to Mr. Nitin.`;
  } else {
    report = "Both have paid equally.";
  }

  shrijitTotal.textContent = shrijit.toFixed(2);
  nitinTotal.textContent = nitin.toFixed(2);
  totalAmount.textContent = total.toFixed(2);
  equalShare.textContent = eachPay.toFixed(2);
  finalReport.textContent = report;
}

function updateTitle() {
  renderTable(); // Re-filter data on month/year change
}
