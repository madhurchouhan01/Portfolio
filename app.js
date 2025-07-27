let sections = document.querySelectorAll('section')
let navLinks = document.querySelectorAll('header nav a')
let menuIcon = document.querySelector('#menu-icon')
let navbar = document.querySelector('.navbar')

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x')
    navbar.classList.toggle('active')
}

document.addEventListener('click', (event) => {
    if (!menuIcon.contains(event.target) && !navbar.contains(event.target)) {
        navbar.classList.remove('active')
        menuIcon.classList.remove('bx-x')
    }
})

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY
        let offset = sec.offsetTop - 100
        let height = sec.offsetHeight
        let id = sec.getAttribute('id')

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active')
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active')
            })
        }
    })

    menuIcon.classList.remove('bx-x')
    navbar.classList.remove('active')
}

ScrollReveal({
    reset: false,
    distance: '15px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.left', {origin: 'left'})
ScrollReveal().reveal('.right', {origin: 'right'})
ScrollReveal().reveal('.top', {origin: 'top'})
ScrollReveal().reveal('.bottom', {origin: 'bottom'})


const typed = new Typed('.multiple-text', {
    strings: ['a Data Scientist','an AI Engineer', 'an ML Engineer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
})

document.addEventListener("DOMContentLoaded", () => {
    const icons = document.querySelectorAll(".img-icon li");
    const observerOptions = {
        root: null, // Use the viewport as the container
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add the "visible" class with a delay
                const index = Array.from(icons).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, index * 100); // Delay based on the index
            }
        });
    }, observerOptions);

    icons.forEach((icon) => observer.observe(icon));
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Check localStorage for user preference
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    toggleButton.textContent = '🌞';
}

// Toggle function
toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        toggleButton.textContent = '🌞';
    } else {
        localStorage.setItem('theme', 'light');
        toggleButton.textContent = '🌛';
    }
});

document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("qXyoPFNfHn9US_4Kn"); 

    const form = document.forms['submit-to-emailjs'];
    const msg = document.getElementById("msg");

    form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const templateParams = {
        from_name: formData.get("Name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        subject: formData.get("subject"),
        message: formData.get("Message"),
    };

    console.log("Sending email with data:", templateParams);

    emailjs.send("service_jazapo7", "template_511tmas", templateParams)
        .then(function (response) {
        console.log("Email sent successfully", response);
        msg.style.color = "green";
        msg.innerHTML = "Message sent successfully! 😊";
        form.reset();
        setTimeout(() => (msg.innerHTML = ""), 5000);
        })
        .catch(function (error) {
        console.error("Email failed to send", error);
        msg.style.color = "red";
        msg.innerHTML = "Error sending message. Try again later.";
        });
    });
});

// fun fact 💡

const bulb = document.getElementById("bulb");
let isDragging = false;
let justDragged = false;
let startX, startY, offsetX, offsetY;
let touchStartTime = 0;

// Get coordinates from either mouse or touch event
function getEventCoords(e) {
  if (e.touches && e.touches.length > 0) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  return { x: e.clientX, y: e.clientY };
}

// Start dragging (mouse or touch)
function startDrag(e) {
  isDragging = true;
  justDragged = false;
  touchStartTime = Date.now();
  
  const coords = getEventCoords(e);
  startX = coords.x;
  startY = coords.y;
  
  const rect = bulb.getBoundingClientRect();
  offsetX = coords.x - rect.left;
  offsetY = coords.y - rect.top;
  bulb.style.zIndex = 1000;
  
  // Only prevent default for mouse events, not touch
  if (e.type === 'mousedown') {
    e.preventDefault();
  }
}

// Handle dragging (mouse or touch)
function handleDrag(e) {
  if (!isDragging) return;
  
  const coords = getEventCoords(e);
  let x = coords.x - offsetX;
  let y = coords.y - offsetY;
  
  // Keep within bounds
  const winW = window.innerWidth;
  const winH = window.innerHeight;
  const bulbW = bulb.offsetWidth;
  const bulbH = bulb.offsetHeight;
  x = Math.max(0, Math.min(winW - bulbW, x));
  y = Math.max(0, Math.min(winH - bulbH, y));
  
  bulb.style.left = x + "px";
  bulb.style.top = y + "px";
  bulb.style.right = "auto";
  bulb.style.bottom = "auto";
  
  // Update message position if it exists
  const messageBox = document.querySelector('.groq-message');
  if (messageBox) {
    messageBox.style.left = (x - 280) + "px";
    messageBox.style.top = (y + 20) + "px";
    messageBox.style.right = "auto";
    messageBox.style.bottom = "auto";
  }
  
  // If moved more than threshold, treat as dragging
  if (Math.abs(coords.x - startX) > 5 || Math.abs(coords.y - startY) > 5) {
    justDragged = true;
    // Prevent default only when actually dragging
    e.preventDefault();
  }
}

