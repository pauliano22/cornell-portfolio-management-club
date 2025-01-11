// Data for each member, including image URLs
const memberInfo = {
    member1: {
        name: "Member 1",
        info: "Member 1 is responsible for overseeing the financial aspects of the club.",
        image: "images/filler.png" // Replace with actual image URL
    },
    member2: {
        name: "Member 2",
        info: "Member 2 focuses on outreach and building relationships with industry partners.",
        image: "images/filler.png" // Replace with actual image URL
    },
    member3: {
        name: "Member 3",
        info: "Member 3 manages club events and ensures smooth operations.",
        image: "images/filler.png" // Replace with actual image URL
    },
    member4: {
        name: "Member 4",
        info: "Member 4 is in charge of marketing and promoting the club's initiatives.",
        image: "images/filler.png" // Replace with actual image URL
    },
    member5: {
        name: "Member 5",
        info: "Member 5 assists with research and analysis of market trends.",
        image: "images/filler.png" // Replace with actual image URL
    },
    member6: {
        name: "Member 6",
        info: "Member 6 coordinates workshops and educational sessions for members.",
        image: "images/filler.png" // Replace with actual image URL
    },
    member7: {
        name: "Member 7",
        info: "Member 7 handles club finances and budgeting.",
        image: "images/filler.png" // Replace with actual image URL
    },
    member8: {
        name: "Member 8",
        info: "Member 8 is responsible for social media and online presence.",
        image: "images/filler.png" // Replace with actual image URL
    },
    member9: {
        name: "Member 9",
        info: "Member 9 supports new members with onboarding and resources.",
        image: "images/filler.png" // Replace with actual image URL
    }
};

// Function to show popup with member details
function showPopup(memberId) {
    console.log("Popup triggered for:", memberId); // Log to console
    const member = memberInfo[memberId];

    if (member) {
        document.getElementById('member-name').innerText = member.name;
        document.getElementById('member-info').innerText = member.info;
        document.getElementById('popup-image').src = member.image;

        // Add class to show the popup
        const popup = document.getElementById('popup');
        popup.classList.add('show'); // Add show class to make it visible
    }
}

// Function to hide popup
function hidePopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('show'); // Remove class to hide the popup
}


// Bind event listener to close button
document.querySelector('.close-btn').addEventListener('click', hidePopup);

// Optional: Close popup if clicking outside of it
document.addEventListener('click', function(event) {
    const popup = document.getElementById('popup');
    const popupContent = document.querySelector('.popup-content');
    
    // Check if the popup is visible and the click is outside the popup content
    if (popup.style.display === 'flex' && !popupContent.contains(event.target)) {
        hidePopup();
    }
});
