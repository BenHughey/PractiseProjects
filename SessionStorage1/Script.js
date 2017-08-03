function initiate()
{
    //Sets save and retrieve button as variables
    var saveButton = document.getElementById('save');
    var retrieveButton = document.getElementById('retrieve');
    var deleteButton = document.getElementById('delete');
    var reviewButton = document.getElementById('review');

    //Adds event listeners for buttons
    saveButton.addEventListener('click', saveItem);
    retrieveButton.addEventListener('click', retrieveItem);
    reviewButton.addEventListener('click', reviewAll);
    deleteButton.addEventListener('click', deleteItem);

    
}


function saveItem()
{
    //Gets the keys and values from the form and saves them as variables
    var key = document.getElementById('key').value;
    var value = document.getElementById('value').value;

    //Saves in session storage as key value pair
    sessionStorage[key] = value;
}

function retrieveItem()
{
  var data = document.getElementById('data');
  var key = document.getElementById('key').value;

  var value = sessionStorage[key];
  data.innerHTML = '<div>' + key + ': ' + value + '</div>';


}
function deleteItem()
{
    if (confirm('Delete?'))
    {
        var key = document.getElementById('key').value;
        sessionStorage.removeItem(key);
        data.innerHTML = '<div>Deleted.</div>';
    }
}
function reviewAll()
{
    //Gets a list of all values stored in session storage
    for (var i = 0; i < sessionStorage.length; i++)
    {
        var key = sessionStorage.key(i);
        var value = sessionStorage[key];
        data.innerHTML += '<div>' + key + ': ' + value + '<br></div>';

        
    }
}
addEventListener("load", initiate);