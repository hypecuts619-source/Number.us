(function() {
  var container = document.getElementById('routing-checker-widget');
  if (!container) return;

  var theme = container.getAttribute('data-theme') || 'light';
  var isDark = theme === 'dark';

  var bg = isDark ? '#0f172a' : '#ffffff';
  var text = isDark ? '#f8fafc' : '#0f172a';
  var border = isDark ? '#1e293b' : '#e2e8f0';
  var subtext = isDark ? '#94a3b8' : '#64748b';

  container.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  container.style.maxWidth = '400px';
  container.style.backgroundColor = bg;
  container.style.color = text;
  container.style.border = '1px solid ' + border;
  container.style.borderRadius = '16px';
  container.style.padding = '20px';
  container.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';

  var html = '' +
    '<div style="margin-bottom: 12px; font-weight: 700; font-size: 16px; display: flex; align-items: center; gap: 8px;">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11"/></svg>' +
      'Routing Number Checker' +
    '</div>' +
    '<p style="font-size: 12px; color: ' + subtext + '; margin: 0 0 12px 0;">Verify any 9-digit US bank ABA routing number instantly.</p>' +
    '<div style="display: flex; gap: 8px; margin-bottom: 12px;">' +
      '<input id="rtn-widget-input" type="text" maxlength="9" placeholder="Enter 9 digits..." style="flex: 1; padding: 10px 14px; border: 1px solid ' + border + '; border-radius: 8px; font-size: 14px; outline: none; background: ' + (isDark ? '#1e293b' : '#f8fafc') + '; color: ' + text + ';" />' +
      '<button id="rtn-widget-btn" style="background: #2563eb; color: #fff; border: none; padding: 10px 16px; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer;">Verify</button>' +
    '</div>' +
    '<div id="rtn-widget-result" style="display: none; padding: 10px; border-radius: 8px; font-size: 13px; margin-bottom: 12px;"></div>' +
    '<div style="font-size: 11px; color: ' + subtext + '; text-align: right; border-top: 1px solid ' + border + '; pt: 8px; margin-top: 8px;">' +
      'Powered by <a href="https://usroutingnumber.com" target="_blank" style="color: #2563eb; text-decoration: none; font-weight: 600;">USRoutingNumber.com</a>' +
    '</div>';

  container.innerHTML = html;

  var input = document.getElementById('rtn-widget-input');
  var btn = document.getElementById('rtn-widget-btn');
  var result = document.getElementById('rtn-widget-result');

  function validateMod10(code) {
    if (!/^\d{9}$/.test(code)) return false;
    var d = code.split('').map(Number);
    var checksum = (3*(d[0] + d[3] + d[6]) + 7*(d[1] + d[4] + d[7]) + (d[2] + d[5] + d[8])) % 10;
    return checksum === 0;
  }

  function handleCheck() {
    var val = input.value.trim();
    if (!val) return;
    result.style.display = 'block';
    
    if (validateMod10(val)) {
      result.style.background = isDark ? '#064e3b' : '#ecfdf5';
      result.style.color = isDark ? '#a7f3d0' : '#065f46';
      result.innerHTML = '<strong>Valid Checksum!</strong> <a href="https://usroutingnumber.com/' + val + '" target="_blank" style="color: inherit; text-decoration: underline; margin-left: 6px;">View Bank Details &rarr;</a>';
    } else {
      result.style.background = isDark ? '#7f1d1d' : '#fef2f2';
      result.style.color = isDark ? '#fecaca' : '#991b1b';
      result.innerHTML = '<strong>Invalid Routing Number.</strong> Please check the 9 digits.';
    }
  }

  btn.addEventListener('click', handleCheck);
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') handleCheck();
  });
})();
