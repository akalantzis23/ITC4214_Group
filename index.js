let data = [];

let sortingByCourse = 0;

let sortingByGrade = 0;


function getUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}


function saveItem() {
    
    let course = document.getElementById('txt-course').value;
    let grade = document.getElementById('txt-grade').value;
    
    if(course !== "" && grade !== "") {
        
        
        data.push({
            id: getUniqueId(), 
            course: course,
            grade: parseFloat(grade)
        });

        
        document.getElementById('txt-course').value = "";
        document.getElementById('txt-grade').value = "";
        
        reload();
    }
}


function reload() {
    
    let tbl = document.getElementById('tbl-data');
    
    if(data.length === 0) {
        
        tbl.innerHTML = `<tr><td colspan="3">No data found.</td></tr>`;
        return;
    }

    
    
    let html = ``;
    
    data.forEach(k => html += `<tr><td>${k.course}</td><td class="text-center">${k.grade}</td><td class="text-center"><button class="btn btn-danger" onclick="deleteRecord('${k.id}');"><i class="fa fa-trash m-1"></i>Delete</button></td></tr>`);
    
    tbl.innerHTML = html;
}