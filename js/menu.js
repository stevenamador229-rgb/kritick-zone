
(function(){
  var toastEl = document.getElementById('toast');
  function toast(msg){
    if(!toastEl) return;
    toastEl.textContent = msg || 'Copied!';
    toastEl.hidden = false;
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function(){ toastEl.hidden = true; }, 1600);
  }
  function setEmailCode(code){
    var a = document.getElementById('email-video');
    if(!a || !code) return;
    var addr = a.getAttribute('data-addr') || 'stevenamador229+zone@gmail.com';
    var subj = 'ZONE: My video | ' + code;
    var body = 'Attach your video or paste a Google Drive link. If you paid, put your order code in the subject.';
    a.href = 'mailto:' + addr + '?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body);
  }
  function selectVisible(text){
    var nodes = document.querySelectorAll('.zone-email-text, .email-text');
    for (var i=0;i<nodes.length;i++){
      if ((nodes[i].textContent || '').trim() === text){
        var range = document.createRange();
        range.selectNodeContents(nodes[i]);
        var sel = window.getSelection();
        if (sel){ sel.removeAllRanges(); sel.addRange(range); }
        return true;
      }
    }
    return false;
  }
  function copy(val){
    function fallback(){
      var ta = document.createElement('textarea');
      ta.value = val; ta.setAttribute('readonly','');
      ta.style.cssText='position:fixed;top:0;left:0;width:1px;height:1px;opacity:0.01;font-size:16px';
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      var ok=false;
      try{ ok=document.execCommand('copy'); }catch(e){ ok=false; }
      document.body.removeChild(ta);
      if(!ok) selectVisible(val);
      return ok;
    }
    if(navigator.clipboard && navigator.clipboard.writeText){
      return navigator.clipboard.writeText(val).then(function(){ return true; }).catch(function(){ return fallback(); });
    }
    return Promise.resolve(fallback());
  }
  document.querySelectorAll('[data-copy]').forEach(function(btn){
    btn.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      var val = btn.getAttribute('data-copy') || '';
      copy(val).then(function(){
        toast('Copied!');
        setEmailCode(val);
      });
    });
  });
})();