// End dragging
function endDrag(e) {
  if (isDragging) {
    isDragging = false;
    bulb.style.zIndex = 999;
  }
}

// Separate click handler function
async function handleBulbClick() {
  const message = document.getElementById("groq-message");
  const API_ENDPOINT = "https://portfolio-backend-cg49.onrender.com/funfact";
  
  message.textContent = "💡 wait...";
  message.classList.add("show");
  
  try {
    const response = await fetch(API_ENDPOINT, { method: "POST" });
    const data = await response.json();
    console.log(data);
    message.textContent = "💡 " + data.choices[0].message.content.trim();
  } catch (err) {
    message.textContent = "❌ Error fetching fact!";
    console.error(err);
  }
}

// Mouse events
bulb.addEventListener("mousedown", startDrag);
document.addEventListener("mousemove", handleDrag);
document.addEventListener("mouseup", endDrag);

// Touch events
bulb.addEventListener("touchstart", startDrag, { passive: true });
document.addEventListener("touchmove", handleDrag, { passive: false });
document.addEventListener("touchend", endDrag, { passive: true });

// Unified click/tap handler
function handleBulbTap(e) {
  if (justDragged) {
    justDragged = false;
    return;
  }
  
  // Prevent double-firing on mobile
  if (e.type === 'touchend') {
    e.preventDefault();
  }
  
  handleBulbClick();
}

// Add both mouse and touch handlers
bulb.addEventListener("click", handleBulbTap);
bulb.addEventListener("touchend", handleBulbTap, { passive: false });

// Click outside to hide message (works for both mouse and touch)
document.addEventListener("click", function (event) {
  const bulb = document.getElementById("bulb");
  const message = document.getElementById("groq-message");
  
  if (!bulb.contains(event.target) && !message.contains(event.target)) {
    message.classList.remove("show");
  }
});

document.addEventListener("touchend", function (event) {
  const bulb = document.getElementById("bulb");
  const message = document.getElementById("groq-message");
  
  if (!bulb.contains(event.target) && !message.contains(event.target)) {
    message.classList.remove("show");
  }
}, { passive: false });


// chatbot 👽
// class PortfolioChatbot {
//     constructor() {
//         this.isOpen = false;
//         this.conversationHistory = [];
//         this.apiUrl = 'https://portfolio-backend-cg49.onrender.com'; // Change this to your backend URL
        
//         this.initializeElements();
//         this.attachEventListeners();
//         this.showWelcomeMessage();
        
//         console.log('🤖 Madhur\'s Portfolio Chatbot initialized!');
//     }

//     initializeElements() {
//         this.toggleBtn = document.getElementById('chatbotToggle');
//         this.container = document.getElementById('chatbotContainer');
//         this.messagesArea = document.getElementById('chatbotMessages');
//         this.input = document.getElementById('chatbotInput');
//         this.sendBtn = document.getElementById('chatbotSendBtn');
//     }

//     attachEventListeners() {
//         // Toggle chatbot
//         this.toggleBtn.addEventListener('click', () => this.toggleChatbot());
        
//         // Send message
//         this.sendBtn.addEventListener('click', () => this.sendMessage());
        
//         // Enter key to send (Shift+Enter for new line)
//         this.input.addEventListener('keydown', (e) => {
//             if (e.key === 'Enter' && !e.shiftKey) {
//                 e.preventDefault();
//                 this.sendMessage();
//             }
//         });

//         // Auto-resize textarea
//         this.input.addEventListener('input', () => this.autoResizeTextarea());

        
//         // Close chatbot when clicking outside
//         document.addEventListener('click', (e) => {
//             if (this.isOpen && 
//                 !this.container.contains(e.target) && 
//                 !this.toggleBtn.contains(e.target)) {
//                     this.toggleChatbot();
//             }
//         });
//         // Quick action buttons
//         document.addEventListener('click', (e) => {
//             if (e.target.classList.contains('quick-action-btn')) {
//                 const message = e.target.getAttribute('data-message');
//                 this.input.value = message;
//                 this.sendMessage();
//             }
//         });
//     }

