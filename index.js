
// creating an empty array to store all the records
let data = [];
// create variable to keep state of sorting by course
let sortingByCourse = 0;
// create variable to keep state of sorting by grade
let sortingByGrade = 0;

// function to create unique ID for each record
function getUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

// function to save item in our array
function saveItem() {
    // get values from UI
    let course = document.getElementById('txt-course').value;
    let grade = document.getElementById('txt-grade').value;
    document.getElementById('txt-course').classList.remove("is-invalid");
    document.getElementById('txt-grade').classList.remove("is-invalid");

    if(course === "") {
        document.getElementById('txt-course').classList.add("is-invalid");
        return;
    }
    if(grade === "" || parseInt(grade) < 0 || parseInt(grade) > 100) {
        document.getElementById('txt-grade').classList.add("is-invalid");
        return;
    }

    // validate if values are valid
    if(course !== "" && grade !== "") {
        // if valid,
        // save the object in the data array
        data.push({
            id: getUniqueId(), // add unique ID with each object, that will be helpful for deletion
            course: course,
            grade: parseFloat(grade)
        });

        // empty the fields on UI
        document.getElementById('txt-course').value = "";
        document.getElementById('txt-grade').value = "";
        // reload the data into table
        reload();
    }
}

// function that would reload the table on UI
function reload() {
    // set variable to the table element
    let tbl = document.getElementById('tbl-data');
    // if there is no data
    if(data.length === 0) {
        // render no data found message
        tbl.innerHTML = `<tr><td colspan="3">No data found.</td></tr>`;
        return;
    }

    // if there are data in array
    // create its html that will be rendered on UI as table <tr>
    let html = ``;
    // loop through the data array, and create its <tr>
    data.forEach(k => html += `<tr><td>${k.course}</td><td class="text-center">${k.grade}</td><td class="text-center"><button class="btn btn-danger" onclick="deleteRecord('${k.id}');"><i class="fa fa-trash m-1"></i>Delete</button></td></tr>`);
    // set the html on UI
    tbl.innerHTML = html;
}

// function to delete a record from our array
function deleteRecord(id) {
    // find all elements but not the element who's ID is passed as input
    let temp = data.filter(k => k.id !== id);
    // set remaining items as our new array
    data = temp;
    // reload the rows in table
    reload();
}

// function to sort by course name
function sortByCourse() {
    // check if the sorting state is A->Z or Z->A
    // 0 or 2 means we need to sort it A->Z
    if (sortingByCourse === 0 || sortingByCourse === 2) {
        // sort our data array
        let sorted = data.sort((a, b) => a.course.localeCompare(b.course));
        // set sorted array as our data source
        data = sorted;
        // change sorting state to 1, so that next time user sorts the other way
        sortingByCourse = 1;
        // change icon
        document.getElementById('btn-sort-course').classList.remove("fa-sort-alpha-down");
        document.getElementById('btn-sort-course').classList.add("fa-sort-alpha-down-alt");
    }
    // 1 means we need to sort it Z->A
    else if (sortingByCourse === 1) {
        // sort our data array
        let sorted = data.sort((a, b) => a.course.localeCompare(b.course));
        // reverse array to make it Z->A
        // set sorted array as our data source
        data = sorted.reverse();
        // change sorting state to 1, so that next time user sorts the other way
        sortingByCourse = 2;
        // change icon
        document.getElementById('btn-sort-course').classList.remove("fa-sort-alpha-down-alt");
        document.getElementById('btn-sort-course').classList.add("fa-sort-alpha-down");
    }

    // reload trs in table
    reload();
}

// function to sort by course grade
function sortByGrade() {
    // check if the sorting state is 1->9 or 9->1
    // 0 or 2 means we need to sort it 1->9
    if (sortingByGrade === 0 || sortingByGrade === 2) {
        // sort
        let sorted = data.sort((a, b) => a.grade - b.grade);        
        // set sorted array as our data source
        data = sorted;
        // change sorting state to 1, so that next time user sorts the other way
        sortingByGrade = 1;
        // change icon
        document.getElementById('btn-sort-grade').classList.remove("fa-sort-numeric-down");
        document.getElementById('btn-sort-grade').classList.add("fa-sort-numeric-down-alt");
    }
    else if (sortingByGrade === 1) {
        // sort
        let sorted = data.sort((a, b) => b.grade - a.grade);
        // set sorted array as our data source
        data = sorted;
        // change sorting state to 1, so that next time user sorts the other way
        sortingByGrade = 2;
        // change icon
        document.getElementById('btn-sort-grade').classList.remove("fa-sort-numeric-down-alt");
        document.getElementById('btn-sort-grade').classList.add("fa-sort-numeric-down");
    }

    // reload trs in table
    reload();
}