/*
Treehouse TechDegree:
FSJS Project 2 - Data Pagination and Filtering
*/
const studentsPerPage = 9;
const linkList = document.querySelector("ul.link-list");

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

const showSearch = (data) => {
    const header = document.querySelector("header");
    const searchHTML = `
        <label for="search" class="student-search">
          <span>Search by name</span>
          <input id="search" placeholder="Search by name...">
          <button type="button"><img src="./img/icn-search.svg" alt="Search icon"></button>
        </label>    
    `;
    header.insertAdjacentHTML("beforeend", searchHTML);
    const searchBox = document.querySelector(".student-search input");
    const searchButton = document.querySelector(".student-search button");

    const filterStudents = () => {
        let filteredStudents = [];
        let errorMessage = document.querySelector(".no-results");

        if (errorMessage){
            errorMessage.remove();
        }

        for (let i=0; i<data.length; i++) {
            const name = data[i].name.first.toUpperCase() + data[i].name.last.toUpperCase();
            if (name.includes(searchBox.value.toUpperCase())){
                filteredStudents.push(data[i]);
            }

            showPage(filteredStudents, 1);
            addPagination(filteredStudents);
        }

        if (filteredStudents.length === 0) {
            errorMessage = `<h1 class="no-results">Search failed successfully!</h1>`
            header.insertAdjacentHTML("beforeend", errorMessage);
            linkList.innerHTML = "";
        }
    }

    searchBox.addEventListener("keyup", () => {
        filterStudents();
    });

    searchButton.addEventListener("click", () => {
        filterStudents();
    });
}

const showPage = (list, page) => {
    const startIndex = (page * studentsPerPage) - studentsPerPage;
    const endIndex = page * studentsPerPage;
    const studentUL = document.querySelector("ul.student-list");
    studentUL.innerHTML = "";

    for (let i=startIndex; i>=startIndex && i<endIndex; i++){
        let student = list[i];
        if (student) {
            let studentImgPath = `${student.picture.large}`;
            let studentFullName = `${student.name.title}. ${student.name.first} ${student.name.last}`;
            let studentEmail = `${student.email}`;
            let studentDateRegistered = `${student.registered.date}`
            const studentTemplate = `
                <li class="student-item cf">
                    <div class="student-details">
                        <img class="avatar" src="${studentImgPath}" alt="Profile Picture">
                        <h3>${studentFullName}</h3>
                        <span class="email">${studentEmail}</span>
                     </div>
                     <div class="joined-details">
                        <span class="date">Joined ${studentDateRegistered}</span>
                     </div>
                </li>
            `;

            studentUL.insertAdjacentHTML("beforeend", studentTemplate);
        }
    }

    return studentUL;
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

const addPagination = (list) => {
    const numOfPages = Math.floor((list.length / 9) + 1) ;
    linkList.innerHTML = "";

    for (let i=1; i<=numOfPages; i++){
        let button = `
            <li>
                <button type="button">${i}</button>
            </li>
        `;
        linkList.insertAdjacentHTML("beforeend", button)
    }

    linkList.querySelector("button").className = "active";

    linkList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON"){
            let buttons = linkList.getElementsByTagName("BUTTON");
            for (let i=0; i<buttons.length; i++){
                buttons[i].className = "";
                e.target.className = "active";
            }
            showPage(list, e.target.textContent);
        }
    });
}

// Call functions
showSearch(data);
showPage(data, 1);
addPagination(data);