
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
  function copy(val){
    if(navigator.clipboard && navigator.clipboard.writeText){
      return navigator.clipboard.writeText(val);
    }
    var ta = document.createElement('textarea');
    ta.value = val; document.body.appendChild(ta); ta.select();
    try{ document.execCommand('copy'); } finally { document.body.removeChild(ta); }
    return Promise.resolve();
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
