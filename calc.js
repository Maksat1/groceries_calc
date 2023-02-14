let name   = document.querySelector('#name');
let price  = document.querySelector('#price');
let amount = document.querySelector('#amount');
let add    = document.querySelector('#add');
let table  = document.querySelector('#table');
let total  = document.querySelector('#total');
total.textContent = 0;

add.addEventListener('click', function() {
	let tr = document.createElement('tr');
	
	allowEdit(createCell(tr, name.value, 'name'));
    allowEdit(createCell(tr, price.value, 'price'));
    allowEdit(createCell(tr, amount.value, 'amount'));
    createCell(tr, price.value * amount.value, 'cost');
        
    let remove = createCell(tr, 'удалить', 'remove');
    
    table.appendChild(tr);
    recountTotal(); 

    remove.addEventListener('click', function() {
        remove.parentElement.remove();
        recountTotal();
    })
});

function createCell(tr, value, name) {
    let td = document.createElement('td');
    td.textContent = value;
    td.classList.add(name);
    tr.appendChild(td);
    return td;
}

function recountTotal() {
    let costs = table.querySelectorAll('.cost');
    let sum = 0;
    if (costs.length === 1) {
        sum = Number(costs[0].textContent);
    } else if (costs.length > 1) {
        for (let cost of costs) {
            sum += Number(cost.textContent);
        }
    }
    total.textContent = sum;
}

function allowEdit(td) {
    td.addEventListener('dblclick', function() {
        let input = document.createElement('input');
        input.value = this.textContent;
        td.textContent = ''
        td.appendChild(input);

        input.addEventListener('keypress', function(event) {
            if (event.key == 'Enter') {
                td.textContent = input.value;

                if (td.classList.contains('price') || td.classList.contains('amount')) {
                    let td_cost = td.parentElement.querySelector('.cost');
                    let td_price = td.parentElement.querySelector('.price');
                    let td_amount = td.parentElement.querySelector('.amount');
                    td_cost.textContent = td_price.textContent * td_amount.textContent;
                    recountTotal();
                }
            }
        })
    })
}