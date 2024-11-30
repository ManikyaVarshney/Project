document.getElementById('addProfileButton').addEventListener('click', function() {
    const platform = document.getElementById('platform').value;
    const userProfile = document.getElementById('userProfile').value.trim();

    if (userProfile) {
        addProfileToList(platform, userProfile);
        fetchLiveScore(platform, userProfile);
    } else {
        alert('Please enter a valid profile name.');
    }
});

function addProfileToList(platform, userProfile) {
    const profileList = document.getElementById('profileList');
    const profileItem = document.createElement('div');
    profileItem.classList.add('profile-item');
    profileItem.innerHTML = `<strong>${platform}:</strong> ${userProfile}`;
    profileList.appendChild(profileItem);
}

function fetchLiveScore(platform, userProfile) {
    const scoreElement = document.getElementById('live-score');

    let apiUrl = '';
    if (platform === 'codeforces') {
        apiUrl = `https://codeforces.com/api/user.info?handles=${userProfile}`;
    } else if (platform === 'codechef') {
        apiUrl = `https://api.codechef.com/users/${userProfile}`;
    } else if (platform === 'leetcode') {
        apiUrl = `https://leetcode.com/${userProfile}/`;
    } else if (platform === 'hackerrank') {
        apiUrl = `https://www.hackerrank.com/rest/contests/master/hackers/${userProfile}`;
    } else if (platform === 'hackerearth') {
        apiUrl = `https://api.hackerearth.com/v3/scoreboard/contest/score/`;
    } else if (platform === 'codsoft') {
        apiUrl = `https://api.codsoft.com/user/${userProfile}`;
    } else if (platform === 'codingninjas') {
        apiUrl = `https://www.codingninjas.com/codestudio/users/${userProfile}`;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let score = 'No data available';
            if (platform === 'codeforces' && data.status === 'OK') {
                score = data.result[0].rating || 'Not rated';
            } else if (platform === 'codechef' && data.result) {
                score = data.result.rating;
            } else if (platform === 'leetcode') {
                score = 'Score fetched from LeetCode is under development.';
            } else {
                score = 'Score fetch unavailable for this platform.';
            }
            scoreElement.textContent = `${platform} Score: ${score}`;
        })
        .catch(error => {
            scoreElement.textContent = 'Error fetching live score.';
            console.error('Error:', error);
        });
}
