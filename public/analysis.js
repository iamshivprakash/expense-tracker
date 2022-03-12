if (localStorage.getItem('name') === null){
    window.location.href = 'index.html';
}
document.querySelector('#profile').setAttribute('src',localStorage.getItem('picture'));
document.querySelector('#user_name').textContent = localStorage.getItem('name');

let user_id = localStorage.getItem('userId');
let category = ['bills','rent','grocery','medical','home'];
let expensecategory = [];
let debit = 0;
let credit =0;
//code to display the expenses
firebase.database().ref('users/' + user_id).on('value',function(snapshot){
    let data = snapshot.val();
    category.forEach(function(value){
        let amount = 0;
        for(let id in data){
            if(data[id].category === value){
                amount=amount+Number(data[id].amount);
            }
        }
        expensecategory.push(amount);
    })

    for(let id in data){
        if(data[id].type ==='debit'){
            debit = debit+Number(data[id].amount);
        }else{
            credit = credit+Number(data[id].amount);
        }
    }
    // console.log(debit,credit);
    document.querySelector('#total_expense').innerHTML = debit;
    document.querySelector('#total_income').textContent = credit;
    document.querySelector('#total_saving').textContent = credit-debit;
    // console.log(type of debit);
});


document.querySelector('#logout').addEventListener('click',() => {
    localStorage.removeItem('name');
    localStorage.removeItem('picture');
    localStorage.removeItem('userId');
    // firebase.auth().signOut().then(() => {
    //     // Sign-out successful.
    //     console.log("logout hoga");
    //     alert("logout hoga");
    //   }).catch((error) => {
    //     // An error happened.
    //   });
});

let bargraph = document.querySelector('#bargraph').getContext('2d');
let chart = new Chart(bargraph,{
    type:'bar',
    data:{
        labels:category,
        datasets:[{
            label:'Category Wise Expense',
            data:expensecategory,
            backgroundColor:['#1418cb','#f3cf1a','#98fg2d','#20e2db','#08e23e']
        }]
    }
});

let piegraph = document.querySelector('#piegraph').getContext('2d');
let piechart = new Chart(piegraph,{
    type:'pie',
    data:{
        labels:category,
        datasets:[{
            label:'Category Wise Expense',
            data:expensecategory,
            backgroundColor:['#1418cb','#f3cf1a','#98fg2d','#20e2db','#08e23e']
        }]
    }
});