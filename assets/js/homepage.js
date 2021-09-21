var getUserRepos = function(user) {

    let apiUrl = `https://api.github.com/users/${user}/repos`;

    fetch(apiUrl).then((response) => {
        response.json().then((data) => {
            console.log(data);
        })
    });
};

getUserRepos('amazon');