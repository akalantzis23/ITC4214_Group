

let data = [];

let sortingByCourse = 0;

let sortingByGrade = 0;


function getUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

function saveItem() {
 
    let course = document.getElementById('txt-course').value;
    let grade = document.getElementById('txt-grade').value;
    document.getElementById('txt-course').classList.remove("is-invalid");
    document.getElementById('txt-grade').classList.remove("is-invalid");

    if (course === "") {
        document.getElementById('txt-course').classList.add("is-invalid");
        return;
    }
    if (grade === "" || parseInt(grade) < 0 || parseInt(grade) > 100) {
        document.getElementById('txt-grade').classList.add("is-invalid");
        return;
    }


    if (course !== "" && grade !== "") {
        
        data.push({
            id: getUniqueId(), 
            grade: parseFloat(grade)
        });

        
        document.getElementById('txt-course').value = "";
        document.getElementById('txt-grade').value = "";

        reload();
    }
}


function reload() {

    let tbl = document.getElementById('tbl-data');

    if (data.length === 0) {
    
        tbl.innerHTML = `<tr><td colspan="3">No data found.</td></tr>`;
        return;
    }


    let html = ``;
    
    data.forEach(k => html += `<tr><td>${k.course}</td><td class="text-center">${k.grade}</td><td class="text-center"><button class="btn btn-danger" onclick="deleteRecord('${k.id}');"><i class="fa fa-trash m-1"></i>Delete</button></td></tr>`);
   
    tbl.innerHTML = html;
}

function deleteRecord(id) {
  
    let temp = data.filter(k => k.id !== id);
    
    data = temp;
  
    reload();
}


function sortByCourse() {
   
    if (sortingByCourse === 0 || sortingByCourse === 2) {
     
        let sorted = data.sort((a, b) => a.course.localeCompare(b.course));
        
        data = sorted;

        sortingByCourse = 1;

        document.getElementById('btn-sort-course').classList.remove("fa-sort-alpha-down");
        document.getElementById('btn-sort-course').classList.add("fa-sort-alpha-down-alt");
    }

    else if (sortingByCourse === 1) {
 
        let sorted = data.sort((a, b) => a.course.localeCompare(b.course));
        
       
        data = sorted.reverse();

        sortingByCourse = 2;
        
        document.getElementById('btn-sort-course').classList.remove("fa-sort-alpha-down-alt");
        document.getElementById('btn-sort-course').classList.add("fa-sort-alpha-down");
    }


    reload();
}


function sortByGrade() {
   
    if (sortingByGrade === 0 || sortingByGrade === 2) {
      
        let sorted = data.sort((a, b) => a.grade - b.grade);
    
        data = sorted;
     
        sortingByGrade = 1;

        document.getElementById('btn-sort-grade').classList.remove("fa-sort-numeric-down");
        document.getElementById('btn-sort-grade').classList.add("fa-sort-numeric-down-alt");
    }
    else if (sortingByGrade === 1) {

        let sorted = data.sort((a, b) => b.grade - a.grade);
        
        data = sorted;
      
        sortingByGrade = 2;
     
        document.getElementById('btn-sort-grade').classList.remove("fa-sort-numeric-down-alt");
        document.getElementById('btn-sort-grade').classList.add("fa-sort-numeric-down");
    }

  
    reload();
}