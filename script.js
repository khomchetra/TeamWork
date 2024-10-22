document.addEventListener("DOMContentLoaded" , function () {
  var data = [];
  var Currentindex = -1;
  
  
  
  document.getElementById("studentform").addEventListener("submit", function (event) {
    event.preventDefault();
  
    var name = document.getElementById("firstname").value.trim();
    var lastname = document.getElementById("lastname").value.trim();
    var gmail = document.getElementById("gmail").value.trim();
    var password = document.getElementById("password").value.trim();
  
    if (validateform()) {
     
      var student = {
        name: name,
        lastname: lastname,
        gmail: gmail,
        password: password,
      };
      addata(student); // Ensure addata is defined elsewhere
      console.log(student);
      displaydata(); // Ensure displaydata is defined elsewhere
    clear(); // Ensure clearform is defined elsewhere
    }
  });

 
  
  function addata(student) {
    data.push(student);
  }

  function displaydata() {
    var TableBody = document.getElementById("displaydata");
    TableBody.innerHTML = ""; // Clearing existing rows

    data.forEach(function (items, index) {
        var row = document.createElement("tr");
        row.innerHTML = `
        <td> ${index + 1} </td>
        <td> ${items.firstname} </td>
        <td> ${items.lastname} </td>
        <td> ${items.gmail} </td>
        <td> ${items.password} </td>
        <td> 
         <button class="btn btn-primary" id="btnedit-${index}"> Edit </button>
         <button class="btn btn-danger" id="btndelete-${index}"> Delete </button> 
        </td>
        `;
        
        TableBody.appendChild(row);

        // Attach event listener to the edit button
        row.querySelector(`#btnedit-${index}`).addEventListener("click", function () {
            editdata(index);
            // Disable all buttons except the edit button in the current row
            disableAllButtonsExcept(index);
        });

        // Attach event listener to the delete button
        row.querySelector(`#btndelete-${index}`).addEventListener("click", function () {
            if (!this.disabled) {
                deletestudent(index);
            }
        });
    });
}
document.getElementById('btnsave').onclick = function() {
  savedite();
  // Re-enable all buttons after saving
  enableAllButtons();
};


function disableAllButtonsExcept(activeIndex) {
    var editButtons = document.querySelectorAll('button[id^="btnedit"]');
    var deleteButtons = document.querySelectorAll('button[id^="btndelete"]');

    editButtons.forEach(function (button, index) {
        if (index !== activeIndex) {
            button.disabled = true;
        } else {
            button.disabled = false; // Ensure the active row's edit button is enabled
        }
    });

    deleteButtons.forEach(function (button, index) {
        if (index !== activeIndex) {
            button.disabled = true;
        } else {
            button.disabled = true; // Disable the delete button in the current row
        }
    });
}
function enableAllButtons() {
  var editButtons = document.querySelectorAll('button[id^="btnedit"]');
  var deleteButtons = document.querySelectorAll('button[id^="btndelete"]');

  editButtons.forEach(function (button) {
      button.disabled = false;
  });

  deleteButtons.forEach(function (button) {
      button.disabled = false;
  });
}
  
  
  function editdata(index) {
     // Index represent specified data in array 
      var objectstudent = data[index];  // indext in array = 0 
    document.getElementById("autoindex").value = index + 1;  // index 0+1 =1 for first time user click on first row in the table 
    document.getElementById("firstname").value = objectstudent.firstname;
    document.getElementById("lastname").value = objectstudent.lastname;
    document.getElementById("gmail").value = objectstudent.gmail;
    document.getElementById("password").value = objectstudent.password;
    Currentindex = index; // specified index in array 
    document.getElementById('btnsubmit').style.display = 'none';
    document.getElementById('btnsave').style.display = 'inline-block';
    
  }
  


  function savedite()
  {
  if (validateform()){
    if (Currentindex !== -1) {
      // Update the student object in the data array at the specified index
      data[Currentindex] = {
        autoindex: document.getElementById('autoindex').value,
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        gmail: document.getElementById("gmail").value,
        password: document.getElementById("password").value
      };

    // Reset Currentindex and toggle button visibility
      Currentindex = -1;
      document.getElementById('btnsubmit').style.display = 'inline-block';
      document.getElementById('btnsave').style.display = 'none';
  
      displaydata();
      clear();
    }
  }
   
  }
  document.getElementById('colorpicker').addEventListener('input' , function (){
    var selectedcolor = this.value;
    document.getElementById('displaydata').style.background = selectedcolor;
  });


  function deletestudent(index) {
    data.splice(index, 1);
    displaydata();
  }



  function clear() {
    document.getElementById('autoindex').value = "";
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("gmail").value = "";
    document.getElementById("password").value = "";
    Currentindex = -1;
  }
 












  // Add event listeners to clear errors on input
  document.getElementById("firstname").addEventListener("input", function () {
    clearError("firstname-error", "firstname");
  });
  document.getElementById("lastname").addEventListener("input", function () {
    clearError("lastname-error", "lastname");
  });
  document.getElementById("gmail").addEventListener("input", function () {
    clearError("gmail-error", "gmail");
  });
  document.getElementById("password").addEventListener("input", function () {
    clearError("password-error", "password");
  });
  

  function validateform(){
    var firstname = document.getElementById("firstname").value.trim();
    var lastname = document.getElementById("lastname").value.trim();
    var gmail = document.getElementById("gmail").value.trim();
    var password = document.getElementById("password").value.trim();
    var isvalid = true;
    var prevetname = /^[A-Za-z]+$/;
    var validGmail = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
  
    if (firstname === "") {
      showerror("firstname-error", "Please enter your first name", "firstname");
      isvalid = false;
    } else if (!prevetname.test(firstname)){
      showerror("firstname-error", "First name should contain only letters", "firstname");
      isvalid = false;
    }
    else {
      hideerror("firstname-error", "firstname");
    }
  
    if (lastname === "") {
      showerror("lastname-error", "Please enter your last name", "lastname");
      isvalid = false;
    }else if (!prevetname.test(lastname)) {
      showerror("lastname-error", "Last name should contain only letters", "lastname");
      isvalid = false;
  } else {
      hideerror("lastname-error", "lastname");
    }
  
    if (gmail === "") {
      showerror("gmail-error", "Please enter your Gmail", "gmail");
      isvalid = false;
    } else if (!validGmail.test(gmail)) {
      showerror("gmail-error", "Please enter a valid Gmail address ending with @gmail.com", "gmail");
      isvalid = false;
    } 
    else {
      hideerror("gmail-error", "gmail");
    }
  
    if (password === "") {
      showerror("password-error", "Please enter your password", "password");
      isvalid = false;
    } else {
      hideerror("password-error", "password");
    }
    return isvalid;
  
  }
  function showerror(id, message, inputId) {
    var errorElement = document.getElementById(id);
    var border = document.getElementById(inputId);
    errorElement.innerHTML = message;
    errorElement.style.display = "block";
    border.classList.add("error-border");
  }
  
  function clearError(id, inputId) {
    var errorElement = document.getElementById(id);
    var inputElement = document.getElementById(inputId);
    if (errorElement && inputElement) {
      errorElement.style.display = "none";
      inputElement.classList.remove("error-border");
    }
  }
  
  function hideerror(id, inputId) {
    var errorElement = document.getElementById(id);
    var inputElement = document.getElementById(inputId);
    errorElement.style.display = "none";
    inputElement.classList.remove("error-border");
  }
  
  





});