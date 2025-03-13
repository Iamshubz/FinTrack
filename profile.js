// Select Elements
const userNameElement = document.getElementById('userName');
const userEmailElement = document.getElementById('userEmail');
const userContactElement = document.getElementById('userContact');
const userAddressElement = document.getElementById('userAddress');
const profilePictureElement = document.getElementById('profilePicture');

const editProfileBtn = document.getElementById('editProfileBtn');
const editProfileForm = document.getElementById('editProfileForm');

const editNameInput = document.getElementById('editName');
const editEmailInput = document.getElementById('editEmail');
const editContactInput = document.getElementById('editContact');
const editAddressInput = document.getElementById('editAddress');
const editPictureInput = document.getElementById('editPicture');
const saveProfileBtn = document.getElementById('saveProfileBtn');

// Load Profile Data from Local Storage
function loadProfileData() {
    const savedName = localStorage.getItem('userName') || 'John Doe';
    const savedEmail = localStorage.getItem('userEmail') || 'johndoe@example.com';
    const savedContact = localStorage.getItem('userContact') || '+91 9876543210';
    const savedAddress = localStorage.getItem('userAddress') || 'Aurangabad, Maharashtra, India';
    const savedPicture = localStorage.getItem('profilePicture') || 'default-profile.png';

    userNameElement.textContent = savedName;
    userEmailElement.textContent = savedEmail;
    userContactElement.textContent = savedContact;
    userAddressElement.textContent = savedAddress;
    profilePictureElement.src = savedPicture;
}

// Edit Profile
editProfileBtn.addEventListener('click', () => {
    editProfileForm.classList.toggle('hidden');
});

// Save Profile Data
saveProfileBtn.addEventListener('click', () => {
    const newName = editNameInput.value.trim();
    const newEmail = editEmailInput.value.trim();
    const newContact = editContactInput.value.trim();
    const newAddress = editAddressInput.value.trim();
    const newPicture = editPictureInput.files[0];

    if (newName) {
        userNameElement.textContent = newName;
        localStorage.setItem('userName', newName);
    }

    if (newEmail) {
        userEmailElement.textContent = newEmail;
        localStorage.setItem('userEmail', newEmail);
    }

    if (newContact) {
        userContactElement.textContent = newContact;
        localStorage.setItem('userContact', newContact);
    }

    if (newAddress) {
        userAddressElement.textContent = newAddress;
        localStorage.setItem('userAddress', newAddress);
    }

    if (newPicture) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePictureElement.src = e.target.result;
            localStorage.setItem('profilePicture', e.target.result);
        };
        reader.readAsDataURL(newPicture);
    }

    alert('Profile updated successfully! ✅');
    editProfileForm.classList.add('hidden');
});

// Initialize Profile Data
loadProfileData();
