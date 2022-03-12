if (localStorage.getItem('name') === null){
    window.location.href = 'index.html';
}

let user_id = localStorage.getItem('userId');
//code to display the expenses
firebase.database().ref('users/' + user_id).on('value',function(snapshot){
    let data = snapshot.val();
    let counter = 1;
    for(let id in data){
        document.querySelector('#display').innerHTML+= `
        <tr>
            <td>${counter}</td>
            <td>${data[id].name}</td>
            <td>${data[id].type}</</td>
            <td>${data[id].amount}</</td>
            <td>${data[id].category}</</td>
            <td>${data[id].date}</td>
        </tr>`;
        counter++;
    }
});



document.querySelector('#user_image').setAttribute('src',localStorage.getItem('picture'));
document.querySelector('#user_name').textContent = localStorage.getItem('name');
document.querySelector('#profile_image').setAttribute('src',localStorage.getItem('picture'));
document.querySelector('#profile_name').textContent = localStorage.getItem('name');

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
document.querySelector('#add_expense').addEventListener('click',() =>{
    let expenseName = document.querySelector('#expense_name').value;
    let expenseType = document.querySelector('#expense_type').value;
    let expenseAmount = document.querySelector('#expense_amount').value;
    let expenseDate = document.querySelector('#expense_date').value;
    let expenseTime = document.querySelector('#expense_time').value;
    let expenseCategory = document.querySelector('#expense_category').value;
    let message =document.querySelector('#message');
    let response = inserData(expenseName,expenseType,expenseAmount,expenseDate,expenseTime,expenseCategory);

    if(response){
        
        message.innerHTML = '<p style="padding: 10px; background-color:green;color:white">Expense Added Successfully</p>';

        document.querySelector('#expense_name').value='';
        document.querySelector('#expense_amount').value='';
        document.querySelector('#expense_date').value='';
        document.querySelector('#expense_time').value='';

    }else{
        //display error message
        message.innerHTML = '<p style="padding: 10px; background-color:red;color:white">Some Error Occured, Expense not added</p>';
        document.querySelector('#expense_name').value='';
        document.querySelector('#expense_amount').value='';
        document.querySelector('#expense_date').value='';
        document.querySelector('#expense_time').value='';
    }

});

function inserData(name,type,amount,date,time,category) {

    firebase.database().ref('users/' + user_id).push({
        name:name,
        type:type,
        amount:amount,
        date:date,
        time:time,
        category:category
    },function(error){
        return 0;
    });

    return 1;
    
}
