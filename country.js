// country.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const selectedCountry = document.getElementById('selectedCountry');
    const countryDropdown = document.getElementById('countryDropdown');
    const countryList = document.getElementById('countryList');
    const countrySearch = document.getElementById('countrySearch');
    const selectedFlag = document.getElementById('selectedFlag');
    const selectedCode = document.getElementById('selectedCode');
    const selectedName = document.getElementById('selectedName');
    const phoneNumber = document.getElementById('phoneNumber');

    // Variables
    let countries = [];
    let filteredCountries = [];
    let selectedCountryData = {
        flag: 'https://flagcdn.com/w20/in.png',
        code: '+91',
        name: 'India',
        cca2: 'IN'
    };

    // Event Listeners
    if (selectedCountry) {
        selectedCountry.addEventListener('click', toggleDropdown);
    }
    
    if (countrySearch) {
        countrySearch.addEventListener('input', filterCountries);
    }
    
    

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (selectedCountry && countryDropdown) {
            if (!selectedCountry.contains(e.target) && !countryDropdown.contains(e.target)) {
                closeDropdown();
            }
        }
    });

    // Initialize
    fetchCountries();

    // Functions
    function toggleDropdown() {
        const isOpen = countryDropdown.classList.contains('open');
        
        if (isOpen) {
            closeDropdown();
        } else {
            openDropdown();
        }
    }

    function openDropdown() {
        countryDropdown.classList.add('open');
        selectedCountry.classList.add('open');
        if (countrySearch) countrySearch.focus();
    }

    function closeDropdown() {
        countryDropdown.classList.remove('open');
        selectedCountry.classList.remove('open');
        if (countrySearch) countrySearch.value = '';
        filterCountries(); // Reset filter
    }

    async function fetchCountries() {
        try {
            // Using RestCountries API to get country data
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,idd,cca2');
            
            if (!response.ok) {
                throw new Error('Failed to fetch countries');
            }
            
            const data = await response.json();
            
            // Process country data
            countries = data
                .filter(country => country.idd && country.idd.root)
                .map(country => {
                    // Get calling code - handle various formats
                    let code = "";
                    
                    // Some countries have root like "+1" and suffixes like ["808", "809", ...]
                    // For US, root is "+1" and suffixes is ["201", "202", "203", ...]
                    if (country.idd.root && country.idd.suffixes) {
                        // For countries with multiple suffixes (like US), use the first one
                        // But actually for US we should just show "+1" without suffix
                        if (country.cca2 === "US") {
                            code = country.idd.root; // Just "+1" for US
                        } else if (Array.isArray(country.idd.suffixes) && country.idd.suffixes.length > 0) {
                            // For other countries, use first suffix
                            code = country.idd.root + (country.idd.suffixes[0] || "");
                        } else {
                            code = country.idd.root;
                        }
                    } else if (country.idd.root) {
                        code = country.idd.root;
                    } else {
                        code = ""; // No calling code
                    }
                    
                    // Clean up the code - remove any trailing dots
                    code = code.replace(/\.+$/, '');
                    
                    return {
                        name: country.name.common,
                        flag: `https://flagcdn.com/w20/${country.cca2.toLowerCase()}.png`,
                        code: code,
                        cca2: country.cca2
                    };
                })
                .filter(country => country.code && country.code.trim() !== "") // Remove countries without codes
                .sort((a, b) => a.name.localeCompare(b.name));
            
            // Fix specific countries manually
            const countryFixes = {
                'US': { code: '+1' },
                'CA': { code: '+1' },
                'GB': { code: '+44' },
                'AU': { code: '+61' },
                'IN': { code: '+91' },
                'DE': { code: '+49' },
                'FR': { code: '+33' },
                'IT': { code: '+39' },
                'ES': { code: '+34' },
                'BR': { code: '+55' },
                'JP': { code: '+81' },
                'CN': { code: '+86' },
                'RU': { code: '+7' },
                'MX': { code: '+52' },
                'ZA': { code: '+27' }
            };
            
            // Apply fixes
            countries = countries.map(country => {
                if (countryFixes[country.cca2]) {
                    return {
                        ...country,
                        code: countryFixes[country.cca2].code
                    };
                }
                return country;
            });
            
            // Add India at the top
            const popularCountries = ['IN', 'US', 'GB', 'CA', 'AU', 'DE', 'FR', 'JP', 'CN', 'BR'];
            countries.sort((a, b) => {
                const aIndex = popularCountries.indexOf(a.cca2);
                const bIndex = popularCountries.indexOf(b.cca2);
                
                if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
                if (aIndex !== -1) return -1;
                if (bIndex !== -1) return 1;
                return a.name.localeCompare(b.name);
            });
            
            renderCountryList(countries);
            filteredCountries = countries;
            
        } catch (error) {
            console.error('Error fetching countries:', error);
            
            // Fallback to a few popular countries with correct codes
            const fallbackCountries = [
                {name: "India", flag: "https://flagcdn.com/w20/in.png", code: "+91", cca2: "IN"},
                {name: "United States", flag: "https://flagcdn.com/w20/us.png", code: "+1", cca2: "US"},
                {name: "United Kingdom", flag: "https://flagcdn.com/w20/gb.png", code: "+44", cca2: "GB"},
                {name: "Canada", flag: "https://flagcdn.com/w20/ca.png", code: "+1", cca2: "CA"},
                {name: "Australia", flag: "https://flagcdn.com/w20/au.png", code: "+61", cca2: "AU"}
            ];
            
            countries = fallbackCountries;
            filteredCountries = fallbackCountries;
            renderCountryList(fallbackCountries);
        }
    }

    function renderCountryList(countries) {
        if (!countryList) return;
        
        countryList.innerHTML = '';
        
        if (countries.length === 0) {
            countryList.innerHTML = `<div class="loading">No countries found. Try a different search.</div>`;
            return;
        }
        
        countries.forEach(country => {
            const countryItem = document.createElement('div');
            countryItem.className = 'country-item';
            countryItem.setAttribute('data-code', country.code);
            countryItem.setAttribute('data-cca2', country.cca2);
            
            countryItem.innerHTML = `
                <img src="${country.flag}" alt="${country.name}" class="flag">
                <div class="country-details">
                    <span class="country-item-name">${country.name}</span>
                    <span class="country-item-code">${country.code}</span>
                </div>
            `;
            
            countryItem.addEventListener('click', () => selectCountry(country));
            countryList.appendChild(countryItem);
        });
    }

    function selectCountry(country) {
        selectedFlag.src = country.flag;
        selectedFlag.alt = country.name;
        selectedCode.textContent = country.code;
        selectedName.textContent = country.name;
        
        selectedCountryData = country;
        
        closeDropdown();
        
        // Add visual feedback
        selectedCountry.style.backgroundColor = '#f0f8ff';
        setTimeout(() => {
            selectedCountry.style.backgroundColor = '#f9f9f9';
        }, 300);
    }

    function filterCountries() {
        if (!countrySearch) return;
        
        const searchTerm = countrySearch.value.toLowerCase();
        
        if (!searchTerm) {
            filteredCountries = countries;
        } else {
            filteredCountries = countries.filter(country => 
                country.name.toLowerCase().includes(searchTerm) || 
                country.code.includes(searchTerm)
            );
        }
        
        renderCountryList(filteredCountries);
    }

    
    // Keyboard navigation for dropdown
    if (countrySearch) {
        countrySearch.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const firstItem = countryList.querySelector('.country-item');
                if (firstItem) firstItem.focus();
            }
        });
    }
});