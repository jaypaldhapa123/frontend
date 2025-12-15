document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.service');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.service-header');
        
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
