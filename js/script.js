/*
Treehouse TechDegree:
FSJS Project 2 - Data Pagination and Filtering
*/
const itemsPerPage = 9;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

const showPage = (list, page) => {
    const startIndex = (page * itemsPerPage) - itemsPerPage;
    const endIndex = page * itemsPerPage;
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
    const linkList = document.querySelector("ul.link-list");
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
showPage(data, 1);
addPagination(data);