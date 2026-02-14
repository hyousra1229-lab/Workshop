// 🔗 PUT YOUR GOOGLE APPS SCRIPT WEB APP URL HERE
const API_URL = "PASTE_YOUR_WEB_APP_URL_HERE";

// Helper: send data to Google Sheets
async function sendData(action, data) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...data })
    });
    return await response.json();
  } catch (err) {
    alert("Error connecting to storage");
    console.error(err);
  }
}

/* =======================
   ORDERS
======================= */
async function saveOrder() {
  const order = {
    client: document.getElementById("orderClient").value,
    phone: document.getElementById("orderPhone").value,
    item: document.getElementById("orderItem").value,
    price: document.getElementById("orderPrice").value,
    prepaid: document.getElementById("orderPrepaid").value,
    note: document.getElementById("orderNote").value
  };

  await sendData("addOrder", order);
  alert("Order saved ✅");
}

/* =======================
   WORKER PAYMENT
======================= */
async function saveWorkerPayment() {
  const payment = {
    worker: document.getElementById("workerName").value,
    order: document.getElementById("workerOrder").value,
    amount: document.getElementById("workerAmount").value,
    paid: document.getElementById("workerPaid").checked,
    note: document.getElementById("workerNote").value
  };

  await sendData("addWorkerPayment", payment);
  alert("Worker payment logged ✅");
}

/* =======================
   DIRECT SALE
======================= */
async function saveSale() {
  const sale = {
    item: document.getElementById("saleItem").value,
    price: document.getElementById("salePrice").value,
    note: document.getElementById("saleNote").value
  };

  await sendData("addSale", sale);
  alert("Sale saved ✅");
}

/* =======================
   CLIENT
======================= */
async function saveClient() {
  const client = {
    name: document.getElementById("clientName").value,
    phone: document.getElementById("clientPhone").value,
    note: document.getElementById("clientNote").value
  };

  await sendData("addClient", client);
  alert("Client saved ✅");
}

/* =======================
   DEBT
======================= */
async function saveDebt() {
  const debt = {
    client: document.getElementById("debtClient").value,
    amount: document.getElementById("debtAmount").value,
    source: document.getElementById("debtSource").value,
    note: document.getElementById("debtNote").value
  };

  await sendData("addDebt", debt);
  alert("Debt logged ✅");
}