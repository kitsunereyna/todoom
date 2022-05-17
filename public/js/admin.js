displayAllUsers();

function addParams(){
  const deleteButtons = document.querySelectorAll(".userList-delete");
  const sortByNameBtn = document.getElementById("sortName");
  const sortByCityBtn = document.getElementById("sortCity");

  sortByNameBtn.addEventListener("click", sortByName);
  sortByCityBtn.addEventListener("click", sortByCity);

  deleteButtons.forEach(element => {
    element.addEventListener("click", deleteUser);
  });

}

async function deleteUser(event) {
  const userID = event.target.dataset.id;

  try {
    const rawResponse = await fetch("http://localhost:8000/admin/delete-user", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userID: userID }),
  });
  const response = await rawResponse.json();

  if (response.success) {
    window.location.reload();
  } else console.log(response.error);
  } catch (error) {
    alert(error)
  }
}

async function displayAllUsers() {
  const response = await fetchUserList();
  if (!response) return alert("No users");

  putBoxToUserList(response); 
  addParams();
}

async function fetchUserList() {
  const rawResponse = await fetch("http://localhost:8000/api/admin/get/users");
  const response = await rawResponse.json();
  return response;
}

function putBoxToUserList(response) {
  const userList = document.querySelector(".userList");
  const list = document.createElement("ul");

  response.forEach(user => {
    const userBox = putUsersToBox(
      user._id,
      user.userName,
      user.userEmail,
      user.userCity,
    );
    if(user.isAdmin == false){
    list.innerHTML = [list.innerHTML, userBox].join("");
    } else return;
  });
  userList.appendChild(list);
}

function putUsersToBox(id, name, email, city) {
  return `<div class="userBox">
  <li> 
      <div class="userInfo">
          <div class="userList-name bold">
              <p>User name: ${name} </p>
              
          </div>
          <div class="userList-email info">
              <p class="userEmail bold">User e-mail: </p>
              <p class="emailBody">${email} </p>
          </div>
          <div class="userList-city info">
              <p class="userCity bold">User city: </p>
              <p class="cityBody">${city} </p>
          </div>
      </div>
  </li> 
  <li> 
      <div class="adminBtns">
          <button class="userList-edit btn admin" data-id=${id}>
              Edit 
          </button>
          <button class="userList-delete btn admin" data-id=${id}>
              Delete 
          </button>
      </div>
  </li>
</div>`;
}

async function sortByName() {
  const response = await fetchUserList();
  if(!response) return alert("No users to sort")
  const filteredResponse = response.sort((a, b) => a.userName.localeCompare(b.userName))

  const userList = document.querySelector(".userList");
  userList.innerHTML = "";

  console.log(response);

  putBoxToUserList(filteredResponse);
  addParams();
}

async function sortByCity() {
  const response = await fetchUserList();
  if(!response) return alert("No users to sort")
  const filteredResponse = response.sort((a, b) => a.userCity.localeCompare(b.userCity))

  const userList = document.querySelector(".userList");
  userList.innerHTML = "";

  console.log(response);

  putBoxToUserList(filteredResponse);
  addParams();
}

async function editUser(){
  const response = await fetchUserList();
  if(!response) return alert("No users to edit")
  const userList = document.querySelector(".userList");
  const name = userList.findOne({name: userName})


}

