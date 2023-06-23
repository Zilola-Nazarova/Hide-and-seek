function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

if (storageAvailable("localStorage")) {
  let formData = {};
  var userName = document.getElementById('user-name');
  var email = document.getElementById('user-email');
  var message = document.getElementById('user-message');

  if (!localStorage.getItem("userData")) {
    populateStorage();
  } else {
    setValues();
  }

  function populateStorage() {
    formData.name = document.getElementById('user-name').value;
    formData.email = document.getElementById('user-email').value;
    formData.message = document.getElementById('user-message').value;
    localStorage.setItem("userData", JSON.stringify(formData));
    // setValues();
  }

  function setValues() {
    document.getElementById('user-name').value = JSON.parse(localStorage.getItem('userData')).name;
    document.getElementById('user-email').value = JSON.parse(localStorage.getItem('userData')).email;
    document.getElementById('user-message').value = JSON.parse(localStorage.getItem('userData')).message;
  } 

  userName.onkeyup = populateStorage;
  email.onkeyup = populateStorage;
  message.onkeyup = populateStorage;

} else {
}