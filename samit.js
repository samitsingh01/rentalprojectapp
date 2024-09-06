const properties = [
    { id: 1, name: "Sky Dandelions Apartment", price: 11000, rating: 4.5, location: "Downtown", reviews: 120, image: "property1.jpg" },
    { id: 2, name: "Village Tower", price: 9000, rating: 4.2, location: "Suburb", reviews: 85, image: "property2.jpg" },
    { id: 3, name: "Westside Modern House", price: 10000, rating: 4.7, location: "Westside", reviews: 150, image: "property3.jpg" }
];

let selectedProperty;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    showPropertyList();
});

function showPropertyList() {
    const propertyList = document.getElementById('propertyList');
    propertyList.innerHTML = '';
    properties.forEach(property => {
        const propertyItem = document.createElement('div');
        propertyItem.className = 'property-item';
        propertyItem.innerHTML = `
            <img src="${property.image}" alt="${property.name}" class="property-image">
            <div class="property-details">
                <h3>${property.name}</h3>
                <p>Location: ${property.location}</p>
                <p>₹${property.price}/month</p>
                <p>Rating: ${getStars(property.rating)} (${property.reviews} reviews)</p>
                <button class="button" onclick="selectProperty(${property.id})">View Details</button>
            </div>
        `;
        propertyList.appendChild(propertyItem);
    });
}

function getStars(rating) {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
}

function selectProperty(id) {
    selectedProperty = properties.find(p => p.id === id);
    const selectedPropertyDiv = document.getElementById('selectedProperty');
    selectedPropertyDiv.innerHTML = `
        <h3>${selectedProperty.name}</h3>
        <p>Location: ${selectedProperty.location}</p>
        <p>₹${selectedProperty.price}/month</p>
        <p>Rating: ${getStars(selectedProperty.rating)} (${selectedProperty.reviews} reviews)</p>
    `;
    document.getElementById('mainImage').src = selectedProperty.image;
    updatePrice();
    showPropertyDetailsPage();
}

function showPropertyDetailsPage() {
    document.getElementById('searchPage').style.display = 'none';
    document.getElementById('propertyDetailsPage').style.display = 'block';
    document.getElementById('circlePage').style.display = 'none';
    document.getElementById('finalPage').style.display = 'none';
    document.getElementById('congratsPage').style.display = 'none';
}

function updatePrice() {
    const rentalPeriod = parseInt(document.getElementById('rentalPeriod').value);
    const totalPrice = selectedProperty.price * rentalPeriod;
    document.getElementById('totalPrice').textContent = totalPrice;
}

function showMoreImages() {
    // This function would typically load more images from a server
    alert("More images would be loaded here.");
}

function showCirclePage() {
    document.getElementById('searchPage').style.display = 'none';
    document.getElementById('propertyDetailsPage').style.display = 'none';
    document.getElementById('circlePage').style.display = 'block';
    document.getElementById('finalPage').style.display = 'none';
    document.getElementById('congratsPage').style.display = 'none';
}

function nextSection(sectionId) {
    document.getElementById('eligibilityCheck').style.display = 'none';
    document.getElementById('setupAutopay').style.display = 'none';
    document.getElementById('moveIn').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';

    // Update progress indicator
    document.getElementById('step1').classList.add('active');
    if (sectionId === 'setupAutopay') {
        document.getElementById('step2').classList.add('active');
    } else if (sectionId === 'moveIn') {
        document.getElementById('step2').classList.add('active');
        document.getElementById('step3').classList.add('active');
    }
}

function backSection(sectionId) {
    document.getElementById('eligibilityCheck').style.display = 'none';
    document.getElementById('setupAutopay').style.display = 'none';
    document.getElementById('moveIn').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';

    // Update progress indicator
    if (sectionId === 'eligibilityCheck') {
        document.getElementById('step2').classList.remove('active');
    } else if (sectionId === 'setupAutopay') {
        document.getElementById('step3').classList.remove('active');
    }
}

function showFinalPage() {
    document.getElementById('circlePage').style.display = 'none';
    document.getElementById('finalPage').style.display = 'block';

    // Set values for the final page
    const rentalPeriod = parseInt(document.getElementById('rentalPeriod').value);
    document.getElementById('paymentAmount').textContent = `₹${selectedProperty.price * rentalPeriod}`;
    document.getElementById('monthlyRent').textContent = `₹${selectedProperty.price}`;
    document.getElementById('rentCycle').textContent = `${rentalPeriod} month${rentalPeriod > 1 ? 's' : ''}`;
}

function showCongratsPage() {
    document.getElementById('finalPage').style.display = 'none';
    document.getElementById('congratsPage').style.display = 'block';
}

function sortProperties(criteria) {
    switch(criteria) {
        case 'price':
            properties.sort((a, b) => a.price - b.price);
            break;
        case 'rating':
            properties.sort((a, b) => b.rating - a.rating);
            break;
        case 'reviews':
            properties.sort((a, b) => b.reviews - a.reviews);
            break;
    }
    showPropertyList();
}