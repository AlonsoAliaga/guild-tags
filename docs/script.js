function toggleDarkmode() {
    if (document.getElementById('darkmode').checked == true) {
      document.body.classList.add('dark');
      for(let o of document.querySelectorAll('.lightbuttonboxes')) {
        o.classList.remove("lightbuttonboxes");
        o.classList.add("darkbuttonboxes");
        //console.log(`Darking: ${o.id}`)
      }
      let d = document.getElementById("overlay-div");
      if(d) {
        d.classList.remove("light-overlay");
        d.classList.add("dark-overlay");
      }
    }else{
      document.body.classList.remove('dark');
      for(let o of document.querySelectorAll('.darkbuttonboxes')) {
        o.classList.remove("darkbuttonboxes");
        o.classList.add("lightbuttonboxes");
        //console.log(`Lighting: ${o.id}`)
      }
      let d = document.getElementById("overlay-div");
      if(d) {
        d.classList.remove("dark-overlay");
        d.classList.add("light-overlay");
      }
    }
}
function checkSite(window) {
    check()
    setInterval(()=>{
        check()
    },1000 * 2);
    setTimeout(()=>{
      let href = window.location.href;
      if(!href.includes(atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw=="))) {
        try{document.title = `Page stolen from https://${atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw==")}`;}catch(e){}
        window.location = `https://${atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw==")}/guild-tags/`}
    });
    fetch('https://api.github.com/repos/AlonsoAliaga/AlonsoAliagaAPI/contents/api/tools/tools-list.json?ref=main')
      .then(res => res.json())
      .then(content => {
        const decoded = atob(content.content);
        const parsed = JSON.parse(decoded);
        let toolsData = parsed;
        let toolsArray = []
        for(let toolData of toolsData) {
          //console.log(toolData);
          let clazz = typeof toolData.clazz == "undefined" ? "" : ` class="${toolData.clazz}"`;
          let style = typeof toolData.style == "undefined" ? "" : ` style="${toolData.style}"`;
          toolsArray.push(`<span>💠</span> <span${clazz}${style}><a href="${toolData.link}">${toolData.name}</a></span><br>`);
        }
        document.getElementById("tools-for-you").innerHTML = toolsArray.join(`
`);
      });
      return;
}
let times = 0;
function loadCounter() {
 let href = window.location.href;
 if(!href.includes(atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw=="))) return;
 let link = atob("aHR0cHM6Ly9hbG9uc29hbGlhZ2EtcGFnZS1jb3VudC5nbGl0Y2gubWUvY291bnRlcj9zaXRlPTxzaXRlPiZrZXk9PGtleT4=")
  .replace(/<site>/g,"guild-tags").replace(/<key>/g,"KEY-A");
 let counter = document.getElementById("visitor-counter");
 if(counter) {
   $.ajax({
     url: link,
     type: "GET", /* or type:"GET" or type:"PUT" */
     dataType: "json",
     data: {
     },
     success: function (result) {
       if(isNaN(result))
         document.getElementById("counter-amount").innerHTML = "Click to return!";
       else document.getElementById("counter-amount").innerHTML = `Visits: ${result}`;
     },
     error: function (e) {
       times++;
       document.getElementById("counter-amount").innerHTML = "Click to return!";
       if(times <= 1) {
        setTimeout(()=>{
          loadCounter();
        },1000*10);
       }
     }
   });
 }
}
function check(lockAfter) {
    let a = atob("aHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy9BbG9uc29BbGlhZ2EvQWxvbnNvQWxpYWdhQVBJL2NvbnRlbnRzL2FwaS90YWdzL2d1aWxkLXRhZ3MuanNvbj9yZWY9bWFpbg==");
    fetch(a)
      .then(res => res.json())
      .then(content => {
        const decoded = atob(content.content);
        const parsed = JSON.parse(decoded);
        update(parsed,lockAfter);
    }).catch(e=>{
        console.log(`Error content:`);
        console.log(e);
    });
}
let stored = undefined;
function update(data,lockAfter) {
    const container = document.getElementById('guild-tags');
    if (data.length > 0) {
        let html = '<table style="margin: 0 auto;"><thead><tr><th>Guild Tag</th><th>Members Amount</th><th>Guild Name</th><th>Invitation</th></tr></thead><tbody>';
        data.forEach(item => {
          let show = `<span style="display:inline-block; padding:4px 8px; background-color:#545454; color:#fff; font-size:16px; font-weight:bold; border-radius:4px; text-transform:uppercase;font-family: Arial;"><img src="${item.img}" alt="${item.alt}" width="20"> ${item.alt}</span>`
          html += `
            <tr>
              <td>${show}${getTinyTag(item.nStatus)}</td>
              <td>${item.members}</td>
              <td>${item.name.replace(/[^a-zA-Z0-9.-_&\s+]/g,"")}</td>
              <td><a href="${item.invite}" target="_blank">${(item.lName || "🔗Invite").replace(/ð/g,'🔗')}</a></td>
            </tr>
          `;
        });
        html += '</tbody></table>';
        if(!container.classList.contains("locked")) {
            container.innerHTML = html;
            container.style.minHeight = "fit-content"
            if(lockAfter) {
                setTimeout(()=>{
                    lock();
                },1000 * 15);
            }
        }else {
            stored = html;
        }
    }else{
        container.innerText = `Not found. How?`;
    }
}
function getTinyTag(nStatus) {
    if(typeof nStatus != "undefined" && nStatus.length >= 1) {
        let color = `#3498db`;
        let sLower = nStatus.toLowerCase();
        if(sLower == "new") color = "#3498db"
        else if(sLower == "active again") color = "#1fb531"
        return ` <span style="display:inline-block; padding:4px 8px; background-color:${color}; color:#fff; font-size:18px; font-weight:bold; border-radius:4px; text-transform:uppercase;">${nStatus}</span>`
    }
    return ``;
}
function lock() {
    //console.log(`Calling lock method..`);
    const container = document.getElementById('guild-tags');
    if(container.classList.contains("locked")) return;
    //console.log(`Locking..`);
    container.innerHTML = "";
    container.classList.add("locked");
    const ov = document.createElement('div');
    ov.id = "overlay-div";
    ov.className = document.getElementById('darkmode').checked ? 'dark-overlay' : 'light-overlay';
    ov.innerHTML = `<img src="https://raw.githubusercontent.com/AlonsoAliaga/guild-tags/main/assets/images/lock-icon.png"><span>Click to unlock</span>`;
    container.append(ov);
    if(typeof stored == "undefined") {
        container.style.height = "850px";
    }
    ov.onclick = function() {
        ov.remove();
        container.classList.remove("locked");
        if(typeof stored != "undefined") {
            container.innerHTML = stored;
            container.style.minHeight = "fit-content"
            setTimeout(()=>{
                lock();
            },1000 * 15);
        }else{
            container.innerHTML = `<img src="https://raw.githubusercontent.com/AlonsoAliaga/guild-tags/main/assets/images/loading.gif" alt="Loading">
                <br><br><br><br>
                <h2 style="font-size: 25px; font-family: MinecraftBold;">Please wait. Loading guild tags..</h2>`
            check(true);
        }
    };
}
toggleDarkmode();
lock();