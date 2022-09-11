let isShowList = false;
let currentCarId = 0;
let cars = [
    {
        id: 1,
        name: 'Jaguar',
        model: 'FX-300',
        price: 50000,
        isInStock: true
    },
    {
        id: 2,
        name: 'Mazda',
        model: 'CX-9',
        price: 30000,
        isInStock: false
    },
    {
        id: 3,
        name: 'BMW',
        model: "X5",
        price: 70000,
        isInStock: true
    }

];

function addToLocalStorage() {
    localStorage.setItem('cars', JSON.stringify(cars));
}

function addCarLine() {
    const currentId = Math.floor(Date.now() + Math.random());
    const currentName = document.querySelector("#carName").value;
    const currentModel = document.querySelector("#carModel").value;
    const currentPrice = document.querySelector("#carPrice").value;
    const currentIsInStock = document.querySelector("#carIsInStock").checked;
    cars.push({
        id: currentId,
        name: currentName,
        model: currentModel,
        price: currentPrice,
        isInStock: currentIsInStock
    });
    document.querySelectorAll('input').forEach(el => el.value = '');
    document.querySelector('#carIsInStock').checked = false;
    getCars(false);

}
function removeLine(lineId) {
    const isRemoved = confirm("Are you sure to remove this line?");
    if (isRemoved) {cars = cars.filter( carItem => carItem.id !== +lineId);
        getCars(false);
    }
}

function editLine(lineId) {
    currentCarId = +lineId;
    const modal = document.querySelector('#modalEditCar');
    modal.style.display = 'block';
    const currentCar = cars.find(carItem => carItem.id === +lineId);
    document.querySelector("#editCarName").value = currentCar.name;
    document.querySelector("#editCarModel").value = currentCar.model;
    document.querySelector("#editCarPrice").value = currentCar.price;
    document.querySelector("#editCarIsInStock").checked = currentCar.isInStock;
}

function modalClose() {
    const modal = document.querySelector('#modalEditCar');
    modal.style.display = 'none';
}
function updateCarLine() {
    const editName = document.querySelector("#editCarName").value;
    const editModel = document.querySelector("#editCarModel").value;
    const editPrice = document.querySelector("#editCarPrice").value;
    const editIsInStock = document.querySelector("#editCarIsInStock").checked;
    cars.forEach(carItem => {
        if (carItem.id === currentCarId) {
            carItem.name = editName;
            carItem.model = editModel;
            carItem.price = editPrice;
            carItem.isInStock = editIsInStock;
        }
    });
    modalClose();
    getCars(false);
}

function getCars(isFirstTime) {
    const localStorageCars = localStorage.getItem('cars');
    if (localStorageCars && isFirstTime) {
        cars = JSON.parse(localStorageCars)
    }
    let elementsOfTable = '';
    cars.forEach((car => {
        let color = car.isInStock ? 'green' : 'red';
        const id = car.id;
        let tr = `
            <tr class='${color}'>
                <td>${car.name}</td>
                <td>${car.model}</td>
                <td>${car.price}$</td>
                <td>${car.isInStock ? 'Yes' : 'No'}</td>
                <td>
                    <button type="button" id="${id}" onclick="editLine(id)">Edit</button>
                    <button type="button" id="${id}" onclick="removeLine(id)">Remove</button>
                </td>
            </tr>
        `
        elementsOfTable += tr;
    }));
    const tbody = document.querySelector('.tbody');
    tbody.innerHTML = elementsOfTable;
    addToLocalStorage();
}

function toggleList() {
    this.isShowList = !this.isShowList;
    const el = document.querySelector('#table');
    if (this.isShowList) {
       el.classList.add('show');
    } else {
        el.classList.remove('show');
    }

}
getCars(true);

