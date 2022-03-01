// getting searchText
const getSearchText = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    loadPhones(searchText);
}

// load phones search result
const loadPhones = (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displayPhones(data.data))
}

// display phones result
const displayPhones = phones => {
    phones.forEach(phone => {
        console.log(phone);
    })
}