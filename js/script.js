/***
 *
 * Team Treehouse TechDegree -- Project 2
 * Data Pagination and Filtering
 *
 * Dynamically paginates a provided array of mock students
 * Adds search functionality
 */

/*
    Global variables
 */
const studentsPerPage = 9;
const linkList = document.querySelector("ul.link-list");

/*
    `showSearch` function
    This function will create search functionality while maintaining the correct number
    Of students per page
*/
const showSearch = (data) => {
    const header = document.querySelector("header");
    // HTML to append for search field
    const searchHTML = `
        <label for="search" class="student-search">
          <span>Search by name</span>
          <input id="search" placeholder="Search by name...">
          <button type="button"><img src="./img/icn-search.svg" alt="Search icon"></button>
        </label>    
    `;
    // Append search field
    header.insertAdjacentHTML("beforeend", searchHTML);

    const searchBox = document.querySelector(".student-search input");
    const searchButton = document.querySelector(".student-search button");

    // Filter students based on search results
    const filterStudents = () => {

        // Array to hold search results
        let filteredStudents = [];

        // Initially remove search error message if applicable
        let errorMessage = document.querySelector(".no-results");
        if (errorMessage){
            errorMessage.remove();
        }

        for (let i=0; i<data.length; i++) {
            const student = data[i];

            //Combine first and last names for search versatility
            const studentName = student.name.first.toUpperCase() + student.name.last.toUpperCase();

            // Insert students that match search
            if (studentName.includes(searchBox.value.toUpperCase())){
                filteredStudents.push(student);
            }

            // Refresh content with search results
            showPage(filteredStudents, 1);
            addPagination(filteredStudents);
        }

        // Display error if search does not yield results
        if (filteredStudents.length === 0) {
            errorMessage = `<h1 class="no-results">&#x1f616;  Sorry, no results found</h1>`
            header.insertAdjacentHTML("beforeend", errorMessage);
            linkList.innerHTML = "";
        }
    }

    /** Event Listeners **/
    searchBox.addEventListener("keyup", () => {
        filterStudents();
    });

    searchButton.addEventListener("click", () => {
        filterStudents();
    });
}

/*
    `showPage` function
    This function will create and insert/append the elements needed to display a "page" of nine students
*/

const showPage = (list, page) => {
    const startIndex = (page * studentsPerPage) - studentsPerPage;
    const endIndex = page * studentsPerPage;
    const studentUL = document.querySelector("ul.student-list");

    // Initially clear the content
    studentUL.innerHTML = "";

    for (let i=startIndex; i>=startIndex && i<endIndex; i++){
        let student = list[i];

        if (student) {

            // Student data
            let studentImgPath = `${student.picture.large}`;
            let studentFullName = `${student.name.title}. ${student.name.first} ${student.name.last}`;
            let studentEmail = `${student.email}`;
            let studentDateRegistered = `${student.registered.date}`

            // HTML template for student to be inserted
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
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

const addPagination = (list) => {
    const numOfPages = Math.floor((list.length / 9) + 1) ;
    const clearButtons = () => {
        linkList.innerHTML = "";
    }

    // Initially remove all buttons
    clearButtons();

    // Create a button for each page needed
    for (let i=1; i<=numOfPages; i++){
        let button = `
            <li>
                <button type="button">${i}</button>
            </li>
        `;
        linkList.insertAdjacentHTML("beforeend", button)
    }

    // Initially make the first page button active if applicable
    linkList.querySelector("button").className = "active";

    /** Filter student content based on page number clicked **/
    linkList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON"){
            let buttons = linkList.getElementsByTagName("BUTTON");
            for (let i=0; i<buttons.length; i++){
                // Add active class to only the clicked button
                buttons[i].className = "";
                e.target.className = "active";
            }

            // Display filtered results
            showPage(list, e.target.textContent);
        }
    });

    // Remove the button if there is only one page of students (redundant)
    if (numOfPages === 1){
        clearButtons();
    }
}

// Call functions
showSearch(data);
showPage(data, 1);
addPagination(data);