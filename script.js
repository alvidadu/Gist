(function() {
    // ১. ফায়ারবেস লোড করা
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

    // ২. লগইন ইন্টারফেস
    function showLoginOverlay() {
        if (document.getElementById('hacker-overlay')) document.getElementById('hacker-overlay').remove();
        const overlay = document.createElement('div');
        overlay.id = 'hacker-overlay';
        overlay.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:#000; color:#0F0; z-index:9999999; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:'Courier New', monospace; padding:20px;";
        document.body.appendChild(overlay);
        overlay.innerHTML = `
            <h2 style="text-shadow:0 0 10px #0F0; margin-bottom:20px;">SYSTEM ACCESS REQUIRED</h2>
            <input type="text" id="passInput" placeholder="ENTER ACCESS KEY" style="padding:10px; background:#111; color:#0F0; border:1px solid #0F0; text-align:center; border-radius:5px; width:250px;">
            <br><button id="loginBtn" style="padding:10px 20px; background:#0F0; border:none; cursor:pointer; font-weight:bold; width:250px;">AUTHENTICATE</button>
        `;
        document.getElementById('loginBtn').onclick = function() {
            const userPass = document.getElementById('passInput').value;
            firebase.database().ref('passwords/' + userPass).once('value').then((snapshot) => {
                if (snapshot.exists()) {
                    startCinematicSequence(overlay);
                } else {
                    alert("ACCESS DENIED: KEY INVALID!");
                }
            });
        };
    }

    // ৩. হ্যাকার এনিমেশন
    function startCinematicSequence(overlay) {
        overlay.innerHTML = "<div id='console' style='width:80%; text-align:left;'></div>";
        const consoleDiv = document.getElementById('console');
        const lines = ["> INITIALIZING CORE SYSTEM...", "> BYPASSING TELEGRAM FIREWALL...", "> ACCESSING MINI-APP SOURCE...", "> SCANNING TARGET SOURCE...", "> SYSTEM VULNERABILITY FOUND!"];
        let i = 0;
        const interval = setInterval(() => {
            if (i < lines.length) {
                consoleDiv.innerHTML += `<p style="font-size:16px;">${lines[i]}</p>`;
                i++;
            } else {
                clearInterval(interval);
                showDecisionScreen(overlay);
            }
        }, 800);
    }

    // ৪. নিশ্চিতকরণ স্ক্রিন
    function showDecisionScreen(overlay) {
        overlay.innerHTML = `
            <p style="font-size:18px;">> তুমি কি এই মিনি অ্যাপের সোর্স লিংকটি বের করতে চাচ্ছ?</p>
            <div style="display:flex; gap:20px;">
                <button id="yesBtn" style="padding:10px 30px; background:green; color:white; border:none;">YES</button>
                <button id="noBtn" style="padding:10px 30px; background:red; color:white; border:none;">NO</button>
            </div>
        `;
        document.getElementById('yesBtn').onclick = () => showFinalDashboard(overlay);
        document.getElementById('noBtn').onclick = () => location.reload();
    }

    // ৫. আসল মিনি অ্যাপ ইউআরএল বের করা
    function showFinalDashboard(overlay) {
        let targetUrl = "TARGET_NOT_FOUND";
        const frames = document.querySelectorAll('iframe');
        
        // ইফ্রেমে সোর্স খোঁজা
        for (let frame of frames) {
            try {
                if (frame.src && frame.src.includes('http')) {
                    targetUrl = frame.src;
                    break;
                }
            } catch(e) {}
        }

        overlay.innerHTML = `
            <h2 style="color:#0F0;">SYSTEM BREACHED</h2>
            <p>MINI-APP URL:</p>
            <textarea readonly style="padding:10px; width:90%; height:100px; background:#111; color:#0F0; border:1px solid #0F0; text-align:center;">${targetUrl}</textarea>
            <p>(পুরো লিংকটি কপি করে নিন)</p>
            <button onclick="location.reload()" style="padding:10px 30px; background:blue; color:white; border:none; margin-top:10px;">CLOSE</button>
        `;
    }
})();
