const displayControl = (id, displayStyle) => {
    document.getElementById(id).style.display = displayStyle;
}

// getting searchText
const getSearchText = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    loadPhones(searchText);

    // clear search input
    searchInput.value = '';

    // display spinner
    displayControl('spinner', 'block');

    // hide all phones
    displayControl('phones-container', 'none');

    // hide not found message
    document.getElementById('not-found-message').style.display = 'none';

    // hide view button
    document.getElementById('view-all-btn').style.display = 'none';
}

// load phones
const loadPhones = (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displayPhones(data.data))

    // clear phone details text content
    document.getElementById('phone-details').textContent = '';
}

// display phones
const displayPhones = phones => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';

    if (phones.length === 0) {
        document.getElementById('not-found-message').style.display = 'block';
    }

    // displaying all phones
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
            <div class="phone card p-2">
                <img src="${phone.image}" class="card-img-top" alt="${phone.phone_name}">
                <div class="card-body text-center text-sm-start">
                    <h4 class="card-title fw-bold">${phone.phone_name}</h4>
                    <p class="card-text"><span class="fw-bold">Brand: </span>${phone.brand}</p>
                    <a href="#phone-details" onclick="phoneDetails('${phone.slug}')" class="btn btn-primary border-0">View Details</a>
                </div>
            </div>
        `
        if (phones.indexOf(phone) > 19) {
            document.getElementById('view-all-btn').style.display = 'block';
        }
        else {
            phonesContainer.appendChild(div)
        }

        // display the rest phones
        document.getElementById('view-all-btn').addEventListener('click', function(){
            if (phones.indexOf(phone) > 19) {
                phonesContainer.appendChild(div)

                // hide view all button
                document.getElementById('view-all-btn').style.display = 'none';
            }
        })
    })
    
    // hide spinnre
    displayControl('spinner', 'none');
    // display phones
    displayControl('phones-container', 'flex');
}

// load phone details
const phoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}
// display phone details
const displayPhoneDetails = phone => {
    const phoneDetailsField = document.getElementById('phone-details');
    phoneDetailsField.textContent = '';

    const div = document.createElement('div');
    div.classList.add('d-flex', 'justify-content-center')
    phoneDetailsField.appendChild(div);


    // displaying phone details
    div.innerHTML = `
        <div id="phone-detail-card" class="card">
        <img width="350px" src="${phone.image}" class="mx-auto mt-3 img-fluid" alt="${phone.name}">
            <div class="card-body">
                <h4 class="card-title">${phone.name}</h4>
                <p class="m-0"><span class="fw-bold">Brand: </span>${phone.brand}</p>
                <p class="m-0"><span class="fw-bold">Release Date: </span>${phone.releaseDate ? phone.releaseDate: 'No release date found'}</p>
                <p class="m-0 fw-bold my-3">Main Features:</p>
                <ul id="main-features"></ul>
                <p class="m-0 fw-bold my-3">Others:</p>
                <ul id="others"></ul>
            </div>
        </div>
    `;

    // showing others 
    const others = document.getElementById('others');
    for (const prop in phone.others) {
        const li = document.createElement('li');
        others.appendChild(li);

        li.innerHTML = `<span class="fw-bold">${prop}: </span>${phone.others[prop]}`;
    }

    // showing main features
    const featuresField = document.getElementById('main-features');
    for (const prop in phone.mainFeatures) {
        const li = document.createElement('li');
        featuresField.appendChild(li);

        li.innerHTML = `<span class="fw-bold">${prop}: </span>${phone.mainFeatures[prop]}`;
    }
}