//     toggleChatbot() {
//         this.isOpen = !this.isOpen;
//         this.container.classList.toggle('active', this.isOpen);
//         this.toggleBtn.classList.toggle('active', this.isOpen);
        
//         if (this.isOpen) {
//             setTimeout(() => this.input.focus(), 300);
//         }
//     }

//     autoResizeTextarea() {
//         this.input.style.height = 'auto';
//         this.input.style.height = Math.min(this.input.scrollHeight, 80) + 'px';
//     }

//     async sendMessage() {
//         const message = this.input.value.trim();
//         if (!message) return;

//         // Disable input
//         this.setInputState(false);

//         // Add user message
//         this.addMessage(message, 'user');
//         this.input.value = '';
//         this.autoResizeTextarea();

//         // Show typing indicator
//         const typingId = this.addTypingIndicator();

//         try {
//             const response = await this.callChatAPI(message);
//             this.removeTypingIndicator(typingId);
//             this.addMessage(response, 'bot');
//         } catch (error) {
//             this.removeTypingIndicator(typingId);
//             this.addErrorMessage("I'm having some technical difficulties right now. Please try again in a moment!");
//             console.error('Chat API error:', error);
//         } finally {
//             this.setInputState(true);
//         }
//     }

//     async callChatAPI(message) {
//         try {
//             const response = await fetch(`${this.apiUrl}/ask`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     message: message,
//                     history: this.conversationHistory
//                 })
//             });
//             console.log(body)

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             // this.addMessage('bot', data.answer);
//             // Update conversation history
//             this.conversationHistory.push(
//                 { role: 'user', content: message },
//                 { role: 'assistant', content: data.response }
//             );

//             // Keep only last 10 messages for context
//             if (this.conversationHistory.length > 10) {
//                 this.conversationHistory = this.conversationHistory.slice(-10);
//             }

//             return data.answer;
//         } catch (error) {
//             // Fallback response when API is not available
//             return this.getFallbackResponse(message);
//         }
//     }

//     getFallbackResponse(message) {
//         const lowerMessage = message.toLowerCase();
        
//         if (lowerMessage.includes('project')) {
//             return "Hi! I'm Madhur. I've worked on several exciting projects including QueryVerse (natural language to SQL), an AI Meeting Scheduler Bot, and an Intelligent Email Generation System. Each project showcases my skills in AI, ML, and full-stack development. My chatbot backend isn't running right now, but you can check out my portfolio for detailed project information!";
//         } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
//             return "I specialize in Python, AI/ML technologies, and have experience with frameworks like CrewAI, PydanticAI, TensorFlow, FastAPI, and many more. I'm passionate about AI Agents, Deep Learning, and building scalable backend systems. Check out my portfolio for the complete list of my technical skills!";
//         } else if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
//             return "I'm currently working as a Data Scientist - Trainee at Xalt Analytics Pvt. Ltd in Indore, where I develop AI-powered solutions like UX Weaver and automated video ad creation systems. I also have internship experience and have been involved in various leadership roles at GDSC.";
//         } else {
//             return "Hi! I'm Madhur Chouhan, an AI Engineer and Data Scientist. I'm passionate about creating innovative AI solutions and have experience in machine learning, deep learning, and full-stack development. Feel free to ask me about my projects, skills, or experience! (Note: My chatbot backend seems to be offline right now, but I'd love to chat!)";
//         }
//     }

//     addMessage(content, sender) {
//         const messageDiv = document.createElement('div');
//         messageDiv.className = `message ${sender}-message`;

//         if (sender === 'bot') {
//             const html = DOMPurify.sanitize(marked.parse(content)); // ✅ Convert markdown -> HTML safely
//             messageDiv.innerHTML = html;
//         } else {
//             messageDiv.textContent = content; // Plain for user input
//         }

//         this.messagesArea.appendChild(messageDiv);
//         this.scrollToBottom();

//         return messageDiv;
//     }

//     addErrorMessage(content) {
//         const errorDiv = document.createElement('div');
//         errorDiv.className = 'error-message';
//         errorDiv.textContent = content;
        
