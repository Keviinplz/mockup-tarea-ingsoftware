const selectAccountsButtonsList = Array.from(document.getElementsByClassName("select-account"));
const deleteDetailButtonsList = Array.from(document.getElementsByClassName("button"));

function cleanPrice(price){
    price = price.substring(1);
    price = price.replace('.', '');
    price = Number(price);
    return price;
}

function addSumToDetailTable(price){
    sumNode = document.getElementById("sum");
    previosPrice = cleanPrice(sumNode.textContent);
    price = cleanPrice(price);
    console.log(previosPrice);
    newPrice = previosPrice + price;
    sumNode.innerHTML = String(newPrice);
}

function createDetailElement(name, price){
    let removeButton = document.createElement('button');
    removeButton.className = 'button'
    removeButton.innerHTML = "&times;";
    removeButton.addEventListener('click', () => {
        removeButton.parentElement.parentElement.remove();
    })
    let trElement = document.createElement('tr');
    let tdName = document.createElement('td');
    tdName.innerHTML = name;
    let tdPrice = document.createElement('td');
    tdPrice.innerHTML = price;
    addSumToDetailTable(price);
    let tdDeleteButton = document.createElement('td');
    tdDeleteButton.append(removeButton);
    trElement.append(tdName);
    trElement.append(tdPrice);
    trElement.append(tdDeleteButton);
    return trElement;
}

// Listen to button click to change status to payed
selectAccountsButtonsList.forEach(button => {
    button.addEventListener('click', () => {
        if (button.className !== 'select-account-toggled') {
            button.className = 'select-account-toggled'
            button.innerHTML = "Seleccionado";
            tableBody = document.getElementById("details");
            let nameAccount = button.parentElement.parentElement.children[0].children[0].innerText;
            let priceAccount = button.previousElementSibling.innerHTML;
            const trElement = createDetailElement(nameAccount, priceAccount);
            tableBody.prepend(trElement);
        }
        else {
            button.className = 'select-account';
            button.innerHTML = "Seleccionar";
        }
    });
});

// Listen to button click to delete button from table
deleteDetailButtonsList.forEach(button => {
    button.addEventListener('click', () => {
        button.parentElement.parentElement.remove();
    })
});