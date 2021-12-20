var formDuplicate = [];

var fees = [];

var count = 0;


function addDuplicate() {
    count += 1;

    let Duplicates = {

        duplicateCount: count,
        duplicateName: document.getElementById('name').value,
        duplicateDate: document.getElementById('date').value,
        duplicateValue: document.getElementById('value').value
    
    };

    formDuplicate.push(Duplicates);

    clearForm();

    insertDuplicate(Duplicates);

    document.getElementById('btn').style.display = 'inline'
    document.getElementById('btn2').style.display = 'inline'
    document.getElementById('btn3').style.display = 'inline'
    document.getElementById('btn4').style.display = 'inline'
    document.getElementById('btn5').style.display = 'inline'
    document.getElementById('valueMin').style.display = 'inline'
    document.getElementById('valueMax').style.display = 'inline'
    

}

function clearForm() {
    document.getElementById('name').value = "";
    document.getElementById('date').value = "";
    document.getElementById('value').value = "";
}

function insertDuplicate(duplicate) {
    const element = document.getElementById("boxDuplicates");

    const divDuplicates = document.createElement("div");
    divDuplicates.setAttribute('id',duplicate.duplicateCount);
    const name = document.createElement("p");
    const date = document.createElement("p");
    const value = document.createElement("p");
    
    const nameValue = document.createTextNode(duplicate.duplicateName);
    const dateValue = document.createTextNode("Data: " + duplicate.duplicateDate);
    const valueValue = document.createTextNode("Valor: R$" + duplicate.duplicateValue);
    

    name.appendChild(nameValue);
    date.appendChild(dateValue);
    value.appendChild(valueValue);
    
    
    divDuplicates.appendChild(name);
    divDuplicates.appendChild(date);
    divDuplicates.appendChild(value);
    

    element.appendChild(divDuplicates);

}

function computeFees() {
    document.getElementById('btn').style.display = 'none';
    document.getElementById('input').style.display = 'none';
    var feeDate;
    var today = new Date();
    

    formDuplicate.map(function(item){
        var feeValue;
        feeDate = item.duplicateDate;
        var day = parseInt(feeDate.slice(-2));
        var month = parseInt(feeDate.slice(5, 7));
        var year = parseInt(feeDate.slice(0, 4));

        

        var date01 = Date.UTC(year, month, day);
        var date02 = Date.UTC(today.getFullYear(), today.getMonth()+1, today.getUTCDate());
        var auxday = 1000*60*60*24;
        console.log(date01);
        console.log(date02);

        var dif = (date01 - date02)/auxday;
        
        if(dif<0){
            feeValue = ((dif*(-1)*0.001) + 0.02)*item.duplicateValue;
        }else{
            if(dif==0){
                feeValue = item.duplicateValue * 0.02;
            }else{
                feeValue = 0;
            }
        }

        const elem = document.getElementById(item.duplicateCount);
        const taxFee = document.createElement("span");
        const taxFeeValue = document.createTextNode("Juros: R$"+ feeValue);
        taxFee.appendChild(taxFeeValue);
        elem.appendChild(taxFee);
    });
    
}

function sortName() {

    document.getElementById("boxDuplicates").innerHTML = "";
    formDuplicate.sort(compare);
    formDuplicate.forEach(function(item){
            insertDuplicate(item);       
    })
    
}

function compare(a, b) {
    const bandA = a.duplicateName.toUpperCase();
    const bandB = b.duplicateName.toUpperCase();
  
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

  function sortDue() {
    document.getElementById("boxDuplicates").innerHTML = "";
    formDuplicate.sort(compareDate);
    formDuplicate.forEach(function(item){
            insertDuplicate(item);        
    })
  }

  function compareDate(a, b) {
    const bandA = a.duplicateDate.toUpperCase();
    const bandB = b.duplicateDate.toUpperCase();
  
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

  function filterMinValue() {
    document.getElementById("boxDuplicates").innerHTML = "";
    val = document.getElementById('valueMin').value;
    let minn = formDuplicate.filter(minValue => minValue.duplicateValue >= Number(val))
    console.log(minn);

    minn.forEach(function(item){
      insertDuplicate(item);        
    })

  }

  function filterMaxValue() {
    document.getElementById("boxDuplicates").innerHTML = "";
    val2 = document.getElementById('valueMax').value;
    let maxx = formDuplicate.filter(maxValue => maxValue.duplicateValue <= Number(val2))

    maxx.forEach(function(item){
      insertDuplicate(item);        
    })
    
  }