//         this.messagesArea.appendChild(errorDiv);
//         this.scrollToBottom();
        
//         return errorDiv;
//     }

//     addTypingIndicator() {
//         const typingDiv = document.createElement('div');
//         typingDiv.className = 'typing-indicator';
//         typingDiv.innerHTML = `
//             <div class="typing-dots">
//                 <span></span>
//                 <span></span>
//                 <span></span>
//             </div>
//         `;
        
//         this.messagesArea.appendChild(typingDiv);
//         this.scrollToBottom();
        
//         return typingDiv;
//     }

//     removeTypingIndicator(typingElement) {
//         if (typingElement && typingElement.parentNode) {
//             typingElement.parentNode.removeChild(typingElement);
//         }
//     }

//     setInputState(enabled) {
//         this.input.disabled = !enabled;
//         this.sendBtn.disabled = !enabled;
//         if (enabled) {
//             this.input.focus();
//         }
//     }

//     scrollToBottom() {
//         this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
//     }

//     showWelcomeMessage() {
//         setTimeout(() => {
//             this.addMessage("Hey there! 👋 I'm Madhur, and I'm excited to chat with you! Feel free to ask me about my AI projects, technical skills, work experience, or anything else you'd like to know about my journey in AI and Data Science! 🚀", 'bot');
//         }, 1500);
//     }
// }

// // Initialize chatbot when DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     new PortfolioChatbot();
// });

// // Add some CSS animations on page load
// window.addEventListener('load', () => {
//     setTimeout(() => {
//         document.querySelector('.chatbot-toggle').style.animation = 'pulse 2s infinite';
//     }, 2000);
// });
// function minimizeChatbot() {
//     const chatbot = document.getElementById('chatbotContainer'); // Corrected ID
//     chatbot.style.display = 'none';

//     const toggle = document.querySelector('.chatbot-toggle');
//     if (toggle) toggle.style.display = 'block';
// }

// function showChatbot() {
//     const chatbot = document.getElementById('chatbotContainer');
//     chatbot.style.display = 'block';

//     const toggle = document.querySelector('.chatbot-toggle');
//     if (toggle) toggle.style.display = 'none';
// }


