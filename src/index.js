console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", function () {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imagesDiv = document.getElementById('images');
    const breedsList = document.getElementById('breeds');

    // Challenge 1: Fetch and display images
    function fetchAndDisplayImages() {
        fetch(imgUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                data.message.forEach(imageUrl => {
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    imagesDiv.appendChild(img);
                });
            })
            .catch(error => {
                console.error('Error fetching images:', error);
            });
    }

    // Challenge 2: Fetch and display breeds
    function fetchAndDisplayBreeds() {
        fetch(breedUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                Object.keys(data.message).forEach(breed => {
                    const listItem = document.createElement('li');
                    listItem.textContent = breed;
                    breedsList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Error fetching breeds:', error);
            });
    }

    // Call functions to fetch and display images and breeds
    fetchAndDisplayImages();
    fetchAndDisplayBreeds();

    // Challenge 3: Change font color on breed click
    breedsList.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            event.target.style.color = 'red'; // Change color to red on click
        }
    });

    // Challenge 4: Filter breeds by starting letter
    const filterDropdown = document.getElementById('filterDropdown');

    filterDropdown.addEventListener('change', function(event) {
        const selectedLetter = event.target.value.toLowerCase();
        const breedItems = breedsList.getElementsByTagName('li');

        // Hide breeds that don't start with selected letter
        for (let i = 0; i < breedItems.length; i++) {
            const breedName = breedItems[i].textContent.toLowerCase();
            if (breedName.startsWith(selectedLetter)) {
                breedItems[i].style.display = 'block';
            } else {
                breedItems[i].style.display = 'none';
            }
        }
    });
});
