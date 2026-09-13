let poster="";
let list=JSON.parse(localStorage.getItem("animehub_final")||"[]");

document.addEventListener("DOMContentLoaded",()=>{
  let f=document.getElementById("afile");
  if(f){
    f.addEventListener("change",e=>{
      let r=new FileReader();
      r.onload=ev=>{
        poster=ev.target.result;
        document.getElementById("ok").style.display="block";
      };
      r.readAsDataURL(e.target.files[0]);
    });
  }
  render();
});

function publish(){
  let n=document.getElementById("aname").value.trim();
  let ep=document.getElementById("aep").value.trim();
  let link=document.getElementById("alink").value.trim();
  if(!n||!poster||!link){alert("Name, Photo aur Link bharo");return;}
  list.unshift({id:Date.now(),name:n,ep:ep,poster:poster,link:link});
  localStorage.setItem("animehub_final",JSON.stringify(list));
  render();
  document.getElementById('admin').classList.remove('show');
}

function render(){
  let g=document.getElementById("popular");
  if(!g) return;
  g.innerHTML="";
  list.forEach(a=>{
    let d=document.createElement("div");
    d.className="card";
    d.innerHTML=`<span class="del" onclick="delEp(${a.id},event)">DELETE</span><img src="${a.poster}"><span class="badge">Ep ${a.ep}</span><div class="title">${a.name}</div>`;
    d.onclick=()=>{
      document.getElementById("ptitle").innerText=a.name;
      document.getElementById("pWrap").innerHTML=`<video src="${a.link}" controls autoplay playsinline style="width:100%;height:100%"></video>`;
      document.getElementById("player").classList.add("show");
    };
    g.appendChild(d);
  });
}

function delEp(id,ev){
  ev.stopPropagation();
  if(confirm("Delete kare?")){
    list=list.filter(x=>x.id!==id);
    localStorage.setItem("animehub_final",JSON.stringify(list));
    render();
  }
}

function closeP(){
  document.getElementById("player").classList.remove("show");
  document.getElementById("pWrap").innerHTML="";
}
