// 北邮801通信原理 · 历年真题选择题刷题系统 (2003-2024)
// Main Application Logic

(function () {
  'use strict';

  // 1. App State
  const state = {
    mode: 'year', // 'year' | 'random' | 'mistakes' | 'favorites'
    year: 2024,
    currentIndex: 0,
    questions: [], // Active questions array
    answers: {},   // { [id]: { chosen: 'A', isCorrect: true, time: ... } }
    mistakes: new Set(), // Set of question item IDs
    favorites: new Set(),
    autoNext: true,
    theme: 'light',
    showAnswer: false
  };

  // 2. DOM Elements
  const DOM = {
    yearSelect: document.getElementById('year-select'),
    modeTabs: document.querySelectorAll('.mode-tab'),
    mistakeCount: document.getElementById('mistake-count'),
    favCount: document.getElementById('fav-count'),
    btnThemeToggle: document.getElementById('btn-theme-toggle'),
    btnPdfModal: document.getElementById('btn-pdf-modal'),
    
    // Stats
    statProgress: document.getElementById('stat-progress'),
    statCorrect: document.getElementById('stat-correct'),
    statWrong: document.getElementById('stat-wrong'),
    statAccuracy: document.getElementById('stat-accuracy'),
    progressBarFill: document.getElementById('progress-bar-fill'),
    toggleAutoNext: document.getElementById('toggle-autonext'),
    btnSheet: document.getElementById('btn-sheet'),
    btnResetYear: document.getElementById('btn-reset-year'),

    // Question Card
    cardYear: document.getElementById('card-year'),
    cardIndex: document.getElementById('card-index'),
    cardBlank: document.getElementById('card-blank'),
    btnFav: document.getElementById('btn-fav'),
    btnZoom: document.getElementById('btn-zoom'),
    blanksNav: document.getElementById('blanks-nav'),
    blanksPillList: document.getElementById('blanks-pill-list'),
    questionImg: document.getElementById('question-img'),
    imgPlaceholder: document.getElementById('img-placeholder'),
    optionsContainer: document.getElementById('options-container'),
    feedbackBox: document.getElementById('feedback-box'),
    feedbackStatus: document.getElementById('feedback-status'),
    feedbackDetails: document.getElementById('feedback-details'),

    // Navigation
    btnPrev: document.getElementById('btn-prev'),
    btnNext: document.getElementById('btn-next'),
    btnToggleAnswer: document.getElementById('btn-toggle-answer'),
    txtShowAns: document.getElementById('txt-show-ans'),

    // Modals
    sheetModal: document.getElementById('sheet-modal'),
    btnCloseSheet: document.getElementById('btn-close-sheet'),
    sheetGrid: document.getElementById('sheet-grid'),

    pdfModal: document.getElementById('pdf-modal'),
    btnClosePdf: document.getElementById('btn-close-pdf'),
    pdfListGrid: document.getElementById('pdf-list-grid'),

    lightboxModal: document.getElementById('lightbox-modal'),
    btnCloseLightbox: document.getElementById('btn-close-lightbox'),
    lightboxImg: document.getElementById('lightbox-img'),

    // Sync Modal
    btnSyncModal: document.getElementById('btn-sync-modal'),
    syncModal: document.getElementById('sync-modal'),
    btnCloseSync: document.getElementById('btn-close-sync'),
    btnExportCode: document.getElementById('btn-export-code'),
    btnExportFile: document.getElementById('btn-export-file'),
    syncCodeArea: document.getElementById('sync-code-area'),
    btnImportCode: document.getElementById('btn-import-code'),
    fileImport: document.getElementById('file-import')
  };

  // 3. Storage Helpers
  const STORAGE_KEYS = {
    ANSWERS: 'bupt801_quiz_answers',
    MISTAKES: 'bupt801_quiz_mistakes',
    FAVORITES: 'bupt801_quiz_favorites',
    AUTO_NEXT: 'bupt801_quiz_autonext',
    THEME: 'bupt801_quiz_theme',
    LAST_YEAR: 'bupt801_quiz_last_year'
  };

  function loadStorage() {
    try {
      const savedAns = localStorage.getItem(STORAGE_KEYS.ANSWERS);
      if (savedAns) state.answers = JSON.parse(savedAns);

      const savedMis = localStorage.getItem(STORAGE_KEYS.MISTAKES);
      if (savedMis) state.mistakes = new Set(JSON.parse(savedMis));

      const savedFav = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (savedFav) state.favorites = new Set(JSON.parse(savedFav));

      const savedAuto = localStorage.getItem(STORAGE_KEYS.AUTO_NEXT);
      if (savedAuto !== null) state.autoNext = savedAuto === 'true';

      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      if (savedTheme) state.theme = savedTheme;

      const savedYear = localStorage.getItem(STORAGE_KEYS.LAST_YEAR);
      if (savedYear && window.QUIZ_DATA && window.QUIZ_DATA.years.includes(parseInt(savedYear))) {
        state.year = parseInt(savedYear);
      }

      // If running over HTTP, fetch server database to merge
      if (window.location.protocol.startsWith('http')) {
        fetch('/api/progress')
          .then(res => res.json())
          .then(serverData => {
            if (serverData && (serverData.answers || serverData.mistakes)) {
              importSyncData(serverData, false);
            }
          })
          .catch(() => {});
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  function saveStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(state.answers));
      localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(Array.from(state.mistakes)));
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(Array.from(state.favorites)));
      localStorage.setItem(STORAGE_KEYS.AUTO_NEXT, state.autoNext);
      localStorage.setItem(STORAGE_KEYS.THEME, state.theme);
      localStorage.setItem(STORAGE_KEYS.LAST_YEAR, state.year);

      // If running over HTTP, sync to central server database
      if (window.location.protocol.startsWith('http')) {
        const payload = exportSyncData();
        fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => {});
      }
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  function exportSyncData() {
    return {
      answers: state.answers,
      mistakes: Array.from(state.mistakes),
      favorites: Array.from(state.favorites),
      year: state.year,
      updatedAt: Date.now()
    };
  }

  function importSyncData(payload, showToast = true) {
    if (!payload) return;
    if (payload.answers) {
      state.answers = { ...state.answers, ...payload.answers };
    }
    if (payload.mistakes) {
      payload.mistakes.forEach(id => state.mistakes.add(id));
    }
    if (payload.favorites) {
      payload.favorites.forEach(id => state.favorites.add(id));
    }
    saveStorage();
    updateCountBadges();
    renderCurrentQuestion();
    updateStats();
    if (showToast) {
      alert('🎉 恭喜！刷题进度与错题本已成功合并导入！');
    }
  }

  // 4. Initialize Data & UI
  function init() {
    loadStorage();

    // Set Theme
    document.body.className = `theme-${state.theme}`;

    // Populate Year Select
    const years = window.QUIZ_DATA.years || [];
    DOM.yearSelect.innerHTML = years.map(y => `<option value="${y}">${y} 年真题 (${getYearCount(y)} 题)</option>`).join('');
    DOM.yearSelect.value = state.year;

    // Toggle Auto Next
    DOM.toggleAutoNext.checked = state.autoNext;

    // Update Badges
    updateCountBadges();

    // Populate PDF Modal
    populatePdfModal(years);

    // Bind Listeners
    bindEvents();

    // Load initial question set
    switchMode('year');
  }

  function getYearCount(year) {
    if (!window.QUIZ_DATA || !window.QUIZ_DATA.items) return 0;
    return window.QUIZ_DATA.items.filter(item => item.year === year).length;
  }

  function updateCountBadges() {
    DOM.mistakeCount.textContent = state.mistakes.size;
    DOM.favCount.textContent = state.favorites.size;
  }

  // 5. Mode Switching & Question List Construction
  function switchMode(newMode) {
    state.mode = newMode;
    state.currentIndex = 0;
    state.showAnswer = false;

    // Update active tab styling
    DOM.modeTabs.forEach(tab => {
      if (tab.dataset.mode === newMode) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    const allItems = window.QUIZ_DATA.items || [];

    if (newMode === 'year') {
      DOM.yearSelect.disabled = false;
      DOM.yearSelect.style.opacity = '1';
      state.questions = allItems.filter(item => item.year === state.year);
    } else if (newMode === 'random') {
      DOM.yearSelect.disabled = true;
      DOM.yearSelect.style.opacity = '0.5';
      // Shuffle 30 questions
      const shuffled = [...allItems].sort(() => 0.5 - Math.random());
      state.questions = shuffled.slice(0, 30);
    } else if (newMode === 'mistakes') {
      DOM.yearSelect.disabled = true;
      DOM.yearSelect.style.opacity = '0.5';
      state.questions = allItems.filter(item => state.mistakes.has(item.id));
      if (state.questions.length === 0) {
        alert('当前错题本为空！当您做错题目时会自动加入错题本。');
        switchMode('year');
        return;
      }
    } else if (newMode === 'favorites') {
      DOM.yearSelect.disabled = true;
      DOM.yearSelect.style.opacity = '0.5';
      state.questions = allItems.filter(item => state.favorites.has(item.id));
      if (state.questions.length === 0) {
        alert('当前收藏夹为空！点击题目卡片右上角的五角星即可收藏重点题目。');
        switchMode('year');
        return;
      }
    }

    renderCurrentQuestion();
    updateStats();
  }

  // 6. Question Rendering
  function renderCurrentQuestion() {
    if (!state.questions || state.questions.length === 0) {
      DOM.cardIndex.textContent = '暂无题目';
      return;
    }

    const item = state.questions[state.currentIndex];
    const total = state.questions.length;

    // Year & Index Badges
    DOM.cardYear.textContent = `${item.year} 年`;
    DOM.cardIndex.textContent = `第 ${state.currentIndex + 1} / ${total} 题`;
    DOM.cardBlank.textContent = item.sub_title || `第 ${item.blank_num} 空`;

    // Favorite Status
    if (state.favorites.has(item.id)) {
      DOM.btnFav.classList.add('starred');
    } else {
      DOM.btnFav.classList.remove('starred');
    }

    // Image loading
    DOM.questionImg.style.display = 'none';
    DOM.imgPlaceholder.style.display = 'flex';
    DOM.questionImg.onload = function () {
      DOM.imgPlaceholder.style.display = 'none';
      DOM.questionImg.style.display = 'block';
    };
    DOM.questionImg.src = item.image;

    // Check sibling blanks for multi-blank questions in the same card
    renderSiblingBlanks(item);

    // Options rendering
    renderOptions(item);

    // Reset Answer Toggle
    state.showAnswer = false;
    DOM.txtShowAns.textContent = '显示答案';
    DOM.feedbackBox.style.display = 'none';

    // If already answered, show feedback
    const userRecord = state.answers[item.id];
    if (userRecord) {
      showFeedback(item, userRecord.chosen, userRecord.isCorrect);
    }

    // Navigation buttons state
    DOM.btnPrev.disabled = state.currentIndex === 0;
    DOM.btnNext.disabled = state.currentIndex === total - 1;

    updateStats();
  }

  function renderSiblingBlanks(currentItem) {
    if (state.mode !== 'year') {
      DOM.blanksNav.style.display = 'none';
      return;
    }

    // Find all items in current question list that share the same image (same question card)
    const siblings = state.questions.filter(q => q.image === currentItem.image && q.year === currentItem.year);
    if (siblings.length <= 1) {
      DOM.blanksNav.style.display = 'none';
      return;
    }

    DOM.blanksNav.style.display = 'flex';
    DOM.blanksPillList.innerHTML = siblings.map(sib => {
      const ansRec = state.answers[sib.id];
      let statusClass = '';
      let statusIcon = '';
      if (ansRec) {
        if (ansRec.isCorrect) {
          statusClass = 'status-correct';
          statusIcon = '✓';
        } else {
          statusClass = 'status-wrong';
          statusIcon = '✗';
        }
      }
      const isActive = sib.id === currentItem.id ? 'active' : '';
      return `<button class="blank-tab ${isActive} ${statusClass}" data-id="${sib.id}">
        (${sib.blank_num}) ${statusIcon}
      </button>`;
    }).join('');

    DOM.blanksPillList.querySelectorAll('.blank-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.id;
        const targetIdx = state.questions.findIndex(q => q.id === targetId);
        if (targetIdx !== -1) {
          state.currentIndex = targetIdx;
          renderCurrentQuestion();
        }
      });
    });
  }

  function renderOptions(item) {
    const options = item.options || ['A', 'B', 'C', 'D'];
    const userRecord = state.answers[item.id];

    DOM.optionsContainer.innerHTML = options.map(opt => {
      let optClass = 'option-btn';
      let icon = '';

      if (userRecord) {
        const isThisChosen = userRecord.chosen.toUpperCase() === opt.toUpperCase();
        const isThisAnswer = isAnswerMatch(opt, item.answer);

        if (isThisAnswer) {
          optClass += ' opt-correct';
          icon = '<span class="option-status-icon">✓</span>';
        } else if (isThisChosen && !userRecord.isCorrect) {
          optClass += ' opt-wrong';
          icon = '<span class="option-status-icon">✗</span>';
        }
      }

      return `
        <button class="${optClass}" data-opt="${opt}">
          <span class="option-letter">${opt}</span>
          <span class="option-text">${getOptionLabel(opt)}</span>
          ${icon}
        </button>
      `;
    }).join('');

    DOM.optionsContainer.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        handleOptionSelect(item, btn.dataset.opt);
      });
    });
  }

  function getOptionLabel(opt) {
    // If it's a single letter A, B, C, D
    return `选项 ${opt}`;
  }

  function isAnswerMatch(chosen, correct) {
    if (!chosen || !correct) return false;
    const c1 = chosen.trim().toUpperCase();
    const c2 = correct.trim().toUpperCase();
    if (c1 === c2) return true;
    // Check if correct answer has format like "a 或 F"
    if (c2.includes('或')) {
      const parts = c2.split('或').map(p => p.trim());
      return parts.includes(c1);
    }
    return false;
  }

  // 7. Answer Selection & Immediate Feedback
  function handleOptionSelect(item, chosenOpt) {
    const isCorrect = isAnswerMatch(chosenOpt, item.answer);

    // Save Record
    state.answers[item.id] = {
      chosen: chosenOpt,
      isCorrect: isCorrect,
      timestamp: Date.now()
    };

    if (isCorrect) {
      // If was mistake, could keep or remove. Let's keep until explicit reset or mastery
    } else {
      state.mistakes.add(item.id);
    }

    saveStorage();
    updateCountBadges();

    // Re-render options & feedback
    renderOptions(item);
    showFeedback(item, chosenOpt, isCorrect);
    updateStats();

    // Auto next question if correct
    if (isCorrect && state.autoNext) {
      setTimeout(() => {
        if (state.currentIndex < state.questions.length - 1) {
          goToNextQuestion();
        }
      }, 700);
    }
  }

  function showFeedback(item, chosen, isCorrect) {
    DOM.feedbackBox.style.display = 'flex';
    DOM.feedbackBox.className = `feedback-box ${isCorrect ? 'status-correct' : 'status-wrong'}`;

    if (isCorrect) {
      DOM.feedbackStatus.innerHTML = `
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        回答正确！🎉
      `;
      DOM.feedbackDetails.innerHTML = `标准答案：<strong>${item.answer}</strong> &nbsp;|&nbsp; 您的选择：<strong>${chosen}</strong>`;
    } else {
      DOM.feedbackStatus.innerHTML = `
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        回答错误 ❌ 已自动加入错题本
      `;
      DOM.feedbackDetails.innerHTML = `标准答案：<strong style="color:var(--success); font-size:1.1rem;">${item.answer}</strong> &nbsp;|&nbsp; 您的选择：<strong style="color:var(--danger);">${chosen}</strong>`;
    }
  }

  // 8. Navigation Controls
  function goToNextQuestion() {
    if (state.currentIndex < state.questions.length - 1) {
      state.currentIndex++;
      renderCurrentQuestion();
    }
  }

  function goToPrevQuestion() {
    if (state.currentIndex > 0) {
      state.currentIndex--;
      renderCurrentQuestion();
    }
  }

  // 9. Stats Updating
  function updateStats() {
    if (!state.questions || state.questions.length === 0) return;

    const total = state.questions.length;
    let answered = 0;
    let correct = 0;
    let wrong = 0;

    state.questions.forEach(q => {
      const rec = state.answers[q.id];
      if (rec) {
        answered++;
        if (rec.isCorrect) correct++;
        else wrong++;
      }
    });

    const accuracy = answered > 0 ? ((correct / answered) * 100).toFixed(1) : '0.0';
    const progressPct = total > 0 ? ((answered / total) * 100).toFixed(1) : '0';

    DOM.statProgress.textContent = `${answered} / ${total}`;
    DOM.statCorrect.textContent = correct;
    DOM.statWrong.textContent = wrong;
    DOM.statAccuracy.textContent = `${accuracy}%`;
    DOM.progressBarFill.style.width = `${progressPct}%`;
  }

  // 10. Answer Sheet (答题卡) Modal
  function openSheetModal() {
    if (!state.questions || state.questions.length === 0) return;

    DOM.sheetGrid.innerHTML = state.questions.map((q, idx) => {
      const rec = state.answers[q.id];
      let statusClass = '';
      if (rec) {
        statusClass = rec.isCorrect ? 'item-correct' : 'item-wrong';
      }
      const isActive = idx === state.currentIndex ? 'item-active' : '';

      return `<button class="sheet-item ${statusClass} ${isActive}" data-index="${idx}">
        ${idx + 1}
      </button>`;
    }).join('');

    DOM.sheetGrid.querySelectorAll('.sheet-item').forEach(btn => {
      btn.addEventListener('click', () => {
        state.currentIndex = parseInt(btn.dataset.index);
        renderCurrentQuestion();
        DOM.sheetModal.style.display = 'none';
      });
    });

    DOM.sheetModal.style.display = 'flex';
  }

  // 11. PDF Library Modal
  function populatePdfModal(years) {
    let html = `
      <a href="pdfs/北邮801通信原理_历年选择题全集(2003-2024).pdf" target="_blank" class="pdf-card-link pdf-master">
        <span>📖 北邮801通信原理 · 历年选择题全集 (2003-2024) [56页合订本]</span>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
      </a>
    `;

    years.forEach(y => {
      html += `
        <a href="pdfs/北邮801通信原理_${y}年_选择题.pdf" target="_blank" class="pdf-card-link">
          <span>📄 ${y} 年选择题 PDF</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </a>
      `;
    });

    DOM.pdfListGrid.innerHTML = html;
  }

  // 12. Event Listeners
  function bindEvents() {
    // Year Select Change
    DOM.yearSelect.addEventListener('change', e => {
      state.year = parseInt(e.target.value);
      saveStorage();
      switchMode('year');
    });

    // Mode Tabs
    DOM.modeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        switchMode(tab.dataset.mode);
      });
    });

    // Theme Toggle
    DOM.btnThemeToggle.addEventListener('click', () => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      document.body.className = `theme-${state.theme}`;
      saveStorage();
    });

    // Auto Next Toggle
    DOM.toggleAutoNext.addEventListener('change', e => {
      state.autoNext = e.target.checked;
      saveStorage();
    });

    // Favorite Button
    DOM.btnFav.addEventListener('click', () => {
      const item = state.questions[state.currentIndex];
      if (!item) return;

      if (state.favorites.has(item.id)) {
        state.favorites.delete(item.id);
        DOM.btnFav.classList.remove('starred');
      } else {
        state.favorites.add(item.id);
        DOM.btnFav.classList.add('starred');
      }
      saveStorage();
      updateCountBadges();
    });

    // Navigation
    DOM.btnNext.addEventListener('click', goToNextQuestion);
    DOM.btnPrev.addEventListener('click', goToPrevQuestion);

    // Toggle Answer
    DOM.btnToggleAnswer.addEventListener('click', () => {
      const item = state.questions[state.currentIndex];
      if (!item) return;

      state.showAnswer = !state.showAnswer;
      if (state.showAnswer) {
        DOM.txtShowAns.textContent = '隐藏答案';
        showFeedback(item, '未选择', isAnswerMatch(state.answers[item.id]?.chosen, item.answer));
      } else {
        DOM.txtShowAns.textContent = '显示答案';
        if (!state.answers[item.id]) {
          DOM.feedbackBox.style.display = 'none';
        }
      }
    });

    // Reset Progress for Current Set
    DOM.btnResetYear.addEventListener('click', () => {
      if (confirm(`确认要清空当前【${state.year}年】的刷题记录吗？`)) {
        state.questions.forEach(q => {
          delete state.answers[q.id];
        });
        saveStorage();
        renderCurrentQuestion();
        updateStats();
      }
    });

    // Sheet Modal
    DOM.btnSheet.addEventListener('click', openSheetModal);
    DOM.btnCloseSheet.addEventListener('click', () => {
      DOM.sheetModal.style.display = 'none';
    });
    DOM.sheetModal.addEventListener('click', e => {
      if (e.target === DOM.sheetModal) DOM.sheetModal.style.display = 'none';
    });

    // PDF Modal
    DOM.btnPdfModal.addEventListener('click', () => {
      DOM.pdfModal.style.display = 'flex';
    });
    DOM.btnClosePdf.addEventListener('click', () => {
      DOM.pdfModal.style.display = 'none';
    });
    DOM.pdfModal.addEventListener('click', e => {
      if (e.target === DOM.pdfModal) DOM.pdfModal.style.display = 'none';
    });

    // Sync Modal
    DOM.btnSyncModal.addEventListener('click', () => {
      DOM.syncModal.style.display = 'flex';
    });
    DOM.btnCloseSync.addEventListener('click', () => {
      DOM.syncModal.style.display = 'none';
    });
    DOM.syncModal.addEventListener('click', e => {
      if (e.target === DOM.syncModal) DOM.syncModal.style.display = 'none';
    });

    // Sync Export Code
    DOM.btnExportCode.addEventListener('click', () => {
      const data = exportSyncData();
      const codeStr = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
      DOM.syncCodeArea.value = codeStr;
      navigator.clipboard.writeText(codeStr).then(() => {
        alert('📋 同步码已成功复制到剪贴板！您可以在手机或平板上点击【从同步码恢复进度】粘贴导入。');
      }).catch(() => {
        alert('同步码已生成在下方文本框中，请长按手动全选复制。');
      });
    });

    // Sync Export File
    DOM.btnExportFile.addEventListener('click', () => {
      const data = exportSyncData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `北邮801刷题进度备份_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });

    // Sync Import Code
    DOM.btnImportCode.addEventListener('click', () => {
      const val = DOM.syncCodeArea.value.trim();
      if (!val) {
        alert('请先在文本框中粘贴同步代码！');
        return;
      }
      try {
        let jsonStr = val;
        // Try base64 decode first
        try {
          jsonStr = decodeURIComponent(escape(atob(val)));
        } catch (_) {}
        const payload = JSON.parse(jsonStr);
        importSyncData(payload, true);
        DOM.syncModal.style.display = 'none';
      } catch (err) {
        alert('❌ 同步码格式解析失败，请确认复制的代码是否完整！');
      }
    });

    // Sync Import File
    DOM.fileImport.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const payload = JSON.parse(ev.target.result);
          importSyncData(payload, true);
          DOM.syncModal.style.display = 'none';
        } catch (err) {
          alert('❌ 备份文件损坏或非标准 JSON 格式！');
        }
      };
      reader.readAsText(file, 'utf-8');
      e.target.value = '';
    });

    // Lightbox Modal
    DOM.questionImg.addEventListener('click', () => {
      DOM.lightboxImg.src = DOM.questionImg.src;
      DOM.lightboxModal.style.display = 'flex';
    });
    DOM.btnZoom.addEventListener('click', () => {
      DOM.lightboxImg.src = DOM.questionImg.src;
      DOM.lightboxModal.style.display = 'flex';
    });
    DOM.btnCloseLightbox.addEventListener('click', () => {
      DOM.lightboxModal.style.display = 'none';
    });
    DOM.lightboxModal.addEventListener('click', e => {
      if (e.target === DOM.lightboxModal) DOM.lightboxModal.style.display = 'none';
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', e => {
      // Ignore if in inputs
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        const item = state.questions[state.currentIndex];
        if (item) handleOptionSelect(item, key);
      } else if (e.key === 'ArrowRight') {
        goToNextQuestion();
      } else if (e.key === 'ArrowLeft') {
        goToPrevQuestion();
      } else if (e.key === ' ' || e.key === 'Enter') {
        DOM.btnToggleAnswer.click();
      }
    });
  }

  // 13. Boot on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
