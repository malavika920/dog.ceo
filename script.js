document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const dobInput = document.getElementById('dob');
    const submitBtn = document.getElementById('submitBtn');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const dobError = document.getElementById('dobError');

    const nameIcon = document.getElementById('nameIcon');
    const emailIcon = document.getElementById('emailIcon');
    const passwordIcon = document.getElementById('passwordIcon');
    const confirmPasswordIcon = document.getElementById('confirmPasswordIcon');
    const dobIcon = document.getElementById('dobIcon');

    function validateName() {
        const name = nameInput.value.trim();
        const regex = /^[A-Za-z\s]{3,}$/;
        if (!regex.test(name)) {
            nameError.textContent = 'Name must be at least 3 alphabetic characters.';
            nameIcon.className = 'icon error fa fa-times';
            nameInput.classList.add('border-red-500');
            nameInput.classList.remove('border-green-500');
            return false;
        } else {
            nameError.textContent = '';
            nameIcon.className = 'icon success fa fa-check';
            nameInput.classList.add('border-green-500');
            nameInput.classList.remove('border-red-500');
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            emailError.textContent = 'Invalid email format.';
            emailIcon.className = 'icon error fa fa-times';
            emailInput.classList.add('border-red-500');
            emailInput.classList.remove('border-green-500');
            return false;
        } else {
            emailError.textContent = '';
            emailIcon.className = 'icon success fa fa-check';
            emailInput.classList.add('border-green-500');
            emailInput.classList.remove('border-red-500');
            return true;
        }
    }

    function validatePassword() {
        const password = passwordInput.value.trim();
        if (password.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters long.';
            passwordIcon.className = 'icon error fa fa-times';
            passwordInput.classList.add('border-red-500');
            passwordInput.classList.remove('border-green-500');
            return false;
        } else {
            passwordError.textContent = '';
            passwordIcon.className = 'icon success fa fa-check';
            passwordInput.classList.add('border-green-500');
            passwordInput.classList.remove('border-red-500');
            return true;
        }
    }

    function validateConfirmPassword() {
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        if (confirmPassword !== password) {
            confirmPasswordError.textContent = 'Passwords do not match.';
            confirmPasswordIcon.className = 'icon error fa fa-times';
            confirmPasswordInput.classList.add('border-red-500');
            confirmPasswordInput.classList.remove('border-green-500');
            return false;
        } else {
            confirmPasswordError.textContent = '';
            confirmPasswordIcon.className = 'icon success fa fa-check';
            confirmPasswordInput.classList.add('border-green-500');
            confirmPasswordInput.classList.remove('border-red-500');
            return true;
        }
    }

    function validateDob() {
        const dob = dobInput.value;
        if (!dob) {
            dobError.textContent = 'Date of birth is required.';
            dobIcon.className = 'icon error fa fa-times';
            dobInput.classList.add('border-red-500');
            dobInput.classList.remove('border-green-500');
            return false;
        } else {
            dobError.textContent = '';
            dobIcon.className = 'icon success fa fa-check';
            dobInput.classList.add('border-green-500');
            dobInput.classList.remove('border-red-500');
            
            var dob1 = new Date(document.getElementById("dob").value);
            var today = new Date();
            var age = today.getFullYear() - dob1.getFullYear();
            var monthDifference = today.getMonth() - dob1.getMonth();
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob1.getDate())) {
                age--;
            }
        
            if (isNaN(dob1.getTime()) || age < 18) {
                document.getElementById("dobError").innerText = "You must be at least 18 years old";
                dobIcon.className = 'icon error fa fa-times';
            dobInput.classList.add('border-red-500');
            dobInput.classList.remove('border-green-500');
                isValid = false;
            }
            return true;
        }
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isDobValid = validateDob();

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isDobValid) {
            form.submit();
             alert("Form submitted successfully!");
        }
    });

    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    dobInput.addEventListener('input', validateDob);
});

window.onload=async()=>{
    var dogButton = document.getElementById("getdog")
    // var clearDogButton = document.getElementById("cleardog")

    const dogApi="https://dog.ceo/api/breeds/image/random"
    await fetch(dogApi).then((res)=>{
        res.json().then((data)=>{
            // console.log(data)
            var newdog = document.createElement("img")
            newdog.src=data.message
            document.getElementById("container").appendChild(newdog)

        })
    })


  


    dogButton.addEventListener('click',async()=>{
        document.getElementById("container").innerHTML=null

        await fetch(dogApi).then((res)=>{
            res.json().then((data)=>{
                // console.log(data)
                var newdog = document.createElement("img")
                newdog.src=data.message
                document.getElementById("container").appendChild(newdog)

            })
        })
    })
}