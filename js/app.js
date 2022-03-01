// getting searchText
const getSearchText = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    loadPhones(searchText);

    searchInput.value = '';
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
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';

    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        phonesContainer.appendChild(div)

        div.innerHTML = `
            <div class="phone card p-2">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title">${phone.phone_name}</h4>
                    <p class="card-text">Brand: ${phone.brand}</p>
                    <a href="#phone-details" onclick="phoneDetails('${phone.slug}')" class="btn btn-primary border-0">View Details</a>
                </div>
            </div>
        `
    })
}

// load phone details
const phoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
}