// chatbot 👽
class PortfolioChatbot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.apiUrl = 'https://portfolio-backend-cg49.onrender.com'; // Change this to your backend URL
        
        this.initializeElements();
        this.attachEventListeners();
        this.showWelcomeMessage();
        
        console.log('🤖 Madhur\'s Portfolio Chatbot initialized!');
    }

    initializeElements() {
        this.toggleBtn = document.getElementById('chatbotToggle');
        this.container = document.getElementById('chatbotContainer');
        this.messagesArea = document.getElementById('chatbotMessages');
        this.input = document.getElementById('chatbotInput');
        this.sendBtn = document.getElementById('chatbotSendBtn');
        this.minimizeBtn = document.getElementById('chatbotMinimize'); // New minimize button
    }

    attachEventListeners() {
        // Toggle chatbot
        this.toggleBtn.addEventListener('click', () => this.toggleChatbot());
        
        // Minimize chatbot (mobile)
        if (this.minimizeBtn) {
            this.minimizeBtn.addEventListener('click', () => this.minimizeChatbot());
        }
        
        // Send message
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        
        // Enter key to send (Shift+Enter for new line)
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize textarea
        this.input.addEventListener('input', () => this.autoResizeTextarea());

        
        // Close chatbot when clicking outside (desktop only)
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.container.contains(e.target) && 
                !this.toggleBtn.contains(e.target) &&
                window.innerWidth > 768) { // Only close on desktop
                    this.toggleChatbot();
            }
        });
        
        // Quick action buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-action-btn')) {
                const message = e.target.getAttribute('data-message');
                this.input.value = message;
                this.sendMessage();
            }
        });
    }

    toggleChatbot() {
        this.isOpen = !this.isOpen;
        this.container.classList.toggle('active', this.isOpen);
        this.toggleBtn.classList.toggle('active', this.isOpen);
        
        if (this.isOpen) {
            setTimeout(() => this.input.focus(), 300);
        }
    }

    minimizeChatbot() {
        this.isOpen = false;
        this.container.classList.remove('active');
        this.toggleBtn.classList.remove('active');
    }

    autoResizeTextarea() {
        this.input.style.height = 'auto';
        this.input.style.height = Math.min(this.input.scrollHeight, 80) + 'px';
    }

    async sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        // Disable input
        this.setInputState(false);

        // Add user message
        this.addMessage(message, 'user');
        this.input.value = '';
        this.autoResizeTextarea();

        // Show typing indicator
        const typingId = this.addTypingIndicator();

        try {
            const response = await this.callChatAPI(message);
            this.removeTypingIndicator(typingId);
            this.addMessage(response, 'bot');
        } catch (error) {
            this.removeTypingIndicator(typingId);
            this.addErrorMessage("I'm having some technical difficulties right now. Please try again in a moment!");
            console.error('Chat API error:', error);
        } finally {
            this.setInputState(true);
        }
    }

    async callChatAPI(message) {
        try {
            const response = await fetch(`${this.apiUrl}/ask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    history: this.conversationHistory
                })
            });
            console.log(body)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // this.addMessage('bot', data.answer);
            // Update conversation history
            this.conversationHistory.push(
                { role: 'user', content: message },
                { role: 'assistant', content: data.response }
            );

            // Keep only last 10 messages for context
            if (this.conversationHistory.length > 10) {
                this.conversationHistory = this.conversationHistory.slice(-10);
            }

            return data.answer;
        } catch (error) {
            // Fallback response when API is not available
            return this.getFallbackResponse(message);
        }
    }

    getFallbackResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('project')) {
            return "Hi! I'm Madhur. I've worked on several exciting projects including QueryVerse (natural language to SQL), an AI Meeting Scheduler Bot, and an Intelligent Email Generation System. Each project showcases my skills in AI, ML, and full-stack development. My chatbot backend isn't running right now, but you can check out my portfolio for detailed project information!";
        } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
            return "I specialize in Python, AI/ML technologies, and have experience with frameworks like CrewAI, PydanticAI, TensorFlow, FastAPI, and many more. I'm passionate about AI Agents, Deep Learning, and building scalable backend systems. Check out my portfolio for the complete list of my technical skills!";
        } else if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
            return "I'm currently working as a Data Scientist - Trainee at Xalt Analytics Pvt. Ltd in Indore, where I develop AI-powered solutions like UX Weaver and automated video ad creation systems. I also have internship experience and have been involved in various leadership roles at GDSC.";
        } else {
            return "Hi! I'm Madhur Chouhan, an AI Engineer and Data Scientist. I'm passionate about creating innovative AI solutions and have experience in machine learning, deep learning, and full-stack development. Feel free to ask me about my projects, skills, or experience! (Note: My chatbot backend seems to be offline right now, but I'd love to chat!)";
        }
    }

    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        if (sender === 'bot') {
            const html = DOMPurify.sanitize(marked.parse(content)); // ✅ Convert markdown -> HTML safely
            messageDiv.innerHTML = html;
        } else {
            messageDiv.textContent = content; // Plain for user input
        }

        this.messagesArea.appendChild(messageDiv);
        this.scrollToBottom();

        return messageDiv;
    }

    addErrorMessage(content) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = content;
        
        this.messagesArea.appendChild(errorDiv);
        this.scrollToBottom();
        
        return errorDiv;
    }

    addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        this.messagesArea.appendChild(typingDiv);
        this.scrollToBottom();
        
        return typingDiv;
    }

    removeTypingIndicator(typingElement) {
        if (typingElement && typingElement.parentNode) {
            typingElement.parentNode.removeChild(typingElement);
        }
    }

    setInputState(enabled) {
        this.input.disabled = !enabled;
        this.sendBtn.disabled = !enabled;
        if (enabled) {
            this.input.focus();
        }
    }

    scrollToBottom() {
        this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
    }

    showWelcomeMessage() {
        setTimeout(() => {
            this.addMessage("Hey there! 👋 I'm Madhur, and I'm excited to chat with you! Feel free to ask me about my AI projects, technical skills, work experience, or anything else you'd like to know about my journey in AI and Data Science! 🚀", 'bot');
        }, 1500);
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioChatbot();
});

// Add some CSS animations on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.chatbot-toggle').style.animation = 'pulse 2s infinite';
    }, 2000);
});

// Legacy function for backward compatibility
function minimizeChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbot.style.display = 'none';

    const toggle = document.querySelector('.chatbot-toggle');
    if (toggle) toggle.style.display = 'block';
}