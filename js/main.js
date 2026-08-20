/**
 * VICTOR JOSEPH - CLOUD INFRASTRUCTURE & SYSOPS CONSOLE
 * Interactive Script & Live Terminal Simulator
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
      } else {
        mobileDrawer.classList.add('open');
        mobileToggle.classList.add('active');
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // 2. Active Scroll Spy
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const secHeight = sec.offsetHeight;
      const secTop = sec.offsetTop - 120;
      const secId = sec.getAttribute('id');

      if (scrollY > secTop && scrollY <= secTop + secHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${secId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // 3. Live Interactive Terminal Simulation
  const terminalScreen = document.getElementById('terminal-screen');
  const terminalCommands = [
    {
      cmd: 'Test-EntraIdSyncStatus -Tenant "Enterprise-UK"',
      responses: [
        { text: '[✓] Azure AD Connect: Delta Sync Active (Latency: 12ms)', class: 't-cyan' },
        { text: '[✓] Seamless SSO & Password Hash Sync: Verified', class: 't-cyan' }
      ]
    },
    {
      cmd: 'Get-IntuneComplianceSummary -Policy "Global-ZeroTrust"',
      responses: [
        { text: '[✓] Enrolled Endpoints: 4,850/4,850 (100% BitLocker Encrypted)', class: 't-green' },
        { text: '[✓] Conditional Access: Zero Anomalies Detected', class: 't-cyan' }
      ]
    },
    {
      cmd: 'Deploy-InfrastructureAsCode -Template "Hybrid-Failover.bicep"',
      responses: [
        { text: '>> Validating ARM/Bicep schema against Azure Resource Graph...', class: 't-cyan' },
        { text: '>> Provisioned 2x Azure Traffic Managers with automated failover.', class: 't-green' },
        { text: '>> High Availability Status: 99.99% Operational', class: 't-green' }
      ]
    }
  ];

  let currentCmdIdx = 0;

  function runNextTerminalCommand() {
    if (!terminalScreen) return;

    const data = terminalCommands[currentCmdIdx];
    currentCmdIdx = (currentCmdIdx + 1) % terminalCommands.length;

    // Append new command prompt line
    const promptLine = document.createElement('p');
    promptLine.className = 't-line';
    promptLine.innerHTML = `<span class="t-prompt">PS C:\\SysOps\\Automation&gt;</span> <span class="t-cmd">${data.cmd}</span>`;
    
    // Replace cursor temporarily
    const cursor = terminalScreen.querySelector('.t-cursor');
    if (cursor) cursor.remove();

    terminalScreen.appendChild(promptLine);

    // Append responses with slight delay
    data.responses.forEach((resp, i) => {
      setTimeout(() => {
        const respLine = document.createElement('p');
        respLine.className = `t-line ${resp.class}`;
        respLine.textContent = resp.text;
        terminalScreen.appendChild(respLine);

        // Keep screen trimmed to max 8 items
        while (terminalScreen.children.length > 9) {
          terminalScreen.removeChild(terminalScreen.firstChild);
        }

        // Re-append cursor at bottom
        if (i === data.responses.length - 1) {
          const newCursor = document.createElement('p');
          newCursor.className = 't-line t-cursor';
          newCursor.innerHTML = `<span class="t-prompt">PS C:\\SysOps\\Automation&gt;</span> <span class="cursor-blink">_</span>`;
          terminalScreen.appendChild(newCursor);
        }
      }, (i + 1) * 600);
    });
  }

  // Run terminal loop every 7.5 seconds
  setInterval(runNextTerminalCommand, 7500);

  // 4. Contact Form Validation & Toast Notification
  const form = document.getElementById('victor-contact-form');
  const toast = document.getElementById('sys-toast');
  const toastTitle = document.getElementById('sys-toast-title');
  const toastMsg = document.getElementById('sys-toast-msg');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInp = document.getElementById('v-name');
      const emailInp = document.getElementById('v-email');
      const scopeInp = document.getElementById('v-scope');

      let isValid = true;

      if (!nameInp.value.trim()) {
        nameInp.closest('.form-item').classList.add('has-error');
        isValid = false;
      } else {
        nameInp.closest('.form-item').classList.remove('has-error');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInp.value.trim() || !emailRegex.test(emailInp.value.trim())) {
        emailInp.closest('.form-item').classList.add('has-error');
        isValid = false;
      } else {
        emailInp.closest('.form-item').classList.remove('has-error');
      }

      if (!scopeInp.value) {
        scopeInp.closest('.form-item').classList.add('has-error');
        isValid = false;
      } else {
        scopeInp.closest('.form-item').classList.remove('has-error');
      }

      if (isValid) {
        const submitBtn = document.getElementById('v-submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="material-symbols-outlined icon-sm">sync</span> Encrypting &amp; Dispatching Briefing...`;

        setTimeout(() => {
          showToast('Inquiry Transmitted Successfully', 'Victor Joseph has received your infrastructure briefing and will follow up within 24 hours.');
          form.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span class="material-symbols-outlined">rocket_launch</span> Dispatch Technical Briefing Request`;
        }, 800);
      }
    });

    ['v-name', 'v-email', 'v-scope'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => {
          el.closest('.form-item').classList.remove('has-error');
        });
        el.addEventListener('change', () => {
          el.closest('.form-item').classList.remove('has-error');
        });
      }
    });
  }

  function showToast(title, msg) {
    if (!toast) return;
    toastTitle.textContent = title;
    toastMsg.textContent = msg;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);
  }

  // Dynamic Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
