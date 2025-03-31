const menuItems = [
    { name: "🍕 بيتزا", price: 50 },
    { name: "🍔 برجر", price: 30 },
    { name: "🌯 شاورما", price: 25 },
    { name: "🥤 مشروب غازي", price: 10 }
];

const selectedItems = new Set();
const menuDiv = document.getElementById("menu");
const sendOrderButton = document.getElementById("sendOrder");

menuItems.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("menu-item");
    div.textContent = `${item.name} - ${item.price} جنيه`;
    div.onclick = () => {
        if (selectedItems.has(item.name)) {
            selectedItems.delete(item.name);
            div.classList.remove("selected");
        } else {
            selectedItems.add(item.name);
            div.classList.add("selected");
        }
    };
    menuDiv.appendChild(div);
});

sendOrderButton.onclick = () => {
    if (selectedItems.size === 0) {
        alert("❌ الرجاء اختيار عنصر على الأقل!");
        return;
    }
    
    const order = Array.from(selectedItems).join(", ");
    Telegram.WebApp.sendData(order); // يرسل الطلب للبوت
    Telegram.WebApp.close(); // إغلاق النافذة بعد الإرسال
};