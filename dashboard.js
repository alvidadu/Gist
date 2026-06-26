(async function() {
    // ১. আপনার ফায়ারবেস কনফিগুরেশন ও ডাটাবেজ লিংক
    const firebaseProjectId = "tamin-mini-bot";
    const dbUrl = `https://${firebaseProjectId}-default-rtdb.firebaseio.com/password.json`;

    // ইউজারের কাছ থেকে পাসওয়ার্ড চাওয়া
    var userPass = prompt("Tamim Mini Bot - এডমিন প্যানেল পাসওয়ার্ড দিন:");
    if (!userPass) return;

    try {
        // ফায়ারবেস রিয়াল-টাইম ডাটাবেজ থেকে পাসওয়ার্ড চেক করা
        let response = await fetch(dbUrl);
        let correctPass = await response.json();

        // যদি ডাটাবেজে পাসওয়ার্ড খালি থাকে বা না মিলে
        if (!correctPass || userPass !== correctPass.toString().trim()) {
            alert("ভুল পাসওয়ার্ড! অ্যাক্সেস রিফিউজড।");
            return;
        }
    } catch (error) {
        alert("সার্ভার কানেকশন ফেইল্ড! ফায়ারবেস ডাটাবেজ রুলস (Rules) চেক করুন।");
        return;
    }

    // ২. ড্যাশবোর্ডের UI (ইউজার ইন্টারফেস) তৈরি
    var panel = document.createElement('div');
    panel.id = "tamin-admin-panel";
    panel.style.position = 'fixed';
    panel.style.bottom = '20px';
    panel.style.right = '20px';
    panel.style.width = '320px';
    panel.style.maxHeight = '80vh';
    panel.style.overflowY = 'auto';
    panel.style.backgroundColor = '#111827';
    panel.style.color = '#ffffff';
    panel.style.border = '2px solid #10B981';
    panel.style.borderRadius = '16px';
    panel.style.padding = '15px';
    panel.style.zIndex = '999999';
    panel.style.boxShadow = '0px 10px 30px rgba(0,0,0,0.7)';
    panel.style.fontFamily = 'Segoe UI, Arial, sans-serif';

    panel.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid #374151; padding-bottom:8px;">
            <b style="color:#10B981; font-size:16px;">🚀 Tamin Mini Bot Panel</b>
            <button id="close-db-panel" style="background:none; border:none; color:#EF4444; cursor:pointer; font-weight:bold; font-size:18px;">✕</button>
        </div>
        <div style="display:flex; flex-direction:column; gap:10px;" id="dashboard-features">
            </div>
    `;
    document.body.appendChild(panel);

    // ক্লোজ বাটন ফাংশন
    document.getElementById('close-db-panel').onclick = function() { panel.remove(); };

    // ৩. ফিচার বাটন এড করার ডাইনামিক ফাংশন
    function addFeature(name, description, color, callback) {
        var btn = document.createElement('button');
        btn.style.width = '100%';
        btn.style.padding = '12px';
        btn.style.backgroundColor = '#1F2937';
        btn.style.color = '#fff';
        btn.style.border = `1px solid ${color}`;
        btn.style.borderRadius = '8px';
        btn.style.cursor = 'pointer';
        btn.style.textAlign = 'left';
        btn.style.transition = '0.2s';
        
        btn.innerHTML = `<b style="color:${color}; display:block;">${name}</b><br><span style="font-size:11px; color:#9CA3AF;">${description}</span>`;
        
        btn.onmouseover = () => btn.style.backgroundColor = '#374151';
        btn.onmouseout = () => btn.style.backgroundColor = '#1F2937';
        btn.onclick = callback;
        
        document.getElementById('dashboard-features').appendChild(btn);
    }

    // ================= এখানে আপনার ফিচারসমূহ সাজানো আছে =================

    // ফিচার ১: Eruda Console
    addFeature("🛠️ Open Eruda Console", "মোবাইল ডেভেলপার কনসোল ও লগ দেখার জন্য", "#10B981", function() {
        if (window.eruda) { window.eruda.show(); } else {
            var s = document.createElement('script'); s.src = "//cdn.jsdelivr.net/npm/eruda";
            document.body.appendChild(s); s.onload = function() { eruda.init(); eruda.show(); };
        }
    });

    // ফিচার ২: Element Inspector (Chii)
    addFeature("🔍 Inspect Element", "লাইভ ওয়েবসাইটের যেকোনো কোড এডিট/inspect করার জন্য", "#3B82F6", function() {
        if (window.chii) { alert("Chii already loaded"); } else {
            var s = document.createElement('script'); s.src = "//cdn.jsdelivr.net/npm/chii";
            document.body.appendChild(s);
        }
    });

    // ফিচার ৩: পাসওয়ার্ড ভিউয়ার
    addFeature("🔐 View Password Fields", "পেজের ভেতরের স্টার (*) হয়ে থাকা পাসওয়ার্ডগুলো দেখার জন্য", "#F59E0B", function() {
        var inputs = document.getElementsByTagName('input');
        var count = 0;
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type === 'password') {
                inputs[i].type = 'text';
                count++;
            }
        }
        alert(count > 0 ? `${count}টি পাসওয়ার্ড ফিল্ড আনহাইড করা হয়েছে!` : "কোনো পাসওয়ার্ড ফিল্ড পাওয়া যায়নি।");
    });

    // ফিচার ৪: নাইট মোড টগল
    addFeature("🎨 Toggle Night Mode", "যেকোনো ওয়েবসাইটকে ডার্ক মোড করার জন্য", "#8B5CF6", function() {
        document.body.style.filter = document.body.style.filter ? '' : 'invert(1) hue-rotate(180deg)';
    });

    // ভবিষ্যৎ ফিচার যুক্ত করার ফরম্যাট (নমুনা):
    /*
    addFeature("ফিচারের নাম", "ফিচারের বর্ণনা", "#রঙের_কোড", function() {
        // কোড এখানে বসবে
    });
    */

})();
