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