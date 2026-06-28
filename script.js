(function() {
    if (!window.firebase) {
        const script = document.createElement('script');
        script.src = "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js";
        document.head.appendChild(script);
        const script2 = document.createElement('script');
        script2.src = "https://www.gstatic.com/firebasejs/9.6.1/firebase-database-compat.js";
        document.head.appendChild(script2);
        script2.onload = initApp;
    } else { initApp(); }

    function initApp() {
        const firebaseConfig = {
            apiKey: "AIzaSyCTTyUJrBDWDs209TooQQlz06jB-qBjygE",
            databaseURL: "https://tamin-mini-bot-default-rtdb.firebaseio.com",
            projectId: "tamin-mini-bot"
        };
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
        showLoginOverlay();
    }

    function showLoginOverlay() {
        if (document.getElementById('hacker-overlay')) document.getElementById('hacker-overlay').remove();
        const overlay = document.createElement('div');
        overlay.id = 'hacker-overlay';
        overlay.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:#000; color:#0F0; z-index:9999999; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:'Courier New', monospace;";
        document.body.appendChild(overlay);
        overlay.innerHTML = `
            <h2 style="text-shadow:0 0 10px #0F0;">SYSTEM ACCESS REQUIRED</h2>
            <input type="text" id="passInput" placeholder="ENTER ACCESS KEY" style="padding:10px; background:#111; color:#0F0; border:1px solid #0F0; text-align:center; border-radius:5px;">
            <br><button id="loginBtn" style="padding:10px 20px; background:#0F0; border:none; cursor:pointer; font-weight:bold;">AUTHENTICATE</button>
        `;
        document.getElementById('loginBtn').onclick = function() {
            const userPass = document.getElementById('passInput').value;
            // আপনার ডেটাবেসের 'passwords/' পাথ অনুযায়ী চেক
            firebase.database().ref('passwords/' + userPass).once('value').then((snapshot) => {
                if (snapshot.exists()) {
                    startCinematicSequence(overlay);
                } else {
                    alert("ACCESS DENIED: KEY NOT FOUND!");
                }
            });
        };
    }

    function startCinematicSequence(overlay) {
        overlay.innerHTML = "<h2 style='color:#0F0;'>INITIALIZING SEQUENCE...</h2>";
        const lines = ["BYPASSING FIREWALL...", "ACCESSING TELEGRAM MINI BOT...", "DECRYPTING PACKETS...", "SYSTEM BREACH READY!"];
        let i = 0;
        const interval = setInterval(() => {
            if (i < lines.length) {
                overlay.innerHTML += `<p style="font-size:18px;">> ${lines[i]}</p>`;
                i++;
            } else {
                clearInterval(interval);
                showFinalDashboard(overlay);
            }
        }, 1000);
    }

    function showFinalDashboard(overlay) {
        overlay.innerHTML = `
            <div style="border:1px solid #0F0; padding:30px; background:#050505; border-radius:10px; text-align:center;">
                <h2 style="color:#0F0;">SYSTEM BREACHED</h2>
                <p>আপনি কি এখন হ্যাক করতে চান?</p>
                <button id="hackBtn" style="padding:15px; background:#0F0; color:#000; border:none; cursor:pointer; font-weight:bold; width:100%;">START HACKING</button>
            </div>
        `;
        document.getElementById('hackBtn').onclick = function() {
            // টেলিগ্রাম মিনি বটের লিংক দেখানোর লজিক
            overlay.innerHTML = `
                <div style="padding:30px;">
                    <h3>BOT LINK EXTRACTED:</h3>
                    <a href="https://t.me/your_bot_link" style="color:#0F0; font-size:20px;">CLICK HERE TO OPEN BOT</a>
                    <br><br>
                    <button onclick="location.reload()" style="background:transparent; color:#F00; border:1px solid #F00;">LOGOUT</button>
                </div>
            `;
        };
    }
})();
