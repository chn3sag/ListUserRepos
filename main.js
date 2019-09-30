/**
 * Call the GitHub API to list the repos for the user
 * @param {userName} GitHub user handle
 */
function getRepos(userName) {
const url = `https://api.github.com/users/${userName}/repos`;

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if(response.status===404) {
                throw new Error("User Not Found");
            }
            throw new Error(response.json().message);
        })
        .then(responseJson=>updateDOM(userName,responseJson))
        .catch(err => {
            $('.js-error-message').text(`Oops! Something went wrong: ${err.message}`);
    });
}

/**
 * Update the DOM
 * @param {userName} GitHub userName 
 * @param {responseJson} response from api as JSON 
 */
function updateDOM(userName,responseJson) {
    $('.github-repos').append(`<h2 class="user">Repos for ${userName}</h2>`);
    for (let i = 0; i < responseJson.length ; i++){
        $('.github-repos').append(`
            <h3 class="repo-name">Repo Name: ${responseJson[i].name}</h3>
            <p class="repo-link">
                <a href=${responseJson[i].html_url} 
                alt="Link to ${responseJson[i].name}"> Link to the Repo </a>
            </p>
        `);
    }
}

/**
 * Add a listener for form submission
 */
function addSubmitListener() {
    $('form').submit(event=> {
        event.preventDefault();
        let userName = $('#user-name').val();
        if(!userName) {
            alert("Enter a valid username");
            return;
        } 
        $(".js-error-message").empty();
        $(".github-repos").empty();
        getRepos(userName);
    });
}


$(function(){
    addSubmitListener();
});