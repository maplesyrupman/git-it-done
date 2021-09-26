const userFormEl = document.getElementById('user-form');
const nameInputEl = document.getElementById('username');
const repoContainerEl = document.querySelector('#repos-container');
const repoSearchTermEl = document.querySelector('#repo-search-term');
const languageButtonsEl = document.querySelector('#language-buttons');

var getUserRepos = function(user) {

    let apiUrl = `https://api.github.com/users/${user}/repos`;

    fetch(apiUrl).then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                displayRepos(data, user);
            })
        } else {
            alert('Error: GitHub User Not Found');
        }
    }).catch(error => {
        alert('Unable to connect to GitHub');
    })
};

let formSubmitHandler = (event) => {
    event.preventDefault();
    let username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = '';
    } else {
        alert('Please enter a GitHub username');
    }
}

let displayRepos = function(repos, searchTerm) {
    if (repos.length === 0) {
        repoContainerEl.textContent = 'No repositories found.';
        return;
    }

    repoContainerEl.textContent = '';
    repoSearchTermEl.textContent = searchTerm;

    for (let i=0; i< repos.length; i++) {
        let repoName = repos[i].owner.login + '/' + repos[i].name;

        let repoEl = document.createElement('a');
        repoEl.classList = 'list-item flex-row justify-space-between align-center';
        repoEl.setAttribute('href', './single-repo.html' + `?repo=${repoName}`);

        let titleEl = document.createElement('span')
        titleEl.textContent = repoName;
        repoEl.appendChild(titleEl);

        let statusEl = document.createElement('span');
        statusEl.classList = 'flex-row align-center';
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'><i/>";
        }
        repoEl.appendChild(statusEl);

        repoContainerEl.appendChild(repoEl);
    }
}

const getFeaturedRepos = (language) => {
    let apiUrl = 'https://api.github.com/search/repositories?q=' + language + 'is:featuresd&sort=help-wanted-issues';

    fetch(apiUrl).then(response => {
        if (response.ok) {
            response.json().then(data => {
                displayRepos(data.items, language);
            })
        } else {
            alert('Error: GitHub User Not Found');
        }
    })
}

const buttonClickHandler = e => {
    let language = e.target.getAttribute('data-language');
    
    if (language) {
        getFeaturedRepos(language);
        repoContainerEl.textContent = '';
    }
}


userFormEl.addEventListener('submit', formSubmitHandler)
languageButtonsEl.addEventListener('click', buttonClickHandler);
