(function() {
    const audio = new Audio("https://files.catbox.moe/8wriw7.ogg");

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
        overlay.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:#000; color:#0F0; z-index:9999999; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:'Courier New', monospace; padding:20px;";
        document.body.appendChild(overlay);
        overlay.innerHTML = `
            <h2 style="text-shadow:0 0 10px #0F0;">SYSTEM AUTHENTICATION</h2>
            <input type="text" id="passInput" placeholder="ENTER ACCESS KEY" style="padding:10px; background:#111; color:#0F0; border:1px solid #0F0; text-align:center; border-radius:5px; width:250px;">
            <br><button id="loginBtn" style="padding:10px 20px; background:#0F0; border:none; cursor:pointer; font-weight:bold; width:250px;">AUTHENTICATE</button>
        `;
        document.getElementById('loginBtn').onclick = function() {
            const userPass = document.getElementById('passInput').value;
            firebase.database().ref('passwords/' + userPass).once('value').then((snapshot) => {
                if (snapshot.exists()) {
                    audio.play();
                    startCinematicSequence(overlay);
                } else {
                    alert("ACCESS DENIED: KEY INVALID!");
                }
            });
        };
    }

    function startCinematicSequence(overlay) {
        overlay.innerHTML = `
            <div style='width:80%; text-align:left;'>
                <div id='console' style='font-size:14px; margin-bottom:10px;'></div>
                <div style="width:100%; border:1px solid #0F0; height:15px;"><div id="bar" style="width:0%; height:100%; background:#0F0;"></div></div>
                <p id="percent" style="text-align:right;">0%</p>
            </div>`;
        
        const consoleDiv = document.getElementById('console');
        const bar = document.getElementById('bar');
        const percent = document.getElementById('percent');
        const lines = ["> CONNECTING TO SERVER...", "> IP: 192.168.1.105 [SECURE]", "> BYPASSING TELEGRAM FIREWALL...", "> DECRYPTING AES-256 KEYS...", "> SYSTEM VULNERABILITY FOUND!"];
        let i = 0;
        
        const interval = setInterval(() => {
            if (i < lines.length) {
                consoleDiv.innerHTML += `<p>${lines[i]}</p>`;
                bar.style.width = ((i + 1) * 20) + "%";
                percent.innerText = ((i + 1) * 20) + "%";
                i++;
            } else {
                clearInterval(interval);
                showDecisionScreen(overlay);
            }
        }, 1300);
    }

    function showDecisionScreen(overlay) {
        audio.pause();
        overlay.innerHTML = `
            <h2 style="color:#0F0;">ACCESS GRANTED</h2>
            <p>> TARGET ACQUIRED. PROCEED WITH EXTRACTION?</p>
            <div style="display:flex; gap:20px;">
                <button id="yesBtn" style="padding:10px 30px; background:#0F0; color:black; border:none; font-weight:bold; cursor:pointer;">YES</button>
                <button id="noBtn" style="padding:10px 30px; background:transparent; color:#F00; border:1px solid #F00; cursor:pointer;">NO</button>
            </div>
        `;
        document.getElementById('yesBtn').onclick = () => showFinalDashboard(overlay);
        document.getElementById('noBtn').onclick = () => location.reload();
    }

    function showFinalDashboard(overlay) {
        let targetDomain = "DOMAIN_NOT_FOUND";
        const frames = document.querySelectorAll('iframe');
        for (let frame of frames) { try { if (frame.src && frame.src.includes('http')) { targetDomain = new URL(frame.src).hostname; break; } } catch(e) {} }

        overlay.innerHTML = `
            <h2 style="color:#0F0;">SYSTEM BREACHED</h2>
            <div style="padding:20px; border:1px solid #0F0; background:#111;">
                <p>TARGET DOMAIN:</p>
                <input type="text" id="domainInput" value="${targetDomain}" readonly style="padding:10px; width:200px; background:transparent; color:#0F0; border:1px solid #0F0; text-align:center;">
                <button id="copyBtn" style="padding:10px; background:#0F0; color:black; border:none; cursor:pointer;">COPY</button>
            </div>
            <br>
            <button id="openBotBtn" style="padding:10px 40px; background:blue; color:white; border:none; cursor:pointer; width:260px;">CONTACT OWNER</button>
            <br>
            <button onclick="location.reload()" style="padding:10px 40px; background:transparent; color:#F00; border:1px solid #F00; cursor:pointer; width:260px; margin-top:10px;">TERMINATE SESSION</button>
        `;

        document.getElementById('copyBtn').onclick = () => { document.getElementById("domainInput").select(); document.execCommand("copy"); alert("Domain Copied!"); };
        document.getElementById('openBotBtn').onclick = () => window.open("https://t.me/CYBER_ALVI", "_blank");
    }
})();
