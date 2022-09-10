let isShowList = false;
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
    getCars();
}
function removeLine(lineId) {
    const isRemoved = confirm("Are you sure to remove this line?");
    if (isRemoved) {cars = cars.filter( carItem => carItem.id !== +lineId);
        getCars();
    }
}
function getCars() {
    let elementsOfTable = '';
    cars.forEach((car => {
    //    console.log(car);
        let color = car.isInStock ? 'green' : 'red';
        const id = car.id;
        let tr = `
            <tr class='${color}'>
                <td>${car.name}</td>
                <td>${car.model}</td>
                <td>${car.price}$</td>
                <td>${car.isInStock ? 'Yes' : 'No'}</td>
                <td><button type="button" id="${id}" onclick="removeLine(id)">Remove</button>
                </td>
            </tr>
        `
        elementsOfTable += tr;
    }));
    // console.log(elementsOfTable)
    const tbody = document.querySelector('.tbody');
    tbody.innerHTML = elementsOfTable;
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
getCars();

