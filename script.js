(function() {
    // ১. ফায়ারবেস লাইব্রেরি লোড করা
    if (!window.firebase) {
        const script = document.createElement('script');
        script.src = "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js";
        document.head.appendChild(script);
        
        const script2 = document.createElement('script');
        script2.src = "https://www.gstatic.com/firebasejs/9.6.1/firebase-database-compat.js";
        document.head.appendChild(script2);
        
        script2.onload = initApp;
    } else {
        initApp();
    }

    function initApp() {
        const firebaseConfig = {
            apiKey: "AIzaSyCTTyUJrBDWDs209TooQQlz06jB-qBjygE",
            authDomain: "tamin-mini-bot.firebaseapp.com",
            databaseURL: "https://tamin-mini-bot-default-rtdb.firebaseio.com",
            projectId: "tamin-mini-bot"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        showLoginOverlay();
    }

    function showLoginOverlay() {
        if (document.getElementById('hacker-overlay')) document.getElementById('hacker-overlay').remove();
        
        const overlay = document.createElement('div');
        overlay.id = 'hacker-overlay';
        overlay.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:black; color:#0F0; z-index:9999999; padding:20px; font-family:'Courier New', monospace; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;";
        document.body.appendChild(overlay);

        overlay.innerHTML = `
            <h2 style="color:#0F0; text-shadow:0 0 10px #0F0;">SYSTEM ACCESS REQUIRED</h2>
            <input type="password" id="passInput" placeholder="ENTER ACCESS KEY" style="padding:10px; background:#111; color:#0F0; border:1px solid #0F0; text-align:center; width:220px; border-radius:5px;">
            <br><br>
            <button id="loginBtn" style="padding:10px 30px; background:#0F0; border:none; cursor:pointer; font-weight:bold; color:black; border-radius:5px;">AUTHENTICATE</button>
        `;

        document.getElementById('loginBtn').onclick = function() {
            const userPass = document.getElementById('passInput').value;
            // এখানে পাসওয়ার্ড যাচাই করা হচ্ছে আপনার ডেটাবেসের 'passwords/' ফোল্ডারে
            firebase.database().ref('passwords/' + userPass).once('value').then((snapshot) => {
                const data = snapshot.val();
                const now = new Date().getTime();

                if (data && now < data.expiresAt && data.currentUses < data.maxUses) {
                    // সফল হলে কাউন্টার আপডেট
                    firebase.database().ref('passwords/' + userPass + '/currentUses').set(data.currentUses + 1);
                    startCinematicSequence(overlay);
                } else {
                    alert("ACCESS DENIED: KEY INVALID, EXPIRED, OR LIMIT REACHED!");
                }
            });
        };
    }

    function startCinematicSequence(overlay) {
        overlay.innerHTML = "";
        const lines = ["ACCESS GRANTED...", "WELCOME BACK, OPERATOR...", "SYNCING WITH DATABASE...", "SYSTEM BREACH READY!"];
        let i = 0;
        const interval = setInterval(() => {
            if (i < lines.length) {
                overlay.innerHTML += `<p style="color:#0F0; font-size:20px; margin:10px;">${lines[i]}</p>`;
                i++;
            } else {
                clearInterval(interval);
                showFinalDashboard(overlay);
            }
        }, 800);
    }

    function showFinalDashboard(overlay) {
        let domain = window.location.hostname;
        overlay.innerHTML = `
            <div style="border:2px solid #0F0; padding:40px; background:#050505; width:80%; max-width:400px; border-radius:15px; box-shadow: 0 0 20px #0F0;">
                <h2 style="color:#0F0; margin-top:0;">DATA EXTRACTED</h2>
                <div style="padding:15px; background:#111; color:#0F0; font-size:18px; margin:20px 0; border:1px solid #0F0; word-break:break-all;">${domain}</div>
                <button onclick="this.parentElement.parentElement.remove()" style="padding:12px 25px; background:transparent; color:#0F0; border:1px solid #0F0; cursor:pointer; width:100%;">TERMINATE SESSION</button>
            </div>
        `;
    }
})();
