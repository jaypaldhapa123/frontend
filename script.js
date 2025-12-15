

// backToTop Arrow 

document.getElementById('backToTop').addEventListener("click", function(){
    window.scroll({
        top:0,
        behavior:"smooth"
    });
})

// show arrow when page scroll
window.addEventListener("scroll", function(){
    const arrow = this.document.getElementById('backToTop');
    if(window.scrollY>100){
        arrow.classList.add('show');
    }else{
        arrow.classList.remove("show");
    }
})

// cta button 

document.getElementById('cta-btn').addEventListener("click", function(){
    document.getElementById("inputFullName").focus();
})

// email 

document.getElementById("email").addEventListener("click",function(){
    window.location.href ="mailto:contact.webzentra@gmail.com";
})
// Image slides 


document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot'); // dots select karo
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        currentSlide = index; // currentSlide update karo
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    // Auto slide
    setInterval(nextSlide, 5000);

    // Dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
});


// FAQ 


document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', (e) => {
            // Prevent scrolling behavior
            e.preventDefault();
            
            // Get current scroll position
            const currentScroll = window.pageYOffset;
            
            // Toggle current item ONLY - don't close other items
            item.classList.toggle('active');
            
            // Restore scroll position after DOM update
            setTimeout(() => {
                window.scrollTo(0, currentScroll);
            }, 10);
        });
    });
});






//navbar
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const getInTouch = document.querySelector(".getintouch");

    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');

        // Change hamburger icon
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }


        if (navMenu.classList.contains("active")) {
            document.body.classList.add("no-scroll");
            

            // Button ko 300ms delay se show karo
            setTimeout(() => {
            }, 300); // navmenu transition time == 300ms
    
        } else {
            document.body.classList.remove("no-scroll");
        }
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");  // close menu
            document.body.classList.remove("no-scroll"); // enable scroll
        });
    });

    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});



//notification 

let permissionGranted = false;
let popupShown = false;

// Unlock audio after first user interaction
function enableSound() {
    if (!permissionGranted) {
        const audio = document.getElementById("notifyTone");
        audio.play().then(() => {
            audio.pause();
            permissionGranted = true;
            console.log("Audio permission granted!");
            startPopupTimer();
        }).catch(() => {
            console.log("Audio blocked; waiting for next interaction.");
        });
    }
}

document.addEventListener("click", enableSound);
document.addEventListener("scroll", enableSound);

// Wait 5 seconds after permission
function startPopupTimer() {
    if (popupShown) return;
    popupShown = true;
}

// popup box offer 

const popupOverlay = document.getElementById('popupOverlay');
const closePopupBtn = document.getElementById('closePopup');
// const showPopupBtn = document.getElementById('showPopup');
const claimOfferBtn = document.getElementById('claimOffer');

// Function to show the popup
function showPopup() {
    popupOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.getElementById("notifyTone").play().catch(()=>{});

    if (navigator.vibrate) {
        navigator.vibrate([120, 60, 120]); // vibrate → pause → vibrate
    }
    
}

// Function to hide the popup
function hidePopup() {
    popupOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}
// .....................................................................................
// .......................................................................................... 

// Show popup after 5 seconds
setTimeout(showPopup, 8000);

// Show popup when trigger button is clicked
// showPopupBtn.addEventListener('click', showPopup);

// Close popup when close button is clicked
closePopupBtn.addEventListener('click', hidePopup);

// Close popup when clicking outside the popup container
popupOverlay.addEventListener('click', function(e) {
    if (e.target === popupOverlay) {
        hidePopup();
    }
});

// Handle claim offer button click
claimOfferBtn.addEventListener('click', function() {
    alert('Thank you for claiming the offer! You will be redirected to our contact form to discuss your project with our team.');
    hidePopup();
    
    // In a real implementation, this would redirect to a contact form or checkout page
    // window.location.href = '/contact';
});

// Countdown timer for offer (simplified to show 7 days)
// In a real implementation, this would be a real countdown
const countdownElement = document.getElementById('countdown');
let daysLeft = 7;

// Update countdown every 24 hours (86400000 ms)
// For demonstration, we'll just show static text
// In a real implementation, you would calculate time left based on launch date

// Add some interactivity to the page features
document.querySelectorAll('.feature').forEach(feature => {
    feature.addEventListener('click', function() {
        this.style.boxShadow = '0 10px 20px rgba(37, 99, 235, 0.15)';
        setTimeout(() => {
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        }, 300);
    });
});

// Close popup with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
        hidePopup();
    }
});