let beginBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],
    inputMainExp = document.getElementsByClassName('expenses-item'),
    inputOptExp = document.querySelectorAll('.optionalexpenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

beginBtn.addEventListener('click', function() {
    time = prompt ("Введите дату в формате YYYY-MM-DD");
    money = +prompt ('Ваш бюджет на месяц?', 1000);
    
    while(isNaN(money) || money == "" || money == null) {
        money = +prompt ('Ваш бюджет на месяц?', 1000);
    }

    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money;
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDay();
});

let finalExpenses = 0;

expensesBtn.addEventListener('click', function(){
    let sum = 0;
    for (let i = 0; i < inputMainExp.length; i++) {

        let qExpFirst = inputMainExp[i].value;
        let qoExpFirst = inputMainExp[++i].value;
    
        if( (typeof(qExpFirst)) === 'string' && (typeof(qExpFirst)) != null && (typeof(qoExpFirst)) != null && qExpFirst != '' && qoExpFirst != '' && qExpFirst.length < 50) {
            console.log('done');
            appData.expenses[qExpFirst] = qoExpFirst;
            sum += +qoExpFirst;
        } else{
            alert("ВВедите корректные данные");
            i--;
        } 
    }
    expensesValue.textContent = sum;
    finalExpenses = +sum;
});

optionalExpensesBtn.addEventListener('click', function() {
    for (let i = 0; i < inputOptExp.length; i++){

        let qOptExpFirst = inputOptExp[i].value;

        appData.optionalExpenses[i] = qOptExpFirst;
            
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

countBtn.addEventListener("click", function(){
    if (appData.budget != undefined){
        appData.moneyPerDay = ((appData.budget - finalExpenses)/ 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;

        if(appData.moneyPerDay <= 20) {
            levelValue.textContent = 'Минимальный уровень достатка';
        }else if(appData.moneyPerDay < 50){
            levelValue.textContent = 'Средний уровень достатка';
        }else if(appData.moneyPerDay >= 50){
            levelValue.textContent = 'Высокий уровень достатка';
        }else{
            levelValue.textContent = 'Херня какая-то';
        }
    } else{
        alert('Вы ничего не ввели?');
    }
});

incomeItem.addEventListener('input', function(){
    let items = incomeItem.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function(){
    if(appData.savings == true){
        appData.savings = false;
    } else{
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function(){
    if(appData.savings == true) {
        let sum = +sumValue.value,
        percent = +percentValue.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', function(){
    if(appData.savings == true) {
        let sum = +sumValue.value,
        percent = +percentValue.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budget: money,
    timeData: time,
    expenses:{},
    optionalExpenses:{},
    income:[],
    savings: false,
};
