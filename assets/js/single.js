const issueContainerEl = document.getElementById('issues-container');

const getRepoIssues = (repo) => {
    let apiUrl = 'https://api.github.com/repos/' + repo + '/issues?direction=asc';

    fetch(apiUrl).then(response => {
        if (response.ok) {
            response.json().then(data => {
                displayIssues(data);
                console.log(data);
            })
        } else {
            alert('There was a problem with your request!');
        }
    })
}

const displayIssues = (issues) => {
    if (issues.length === 0) {
        issueContainerEl.textContent = 'This repo has no open issues!';
    }

    for (let i =0; i< issues.length; i++) {
        let issueEl = document.createElement('a');
        issueEl.classList = 'list-item flex-row justify-space-between align-center';
        issueEl.setAttribute('href', issues[i].html_url);
        issueEl.setAttribute('target', '_blank');

        let titleEl = document.createElement('span');
        titleEl.textContent = issues[i].title;

        issueEl.appendChild(titleEl);

        let typeEl = document.createElement('span');

        if (issues[i].pull_request) {
            typeEl.textContent = '(Pull request)';
        } else {
            typeEl.textContent = '(Issue)';
        }

        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    }
}

getRepoIssues('maplesyrupman/run-buddy');